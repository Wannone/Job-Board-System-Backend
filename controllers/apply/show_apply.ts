import pool from '../../services/database';
import { Request, Response } from 'express';

function ShowApply(){
    return async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const role = req.user.role;

            let query = "SELECT * FROM apply_jobs WHERE ";
            let params = [userId];

            if (role === 'recruiter') {
                query += "recruiter_id = ?";
            } else {
                query += "applicant_id = ?";
            }

            const [data] = await pool.query(query, params);

            if (!data || (data as any).length === 0) {
                return res.status(404).send({ message: 'No applies found', data, role, userId });
            }
            
            return res.status(200).send(data);

        } catch (error) {
            console.error('Error showing apply:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

export default ShowApply;