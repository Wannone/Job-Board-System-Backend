import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../utils/database";
import { Apply } from "../models/apply";

export class ApplyService {
    static async get(userId: number, role: string) : Promise<Apply> {
        let query = "SELECT * FROM apply_jobs WHERE ";
        if (role === 'recruiter') {
            query += "recruiter_id = ?";
        } else {
            query += "applicant_id = ?";
        }
        const [data] = await pool.query<RowDataPacket[]>(query, userId);
        if (!data || data.length === 0) {
            throw new Error('No data found');
        }
        return data[0] as Apply;
    }

    static async create(jobId: number, userId: number): Promise<Apply> {
        const [job] = await pool.query<RowDataPacket[]>('SELECT * FROM jobs WHERE id = ?', [jobId]);
        if (!job || job.length === 0) {
            throw new Error('Job not found');
        }
        const recId = job[0].rec_id;
        if (recId == null) {
            throw new Error('Recruiter not found');
        }
        const [data] = await pool.query<ResultSetHeader>(
            'INSERT INTO apply_jobs (jobs_id, applicant_id, recruiter_id) VALUES (?, ?, ?)',
            [jobId, userId, recId]
        );
        
        return {
            id: data.insertId,
            jobs_id: jobId,
            applicant_id: userId,
            recruiter_id: recId
        }

    }
}