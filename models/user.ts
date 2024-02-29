export type UserLogin = {
    username: string;
    password: string;
}

export type UserData = {
    id: number;
    username: string;
    role: string;
}

export type RecRegist = {
    name: string;
    company: string;
    username: string;
    email: string;
    password: string;
}

export type AppRegist = {
    name: string;
    username: string;
    email: string;
    password: string;
}

export type UserAuth = {
    data: UserData;
    token: string;
}