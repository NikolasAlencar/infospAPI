import { getDoc } from "../../shared/middleware/Firestore";

export const getRegister = async (req: any, res: any) => {
    try{
        const doc = await getDoc('options', 'optionsRegister');
        res.status(200).json(doc.data().optionsRegister);
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}