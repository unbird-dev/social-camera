import { createServer } from 'http';
import app from 'src/server';
import getPresignedUrl from "routes/getPresignedUrl";
import login from "routes/login";

const index = createServer(app);

app.get('/get-presigned-url', getPresignedUrl);
app.post('/login', login);

const port = process.env.PORT;

index.listen(port);

index.on('listening', () => {
  console.info(`🚀server is running on port ${port}  ✊🏾✊🏾✊🏾`);
});
