import { getCollection } from "../../shared/middleware/Firestore";
import { createToken } from "../../shared/services/JWTService";
import { uploadImage } from "../posts/Post";

export const addNewUser = async (req: any, res: any) => {
    try{
        const user = JSON.parse(req['body']?.body)
        const {usuario, senha, email} = user

        if(req['file']){
            await uploadImage(req);
        } 

        const document = await getCollection('users').doc(usuario)
        await document.set(user)
        const access_token = createToken({ usuario, senha, email });

        res.status(200).json({ access_token });
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}