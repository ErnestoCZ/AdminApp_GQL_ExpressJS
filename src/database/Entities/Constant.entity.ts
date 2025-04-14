import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";
import { CONSTANT_TYPE } from "../types";

@Entity()
export class Constant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: "enum",
    enum: CONSTANT_TYPE,
    nullable: false,
    default: CONSTANT_TYPE.MEDIUM,
  })
  type!: CONSTANT_TYPE;

  @Column("float", { nullable: false })
  value!: number;

  @Column("text")
  name!: string;

  @Column("text")
  description!: string;
}
