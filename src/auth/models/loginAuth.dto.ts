import { MaxLength, MinLength } from "class-validator";



export class LoginAuthDTO{
    @MaxLength(18)
    username: string;

    @MinLength(4)
    @MaxLength(18)
    password: string;
}