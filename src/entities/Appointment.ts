import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";

type ValidTimeAppoint = '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00';
type StatusApp = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: ['PENDIENTE', 'CONFIRMADO', 'CANCELADO'], default: 'PENDIENTE' })
  status: StatusApp;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "enum", enum: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] })
   hour: ValidTimeAppoint;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  date_creation: string;

  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  @JoinColumn({ name: "id_doctor" })
  doctor: Doctor;
}