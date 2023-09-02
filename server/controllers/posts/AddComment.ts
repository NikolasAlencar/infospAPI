import { getCollection } from "../../shared/middleware/Firestore";

export const addComment = async (req: any, res: any) => {
    try{
        const post = req.body;
        const idPost = post.idPost;
        const document = await getCollection('posts').doc(JSON.stringify(idPost))
        document.set(post).then(() => res.status(200).send({message: 'Retorno concluído com sucesso!'}));
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}