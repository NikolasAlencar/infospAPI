import { getAllDocs } from "../../shared/middleware/Firestore";

export const getNotifications = async (req: any, res: any) => {
    try{
        const notificacoes = await getAllDocs('notificacoes');
        res.status(200).send({message: 'Retorno concluído com sucesso!', data: notificacoes})
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}