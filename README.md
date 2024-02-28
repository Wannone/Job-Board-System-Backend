# Job Board Backend System
------
### **create using** :
- Typescript 
- Express JS 
- mysql2 for database client
- JsonWebToken for Authorization

### ERD
![ERD](https://i.imgur.com/zeIjfjg.png)

### Summary
There are 2 types of user (applicants, recruiter), all the API Endpoint need Authorization(JWT - Bearer Token) except Login and Register API. We only can get the Token after Login. The Token contain data {id, username, role}.

Only recruiter can Create, update and delete jobs, and he only can update and delete jobs he had made.applicant can only read and apply jobs, recruiter can read a list of apply_jobs based on job he had made.
