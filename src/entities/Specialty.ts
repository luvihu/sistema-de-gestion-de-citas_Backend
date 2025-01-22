import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Doctor } from './Doctor';

@Entity("specialties")
export class Specialty {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Doctor, (doctor) => doctor.specialty)
    doctors: Doctor[];
}

