import { UUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  path: string;

  @Column({ type: 'text', default: '' })
  meta: string;

  @Column({ default: false })
  isDirectory: boolean;

  @Column({ default: 0 })
  size: number;

  @CreateDateColumn({ update: true })
  lastIndexedAt: Date;

  @Column({
    unique: true,
    nullable: true,
    comment: 'UUID of a generated resource for image, video and other',
    type: 'uuid',
  })
  resourceKey?: UUID;

  @Column()
  isSymLink: boolean;
}
