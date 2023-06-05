import { randomUUID } from 'node:crypto';
import { Exclude } from 'class-transformer';
import { Contact } from 'src/modules/contacts/entities/contact.entity';

export class User {
  readonly id: string;
  name: string;
  email: string;
  phone: string;
  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
