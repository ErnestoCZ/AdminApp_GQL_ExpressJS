import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Billing } from "./Billing.entity";


@Entity()
export class BillingItem{
    @PrimaryGeneratedColumn('uuid')
    id!:string

    @CreateDateColumn({})
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToOne((type) => User, (user) => user.billingItems , {nullable: false})
    user!: User

    @ManyToOne((type) => Billing, (billing) => billing.billingItems)
    billing!: Billing

    @Column('text')
    title!: string
}