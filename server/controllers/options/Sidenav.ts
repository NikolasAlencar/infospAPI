import { getDoc } from "../../shared/middleware/Firestore";

export const getSidenav = async (req: any, res: any) => {
    try{
        const doc = await getDoc('options', 'optionsSidenav');
        res.status(200).json(doc.data().optionsSidenav);
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}