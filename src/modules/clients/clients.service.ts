import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateClientDto,
  UpdateClientDto,
  ClientQueryDto,
} from "./dto/client.dto";
import { Client } from "./clients.schema";
import {
  ClientErrorMessages,
  ClientSuccessMessages,
} from "src/constants/api-response/client.response";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.clientModel.findOne({
      companyName: createClientDto.companyName,
    });

    if (existingClient) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        ClientErrorMessages.ALREADY_EXISTS
      );
    }

    const payload: any = {
      ...createClientDto,
      contacts: createClientDto.contacts || [],
    };

    const client = await this.clientModel.create(payload);

    return SerializeHttpResponse(
      client,
      HttpStatus.CREATED,
      ClientSuccessMessages.CREATED
    );
  }

  async findAll(queryDto: ClientQueryDto = {}) {
    const { country, city, page = 1, limit = 10, search } = queryDto;

    const filter: any = {};

    if (country) filter.country = { $regex: country, $options: "i" };
    if (city) filter.city = { $regex: city, $options: "i" };

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { cifNit: { $regex: search, $options: "i" } },
        { vat: { $regex: search, $options: "i" } },
        { website: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
        { "contacts.fullName": { $regex: search, $options: "i" } },
        { "contacts.email": { $regex: search, $options: "i" } },
        { "contacts.phone": { $regex: search, $options: "i" } },
        { "contacts.position": { $regex: search, $options: "i" } },
        { "contacts.notes": { $regex: search, $options: "i" } },
        { "contacts.linkedInUrl": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [clients, total] = await Promise.all([
      this.clientModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.clientModel.countDocuments(filter),
    ]);

    const result = {
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

    return SerializeHttpResponse(
      result,
      HttpStatus.OK,
      ClientSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id);

    if (!client) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ClientErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      client,
      HttpStatus.OK,
      ClientSuccessMessages.RETRIEVED
    );
  }

  async findByCifNit(cifNit: string) {
    const client = await this.clientModel.findOne({
      cifNit: cifNit,
    });

    if (!client) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ClientErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      client,
      HttpStatus.OK,
      ClientSuccessMessages.RETRIEVED
    );
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findById(id);

    if (!client) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ClientErrorMessages.NOT_FOUND
      );
    }

    // Check if company name is being updated and if it already exists
    if (updateClientDto.companyName !== client.companyName) {
      const existingClient = await this.clientModel.findOne({
        companyName: updateClientDto.companyName,
        _id: { $ne: id },
      });

      if (existingClient) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          ClientErrorMessages.ALREADY_EXISTS
        );
      }
    }

    const payload: any = { ...updateClientDto };

    const updatedClient = await this.clientModel.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );

    return SerializeHttpResponse(
      updatedClient,
      HttpStatus.OK,
      ClientSuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const client = await this.clientModel.findById(id);

    if (!client) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ClientErrorMessages.NOT_FOUND
      );
    }

    await this.clientModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      ClientSuccessMessages.DELETED
    );
  }
}
