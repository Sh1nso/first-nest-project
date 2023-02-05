import { DataSource, DataSourceOptions } from 'typeorm';
console.log(process.env.POSTGRES_HOST);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'admin',
//   database: 'nest_db',
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/db/migrations/*.js'],
// };

export const dataSource = new DataSource(dataSourceOptions);
