// Aquí configuración de conexión a la base de datos
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost/nuwe';

//  conectamos a la base de datos una sola vez y esa misma conexión se reutilizará
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.info('Connected to DB!', DB_URI);
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.error('DB conection error:', err));

//  desconecta la base de datos cuando salimos de node con ctrl+c
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});

module.exports = mongoose;
