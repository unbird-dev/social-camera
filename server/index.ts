import { createServer } from 'http';
import app from 'src/server';
import { sequelize } from "src/database/engine";

sequelize.authenticate().then(() => {
  const index = createServer(app);

  const port = process.env.PORT;

  index.listen(port);

  index.on('listening', () => {
    console.info(`🚀server is running on port ${port}  ✊🏾✊🏾✊🏾`);
  });
})
