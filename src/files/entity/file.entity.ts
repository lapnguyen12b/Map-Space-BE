import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn({ type: 'varchar' })
  path: string;

  url?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  key?: string;

  @Column({ nullable: true })
  thumbnails?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt?: Date;
  constructor(data?: RequiredFields<File, 'path'>) {
    if (data) {
      this.path = data.path;
      this.url = data.url;
      this.type = data.type;
      this.thumbnails = data.thumbnails;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }
}
