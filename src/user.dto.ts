// src/users/dto/create-user.dto.ts
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

// src/users/dto/create-user.dto.ts
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  age: number;
}

export interface SetUserDto {
  firstName?: string;
  lastName?: string;
  age?: number;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  age?: number;
}

export class CreateUserDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsInt() @IsPositive() age: number;
}

export class SetUserDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  firstName?: string;
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  lastName?: string;
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  age?: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  firstName?: string;
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  lastName?: string;
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number;
}
