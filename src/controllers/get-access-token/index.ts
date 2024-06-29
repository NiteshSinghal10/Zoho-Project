import { callOtherService } from '../../utils';
import { addToken } from '../../services';

export const getAccessToken = async () => {
  const url = process.env.ACCESS_URL;
  const refreshToken = process.env.REFRESH_TOKEN
  const clienId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;;
  const response = await callOtherService(`${url}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clienId}&client_secret=${clientSecret}&grant_type=refresh_token`, 'POST');
  await addToken(response.access_token);
}