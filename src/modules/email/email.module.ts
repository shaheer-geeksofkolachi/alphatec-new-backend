import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailService } from './email.service';
import { SESMailService } from './ses-email.service';

@Module({
  providers: [EmailService, SESMailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
