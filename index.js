import express from 'express';
import userRoutes from './routes/userRouter.js'
import transferRoutes from './routes/transferRouter.js'
const app = express();
const PORT = process.env.PORT || 3000;



//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', userRoutes)
app.use('/', transferRoutes)


app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));