import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('/notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    console.log(category);

    const notification = await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        category,
        content,
        recipientId,
      },
    });

    return notification;
  }
}
