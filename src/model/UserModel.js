
class UserModel{
    constructor(name, email, password, identity, id, year, department, gender, hobbies, interests) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.identity = identity;
        this.year = year; // Year of study (e.g., Freshman, Sophomore, etc.)
        this.department = department; // Academic department or major
        this.gender = gender; // Gender identity
        this.hobbies = hobbies; // Array of hobbies or interests
        this.interests = interests; // Array of academic or personal interests
        this.id = id; // Unique identifier (optional)
    }

    static checkEmail(email){
        const user =  users.find((u)=> u.email == email);
        console.log(email);
        console.log(users);

        if(user){
            return true;
        }
        return false;
    }



    static getUser(User){
        // console.log(email , password);
        const user = users.find(u => u.email == User.Username && u.password == User.password);
        console.log(user);
        return user;
    }



    static addUser(name , email , password , identity){
        const user = users.find(u => u.email == email && u.identity == identity );
        console.log("user :" , user);
        if(user){
            return false;
        }
        
        const id = users.length+1;
        const newUser = new UserModel(name , email , password , identity , id);
        users.push(newUser);
        console.log(newUser , "added successfully");
        return true;
    }

    static setToken(email , token){
        const user =  users.find((u)=> u.email == email);
        user.token = token;
        console.log(users);
        return user;

    }

    static verifyToken( token){
        const user = users.find(u=>  u.token == token);
        if(user){
            return user;
        }
        return false;
    }

    static setPassword(token , newPassword){
        const user = user.find(u=>u.token == token );
        if(!user){
            return false;
        }
        user.password = newPassword;
        return true;
    }

}

export default UserModel
let users = [
    new UserModel(
        "Emily Johnson",
        "emilyjohnson@example.com",
        "password789",
        "Student",

        "135792468"  ,
        "Sophomore",
        "Psychology",
        "Female",
        ["Dancing", "Photography"],
        ["Cognitive Psychology", "Social Psychology"]
    ),
    new UserModel(
        "Alex Rodriguez",
        "alexrodriguez@example.com",
        "passwordabc",
        "admin"
        ,
        "246813579" ,
        "Freshman",
        "Engineering",
        "Male",
        ["Playing Guitar", "Cooking"],
        ["Civil Engineering", "Renewable Energy"]
    )

]
