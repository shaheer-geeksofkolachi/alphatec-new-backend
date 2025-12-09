import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { MediaService } from '../media/media.service';
import { CONFIG } from 'src/constants/config.constant';
import { User, UserSchema } from '../user/user.schema';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { OtpService } from 'src/modules/auth/otp.service';
import { SESMailService } from '../email/ses-email.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from 'src/modules/email/email.module';
import { Otp, OtpSchema } from 'src/modules/auth/otp.schema';
import { AuthController } from 'src/modules/auth/auth.controller';

const MODEL = [
  { name: User.name, schema: UserSchema },
  { name: Otp.name, schema: OtpSchema },
];

@Module({
  imports: [
    MongooseModule.forFeature(MODEL),
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(CONFIG.JWT_SECRET),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OtpService,
    UserService,
    JwtStrategy,
    SESMailService,
    MediaService,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
