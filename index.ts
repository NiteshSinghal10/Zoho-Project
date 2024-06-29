import express from 'express';
import dotenv from 'dotenv';

import { appLoader, dbLoader } from './src/loader';
import { router } from './src/router';
import { addAccessToken } from './src/crons';

dotenv.config();

addAccessToken();

process.on('uncaughtException', err => {
  console.log(' UNCAUGHT EXCEPTION ');
  console.log('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
});

process.on('unhandledRejection',
  (reason, promise) => {
    console.log(' UNHANDLED REJECTION ');
    console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
  });

const app = express();

dbLoader()
.then(() => appLoader(app, router))
.catch(err => console.log(err));