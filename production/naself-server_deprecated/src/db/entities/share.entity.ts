import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Node } from './node.entity';
import { User } from './user.entity';

@Entity()
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @CreateDateColumn({ update: true })
  modifiedAt: Date;

  @OneToOne(() => Node)
  @JoinColumn()
  node: Node;

  @Column({ default: false })
  public: boolean;

  @Column({ default: false })
  hideDownload: boolean;

  @Column({ default: false })
  passwordProtected: boolean;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: { read: true }, type: 'json' })
  access: {
    read?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({
    nullable: true,
    comment: 'Comma separated list of allowed IPs in CIDR notation',
  })
  allowedIps: string;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  users: User[];
}
