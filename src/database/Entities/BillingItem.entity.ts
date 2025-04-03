import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";
import { Billing } from "./Billing.entity";

@Entity()
export class BillingItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({})
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user!: User;

  @ManyToOne(() => Billing, (billing) => billing.id)
  billing!: Billing;

  @Column("text")
  title!: string;
}
