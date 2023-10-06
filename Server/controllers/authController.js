import Users from '../models/userModel.js';

export const register = async (req,res, next) => {

    const { firstName, lastName, email, password } = req.body;

    if(!firstName) {
       next("First Name is Required"); 
    }

    if(!lastName) {
        next("Last Name is Required");
    }

    if(!email) {
        next("Email is Required");
    }

    if(!password) {
        next("Password is Required");
    }

    try {
        const userExist = await Users.findOne({ email });

        if (userExist) {
            next(new Error("User already exist"));
            return;
        }

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password,
        });

        const token = await user.createJWT();
        res.status(201).send({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });

    }
}

export const login = async (req, res, next) => { 
    const { email, password } = req.body;
    try {
       if(!email || !password) {
            next("Please provide email and password");
            return;
       }

       const user = await Users.findOne({ email }).select("+password");
       if(!user) {
           next(new Error("Invalid credentials"));
           return;
       }

       const isMatch = await user.comparePassword(password);

       if(!isMatch) {
           next("Invalid credentials");
           return;
       }

       user.password = undefined;
         const token = await user.createJWT();
            res.status(201).json({
                success: true,
                message: "User logged in successfully",
                user,
                token
            });


    } catch (error) {
        console.log(error)
    }
}