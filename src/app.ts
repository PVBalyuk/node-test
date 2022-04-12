import express from 'express';
import { initializeDatabase } from './database/initializeDatabase';

const app = express();

export const bootstrap = () => {
    initializeDatabase();
    app.get('/', (req, res) => {
        res.send('Hello 123 123');
    });

    app.listen(3000, () => {
        console.log('server running at port');
    });
}
