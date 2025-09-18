// src/core/applications/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '../../core/applications/notification/send-notification.usecase';
import { EmailNotificationSender } from '../../core/applications/notification/email-notification.sender';
import { NotificationSender } from '../../core/applications/notification/interfaces/notification-sender.interface';

@Module({
    providers: [
        SendNotificationUseCase,
        { provide: NotificationSender, useClass: EmailNotificationSender },
    ],
    exports: [SendNotificationUseCase],
})
export class NotificationModule { }
