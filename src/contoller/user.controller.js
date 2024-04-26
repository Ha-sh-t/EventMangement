import Randomstring from "randomstring";
import sendMail from "../middlewares/sendEmail.middleware.js";
import UserModel from "../model/UserModel.js";
import EventModel, { events } from "../model/eventModel.js";
class UserController {


    getLandingPage(req , res){
        console.log("getLandingPage is called !");
        const onGoingEvents = EventModel.getOngoingEvents();
        const upComingEvents = EventModel.getUpcomingEvents();

        res.render('attendee' , {onGoingEvents:onGoingEvents , upComingEvents:upComingEvents});
    }

    getEvent(req , res){
        res.send("working..");
    }

    getSignIn(req , res){
        console.log("sign page method called !");
        res.render('signIn' ,{error:null , userEmail:req.session.userEmail});
        // res.sendFile()
        // res.sendFile( path.join(path.resolve() , 'src' , 'views' ,'front' ,  'signIn.html'));
    }



    addNewUser(req  , res){
        console.log("addNewUserCalled")
        const{name , email , password , identity} = req.body;
        console.log(req.body);

        //1.check user avaibility

        //if not available send mail for admin access to user

        //get feedback from admin and send correct response to user

        if(identity == 'admin'){
           //send mail to secaroty 
           sendMail("Secaratory" , "777harshitkumar@gmail.com", null ,  `${name} wants to admin access` , req.body )
           //get approvel 
           res.send("you will get email from Secarotory  and then try long in again");
        }
        else if(identity == 'Student'){
            console.log("Student Id")
            const result = UserModel.addUser(name , email  , password , identity);
            console.log("result : " , result)
            if(result){
                return res.render('signIn' , {error:"added successfully !"});
            }
            else{
                res.render('signIn' , {error:"user already exists with provided credentials"});
            }
        }else if(req.query.admin){
            const {name , email , password , identity} = req.query;
            console.log(email);
            const result = UserModel.addUser(name , email   , password , identity);
                // return res.render('signIn' , {error:null});
                sendMail(name , email , null, "now you have admin access to app" , null);
                res.send("thank You !");

        }
        else{
            sendMail(name , email ,null, "your request has dennied " , null);
            res.send(`response sended to ${name} `);

        }

    }
    deniedResponse(req , res ){
        console.log("admin access denied");
        res.redirect('/');

    }
    getSignUp(req , res){
        console.log("sign up page");
        res.render('signUp');
    }
    
    validateUser(req  , res , next){
        console.log(req.body);
        // const {Username , password} = req.body;
    
        const user = UserModel.getUser(req.body);
        console.log(user);
        if(user){
            console.log("under user")
            req.session.userEmail = req.body.Username; //storing username in session storage 
            next();
        }
        else{
            console.log("sign in called")
            return res.render('signIn' ,  { error: "Invalid Credentials" });
        }
    }
    

    dashboard(req , res){
        console.log("dash-board page");
        console.log(req.body);
        // const {Username , password} = req.body;
    
        const user = UserModel.getUser(req.body);
        req.session.userEmail = req.body.Username;
        
            if(user.identity == 'Student'){
                console.log("getLandingPage is called !");
                const onGoingEvents = EventModel.getOngoingEvents();
                const upComingEvents = EventModel.getUpcomingEvents();
        
                res.render('attendee' , {onGoingEvents:onGoingEvents , upComingEvents:upComingEvents , userEmail:req.session.userEmail});
         
    
            }
            else{
                const events = EventModel.getAll(false);
                return res.render('dashboard' , { title: 'Dashboard' , events:events }); // Pass title here
            }
        }

        getforgetPasswordForm(req , res){
            console.log("get forget pass form called ");
            res.render("forgerPasswordForm");
        }



        getAddEventForm(req , res){
            console.log("rendering add event form");
            // const event = new EventModel();
            res.render('addForm');
        }



        forgetPassword(req , res , next){
            //user email validity
            const{email} = req.body;
            const isValid = UserModel.checkEmail(email);

            if(isValid){

                //generate token
                const tokenString  = Randomstring.generate();
                console.log(tokenString)

                //set token
                const user = UserModel.setToken(email , tokenString);

                //send token to user email 
                sendMail(user.name , email , tokenString);
                req.session.userEmail = email;
                res.status(200).send("check you inbox "); 
                
            }
            else{

                res.send("User does not exists with this email ");
            }

            

        }


        editEvent(req , res ){
            console.log("edit Event called");
            console.log(req.params);
            const{id} = req.params;
            const event = EventModel.getEvent(id);
            console.log(event);
            res.render('editForm' , {event:event , button:"Edit"});
        }

        getEditedEvent(req , res){
            console.log("get edited function is called");
            const  {id} = req.params;
            console.log(req.body)
            let events = EventModel.updateEventDetails(id , req.body);
            console.log(events)

            return res.render('dashboard' , { title: 'Dashboard' , events:events });

            
        }


        addEvent(req , res){
            console.log(req.body)
            // const newEvent = new EventModel(req.body);
            // console.log(newEvent);
            const events = EventModel.addEvent(req.body);
            console.log(events);
                return res.render('dashboard' , { title: 'Dashboard' , events:events }); // Pass title here
        }

        getResetPasswordForm(req , res){
            console.log(req.query)
            const {token} = req.query;
            console.log(token)

            const isValid  = UserModel.verifyToken( token.toString());
            if(isValid){
                res.render('resetPasswordForm' , {error:null});
            }
            else{
                res.status(400).send("Unathorized access");
            }
        }

        resetPassword(req , res){
            const{newPassword , confirmPassword} = req.body;
            const{token} = req.query;
            if(newPassword != confirmPassword){
                return res.render('resetPasswordForm' , {error:"both should be same !"});
            }
            const result = UserModel.setPassword(token , newPassword);
            if(result){
                res.render('signIn' , {error:null});
            }
            else{
                res.status(400).send("pls reset password using email link");
            }
        }




        getCalender(req , res ){
            console.log("getting calender");
            const allEvents = events;
            const jsonEvents = JSON.stringify(allEvents);
            // console.log(jsonEvents)
            res.render('calender' ,{title:"Event Calender" ,jsonEvents:jsonEvents});

        }





        //event wrap up
        getEventWrapUp(req , res , next){
            console.log("event wrap up");
            const events = EventModel.getAll(true);
            res.render('eventWrapUp' , { title: 'Event Wrap-Up' , events:events })
        }
    
        getEventAnalytics(req , res , next){
            console.log("event analytics");
            res.render('getting ready event analytics');
        }





        addEventToCalender(req , res ){
            console.log("addEventCalender !");
            console.log(req.body);


        }
    
logOut(req , res){
    req.session.destroy((err)=>{
        if(err){
            conslole.log(err);
        
        }else{
            res.redirect('/');
        }
    });
}

 }

 export default UserController;