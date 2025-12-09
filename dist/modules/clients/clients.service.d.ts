import { Model } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateClientDto, UpdateClientDto, ClientQueryDto } from "./dto/client.dto";
import { Client } from "./clients.schema";
export declare class ClientsService {
    private readonly clientModel;
    constructor(clientModel: Model<Client>);
    create(createClientDto: CreateClientDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Client> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: ClientQueryDto): Promise<import("src/utils/serializer").Serialized<{
        clients: (import("mongoose").Document<unknown, {}, Client> & Client & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }, HttpStatus.OK>>;
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Client> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    findByCifNit(cifNit: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Client> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Client> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}
