import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('create')
  async getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    const address: Address = JSON.parse(data);
    const created = await this.addressService.createAddress(address);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (created) {
      channel.ack(originalMsg);
    }

    channel.nack(originalMsg);
  }
}
