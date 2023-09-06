import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { STATUS } from 'src/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CityCapital {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  public createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  public updatedAt: Date;

  @Column({ nullable: false })
  public cityName: string;

  @Column({ nullable: false })
  public lat: string;

  @Column({ nullable: false })
  public lng: string;

  @Column({ nullable: false })
  public url: string;

  @Column({ nullable: true })
  public imageUrl: string;

  @Column({ type: 'text', default: STATUS.ACTIVE })
  public status: STATUS;
}
