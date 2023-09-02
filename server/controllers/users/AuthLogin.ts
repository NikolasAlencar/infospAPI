import { getDoc } from "../../shared/middleware/Firestore";
import { createToken } from "../../shared/services/JWTService";

export const authLogin = async (req: any, res: any) => {
    try{
        const doc = await getDoc('users', req.body.usuario);
        if (isAuthenticated(req.body, doc.data())) {
            const access_token = createToken(doc.data());
            res.status(200).json({ access_token, infoUser: doc.data() });
        } else {
            const status = 401;
            const message = "Usuário ou senha incorretos";
            res.status(status).json({message});
        }
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}

function isAuthenticated(userFront: any, userFirestore: any) {
    return userFront.usuario === userFirestore.usuario && userFront.senha === userFirestore.senha
}
