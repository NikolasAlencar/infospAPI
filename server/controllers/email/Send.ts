import { sendEmail } from "../../shared/middleware/SendMail";

export const sendMail = (req: any, res: any) => {
    try{
        const result = sendEmail({...req.body})
        res.status(200).json({ 'result': result });
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}