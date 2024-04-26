import cookieParser from 'cookie-parser';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';
import UserController from './src/contoller/user.controller.js';
import { auth } from './src/middlewares/auth.middleware.js';
import isDataCorrectlyEntered from './src/middlewares/loginValidation.middleware.js';
import EventModel from './src/model/eventModel.js';
const userController = new UserController();
const server = express();

server.set('view engine' , 'ejs');
server.set("views" , path.join(path.resolve() ,'src','views' ));
server.set('layout' , 'orgLayout');

server.use(express.urlencoded({extended:true}));



server.use(cookieParser());
server.use(session(
    {
        secret:'Event-key',
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false},

    }
    
))

// server.use(LastVisit)


server.get('/' , userController.getLandingPage);
server.get('/eventRegister' , auth , userController.getEvent);
server.get('/signIn' , userController.getSignIn);
server.get('/logout' , auth , userController.logOut);
server.post('/' ,isDataCorrectlyEntered , userController.validateUser  ,userController.dashboard , ejsLayouts);


server.get('/signUp' , userController.getSignUp);
server.post('/signUp' , userController.addNewUser);


// server.get('/frogot-password' , userController.getforgetPasswordForm);
// server.post('/frogot-password' , userController.forgetPassword);


// server.get('/reset-password/:token' , userController.resetPasswordForm);
// server.post('reset-password/:token' , userController.resetPassword);

server.get('/eventWrapUp' , auth , ejsLayouts , userController.getEventWrapUp);
server.get('/eventWrapUp/analytics' , auth , ejsLayouts , userController.getEventAnalytics);

server.get('/event-calender' , auth , ejsLayouts ,userController.getCalender);
server.get('/addEventForm' , auth , ejsLayouts , (req , res)=>{
    res.render('calender' , {title:"Event Calender"});
});
server.post('/addEventForm' , auth , ejsLayouts , userController.addEventToCalender);

// server.get('/logout' ,auth, ejsLayouts , userController.logout)
server.get('/Analytics-bar' ,auth, ejsLayouts , (req , res)=>{
    res.render('eventAnalytics' , {title:"Analytics" , pie:false});
});
server.get('/Analytics-pie' ,auth, ejsLayouts , (req , res)=>{
    res.render('eventAnalytics' , {title:"Analytics" , pie:true});
});
server.get('/admin-allowed' , userController.addNewUser);
server.get('/admin-denied' , userController.deniedResponse);


server.get('/home' ,auth, ejsLayouts , (req , res)=>{
    const events = EventModel.getAll(false);
    res.render('dashboard' , {title:"Dashboard" , events:events});
});
server.get('/event-edit/:id' ,auth , userController.editEvent);
server.post('/event-edit/:id' ,auth ,ejsLayouts, userController.getEditedEvent);

server.get('/event-add' , auth, userController.getAddEventForm);
server.post('/event-add' , auth,ejsLayouts, userController.addEvent);


server.get('/forget-pass' , (req , res)=>{
    res.render('forgetpass');
})


server.post('/forget-pass' , userController.forgetPassword)
server.get('/event/calender' ,auth, ejsLayouts , userController.getCalender);
server.get('/reset-password' , userController.getResetPasswordForm)

// server.get('/event/community' ,auth, ejsLayouts , userController.getCommunity);
// server.get('/createEvent' ,auth, ejsLayouts , userController.getEventForm);
// server.post('/createEvent' ,auth, ejsLayouts , userController.addEvent);
// server.delete('/createEvent' ,auth, ejsLayouts , userController.deleteEvent);



server.use(express.static('./src/views'));
server.use(express.static('./public'));
// server.use( express.static(path.join(path.resolve(), 'src', 'views', 'Resources')));//making resources folder public

server.listen( 3000 , ()=>{
    console.log("server is listning on port 3000 ...");
});