import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AddressController } from './address.controller';
import { addressProviders } from './address.providers';
import { AddressService } from './address.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'ADDRESS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmqsrv:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AddressController],
  providers: [...addressProviders, AddressService],
})
export class AddressModule {}
