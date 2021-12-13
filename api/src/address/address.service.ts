import { Injectable, Inject } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Address } from './address.entity';
import { ClientProxy } from '@nestjs/microservices';

export interface AddressResult<T = Record<any, any>> {
  status: boolean;
  msg: string;
  data?: T;
}

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('ADDRESS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async list(query): Promise<AddressResult> {
    try {
      const pageSize = query.pageSize || 25;
      const orderBy = query.orderBy || 'id';
      const order = query.order || 'ASC';
      const page = query.page || 1;
      const keyword = query.keyword;

      if (keyword) {
        const [list, total] = await this.addressRepository.findAndCount({
          where: { name: Like('%' + keyword + '%') },
          order: { [orderBy]: order },
          take: pageSize,
          skip: (page - 1) * pageSize,
        });

        return {
          status: true,
          msg: 'Resultados encontrados!',
          data: {
            list,
            total,
          },
        };
      }

      const [list, total] = await this.addressRepository.findAndCount({
        order: { [orderBy]: order },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });

      return {
        status: true,
        msg: 'Resultados encontrados!',
        data: {
          list,
          total,
        },
      };
    } catch (e) {
      return {
        status: false,
        msg: 'Não foi possível realizar a busca!',
      };
    }
  }

  emitCreateEvent(data: Address): AddressResult {
    try {
      // this.validateAddressData(data);
      this.client.emit('create', JSON.stringify(data));
      return {
        status: true,
        msg: 'Informações enviadas com sucesso!',
      };
    } catch (e) {
      return {
        status: false,
        msg: 'Não foi possível enviar as informações.',
      };
    }
  }
}
