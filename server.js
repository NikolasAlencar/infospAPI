const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const express = require("express");
const multer  = require('multer')
const upload = multer()
const server = jsonServer.create();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// config para firestore
const BUCKET = require("./bucket.json")
var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
var serviceAccount = require("./auth.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const SECRET_KEY = require("./secretkey.json");

const expiresIn = "1h";

const bucket = admin.storage().bucket();

this.app = express();

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated(userFront, userFirestore) {
  return userFront.usuario === userFirestore.usuario && userFront.senha === userFirestore.senha
}

// função auxiliar pra consulta
function geraRetornoUser(param, res) {
  const status = 201;
  const message = "Dados não encontrados";
  param ? res.status(200).json(param) : res.status(status);
}

// Login to one of the users from ./users.json
server.post("/auth/login", async (req, res) => {
  try{
    const db = getFirestore().collection("users").doc(req.body.usuario)
    const doc = await db.get();
    if (isAuthenticated(req.body, doc.data())) {
      const access_token = createToken(doc.data());
      res.status(200).json({ access_token, infoUser: doc.data() });
    } else {
      const status = 401;
      const message = "Usuário ou senha incorretos";
      res.status(status).json({ status, message });
    }
  }catch(e){
    res.status(500).send({message: `Erro ao realizar o login em ${e}`})
  }
});

//register
server.post("/adicionar/novo-usuario", (req, res) => {
  try{
    const {usuario, senha, email} = req.body.user
    getFirestore().collection("users").doc(usuario).set(req.body.user).then(() => {
      const access_token = createToken({ usuario, senha, email });
      res.status(200).json({ access_token });
    });
  }catch(e){
    res.status(500).send({message: `Erro ao criar novo usuario em ${e}`})
  }
});

server.post("/obter/user/nome", async (req, res) => {
  try{
    const db = getFirestore().collection("users").doc(req.body.name)
    const doc = await db.get();
    geraRetornoUser(doc.data(), res);
  }catch(e){
    res.status(500).send({message: `Erro ao obter usuario em ${e}`})
  }
});

// server.post("/obter/user/email", (req, res) => {
//   const client = getUserByEmail(req.body.email);
//   geraRetornoUser(client, res);
// });

// server.post("/obter/user/email", async (req, res) => {
//   const db = getFirestore().collection("users").doc(req.body.email)
//   const doc = await db.get();
//   geraRetornoUser(doc.data(), res);
// });

//get posts
function trocaImgPost(post){
  const bucket = admin.storage().bucket();
  const imgPost = bucket.file(post.imgPost + '.jpg')
  const imgUsuario = bucket.file(post.imgUsuario + '.jpg')
  const urlImgPost = imgPost.publicUrl()
  const urlImgUsuario = imgUsuario.publicUrl()
  post.imgPost = urlImgPost
  post.imgUsuario = urlImgUsuario
  post.comentarios = post.comentarios.map(comentario => {
    const imgUsuarioComentario = bucket.file(comentario.imgUsuario + '.jpg')
    const urlImgUsuarioComentario = imgUsuarioComentario.publicUrl()
    comentario.imgUsuario = urlImgUsuarioComentario
    return comentario
  })
  return post
}

server.get("/get-posts", async (req, res) => {
  try{
    const snapshot = await getFirestore().collection('posts').get()
    const posts = snapshot.docs.map(post => post.data());
    const postTransformado = posts.map(post => trocaImgPost(post))
    res.status(200).send({message: 'Retorno concluído com sucesso!', data: postTransformado})
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

const uploadImage = (req) => {
  const imagem = req['file']
  const body = JSON.parse(req['body']?.body);
  if(imagem){
    console.log('Imagem', imagem)
    console.log('Body', body)
    const file = bucket.file(body.nomeImagem + '.jpg')
    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    })

    stream.on("error", (e) => {
      console.log(e);
    })

    stream.on("finish", async () => {
      await file.makePublic();
      req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${body.nomeImagem}`;
    })

    stream.end(imagem.buffer);
  }
}

const post = async (body) => {
  const payloadPost = body.post;
  console.log('PayloadPost', payloadPost.idPost)
  await getFirestore().collection("posts").doc(JSON.stringify(payloadPost.idPost)).set(payloadPost)
}

server.post("/postar", upload.single("arquivo"), (req, res) => {
  try{
    uploadImage(req)
    post(JSON.parse(req['body']?.body));
    res.status(200).send({message: 'Post salvo com sucesso'})
  }catch (e) {
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.post("/pegar-imagem", async (req, res) => {
  const fileRef = admin.storage().bucket().file(req.body.nameImage)
  const url = await fileRef.publicUrl()
  res.status(200).send({message: 'Imagem retornada com sucesso', imagemUrl: url})
});

//get options
server.post("/obter/options/options-register", async (req, res) => {
  try{
    const db = getFirestore().collection("options").doc('optionsRegister')
    const doc = await db.get();
    res.status(200).json(doc.data().optionsRegister);
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.post("/obter/options/options-sidenav", async (req, res) => {
  try{ 
    const db = getFirestore().collection("options").doc('optionsSidenav')
    const doc = await db.get();
    res.status(200).json(doc.data().optionsSidenav);
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error && req.body.title !== "new-user") {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
