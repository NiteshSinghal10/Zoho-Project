import cron from 'node-cron';

import { getAccessToken } from '../controllers/get-access-token';

export const addAccessToken = () => {
  cron.schedule('*/55 * * * *', async () => {
    await getAccessToken();
    console.log('Added access token by cron job');
  });
}