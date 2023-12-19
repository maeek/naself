import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      process.env.SALT_ROUNDS || 10,
    );
  }

  @Column()
  locale: string;

  @CreateDateColumn({ update: false })
  createdAt: number;

  @Column({ nullable: true })
  home?: string;

  @Column({ type: 'json' })
  scope: string;
}
