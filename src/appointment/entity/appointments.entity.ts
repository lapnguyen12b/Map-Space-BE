import { TIMESTAMP_TYPE } from 'src/constants/constant';
import { BaseColumn } from 'src/core/entity/base';
import { AppointmentStatus } from 'src/enums/status.enum';
import { User } from 'src/user/entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Appointments extends BaseColumn {
  @Column({ type: TIMESTAMP_TYPE, nullable: true })
  public createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  timeSlot: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.pending,
  })
  status: AppointmentStatus;

  @ManyToOne(() => User, (user: User) => user.userAppointments)
  user: User;

  @ManyToOne(() => User, (doctor: User) => doctor.doctorAppointments)
  doctor: User;

  @ManyToOne(() => User, (medical: User) => medical.medicalAppointments)
  medical: User;
}
