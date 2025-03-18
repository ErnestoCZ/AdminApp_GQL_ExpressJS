import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { STATUS } from '../types';


@Entity()
export class UserEntity {
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