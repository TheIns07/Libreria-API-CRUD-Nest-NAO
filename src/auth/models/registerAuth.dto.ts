import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { LoginAuthDTO } from "./loginAuth.dto";

export class RegisterAuthDTO extends PartialType(LoginAuthDTO){
    @IsNotEmpty()
    username: string;
}