import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entities/User";
import { Specialty } from "../entities/Specialty";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST, // "aws-0-sa-east-1.pooler.supabase.com"
  port: Number(process.env.POSTGRES_PORT) || 6543,
  username: process.env.POSTGRES_USER, // "postgres.jztdxoixayvdlskcnfkd"
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE || "postgres",
  ssl: { rejectUnauthorized: false }, // Obligatorio
  entities: [User, Specialty, Doctor, Appointment],
  synchronize: false,
  extra: {
    connectionTimeoutMillis: 10000,
    max: 5, // Límite de conexiones
  },
});




// import { DataSource } from "typeorm";
// import "dotenv/config";
// import { User } from "../entities/User";
// import { Specialty } from "../entities/Specialty";
// import { Doctor } from "../entities/Doctor";
// import { Appointment } from "../entities/Appointment";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.POSTGRES_HOST,  // Usa host en lugar de URL
//   port: 5432,
//   username: "postgres",
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE || "postgres",
//   ssl:{ rejectUnauthorized: false },
//   entities: [User, Specialty, Doctor, Appointment],
//   synchronize: false, 
//   extra: {
//     connectionLimit: 5,  // Reduce la latencia en conexiones repetidas
//     connectionTimeoutMillis: 10000,
//   },
// });



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
//   synchronize: true,  // solo para desarrollo, en producccion es false
//   logging: false,
//   entities: [User, Specialty, Doctor, Appointment],
//   subscribers: [],
//   migrations: [],
// });

