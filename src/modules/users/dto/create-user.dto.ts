import { ApiProperty } from '@nestjs/swagger/dist';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    default: 'Nala',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
    default: 'nala@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário (padrão brasileiro)',
    type: String,
    default: '21900000000',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
    default: 'senha123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;
}
