import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { Role, STATUS } from 'src/enums/status.enum';
import { Room } from 'src/room/entity';
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
  public userName: string

  @Column({ nullable: false })
  public email: string
  
  @Column({ nullable: false })
  public phone: string

  @Column({ nullable: false })
  public password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: string;
  
  @Column({ nullable: false })
  public isSendEmailWelcome: boolean

  @Column({ type: 'text', default: STATUS.ACTIVE })
  public status: STATUS

  @Column({ nullable: true })
  public refreshToken: string

  @OneToMany(() => Room, (room) => room.user)
  public room: Room;
}