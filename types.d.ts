declare namespace Express {
    export interface Request {
        user: {
            id: number;
            role: string;
        }
    }
    export interface Response {
        user: {
            id: number;
            role: string;
        }
    }
  }