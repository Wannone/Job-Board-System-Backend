import pool from '../../services/database'; 
import { Request, Response } from 'express';

function CreateJobs() {
    return async (req: Request, res: Response) => {
        try {
            const { title, description, requirement, company, location } = req.body;
            const recruiterId = req.user.id;
            await pool.query(
                `INSERT INTO jobs 
            (title, description, requirement, company, location, rec_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
                [title, description, requirement, company, location, recruiterId]
            );
            return res.status(200).send({ message: "Job created successfully"});
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message});
        }
    };
}

export default CreateJobs;