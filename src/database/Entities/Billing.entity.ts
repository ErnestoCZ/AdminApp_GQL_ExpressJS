import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import { BillingItem } from './BillingItem.entity'

@Entity()
export class Billing{

    @PrimaryGeneratedColumn('uuid')
    id!:string

    @CreateDateColumn({})
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column('date')
    fromDate!: Date

    @Column('date')
    toDate!: Date

    @Column('text')
    title!: string

    @Column('text')
    description!: string

    @OneToMany((type) => BillingItem, (billingItem) => billingItem.billing, {nullable:true})
    billingItems!: BillingItem[]


}