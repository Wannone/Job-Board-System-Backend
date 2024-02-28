import pool from '../../services/database'; 
import { Request, Response } from 'express';
import HashPassword from '../../services/hash';
import { ResultSetHeader } from 'mysql2';


function RegisterRecruiters(){
    return async (req: Request, res: Response) => {
        try {
            let { name, company, username, email, password } = req.body;
            password = HashPassword(password);
            const [user] = await pool.query<ResultSetHeader>(
                "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", 
                [username, email, password, "recruiter"]);
            const userId = user.insertId;
            await pool.query(
                "INSERT INTO recruiters (id, full_name, company_name) VALUES (?, ?, ?   )",
                [userId, name, company]
            );
            return res.status(200).send({ message: "User registered successfully"});
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message});
        }
    };  
}

export default RegisterRecruiters;