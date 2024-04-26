
import UserModel from "../model/UserModel.js";
const basicAuthentication  = (req , res , next)=>{

    console.log("authorization function is just called");
    const authHeader =  req.headers["authorization"];

    if(!authHeader){
        return res.status(401).render('signIn' , {error:'No authorization details found'});

    }

    console.log(authHeader);
    const base64Credentials = authHeader.replace('Basic ','');
    console.log(authHeader);


    //decoding 
    const decodedCredentials  = Buffer.from(base64Credentials , 'base64').toString('utf8');
    console.log(decodedCredentials);

    const creds = decodedCredentials.split(':');
    console.log(creds);

    let users = UserModel.getAll();
    console.log(users);
    const user = users.find((u)=>u.email == creds[0] && u.password == creds[1]);

    if(user){
        next();
    }
    else{
        return res.status(401).render("signIn" , {error:'Incorrect credentials'});
    }
}

export default basicAuthentication;