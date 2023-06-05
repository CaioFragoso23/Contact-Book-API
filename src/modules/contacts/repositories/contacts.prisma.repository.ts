import { PrismaService } from 'src/database/prisma.service';
import { ContactsRepository } from './contacts.repository';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, userId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
    });
    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        email: contact.email,
        name: contact.name,
        phone: contact.phone,
        userId,
      },
    });
    return newContact;
  }

  async findAll(): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany();
    return plainToInstance(Contact, contacts);
  }
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return plainToInstance(Contact, contact);
  }
  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Contact, contact);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
