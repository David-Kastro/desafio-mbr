import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, unique: true })
  email: string;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 100 })
  cep: string;

  @Column({ length: 500 })
  address: string;

  @Column({ length: 500 })
  number: string;

  @Column({ length: 500, nullable: true })
  additionalInfo: string;

  @Column({ length: 500 })
  neighborhood: string;

  @Column({ length: 500 })
  city: string;

  @Column({ length: 500 })
  state: string;
}
