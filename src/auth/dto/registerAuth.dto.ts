import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator"
import { LoginAuthDTO } from "./loginAuth.dto"


export class RegisterAuthDTO extends PartialType(LoginAuthDTO){
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    @ApiProperty({example: 'AriUX'})
    username: string

    @Length(6, 40)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Ariadna'})
    name: string


    @Length(6, 20)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'wiorn3wd'})
    password: string
}