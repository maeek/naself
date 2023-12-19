import { UUID } from 'crypto';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  path: string;

  @Column()
  name: string;

  @Column({ default: false })
  isDirectory: boolean;

  @Column({ default: 0 })
  size: number;

  @Column({ default: 0 })
  createdAt: number;

  @Column({ default: 0 })
  modifiedAt: number;

  @CreateDateColumn({ update: true })
  lastIndexedAt: number;

  @Column({
    unique: true,
    nullable: true,
    comment: 'UUID of a generated resource for image, video and other',
    type: 'uuid',
  })
  resourceKey?: UUID;

  @ManyToOne(() => Node, (parent) => parent.children, { nullable: true })
  parent: Node;

  @OneToMany(() => Node, (child) => child.parent, { nullable: true })
  children: Node[];

  @Column({ default: 0 })
  depth: number;
}
