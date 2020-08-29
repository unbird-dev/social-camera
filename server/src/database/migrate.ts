import Umzug from 'umzug';
import { sequelize } from 'src/database/engine';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  logging: false,
  migrations: {
    params: [sequelize, sequelize.constructor],
    path: './src/database/migrations',
    pattern: /\.ts$/
  }
});

const task = (process.argv[2] || '').trim();

switch (task) {
  case 'up':
    umzug.up().then((result: Umzug.Migration[]) => {
      console.log('Migrated Up', result);
      process.exit(0);
    });
    break;
  case 'down':
    umzug.down().then((result: Umzug.Migration[]) => {
      console.log('Migrated Down', result);
      process.exit(0);
    });
    break;
  default:
    break;
}
