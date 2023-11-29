import { configSendEmail } from 'etc/secrets/enviroment'

const nodemailer = require("nodemailer");

export const sendEmail = (corpoEmail: any) => {

    const mailOptions = getMailOptions(corpoEmail);

    const transporter = getTransporter();

    return transporter.sendMail(mailOptions, (error: any, info: any) => error ? error : "E-mail enviado com sucesso!");
}

const getMailOptions = (corpoEmail: any) => {
    return {
        from: "backofficewallet@gmail.com",
        to: corpoEmail.to,
        subject: corpoEmail.subject,
        html: corpoEmail.message
    }
}

const getTransporter = () => {
    return nodemailer.createTransport({
        host: configSendEmail.host,
        port: configSendEmail.port,
        service : "Gmail",
        secure: false,
        auth: {
            user: configSendEmail.user,
            pass: configSendEmail.password
        },
        tls: { rejectUnauthorized: false }
    });
}