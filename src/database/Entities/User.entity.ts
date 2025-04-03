import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { STATUS } from "../types";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ type: "enum", enum: STATUS, default: STATUS.ACTIVE })
  status!: STATUS;
}
