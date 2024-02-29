import { NextFunction, Request, Response } from 'express';
import { JobService } from '../service/jobs-service';
import { JobData } from '../models/job';

export class JobsController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await JobService.getAll();
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await JobService.getById(Number(req.params.id));
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const search = req.query.search
            const response = await JobService.search(search as string);
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request : JobData = {
                title: req.body.title,
                description: req.body.description,
                requirement: req.body.requirement,
                company: req.body.company,
                location: req.body.location,
                rec_id: req.user.id
            }
            const response = await JobService.create(request);
            res.status(200).send({ message: "Job created successfully", data: response });
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request : JobData = {
                title: req.body.title,
                description: req.body.description,
                requirement: req.body.requirement,
                company: req.body.company,
                location: req.body.location,
                rec_id: req.user.id
            }
            const response = await JobService.update(request, Number(req.params.id));
            res.status(200).send({ message: "Job updated successfully", data: response });
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await JobService.delete(Number(req.params.id), req.user.id);
            res.status(200).send({ message: "Job deleted successfully", data: response });
        } catch (error) {
            next(error)
        }
    }
}