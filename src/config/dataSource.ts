import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entities/User";
import { Specialty } from "../entities/Specialty";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,      // Nueva variable de Supabase
  port: 5432,                          // Puerto fijo (no necesitas variable)
  username: "postgres",                // Usuario fijo en Supabase
  password: process.env.POSTGRES_PASSWORD, // Nueva variable de Supabase
  database: process.env.POSTGRES_DATABASE || "postgres", // Nueva variable (valor por defecto)
  ssl: { rejectUnauthorized: false },  // SSL obligatorio en Supabase
  entities: [User, Specialty, Doctor, Appointment],
  synchronize: false,                  // ¡Desactivado en producción!
  extra: {
    max: 5,                            // Máximo de conexiones
    connectionTimeoutMillis: 5000,     // Timeout
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
//   host: process.env.DB_HOST,  // Usa host en lugar de URL
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl:{ rejectUnauthorized: false },
//   entities: [User, Specialty, Doctor, Appointment],
//   synchronize: false, 
//   extra: {
//     max: 5,  // Máximo de conexiones abiertas
//     connectionTimeoutMillis: 5000,  // Timeout en ms
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
//   synchronize: true,
//   logging: false,
//   entities: [User, Specialty, Doctor, Appointment],
//   subscribers: [],
//   migrations: [],
// });

