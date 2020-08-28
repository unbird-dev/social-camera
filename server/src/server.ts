import Express from 'express';
import getPresignedUrl from "routes/getPresignedUrl";
import login from "routes/login";

const app = Express();
app.get('/get-presigned-url', getPresignedUrl);
app.post('/login', login);

export default app;
