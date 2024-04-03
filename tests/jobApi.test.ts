import { JobService } from "../service/jobs-service";


describe('JobService', () => {

    it('should return a list of jobs', async () => {
        const jobs = await JobService.getAll();
        expect(jobs.length).toBeGreaterThan(0);
    });
});