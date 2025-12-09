import { ClientsService } from "./clients.service";
import { CreateClientDto, UpdateClientDto, ClientQueryDto } from "./dto/client.dto";
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./clients.schema").Client> & import("./clients.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(queryDto: ClientQueryDto): Promise<import("../../utils/serializer").Serialized<{
        clients: (import("mongoose").Document<unknown, {}, import("./clients.schema").Client> & import("./clients.schema").Client & {
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
    }, import("@nestjs/common").HttpStatus.OK>>;
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./clients.schema").Client> & import("./clients.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    findByCifNit(cifNit: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./clients.schema").Client> & import("./clients.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./clients.schema").Client> & import("./clients.schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}
