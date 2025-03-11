import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

enum STATUS {
    ACTIVE,
    INACTIVE,
}

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id!:string;
    
    @Column()
    firstName!:string;

    @Column()
    lastName!:string;

    @Column({nullable:false})
    email!:string

    @Column({type: 'enum', enum: STATUS, default:STATUS.ACTIVE})
    status!:STATUS
}