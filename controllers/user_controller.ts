import { NextFunction, Request, Response, response } from 'express';
import { AppRegist, RecRegist, UserLogin } from '../models/user';
import { UserService } from '../service/user-service';

export class UserController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try{
            const Request: UserLogin = req.body as UserLogin;
            const response = await UserService.login(Request);
            res.status(200).send(response);
        }catch(error){
            next(error)
        }
    }

    static async registerApplicants(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AppRegist = req.body as AppRegist;
            const response = await UserService.registerApplicant(request); 
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }

    static async registerRecruiters(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RecRegist = req.body as RecRegist;
            const response = await UserService.registerRecruiter(request);
            res.status(200).send(response);
        } catch (error) {
            next(error)
        }
    }
}