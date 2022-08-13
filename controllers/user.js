import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/userModel.js';



export const signIn = async (req,res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });

        if (!existingUser) 
            return res.status(401).json({ message : "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);   // bcrypt comparision of hashed password
        //const isPasswordCorrect = (password === existingUser.password)  // Direct comarision of the original password

        if(!isPasswordCorrect)
            return res.status(402).json({ message : "Password incorrect" });

        const token = jwt.sign({ email : existingUser.email, id : existingUser.id }, 'success' , { expiresIn : '1h' });

        res.status(200).json({ result : existingUser, token })
    } catch (error) {
        res.send(500).json({ message : "Something went wrong" });
    }
}

export const signUp = async (req,res) => {
    const { email, password, confirmPassword, name, company } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User Already Exist" });

        if(password !== confirmPassword) return res.status(403).json({ message: "Passwords Doesn't match." });

        const hashedPassword = await bcrypt.hash(password, 12);  // Password hashing by 12 rounds

        const result = await user.create({ email, password: hashedPassword, name: name, company: company});  // Saving the hashed password in the database

        // const result = await user.create({ email, password: password, name: `${firstName} ${lastName}`}); // Directly saving password to database

        const token = jwt.sign({ email: result.email, id: result._id }, 'success', { expiresIn: '1h' });

        res.status(200).json({ result: result, token })

    } catch (error) {
        res.send(500).json({ message: "Something went Wrong." });

    }
}