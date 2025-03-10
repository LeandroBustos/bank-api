const app = require('./src/app');
const { PORT } = require('./src/core/config');
const sequelize = require('./src/core/db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente.');

    await sequelize.sync();
    console.log('Modelos sincronizados.');

    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    process.exit(1);
  }
})();