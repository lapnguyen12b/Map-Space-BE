import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { SERVICE_TYPE, STATUS } from 'src/enums/status.enum';
import { Images } from 'src/image/entity';
import { User } from 'src/user/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  public createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  public updatedAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  public expiryDate: Date;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: false })
  public pricePerMonth: number;

  @Column({ nullable: false })
  public pricePerYear: number;

  @Column({ nullable: false })
  public size: string;

  @Column({ nullable: false })
  public address: string;

  @Column({ nullable: false })
  public lat: string;

  @Column({ nullable: false })
  public lng: string;

  @Column({ type: 'text', default: STATUS.ACTIVE })
  public status: STATUS;

  @Column({ nullable: false, default: SERVICE_TYPE.LEASE })
  public service: SERVICE_TYPE;

  @Column()
  public numberOfProple: number;

  @Column()
  public peopleLook: number;

  @ManyToOne(() => User, (user) => user.room, {
    cascade: true,
  })
  public user: User;

  @OneToMany(() => Images, (images) => images.room)
  public images: Images[];
}
