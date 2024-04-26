
export const auth = (req , res , next)=>{
    if(req.session.userEmail){
        console.log(req.session.userEmail);

        next();
    }
    else{
        console.log(req.session.userEmail);
       return res.redirect('/signIn' );
    }
}