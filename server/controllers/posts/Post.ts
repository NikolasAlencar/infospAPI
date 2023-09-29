import { bucket } from "../../Server";
import { getCollection } from "../../shared/middleware/Firestore";
import { enviroment } from "../../enviroments/enviroment";

export const postIn = async (req: any, res: any) => {
    try{
        await uploadImage(req);
        await post(JSON.parse(req['body']?.body));
        await addNotify(JSON.parse(req['body']?.body));
        res.status(200).send({message: 'Post salvo com sucesso'});
    }catch (e) {
        res.status(500).send({message: `Error in ${e}`})
    }
}

const uploadImage = (req: any) => {
    return new Promise<void>((res, rej) => {
      const imagem = req['file']
      const body = JSON.parse(req['body']?.body);
      if(imagem){
        const file = bucket.file(body.nomeImagem + '.jpg')
        const stream = file.createWriteStream({
          metadata: {
            contentType: imagem.mimetype,
          },
        })

        stream.on("error", (e: any) => {
          console.log(e);
        })

        stream.on("finish", async () => {
          await file.makePublic();
          req.file.firebaseUrl = `https://storage.googleapis.com/${enviroment.bucket}/${body.nomeImagem}`;
          res();
        })

        stream.end(imagem.buffer);
      }
    })
}

const post = async (body: any) => {
  const payloadPost = body.post;
  const document = await getCollection('posts').doc(JSON.stringify(payloadPost.idPost))
  document.set(payloadPost)
}

const addNotify = async (body: any) => {
  const payloadPost = body.post;
  await getCollection('notificacoes')
    .doc(JSON.stringify(payloadPost.idPost))
    .set(getBodyNotification(body.post))
}

const getBodyNotification = (body: any) => {
  return {
    timestamp: new Date().getTime(),
    idPost: body.idPost,
    dataPost: body.dataPost,
    imgPost: body.imgPost,
    descricao: body.descricao,
    titulo: body.titulo
  }
}