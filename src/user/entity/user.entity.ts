import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { Role, STATUS } from 'src/enums/status.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  public createdAt: Date

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  public updatedAt: Date

  @Column({ nullable: false })
  userName: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: string;

  @Column({ type: 'text', default: STATUS.ACTIVE })
  status: STATUS

  @Column({ nullable: true })
  public refreshToken: string
}