import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddressResult, AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('list')
  async list(@Query() query) {
    return this.addressService.list(query);
  }

  @Post('create')
  async emitCreateEvent(@Body() data): Promise<AddressResult> {
    return this.addressService.emitCreateEvent(data);
  }

  @MessagePattern('create')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(data);
    console.log(`Pattern: ${context.getPattern()}`);
  }
}
