import { BaseColumn } from 'src/core/entity/base';
import { User } from 'src/user/entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notifications extends BaseColumn {
  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @ManyToOne(() => User, (user) => user.notification)
  user: User;
}
