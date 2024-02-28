import pool from '../../services/database';

function ApplyJobs() {
    return async (req: any, res: any) => {
        try {
            const jobId = req.params.id;
            const userId = req.user.id;

            const [job] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
            if (!job || (job as any).length === 0) {
                return res.status(404).send({ message: 'Job not found' });
            }
            const recId = (job as any)[0].rec_id;

            if (recId == null) {
                return res.status(404).send({ message: 'Recruiter ID not found for the job' });
            }

            await pool.query(
                'INSERT INTO apply_jobs (jobs_id, applicant_id, recruiter_id) VALUES (?, ?, ?)',
                [jobId, userId, recId]
            );

            return res.status(200).send({ message: 'Job applied successfully' });
        } catch (error) {
            console.error('Error applying for job:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    };
}

export default ApplyJobs;
