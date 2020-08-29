import Express from 'express';
import getPresignedUrl from "routes/getPresignedUrl";
import login from "routes/login";
import signup from "routes/signup";

const app = Express();

app.get('/get-presigned-url', getPresignedUrl);
app.post('/login', login);
app.post('/signup', signup);

export default app;
