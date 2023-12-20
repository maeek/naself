export default () => ({
  port: parseInt(process.env.API_PORT) || 8080,
  data: {
    path: process.env.DATA_PATH || '/data',
    cache: process.env.DATA_CACHE || '/tmp/naself-cache',
  },
  auth: {
    saltRounds: +process.env.AUTH_SALT_ROUNDS || 10,
  },
});
