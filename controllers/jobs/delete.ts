import { RowDataPacket } from 'mysql2';
import pool from '../../services/database';
import { Request, Response } from 'express';

function DeleteJobs() {
    return async (req:Request, res:Response) => {
        try {
            const [data] = await pool.query<RowDataPacket[]>(`SELECT * FROM jobs WHERE id = ?`, [req.params.id]);
            if(data[0].rec_id === req.user.id) {
                await pool.query(`DELETE FROM jobs WHERE id = ?`, [req.params.id]);
                return res.status(200).send( data );
            } else {
                return res.status(403).send({ message: "You are not authorized to delete this job"});
            }
        } catch (error) {
            return res.status(500).send({ message: (error as Error).message});
        }
    };
}

export default DeleteJobs;