import { Request, Response, NextFunction } from 'express';

interface IThenCatch {
    then: (data) => IThenCatch;
    catch: (error) => IThenCatch;
}

export const commonDBqueryHandler = (req: Request, res: Response, next: NextFunction, q: IThenCatch) => {
    q.then(data => {
        res.status(200).json(data);
    }).catch((error: Error) => {
        res.status(500).json({
            error: error.message,
            // errorStack: error.stack
        });
        next(error);
    });
};
