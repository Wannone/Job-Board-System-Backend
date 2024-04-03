import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../utils/database";
import { Apply, ShowApply } from "../models/apply";

export class ApplyService {
    static async get(userId: number, role: string){
        let query = `
        SELECT
            apply_jobs.*,
            jobs.title AS title,
            jobs.company AS company,
            jobs.location AS location,
            jobs.description AS description,
            jobs.requirement AS requirement,
            jobs.rec_id AS rec_id,
            applicants.full_name AS applicant,
            recruiters.full_name AS recruiter
        FROM apply_jobs
        JOIN jobs ON jobs.id = apply_jobs.jobs_id
        JOIN applicants ON applicants.id = apply_jobs.applicant_id
        JOIN recruiters ON recruiters.id = apply_jobs.recruiter_id
        WHERE 
        `;
        if (role === 'recruiter') {
            query += "recruiter_id = ?";
        } else {
            query += "applicant_id = ?";
        }
        const [apply] = await pool.query<RowDataPacket[]>(query, userId);
        if (!apply || apply.length === 0) {
            throw new Error('No data found');
        }
        
        const data : ShowApply[] = apply.map((item) => ({
            id: item.id,
            job: {
                id: item.jobs_id,
                title: item.title,
                company: item.company,
                location: item.location,
                description: item.description,
                requirement: item.requirement,
                rec_id: item.rec_id
            },
            applicant: item.applicant,
            recruiter: item.recruiter,
            date: item.created_at
        }));
        return data
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

    static async delete(id: number, applicantId: number) : Promise<string>{
        const [data] = await pool.query<RowDataPacket[]>('SELECT * FROM apply_jobs WHERE id = ?', [id]);
        if (data[0].applicant_id === applicantId) {
            await pool.query<ResultSetHeader>('DELETE FROM apply_jobs WHERE id = ?', [id]);
            return 'Data deleted successfully';
        } else {
            throw new Error('You are not authorized to delete this data');
        }
    }
}