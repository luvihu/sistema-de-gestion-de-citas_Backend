// src/devServer.ts (solo para desarrollo local)
import app from './server';
import { PORT } from './config/envs';
import { AppDataSource } from './config/dataSource';

async function startLocalServer() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected (Local)');
    app.listen(PORT, () => {
      console.log('Local server running on port', PORT);
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Solo ejecuta si no estamos en Vercel
if (!process.env.VERCEL) {
  startLocalServer();
}



// import app from './server';
// import { PORT } from './config/envs';
// import "reflect-metadata";
// import { AppDataSource } from './config/dataSource';
// // import { preloadData } from './helpers/preloadData';

// const startApp = async () => {
//   try {
//     await AppDataSource.initialize();
//     // await preloadData();
//     console.log('Database connected');
//     app.listen(PORT, () => {
//       console.log('Server is running on port', PORT);
//     });
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     process.exit(1)
//   }
// };
// startApp();



