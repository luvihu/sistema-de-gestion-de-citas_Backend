import app from './server';
import { PORT } from './config/envs';
import "reflect-metadata";
import { AppDataSource } from './config/dataSource';
// import { preloadData } from './helpers/preloadData';

const startApp = async () => {
  try {
    await AppDataSource.initialize();
    // await preloadData();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1)
  }
};
startApp();



