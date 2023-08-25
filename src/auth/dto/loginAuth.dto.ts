import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";


export class LoginAuthDTO{
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    @ApiProperty({example: 'Ariadna'})
    username: string

    @Length(6, 20)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'wiorn3wd'})
    password: string

}