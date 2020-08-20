// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:4444`;
export const wsEndpoint = `ws://localhost:4444`;
// productions
// export const prodEndpoint = `https://rehouser-yoga-prod.herokuapp.com`;
// export const wsProdEndpoint = `wss://rehouser-yoga-prod.herokuapp.com`; // NOTE ws for no ssl and wss for https with ssl cert
export const prodEndpoint = `https://yoga.rehouser.co.nz`;
export const wsProdEndpoint = `wss://yoga.rehouser.co.nz`; // NOTE ws for no ssl and wss for https with ssl cert

export const itemsPerPage = 4;

export const CEO_DETAILS = {
  firstname: 'Heath',
  lastname: 'McDonough',
  email: 'admin@rehouser.co.nz',
  phone: '022 302 5510',
};
export const CTO_DETAILS = {
  firstname: 'Heath',
  lastname: 'Dunlop',
  email: 'heathd@rehouser.co.nz',
  phone: '021 243 9998',
};
