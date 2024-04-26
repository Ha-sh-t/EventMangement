import { body, validationResult } from "express-validator";

const isDataCorrectlyEntered = async (req  , res , next)=>{

    //setup the rules
    const rules = [
        body('Username').notEmpty().withMessage("Username is Required"),
        body('password').notEmpty().withMessage("Password is required")
    ]

    //running the rules

    await Promise.all(rules.map((rule)=>rule.run(req)));

    //checking for any error
    var errors = validationResult(req);

    if(!errors.isEmpty()){
        // console.log(errors)
        // return res.render('./front/signIn' , {error:errors.array()[0].msg});
        return res.render('signIn' ,{error:errors.array()[0].msg});
    }

    next();
}

export default isDataCorrectlyEntered;