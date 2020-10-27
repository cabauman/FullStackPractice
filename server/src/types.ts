import { Request, Response } from "express";
///import { Redis } from "redis";

export type MyContext = {
    req: Request & { session: Express.Session };
    //redis: Redis;
    res: Response;
};