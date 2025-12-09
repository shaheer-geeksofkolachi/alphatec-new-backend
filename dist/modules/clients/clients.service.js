"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const clients_schema_1 = require("./clients.schema");
const client_response_1 = require("../../constants/api-response/client.response");
let ClientsService = class ClientsService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async create(createClientDto) {
        const existingClient = await this.clientModel.findOne({
            companyName: createClientDto.companyName,
        });
        if (existingClient) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, client_response_1.ClientErrorMessages.ALREADY_EXISTS);
        }
        const payload = {
            ...createClientDto,
            contacts: createClientDto.contacts || [],
        };
        const client = await this.clientModel.create(payload);
        return (0, serializer_1.SerializeHttpResponse)(client, common_1.HttpStatus.CREATED, client_response_1.ClientSuccessMessages.CREATED);
    }
    async findAll(queryDto = {}) {
        const { country, city, page = 1, limit = 10, search } = queryDto;
        const filter = {};
        if (country)
            filter.country = { $regex: country, $options: "i" };
        if (city)
            filter.city = { $regex: city, $options: "i" };
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
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, client_response_1.ClientSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const client = await this.clientModel.findById(id);
        if (!client) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, client_response_1.ClientErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(client, common_1.HttpStatus.OK, client_response_1.ClientSuccessMessages.RETRIEVED);
    }
    async findByCifNit(cifNit) {
        const client = await this.clientModel.findOne({
            cifNit: cifNit,
        });
        if (!client) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, client_response_1.ClientErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(client, common_1.HttpStatus.OK, client_response_1.ClientSuccessMessages.RETRIEVED);
    }
    async update(id, updateClientDto) {
        const client = await this.clientModel.findById(id);
        if (!client) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, client_response_1.ClientErrorMessages.NOT_FOUND);
        }
        if (updateClientDto.companyName !== client.companyName) {
            const existingClient = await this.clientModel.findOne({
                companyName: updateClientDto.companyName,
                _id: { $ne: id },
            });
            if (existingClient) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, client_response_1.ClientErrorMessages.ALREADY_EXISTS);
            }
        }
        const payload = { ...updateClientDto };
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, payload, { new: true });
        return (0, serializer_1.SerializeHttpResponse)(updatedClient, common_1.HttpStatus.OK, client_response_1.ClientSuccessMessages.UPDATED);
    }
    async remove(id) {
        const client = await this.clientModel.findById(id);
        if (!client) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, client_response_1.ClientErrorMessages.NOT_FOUND);
        }
        await this.clientModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, client_response_1.ClientSuccessMessages.DELETED);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ClientsService);
//# sourceMappingURL=clients.service.js.map