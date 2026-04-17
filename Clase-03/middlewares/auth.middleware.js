import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
   try {
     const authHeader = req.headers.authorization;
    


    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid token format" });
    }



//console.log(authHeader);
//const token = authHeader.split(" ")[1];
//console.log(token);

//console.log(authHeader.split(" ")[1]);
//const array = authHeader.split(" ");
//console.log(array);
//const [portador, token] = array;
//res.send("OK");

const [, token] = authHeader.split(" ");
console.log(token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);

req.user = decoded;           // Agregar la información del usuario al objeto de solicitud para que esté disponible en los controladores
   console.log("REQ.USER:", req.user);
next();
   }
catch (error) {
    res.status(500).json({ error: "Invalid token" });}
};

