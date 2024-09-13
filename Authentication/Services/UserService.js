const bcrypt = require('bcrypt');

class userService {

    constructor(userModel){
        this.userModel = userModel;
    }

    async registerUser({userName,fullName,email,password,gender,role})
    {
        if(!userName || !fullName || !email || !password || !gender || !role)
        {
            throw new Error('Please fill all the fields');
        }

        const exisitingUser = await this.userModel.findOne({userName})

        if(exisitingUser)
        {
            throw new Error('User already exists');
        }

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await this.userModel.create({
            userName,
            fullName,
            email,
            password:hashPassword,
            gender,
            role
        })

        if(newUser)
        {
            return newUser;
        }
    }

}

module.exports = userService;