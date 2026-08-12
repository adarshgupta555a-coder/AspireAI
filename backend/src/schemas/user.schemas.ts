import {z} from "zod";

export const usersValidSchema = z.object({
    body: z.object({
    username: z.string().min(6,"Please fill minimum 6 characters"),
    email: z.string().email("Please fill valid email"),
    password: z.string().regex(/[0-9]/,"please fill numbers").regex(/[A-Z]/,"please fill numbers"),
    profession: z.string()

    })
})

// export type usersSchema = z.infer<typeof usersValidSchema>;
