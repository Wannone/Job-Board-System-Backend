import pool from '../../services/database'; 
import { Request, Response } from 'express';
import HashPassword from '../../services/hash';
import { ResultSetHeader } from 'mysql2';

function RegisterApplicants(){
    return async (req: Request, res: Response) => {
        try {
            let { name, username, email, password } = req.body;
            password = HashPassword(password);
            const [user] = await pool.query<ResultSetHeader>(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                [username, email, password]);
            const userId = user.insertId;
            await pool.query(
                "INSERT INTO applicants (id, full_name) VALUES (?, ?)",
                [userId, name]
            );
            return res.status(200).send({ message: "User registered successfully"});
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message });
        }
    };
}

export default RegisterApplicants;