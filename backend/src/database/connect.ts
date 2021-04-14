import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Connected to database'))
  .catch(e => {
    console.error(e);
    console.error('Erro ao conectar ao banco');
  });
