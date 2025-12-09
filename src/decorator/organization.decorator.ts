import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetOrganizationId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const organizationId = request.organizationId as string;

    return organizationId;
  }
);
