import path from 'path';
export const LastVisit = (req, res, next) => {
    

    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
        res.cookie(
            'lastVisit',
            new Date().toLocaleString(),
            {
                maxAge:10*1000,
            }
        );
        console.log(req.cookies.lastVisit);
         res.sendFile(path.join(path.resolve() , 'src' , 'views' ,'public' ,'signUp.html'));
    } else {
        res.locals.lastVisit = new Date().toLocaleString();
        res.cookie(
            'lastVisit',
            new Date().toLocaleString(),
            {
                maxAge:10*1000,
            }
        );
        console.log(req.cookies.lastVisit);
        
        // res.redirect()
    }
    next();
    

    
    // next();
};
