import type { Request, Response } from "express";

interface User {
    name: string;
    username: string;
    age: number;
    address: string;
}

const userData = (req: Request, res: Response) => {
    try {
        const obj: User = {
            name:"Adarsh",
            username: "Adarsh Gupta",
            age: 20,
            address: "pandesara"
        }
        
        res.json(obj)
    } catch (error) {
        console.log(error)
    }
}

const userPosted = async (req: Request, res: Response) => {
   try {
    res.send(req.body)
   } catch (error) {
    // console.log(error)
   }
}


export {
    userData,
    userPosted
}
