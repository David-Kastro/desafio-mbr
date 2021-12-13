interface Address {
  email: string;
  name: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  additionalInfo: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface Result<T = Record<any, any>> {
  status: boolean;
  msg: string;
  data?: T;
}
