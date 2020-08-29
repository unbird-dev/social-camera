import Express from 'express';
import getPresignedUrl from "routes/getPresignedUrl";
import login from "routes/login";
import signup from "routes/signup";
import { authenticationMiddleware } from "src/utility/authentication";

const app = Express();

app.get('/get-presigned-url', authenticationMiddleware, getPresignedUrl);
app.post('/login', login);
app.post('/signup', signup);

export default app;
