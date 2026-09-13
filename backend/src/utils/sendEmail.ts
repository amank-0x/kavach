import { Resend } from "resend";
import getUserOtpHtml from "../assets/user_otp";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (to: string, otp: number) => {
    try {
        const message = getUserOtpHtml(to, otp);

        const res = await resend.emails.send({
            from: "NodeRED <auth@amnkarn.com>",
            to: to,
            subject: "Verify your identity on Node-RED",
            html: message
        })

        if (res.error) {
            console.log("error in email send");
        }
        console.log(`email sended to ${to}`);
    } catch (error) {
        console.log(error);
        return false;
    }
}