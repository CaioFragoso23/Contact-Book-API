import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nome do Contato',
    type: String,
    default: 'Bela',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do Contato',
    type: String,
    default: 'bela@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do Contato',
    type: String,
    default: '21900000001',
  })
  @IsString()
  @IsPhoneNumber('BR')
  phone: string;
}
