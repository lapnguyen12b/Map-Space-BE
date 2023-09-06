import { STATUS } from 'src/enums/status.enum';
import { Room } from 'src/room/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public url: string;

  @Column({ type: 'text', default: STATUS.ACTIVE })
  public status: STATUS;

  @ManyToOne(() => Room, (room) => room.images, {
    cascade: true,
  })
  public room: Room;
}
