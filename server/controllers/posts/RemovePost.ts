import { getCollection } from "../../shared/middleware/Firestore";

export const removePost = async (req: any, res: any) => {
    try{
        const idPost = req['body']?.idPost;
        const document = await getCollection('posts').doc(JSON.stringify(idPost))
        document.delete().then(() => res.status(200).send({message: 'Retorno concluído com sucesso!'}))
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}