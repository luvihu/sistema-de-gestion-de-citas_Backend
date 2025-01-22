import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User";
import { Specialty } from "../entities/Specialty";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";

const userPreload = [
{
  name: 'Lucy',
  lastname: 'Villogas',
  dni: '12345678',
  telephone: '123456789',
  photo_profile: 'https://example.com/profile.jpg',
  email: 'lucy.admin@gmail.com',
  password: 'admin1234',
  role: "ADMIN" as "ADMIN" | "USER",
},
{
  name: 'Maria',
  lastname: 'Perez',
  dni: '87654321',
  telephone: '987654321',
  photo_profile: 'https://example.com/profile.jpg',
  email: 'maria.user@gmail.com',
  password: 'user1234',
  role: "USER" as "ADMIN" | "USER",
},
{
  name: 'Juan',
  lastname: 'Gomez',
  dni: '45678912',
  telephone: '987654321',
  photo_profile: 'https://example.com/profile.jpg',
  email: 'juan.user@gmail.com',
  password: 'user1234',
  role: "USER" as "ADMIN" | "USER",
},
{
  name: 'Pedro',
  lastname: 'Gonzalez',
  dni: '98765432',
  telephone: '987654321',
  photo_profile: 'https://example.com/profile.jpg',
  email: 'pedro.user@gmail.com',
  password: 'user1234',
  role: "USER" as "ADMIN" | "USER",
}
];
const specialtyPreload = [
  {
    name: 'Cardiología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y los vasos sanguíneos.',
    active: true,
  },
  {
    name: 'Dermatología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades de la piel, cabello y uñas.',
    active: true,
  },
  {
    name: 'Neurología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del sistema nervioso.',
    active: true,
  }
];

const doctorPreload = [
{
  name: 'Dr. Juan',
  lastname: 'Perez',
  days_atention: 'LUNES' as 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES',
  hours_attention: '09:00-18:00' as '09:00-18:00' | '09:00-15:00' | '14:00-18:00',
  telephone: '123456789',
  email: 'juan.doctor@gmail.com',
  active: true,
  
},
{
  name: 'Dr. Maria',
  lastname: 'Gomez',
  days_atention: 'MARTES' as 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES',
  hours_attention: '09:00-18:00' as '09:00-18:00' | '09:00-15:00' | '14:00-18:00',
  telephone: '987566789',
  email: 'maria.doctor@gmail.com',
  active: true,
  
},
{
  name: 'Dr. Pedro',
  lastname: 'Gonzalez',
  days_atention: 'MIERCOLES' as 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES',
  hours_attention: '14:00-18:00' as '09:00-18:00' | '09:00-15:00' | '14:00-18:00',
  telephone: '987566789',
  email: 'pedro.doctor@gmail.com',
  active: true,
  
},
{
  name: 'Dr. Ana',
  lastname: 'Lopez',
  days_atention: 'JUEVES' as 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES',
  hours_attention: '09:00-15:00' as '09:00-18:00' | '09:00-15:00' | '14:00-18:00',
  telephone: '987566789',
  email: 'ana.doctor@gmail.com',
  active: true,
  
}
];

const appointPreload = [
{
  status: 'PENDIENTE' as 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
  date: new Date('2023-07-01'),
  hour: '09:00' as '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00',
  
},
{
  status: 'CONFIRMADO' as 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
  date: new Date('2023-07-02'),
  hour: '10:00' as '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00',

},
{
  status: 'CANCELADO' as 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
  date: new Date('2023-07-03'),
  hour: '11:00' as '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00',

}
]

// export const preloadData = async() => {

//    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    //      Primero guardamos usuarios y especialidades 
//     const savedusers = await Promise.all(
//       userPreload.map(user => transactionalEntityManager.save(User, user))
//      );
//      const savedSpecialties = await Promise.all(
//       specialtyPreload.map(specialty => transactionalEntityManager.save(Specialty, specialty))
//      )
   //       Asignamos especialidades aleatorias a los doctores
//      const doctorWithSpecialty = doctorPreload.map((doctor) => ({
//       ...doctor,
//       specialty: savedSpecialties[Math.floor(Math.random() * savedSpecialties.length )]
//     }) );
//     const savedDoctors = await Promise.all(
//       doctorWithSpecialty.map(doctor => transactionalEntityManager.save(Doctor, doctor))
//     );

     // Asignamos usuarios y doctores aleatorios a las citas
//     const appointWithUsersAndDoctors = appointPreload.map((appoint) => ({
//      ...appoint,
//      user: savedusers[Math.floor(Math.random() * savedusers.length)],
//      doctor: savedDoctors[Math.floor(Math.random() * savedDoctors.length)]
//     }))

//     await Promise.all(
//       appointWithUsersAndDoctors.map(appoint => 
//         transactionalEntityManager.save(Appointment, appoint))
//     )
      
//     console.log('precarga de datos completada');
//   });
// }
 

export const preloadData = async() => {
  const queryRunner = AppDataSource.createQueryRunner();
  
  await queryRunner.connect();
  await queryRunner.startTransaction();
  
  try {
    // Verificamos si ya existen datos
    const existingUsers = await queryRunner.manager.count(User);
    const existingSpecialties = await queryRunner.manager.count(Specialty);
    
    if (existingUsers > 0 || existingSpecialties > 0) {
      console.log('La base de datos ya contiene datos precargados');
      return;
    }
    // Si no hay datos, procedemos con la precarga, Guardamos usuarios
    const savedUsers = await Promise.all(
      userPreload.map(user => queryRunner.manager.save(User, user))
    );
    
    // Guardamos especialidades
    const savedSpecialties = await Promise.all(
      specialtyPreload.map(specialty => queryRunner.manager.save(Specialty, specialty))
    );
    
    // Asignamos especialidades aleatorias a doctores
    const doctorWithSpecialty = doctorPreload.map((doctor) => ({
      ...doctor,
      specialty: savedSpecialties[Math.floor(Math.random() * savedSpecialties.length)]
    }));
    
    const savedDoctors = await Promise.all(
      doctorWithSpecialty.map(doctor => queryRunner.manager.save(Doctor, doctor))
    );
    
    // Asignamos usuarios y doctores aleatorios a citas
    const appointWithUsersAndDoctors = appointPreload.map((appoint) => ({
      ...appoint,
      user: savedUsers[Math.floor(Math.random() * savedUsers.length)],
      doctor: savedDoctors[Math.floor(Math.random() * savedDoctors.length)]
    }));
    
    await Promise.all(
      appointWithUsersAndDoctors.map(appoint => 
        queryRunner.manager.save(Appointment, appoint))
    );
    
    // Confirmamos la transacción
    await queryRunner.commitTransaction();
    console.log('Precarga de datos completada exitosamente');
    
  } catch (error) {
    // En caso de error, revertimos los cambios
    await queryRunner.rollbackTransaction();
    console.error('Error en la precarga de datos:', error);
    throw error;
    
  } finally {
    // Liberamos el queryRunner
    await queryRunner.release();
  }
}
    // Esta versión ofrece varias ventajas:

    // Mayor control sobre la transacción con queryRunner
    // Manejo explícito de errores con try/catch
    // Rollback automático en caso de fallos
    // Liberación adecuada de recursos con finally
    // Mejor gestión de la conexión a la base de datos