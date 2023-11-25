import { BaseColumn } from 'src/core/entity/base';
import { User } from 'src/user/entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Favorites extends BaseColumn {
  @ManyToOne(() => User, (user) => user.favorites)
  public user: User;

  @ManyToOne(() => User, (doctor) => doctor.doctorFavorites)
  public doctor: User;

  @ManyToOne(() => User, (medical) => medical.medicalFavorites)
  public medical: User;
}
