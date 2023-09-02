import { getCollection } from "../../shared/middleware/Firestore";
import { createToken } from "../../shared/services/JWTService";

export const addNewUser = async (req: any, res: any) => {
    try{
        const {usuario, senha, email} = req.body.user
        const document = await getCollection('users').doc(usuario)
        document.set(req.body.user).then(() => {
            const access_token = createToken({ usuario, senha, email });
            res.status(200).json({ access_token });
        });
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}