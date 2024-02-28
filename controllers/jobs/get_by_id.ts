import pool from '../../services/database'; 
import { Request, Response } from 'express';

function GetJobsById() {
    return async (req: Request, res: Response) => {
        try {
            const [data] = await pool.query(`SELECT * FROM jobs WHERE id = ?`, [req.params.id]);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message});
        }
    };
}

export default GetJobsById;