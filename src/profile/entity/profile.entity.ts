import { Categories } from 'src/categories/entity';
import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { BaseColumn } from 'src/core/entity/base';
import { DOCTORSTATUS, GENDER } from 'src/enums/status.enum';
import { User } from 'src/user/entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Profile extends BaseColumn {
  @Column({
    type: 'enum',
    enum: GENDER,
    default: GENDER.MALE,
  })
  public gender: GENDER;

  @Column({ type: TIMESTAMP_TYPE, default: null })
  public dob: Date;

  @Column({ nullable: true })
  public avatar: string;

  @Column({
    type: 'enum',
    enum: DOCTORSTATUS,
    default: DOCTORSTATUS.PENDING,
  })
  public statusDoctor: string;

  @Column({ nullable: false, default: 0 })
  public patientNumber?: number;

  @Column({ nullable: false, default: 0 })
  public experientNumber?: number;

  @Column({ nullable: false, default: 0 })
  public rating?: number;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public workingTime: string;

  @Column({ nullable: true })
  public address: string;

  //medical
  @Column({ nullable: true })
  public backgroundImage: string;

  @OneToOne(() => User, (user) => user.userProfile)
  public user: User;

  @ManyToOne(() => Categories, (categories) => categories.profile)
  public categories: Categories;
}
