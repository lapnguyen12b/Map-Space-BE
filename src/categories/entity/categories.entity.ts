import { BaseColumn } from 'src/core/entity/base';
import { STATUS } from 'src/enums/status.enum';
import { Profile } from 'src/profile/entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Categories extends BaseColumn {
  @Column({ nullable: true })
  public name: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  public status: STATUS;

  @Column({ nullable: true })
  public iconName: string;

  @OneToMany(() => Profile, (profile) => profile.categories, {
    onDelete: 'CASCADE',
  })
  public profile: Profile[];
}
