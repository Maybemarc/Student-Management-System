import transporter from "./nodemailerconfig.js"

const sendMail = async(toemail,subject,html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:toemail,
            subject:subject,
            html:html
        }
        const info = await transporter.sendMail(mailOptions)
        console.log(`Email Sent: `,info.messageId);
        return info
    } catch (error) {
        console.log(`Error in sending Email: `,error);
        throw new Error("Email could not be sent")
    }
}


export default sendMail