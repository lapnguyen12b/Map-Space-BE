import { BaseColumn } from 'src/core/entity/base';
import { User } from 'src/user/entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Reviews extends BaseColumn {
  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true, default: 0 })
  public rating: number;

  @Column({ nullable: true, default: '' })
  public comment: string;

  @ManyToOne(() => User, (user) => user.userReview, { nullable: false })
  public user: User;

  @ManyToOne(() => User, (doctor) => doctor.doctorReview, { nullable: true })
  public doctor: User;

  @ManyToOne(() => User, (medical) => medical.medicalReview, { nullable: true })
  public medical: User;
}
