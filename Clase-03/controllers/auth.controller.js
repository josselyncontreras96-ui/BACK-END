import User from "../models/user.js"
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
            const { email, password } = req.body;
    console.log(email.includes("@"));

    if (!email || !password) {
        return res.status(400).json({ error: "correo y contraseña son requeridos" });
    }

    /* if (!email.includes("@")) {
        return res.status(400).json({ error: "correo no es valido" });
 }*/

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// console.log(emailRegex.test(email));

if (!emailRegex.test(email)) {
  return res.status(400).json({ error: "correo no es valido" });
}
if (password.length < 6) {
    return res.status(400).json({ error: "contraseña debe tener al menos 6 caracteres" });
}

const existingUser = await User.findOne({email});
if (existingUser) {
    return res.status(400).json({ error: " Usuariro duplicado"});
}

return res.send("Probando");


    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
         email, 
         password: hash,
        });



    res.status(201).json({
        id: user.id,
        email: user.email,
    }); 
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};