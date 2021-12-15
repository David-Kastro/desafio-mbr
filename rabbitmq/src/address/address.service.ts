import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

export interface AddressResult {
  status: boolean;
  msg: string;
}

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(data: Address): Promise<boolean> {
    try {
      const address = new Address();

      address.email = data.email;
      address.name = data.name;
      address.phone = data.phone;
      address.cep = data.cep;
      address.address = data.address;
      address.number = data.number;
      address.additionalInfo = data.additionalInfo;
      address.neighborhood = data.neighborhood;
      address.city = data.city;
      address.state = data.state;

      const finded = await this.addressRepository.find({ email: data.email });

      if (finded) {
        await this.addressRepository.update({ email: data.email }, address);
        return true;
      }

      await this.addressRepository.save(address);
      return true;
    } catch (e) {
      return false;
    }
  }
}
