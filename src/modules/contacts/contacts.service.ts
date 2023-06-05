import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  create(createContactDto: CreateContactDto, userId: string) {
    return this.contactsRepository.create(createContactDto, userId);
  }

  findAll() {
    return this.contactsRepository.findAll();
  }

  findOne(id: string) {
    const findContact = this.contactsRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contact not found');
    }
    return findContact;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    const findContact = this.contactsRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contact not found');
    }
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: string) {
    const findContact = this.contactsRepository.findOne(id);
    if (!findContact) {
      throw new NotFoundException('Contact not found');
    }
    return this.contactsRepository.delete(id);
  }
}
