
interface ILogin {
    email: string;
    password: string;
    role?: 'ADMIN' | 'USER';
};

interface IUser {
    name: string;
    lastname: string;
    dni: string;
    telephone: string;
    photo_profile?: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'USER';
};

type ValidTimeAppoint = '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00';
type StatusApp = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';

interface IAppointment {
    status: StatusApp;
    date: string;
    hour: ValidTimeAppoint;
    date_creation?: string;
    id_user: string;
    id_doctor: string;
};

type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';
interface IDoctor {
    name: string;
    lastname: string;
    days_atention: ValidDays;
    hours_attention: ValidTime;
    telephone: string;
    email: string;
    active?: boolean;
    id_specialty: string;
};

interface ISpecialty {
    name: string;
    description?: string;
    active?: boolean;
};


export { IUser, IAppointment, IDoctor, ISpecialty, ILogin };