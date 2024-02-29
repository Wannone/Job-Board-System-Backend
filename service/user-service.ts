import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AppRegist, RecRegist, UserAuth, UserData, UserLogin } from "../models/user";
import pool from "../utils/database";
import HashPassword from "../utils/hash";
import generateAccessToken from '../utils/token';
import { ResponseError } from '../error/response-error';

export class UserService {
    static async registerApplicant(request: AppRegist) : Promise<UserData>{
        const password = HashPassword(request.password)
        const [check] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE username LIKE ? OR email LIKE ?",
            [`%${request.username}%`,`%${request.email}%`]
        );
        if(check.length !== 0) 
        {
            throw new ResponseError(400, "Username or email already exists");
        }
        const [user] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
            [request.username, request.email, password]);
        const userId = user.insertId;
        await pool.query(
            "INSERT INTO applicants (id, full_name) VALUES (?, ?)",
            [userId, request.name]
        );

        return {
            id: userId,
            username: request.username,
            role: "applicant"
        }
    }

    static async registerRecruiter(request: RecRegist) : Promise<UserData>{
        const password = HashPassword(request.password);
        const [check] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE username LIKE ? OR email LIKE ?",
            [`%${request.username}%`,`%${request.email}%`]
        );
        if(check.length !== 0) throw new ResponseError(400, "Username or email already exists");
        const [user] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", 
            [request.username, request.email, password, "recruiter"]);
        const userId = user.insertId;
        await pool.query(
            "INSERT INTO recruiters (id, full_name, company_name) VALUES (?, ?, ?   )",
            [userId, request.name, request.company]
        );

        return {
            id: userId,
            username: request.username,
            role: "recruiter"
        }
    }

    static async login(request: UserLogin) : Promise<UserAuth> 
    {
        if (!request || !request.username || !request.password) {
            throw new ResponseError(400, "Invalid request");
        }
        const [user] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE username LIKE ? OR email LIKE ?",
            [`%${request.username}%`,`%${request.username}%`]
        );
        if(user.length !== 0){
            const isValid = await bcrypt.compare(request.password, user[0].password);
            if(isValid){
                const { username, role, id } = user[0];
                const data = { username, role, id };
                const access = generateAccessToken(data);
                return { data, token: access };
            } 
        }
        throw new ResponseError(401, "Invalid username or password");
    }
    
}