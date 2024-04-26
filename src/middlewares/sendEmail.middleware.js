import nodemailer from 'nodemailer';
import querystring from 'querystring';
const sendMail = async (name , email , token , message , userInfo)=>{

    //creating transporter
    const transporter = nodemailer.createTransport(

        {
            service:'gmail',
            auth:{
                user:'Bamaniyalakshit@gmail.com',
                pass:'hmly nchd ldto dimt',
            }
        },
    );

    const userInfoQueryString = querystring.stringify(userInfo);
let mailOptions;
    //email content
    if(message && userInfo){
         mailOptions = {
            from:'Bamaniyalakshit@gmail.com',
            to:email,
            subject:"Password reset request",
            html:`Dear ${name}, ${message} <a href="http://127.0.0.1:3000/admin-allowed/?userInfo = ${userInfoQueryString}&admin=true">allow  </a> or <a href="http://127.0.0.1:3000/admin-denied/?userInfo = ${userInfoQueryString}&admin=false"> denied </a> `
        }       
    } else if(message){
        mailOptions = {
            from:'Bamaniyalakshit@gmail.com',
            to:email,
            subject:"Password reset request",
            html:`Dear ${name}, ${message} < a href="http://127.0.0.1:3000/" > click </a> to redirect the application `
        }  
    }
    else{
         mailOptions = {
            from:'Bamaniyalakshit@gmail.com',
            to:email,
            subject:"Password reset request",
            html:`Dear ${name}, <a href="http://127.0.0.1:3000/reset-password/?token=${token}">click</a> to reset password`
        }
    }



    //sending mail
    try{
        const result = await transporter.sendMail(mailOptions , (err , info)=>{
            if(err){
                console.log(err)
            }else{
                console.log("email sent successfully " , info.response);

            }
        });
    }
    catch(error){
        console.log(error);
    }
}

export default sendMail;