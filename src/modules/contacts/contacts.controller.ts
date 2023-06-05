import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  @Get('')
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
