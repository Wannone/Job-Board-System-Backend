import { Job } from "./job";

export type Apply = {
    id: number;
    jobs_id: number;
    applicant_id: number;
    recruiter_id: number;
}

export type ShowApply = {
    id : number;
    job : Job;
    applicant : string;
    recruiter : string;
    date : string;
}