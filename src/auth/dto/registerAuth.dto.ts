import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator"
import { LoginAuthDTO } from "./loginAuth.dto"


export class RegisterAuthDTO extends PartialType(LoginAuthDTO){
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    @ApiProperty({example: 'arturoinscreuo'})
    username: string

    @Length(6, 40)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Jose Hernandez'})
    name: string


    @Length(6, 20)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '23124dfj'})
    password: string
}