import { BaseColumn } from 'src/core/entity/base';
import { ROLE, STATUS } from 'src/enums/status.enum';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseColumn {
  @Column({ nullable: false })
  public userName: string;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public phone: string;

  @Column({ nullable: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  public role: string;

  @Column({ nullable: false, default: false })
  public isSendEmailWelcome: boolean;

  @Column({ type: 'text', default: STATUS.ACTIVE })
  public status: STATUS;

  @Column({ nullable: true })
  public refreshToken: string;
}
