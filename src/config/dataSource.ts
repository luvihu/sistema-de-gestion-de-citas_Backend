import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: process.env.VERCEL ? { rejectUnauthorized: false } : false
  },
  entities: ["src/entities/*.ts"],
  synchronize: false, // ¡Importante en producción!
  poolSize: 5,       // Optimiza para serverless
});



// import { DataSource } from "typeorm";
// import { User } from "../entities/User";
// import { Specialty } from "../entities/Specialty";
// import { Doctor } from "../entities/Doctor";
// import { Appointment } from "../entities/Appointment";
// import "dotenv/config";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   url: process.env.DATABASE_URL, // Usaremos esta variable en Vercel
//   ssl: true, // Conexión segura
//   synchronize: true,
//   logging: false,
//   entities: [User, Specialty, Doctor, Appointment],
//   extra: {
//     ssl: {
//       rejectUnauthorized: false, // Necesario para evitar errores de certificado
//     },
//   },

// });

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dropSchema: false, // Solo para desarrollo limpia la DB antes de crear las tablas
//   synchronize: true,
//   logging: false,
//   entities: [User, Specialty, Doctor, Appointment],
//   subscribers: [],
//   migrations: [],
// });

