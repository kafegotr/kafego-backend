// App Imports
import models from '../models/sql/index';
import config from '../config/config.json';

// Sync database tables and start server
export default (server) => {
  console.info('SETUP - Syncing database tables...');

  // Create tables
  models.sequelize.sync({})
    .then(() => {
      console.info('Database sync complete');

      console.info('SETUP - Starting server...');

      // Start web server
      server.listen(config.port, (error) => {
        if (error) {
          console.error('ERROR - Unable to start server.');
        } else {
          console.info(`INFO - Server started on port ${config.port}.`);
        }
      });
    })
    .catch(() => {
      console.error('ERROR - Unable to sync database.');
      console.error('ERROR - Server not started.');
    });
};
