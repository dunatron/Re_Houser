// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:4444/`;
// export const endpoint = `https://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev/`;
// https://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev
// export const prodEndpoint = `https://thetrader-yoga-prod.herokuapp.com`
// export const prodEndpoint = `https://houser-yoga-prod.herokuapp.com/`
export const prodEndpoint = `https://rehouser-yoga-prod.herokuapp.com/`;

export const wsEndpoint = `ws://localhost:4444`;
// export const wsEndpoint = `ws://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev`;
// export const wsEndpoint = `wss://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev`;
// wss://us1.prisma.sh/heath-dunlop-37e897/rehouser-service/dev
export const wsProdEndpoint = `wss://rehouser-yoga-prod.herokuapp.com`;
// This may be the heroku deployed version like below or 
// PRISMA_ENDPOINT="https://rehouser-prisma-d9fa92f398.herokuapp.com/rehouser-prisma-service/prod"
// PRISMA_WS_ENDPOINT="wss://rehouser-prisma-d9fa92f398.herokuapp.com/rehouser-prisma-service/prod"
// export const wsProdEndpoint = `wss://rehouser-production-cacaa3459e.herokuapp.com/rehouser-production/prod`;
// wss://rehouser-production-cacaa3459e.herokuapp.com/rehouser/prod
// https://rehouser-production-cacaa3459e.herokuapp.com/rehouser/prod

// export const devEndpoint = `https://us1.prisma.sh/heath-dunlop-37e897/the-trader/dev`
export const itemsPerPage = 4;
