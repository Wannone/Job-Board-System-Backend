import pool from '../../services/database';
import { Request, Response } from 'express';

function SearchJobs() {
    return async (req: Request, res: Response) => {
        try {
            const search = req.query.search;
            const [data] = await pool.query(
                "SELECT * FROM jobs WHERE title LIKE ? OR description LIKE ? OR requirement LIKE ? OR location LIKE ? OR company LIKE ?", 
                [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message });
        }
    };
}

export default SearchJobs;
