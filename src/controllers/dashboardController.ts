import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";
import { Specialty } from "../entities/Specialty";
import { sendSuccessResponse } from "../helpers/functionsHelpers";

const appointmentsRepository = AppDataSource.getRepository(Appointment);
const doctorsRepository = AppDataSource.getRepository(Doctor);
const specialtiesRepository = AppDataSource.getRepository(Specialty);

export const getDashboard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Total de doctores y especialidades
    const [totalDoctors, totalSpecialties] = await Promise.all([
      doctorsRepository.count(),
      specialtiesRepository.count()
    ]);

    // Obtener el primer día y último día del mes actual
    // Formatear las fechas como strings en formato ISO
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();

    // Total de citas del mes actual
    const totalAppointments = await appointmentsRepository
      .createQueryBuilder("appointment")
      .where("appointment.date BETWEEN :startDate AND :endDate", {
        startDate: firstDayOfMonth,
        endDate: lastDayOfMonth
      })
      .getCount();

    // Doctor con más citas
    const topDoctor = await doctorsRepository
    .createQueryBuilder("doctor")
    .leftJoinAndSelect("doctor.appointments", "appointments")
    .select([
      "doctor.id",
      "doctor.name", 
      "doctor.lastname"
    ])
    .addSelect("COUNT(appointments.id)", "total_appointments")
    .groupBy("doctor.id")
    .orderBy("total_appointments", "DESC")
    .limit(1)
    .getOne();

    // Especialidad más solicitada
    const topSpecialty = await specialtiesRepository
    .createQueryBuilder("specialty")
    .leftJoinAndSelect("specialty.doctors", "doctors")
    .leftJoinAndSelect("doctors.appointments", "appointments")
    .select([
      "specialty.id",
      "specialty.name"
    ])
    .addSelect("COUNT(appointments.id)", "total_appointments")
    .groupBy("specialty.id")
    .orderBy("total_appointments", "DESC")
    .limit(1)
    .getOne();

    const dashboardData = {
      totalDoctors,
      totalSpecialties,
      totalMonthAppointments: totalAppointments,
      topDoctor: topDoctor ? `${topDoctor.name} ${topDoctor.lastname}` : null,
      topSpecialty: topSpecialty?.name || null
    };

    sendSuccessResponse(res, dashboardData);
  } catch (error) {
    next(error);
  }
};
