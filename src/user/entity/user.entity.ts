import { BaseColumn } from 'src/core/entity/base';
import { ROLE, STATUS } from 'src/enums/status.enum';
import { Profile } from 'src/profile/entity';
import { Reviews } from 'src/reviews/entity/reviews.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

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

  @OneToOne(() => Profile, (profile) => profile.user, { nullable: false })
  @JoinColumn()
  public userProfile: Profile;

  @OneToMany(() => Reviews, (userReview) => userReview.user, {
    onDelete: 'CASCADE',
  })
  public userReview: Reviews[];

  @OneToMany(() => Reviews, (doctorReview) => doctorReview.user, {
    onDelete: 'CASCADE',
  })
  public doctorReview: Reviews[];

  @OneToMany(() => Reviews, (medicalReview) => medicalReview.user, {
    onDelete: 'CASCADE',
  })
  public medicalReview: Reviews[];
}
