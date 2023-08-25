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

server.get("/get-posts-mock", async (req, res) => {
  const mock = {
    "message": "Retorno concluído com sucesso!",
    "data": [
      {
        "nomeUsuario": "Melissa de Jesus",
        "imgUsuario": "19414568706",
        "tipoPost": "PA",
        "imgPost": "3275601571",
        "interacoes": 15,
        "comentarios": [
          {
            "nomeUsuario": "Melissa de Jesus",
            "imgUsuario": "19414568706",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "81378640733"
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "Adicionei um comentário integrado",
            "idComentario": 4327754304
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "dsadasdasdas",
            "idComentario": 458504210
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "dsadasdasdas",
            "idComentario": 1712216662
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "Adicionei um comentário integrado com view post",
            "idComentario": 2708424800
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "Adicionei um comentário integrado com view post",
            "idComentario": 581671448
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "Adicionei um comentário integrado ",
            "idComentario": 8131258019
          },
          {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "mensagemComentario": "Adicionei um comentário integrado com view post",
            "idComentario": 7231379038
          }
        ],
        "postAberto": false,
        "idPost": "12521153317"
      },
      {
        "nomeUsuario": "Melissa de Jesus",
        "imgUsuario": "19414568706",
        "tipoPost": "PA",
        "imgPost": "3275601571",
        "interacoes": 15,
        "idPost": "12521153317",
        "comentarios": [
          {
            "nomeUsuario": "Melissa de Jesus",
            "imgUsuario": "19414568706",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "81378640733"
          }
        ],
        "postAberto": false
      },
      {
        "nomeUsuario": "Rogério Silva",
        "imgUsuario": "21359467999",
        "tipoPost": "TR",
        "imgPost": "65168959433",
        "interacoes": 15,
        "idPost": "26351834033",
        "comentarios": [
          {
            "nomeUsuario": "Rogério Silva",
            "imgUsuario": "21359467999",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "41163584167"
          }
        ],
        "postAberto": false
      },
      {
        "nomeUsuario": "Luis Rodolfo",
        "imgUsuario": "90370163449",
        "tipoPost": "AC",
        "imgPost": "46576169248",
        "interacoes": 15,
        "idPost": "43612242740",
        "comentarios": [
          {
            "nomeUsuario": "Juliana Costa",
            "imgUsuario": "30875503453",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "6455766222"
          }
        ],
        "postAberto": false
      },
      {
        "nomeUsuario": "Carol Santana",
        "imgUsuario": "97825793762",
        "tipoPost": "DE",
        "imgPost": "9803217144",
        "interacoes": 15,
        "idPost": "49606826452",
        "comentarios": [
          {
            "nomeUsuario": "Luis Rodolfo",
            "imgUsuario": "90370163449",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "35085974330"
          }
        ],
        "postAberto": false
      },
      {
        "nomeUsuario": "Nikolas Alencar",
        "tipoPost": "",
        "comentarios": [],
        "interacoes": 0,
        "postAberto": false,
        "imgUsuario": "1123456789",
        "imgPost": "36876752071",
        "idPost": "682911032"
      },
      {
        "nomeUsuario": "Juliana Costa",
        "imgUsuario": "30875503453",
        "tipoPost": "AL",
        "imgPost": "36876752071",
        "interacoes": 15,
        "idPost": "7226245116",
        "comentarios": [
          {
            "nomeUsuario": "Carol Santana",
            "imgUsuario": "97825793762",
            "mensagemComentario": "Adicionei um comentário para testar",
            "idComentario": "96697105109"
          }
        ],
        "postAberto": false
      }
    ]
  }
  try{
    res.status(200).send(mock)
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.get("/get-posts", async (req, res) => {
  try{
    const snapshot = await getFirestore().collection('posts').get()
    const posts = snapshot.docs.map(post => post.data());
    res.status(200).send({message: 'Retorno concluído com sucesso!', data: posts})
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.post("/remove-post", async (req, res) => {
  try{
    const ID_POST = req.body.idPost;
    const db = getFirestore().collection('posts').doc(JSON.stringify(ID_POST));
    db.delete().then(() => res.status(200).send({message: 'Retorno concluído com sucesso!'}))
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.post("/remove-comentario", async (req, res) => {
  try{
    const POST = req.body;
    const ID_POST = POST.idPost;
    getFirestore().collection("posts").doc(JSON.stringify(ID_POST)).set(POST).then(() => res.status(200).send({message: 'Retorno concluído com sucesso!'}))
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

server.post("/add-comment", async (req, res) => {
  try{
    const POST = req.body;
    const ID_POST = POST.idPost;
    getFirestore().collection("posts").doc(JSON.stringify(ID_POST)).set(POST).then(() => res.status(200).send({message: 'Retorno concluído com sucesso!'}))
  }catch(e){
    res.status(500).send({message: `Error in ${e}`})
  }
});

const uploadImage = (req) => {
    return new Promise((res, rej) => {
      const imagem = req['file']
      const body = JSON.parse(req['body']?.body);
      if(imagem){
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
          res();
        })

        stream.end(imagem.buffer);
      }
    })
}

const post = async (body) => {
  const payloadPost = body.post;
  await getFirestore().collection("posts").doc(JSON.stringify(payloadPost.idPost)).set(payloadPost)
}

server.post("/postar", upload.single("arquivo"), async (req, res) => {
  try{
    await uploadImage(req);
    await post(JSON.parse(req['body']?.body));
    res.status(200).send({message: 'Post salvo com sucesso'});
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
