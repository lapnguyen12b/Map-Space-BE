import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const TIMESTAMP_TYPE = 'timestamp without time zone';

export abstract class BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  public createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  public updatedAt: Date;

  @Column({ type: TIMESTAMP_TYPE, nullable: true })
  @DeleteDateColumn({ type: TIMESTAMP_TYPE })
  public deletedAt: Date;
}
