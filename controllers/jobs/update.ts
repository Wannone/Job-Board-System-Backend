import { OkPacket, RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';
import pool from '../../services/database';

function UpdateJobs() {
    return async (req: Request, res: Response) => {
        try {
            const { title, description, requirement, company, location } = req.body;

            const [data] = await pool.query<RowDataPacket[]>(`SELECT rec_id FROM jobs WHERE id = ?`, [req.params.id]);

            if (data[0].rec_id === req.user.id) {
                await pool.query(
                    `UPDATE jobs SET 
                        title = ?, description = ?, requirement = ?, company = ?, location = ?
                        WHERE id = ?`,
                    [title, description, requirement, company, location, req.params.id]
                );
                return res.status(200).send({ message: "Job updated successfully", data });
            } else {
                return res.status(403).send({ message: "You are not authorized to update this job" });
            }
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message });
        }
    }
}

export default UpdateJobs;
