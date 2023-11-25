import { Appointments } from 'src/appointment/entity/appointments.entity';
import { BaseColumn } from 'src/core/entity/base';
import { ROLE, STATUS } from 'src/enums/status.enum';
import { Favorites } from 'src/favorites/entity/favorites.entity';
import { Notifications } from 'src/notifications/entity';
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

  @OneToMany(() => Notifications, (notification) => notification.user, {
    cascade: true,
  })
  notification: Notifications[];

  @OneToMany(() => Appointments, (appointments) => appointments.user, {
    onDelete: 'CASCADE',
  })
  public userAppointments: Appointments[];

  @OneToMany(() => Appointments, (appointments) => appointments.doctor, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public doctorAppointments: Appointments[];

  @OneToMany(() => Appointments, (appointments) => appointments.medical, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public medicalAppointments: Appointments[];

  @OneToMany(() => Favorites, (favorites) => favorites.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public favorites: Favorites[];

  @OneToMany(() => Favorites, (favorites) => favorites.doctor, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public doctorFavorites: Favorites[];

  @OneToMany(() => Favorites, (favorites) => favorites.medical, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  public medicalFavorites: Favorites[];
}
