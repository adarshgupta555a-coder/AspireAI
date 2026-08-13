import type { Request, Response, NextFunction } from "express"
import z from "zod";

export const validateSchema = (schema: z.ZodType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const parsed = await schema.parseAsync({ body: req.body });

        const data = parsed as {
            body: unknown
        }

        req.body = data.body;

        return next();
    } catch (error) {
        console.log(error.errors)

            //The expression error instanceof z.ZodError is a type-guard check used to determine if a caught error was specifically caused by a Zod schema validation failure
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    status: "fail",
                    errors: error.issues,
                });
            }

            return next(error)

}
}

