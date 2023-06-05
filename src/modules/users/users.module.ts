import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
// import { UsersInMemoryRepository } from './repositories/users.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
