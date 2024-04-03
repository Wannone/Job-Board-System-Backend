import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Job, JobData } from "../models/job";
import pool from "../utils/database";

export class JobService {
    
    static async getAll(): Promise<Job[]> {
        const [job] = await pool.query<RowDataPacket[]>(`SELECT * FROM jobs`)
        if (job.length === 0) throw new Error("No job found");
        return job as Job[];
    }

    static async getById(request: number): Promise<Job> {
        const [job] = await pool.query<RowDataPacket[]>(`SELECT * FROM jobs WHERE id = ?`, [request])
        if (job.length === 0) throw new Error("No job found");
        return job[0] as Job;
    }

    static async getByRecId(request: number): Promise<Job[]> {
        const [job] = await pool.query<RowDataPacket[]>(`SELECT * FROM jobs WHERE rec_id = ?`, [request])
        if (job.length === 0) throw new Error("No job found");
        return job as Job[];
    }

    static async search(request: string): Promise<Job[]> {
        const [job] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM jobs WHERE title LIKE ? OR description LIKE ? OR requirement LIKE ? OR location LIKE ? OR company LIKE ?", 
            [`%${request}%`, `%${request}%`, `%${request}%`, `%${request}%`, `%${request}%`])
        return job as Job[];
    }

    static async create(request: JobData): Promise<Job> {
        const [job] = await pool.query<ResultSetHeader>(
            `INSERT INTO jobs 
        (title, description, requirement, company, location, rec_id)
        VALUES (?, ?, ?, ?, ?, ?)`,
            [request.title, request.description, request.requirement, request.company, request.location, request.rec_id]
        );
        return {
            id: job.insertId,
            title: request.title,
            description: request.description,
            requirement: request.requirement,
            company: request.company,
            location: request.location,
            rec_id: request.rec_id
        };
    }

    static async update(request: JobData, id: number): Promise<Job> {
        const [job] = await pool.query<RowDataPacket[]>(`SELECT rec_id FROM jobs WHERE id = ?`, [id]);
            if (job[0].rec_id === request.rec_id) {
                await pool.query(
                    `UPDATE jobs SET 
                        title = ?, description = ?, requirement = ?, company = ?, location = ?
                        WHERE id = ?`,
                    [request.title, request.description, request.requirement, request.company, request.location, id]
                );
                
                return {
                    id: id,
                    title: request.title,
                    description: request.description,
                    requirement: request.requirement,
                    company: request.company,
                    location: request.location,
                    rec_id: request.rec_id
                }
            } else {
                throw new Error("You are not authorized to update this job");
            }
    }

    static async delete(id: number, recId: number): Promise<Job> {
        const [data] = await pool.query<RowDataPacket[]>(`SELECT rec_id FROM jobs WHERE id = ?`, [id]);
            if (data[0].rec_id === recId) {
                await pool.query(`DELETE FROM apply_jobs WHERE jobs_id = ?`, [id]);
                await pool.query(`DELETE FROM jobs WHERE id = ?`, [id]);
                return {
                    id: id,
                    title: data[0].title,
                    description: data[0].description,
                    requirement: data[0].requirement,
                    company: data[0].company,
                    location: data[0].location,
                    rec_id: data[0].rec_id
                }
            } else {
                throw new Error("You are not authorized to delete this job");}
    }
}