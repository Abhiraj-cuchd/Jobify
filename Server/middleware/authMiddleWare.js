import  JWT from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        next("Authentication Failed")
    }

    const token = authHeader?.split(" ")[1];

    try {
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.body.user = {
            userId: userToken.userId,
        };

        next();
    } catch (error) {
        console.log(error);
        next("Authentication Failed");
    }
};


export default userAuth;