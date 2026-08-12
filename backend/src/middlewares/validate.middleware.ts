import type { Request, Response, NextFunction } from "express"
import z from "zod";

export const validateSchema = (schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const parsed = await schema.parseAsync({ body: req.body });
        req.body = parsed.body;
        return next();
    } catch (error) {
        console.log(error)
        if (error.errors) {
            return res.status(400).json({
                status: "fail",
                errors: error
            })
        } else {
            //The expression error instanceof z.ZodError is a type-guard check used to determine if a caught error was specifically caused by a Zod schema validation failure
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    status: "fail",
                    errors: error.issues,
                });
            }

            return res.status(500).json({
                status: "error",
                message: "Something went wrong",
            });
        
    }

}
}

