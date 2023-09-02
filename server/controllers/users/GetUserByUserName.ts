import { getDoc } from "../../shared/middleware/Firestore";

export const getUserByUserName = async (req: any, res: any) => {
    try{
        const doc = await getDoc('users', req.body.name)
        res.status(200).json(doc.data());
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}