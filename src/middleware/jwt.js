const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    if(req.path == "/auth/login"){
        return next()
    }

    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

const generateToken = (data) => {
    let token = ""
    try {
        token = jwt.sign({ 
            id:data.id,
            phone: data.phone, 
            email: data.email,
            role: data.role
             },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
    }
    catch (error) {
        console.log(error);
        return ""
    }
    return token
}

module.exports ={
    verifyToken,
    generateToken
} 