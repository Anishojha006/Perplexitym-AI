import nodemailer from "nodemailer";

const transporter  = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_USER,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        clientId:process.env.GOOGE_CLIENT_ID
    }
})

transporter.verify()
.then(()=>{
    console.log("Email transporter is ready to send emails");
})
.catch((err)=>{
    console.error("Email transporter verification failed",err)
});

export async function  functionsendEmail({to,subject,html, text}){
const mailOptions ={
    from:process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
};
const details =  await transporter.sendMail(mailOptions);
console.log("Email sent",details);
} 