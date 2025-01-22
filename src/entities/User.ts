import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from './Appointment';

type UserRole = 'ADMIN' | 'USER';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    lastname: string;

    @Column({ length: 8, unique: true })
    dni: string;

    @Column({ length: 9 })
    telephone: string;

    @Column({ nullable: true })
    photo_profile?: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
      type: 'enum',
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    })
    role: UserRole;
    
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP'
    })
    date_registration: Date;
    
    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];
  }
    