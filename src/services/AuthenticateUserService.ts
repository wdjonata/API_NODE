import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
    
        const userRepositories = getCustomRepository(UsersRepositories);
    
        const user = await userRepositories.findOne({
            email,
        })
   
        if (!user) {
           throw new Error("Email/Password incorrect");
        }
   
        const passwordMatch = await compare(password, user.password);
   
        if (!passwordMatch) {
           throw new Error("Email/Password incorrect");
        }

        const token = sign(
            {
                email: user.email,
            },
            "17ea5dcb320fb63db33d9c132bab89ed",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        )

        return token
    }
}
    
export { AuthenticateUserService }