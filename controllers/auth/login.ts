import pool from '../../services/database'; 
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateAccessToken from '../../services/token';
import { RowDataPacket } from 'mysql2';

function LoginUser(){
    return async (req: Request, res: Response) => {
        try{
            let { username, password } = req.body;
            const [user] = await pool.query<RowDataPacket[]>(
                "SELECT * FROM users WHERE username LIKE ? OR email LIKE ?",
                [`%${username}%`,`%${username}%`]
            );
            if(user.length !== 0){
                const isValid = await bcrypt.compare(password, (user as any)[0].password);
                if(isValid){
                    const { username, role, id } = (user as any)[0];
                    const data = { username, role, id };
                    const access = generateAccessToken(data);
                    return res.status(200).json({token: access});
                } 
            }
            return res.status(404).send({ message: "email/password false" });
        }catch(error){
            return res.status(500).send({ message: (error as Error).message });
        }
    };
}

export default LoginUser;