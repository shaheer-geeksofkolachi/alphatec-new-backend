import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  UserSuccessMessages,
  UserErrorMessages,
} from "src/constants/api-response/user.response";
import { User } from "./user.schema";
import { Injectable, HttpStatus } from "@nestjs/common";
import {
  createHashPassword,
  comparePassword,
  generatePassword,
} from "src/utils/auth.util";
import { SerializeHttpResponse } from "src/utils/serializer";
import { CreateUserDto, UpdateUserDto, ChangeEmailDto } from "./dto/user.dto";
import { USER_STATUS } from "src/constants/user.constant";
import { MediaService } from "../media/media.service";
import { FOLDER_NAME } from "src/constants/media.constant";
import { SESMailService } from "../email/ses-email.service";
import { ITemplates } from "src/types/templates.type";
import { EmailService } from "../email/email.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mediaService: MediaService,
    private readonly sesEmailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email.toLowerCase(),
    });

    if (existingUser) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        UserErrorMessages.ALREADY_EXISTS
      );
    }

    const password = generatePassword();
    const hashedPassword = await createHashPassword(password);
    const payload: any = {
      ...createUserDto,
      password: hashedPassword,
      status: USER_STATUS.ACTIVE,
    };

    if (createUserDto.organization) {
      payload.organization = new Types.ObjectId(createUserDto.organization);
    }

    if (file) {
      const folder = `${FOLDER_NAME.PROFILE}/${createUserDto.email}`;
      const resp = await this.mediaService.uploadFile(folder, file);
      payload.avatar = resp?.url || "";
    }

    const user = await this.userModel.create(payload);
    await user.populate("organization");

    const emailPayload = {
      email: user.email,
      invitedUserName: user.name,
      password: password,
      userRole: user.role,
    };

    await this.sendOnBoardingEmail(emailPayload);

    return SerializeHttpResponse(
      user,
      HttpStatus.CREATED,
      UserSuccessMessages.CREATED
    );
  }

  async sendOnBoardingEmail(payload: {
    email: string;
    invitedUserName: string;
    password: string;
  }) {
    const template = await this.sesEmailService.loadTemplate(
      ITemplates.NEW_USER,
      payload
    );

    const subject = 'Welcome to "Platform Name"';
    await this.sesEmailService.sendEmail({
      to: payload.email,
      subject: subject,
      html: template,
    });
  }

  async findAll() {
    const users = await this.userModel.find().select("-password");
    return SerializeHttpResponse(
      users,
      HttpStatus.OK,
      UserSuccessMessages.RETRIEVED_ALL
    );
  }

  async findAllUsers(organizationId: string) {
    const users = await this.userModel
      .find({ organization: new Types.ObjectId(organizationId) })
      .select("-password");

    return SerializeHttpResponse(
      users,
      HttpStatus.OK,
      UserSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select("-password");

    if (!user) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        UserErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      user,
      HttpStatus.OK,
      UserSuccessMessages.RETRIEVED
    );
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File
  ) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        UserErrorMessages.NOT_FOUND
      );
    }

    const payload: any = { ...updateUserDto };

    if (updateUserDto.password) {
      payload.password = await createHashPassword(updateUserDto.password);
    }

    if (file) {
      const folder = `${FOLDER_NAME.PROFILE}/${user.email}`;
      const resp = await this.mediaService.uploadFile(folder, file);
      payload.avatar = resp?.url || "";
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .select("-password");

    return SerializeHttpResponse(
      updatedUser,
      HttpStatus.OK,
      UserSuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        UserErrorMessages.NOT_FOUND
      );
    }

    await this.userModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      UserSuccessMessages.DELETED
    );
  }

  async changeEmail(userId: string, changeEmailDto: ChangeEmailDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        UserErrorMessages.NOT_FOUND
      );
    }

    const isPasswordValid = await comparePassword(
      changeEmailDto.password,
      user.password
    );

    if (!isPasswordValid) {
      return SerializeHttpResponse(
        null,
        HttpStatus.UNAUTHORIZED,
        UserErrorMessages.INVALID_PASSWORD
      );
    }

    const existingUser = await this.userModel.findOne({
      email: changeEmailDto.email.toLowerCase(),
    });

    if (existingUser) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        UserErrorMessages.ALREADY_EXISTS
      );
    }

    user.email = changeEmailDto.email.toLowerCase();
    user.emailVerified = false;
    await user.save();

    return SerializeHttpResponse(
      user,
      HttpStatus.OK,
      UserSuccessMessages.EMAIL_UPDATED
    );
  }
}
