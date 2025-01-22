import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Specialty } from './Specialty';
import { Appointment } from './Appointment';

type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';

@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })    
    name: string;

    @Column({ length: 100 })
    lastname: string;
    
    @Column({
      type: 'enum',
      enum: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'],
      default: 'LUNES'
    })
    days_atention: ValidDays;
    
    @Column({
      type: 'enum',
      enum: ['09:00-18:00', '09:00-15:00', '14:00-18:00'],
      default: '09:00-18:00'
    })

    hours_attention: ValidTime;
    
    @Column({ length: 9 })
    telephone: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column({ default: true })
    active: boolean;

    @ManyToOne(() => Specialty, (specialty) => specialty.doctors)
    @JoinColumn({ name: 'id_specialty' })
    specialty: Specialty;

    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments: Appointment[];
}