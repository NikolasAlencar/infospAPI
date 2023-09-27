import { getOrderPosts } from "../../shared/middleware/Firestore";

export const getPosts = async (req: any, res: any) => {
    try{
        const posts = await getOrderPosts();
        res.status(200).send({message: 'Retorno concluído com sucesso!', data: posts})
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}