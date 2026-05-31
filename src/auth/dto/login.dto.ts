import { IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}