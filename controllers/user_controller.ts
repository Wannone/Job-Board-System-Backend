import { NextFunction, Request, Response } from 'express';
import { AppRegist, RecRegist, UserLogin } from '../models/user';
import { UserService } from '../service/user-service';

export class UserController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try{
            const Request: UserLogin = req.body as UserLogin;
            const response = await UserService.login(Request);
            res.status(200).send({ message: "User logged in successfully", data: response});
        }catch(error){
            next(error)
        }
    }

    static async registerApplicants(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AppRegist = req.body as AppRegist;
            const response = await UserService.registerApplicant(request); 
            res.status(200).send({ message: "User registered successfully", data: response});
        } catch (error) {
            next(error)
        }
    }

    static async registerRecruiters(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RecRegist = req.body as RecRegist;
            const reponse = await UserService.registerRecruiter(request);
            res.status(200).send({ message: "User registered successfully", data: reponse});
        } catch (error) {
            next(error)
        }
    }
}