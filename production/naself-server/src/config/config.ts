export default () => ({
  port: parseInt(process.env.API_PORT) || 8080,
  data: {
    path: process.env.DATA_PATH || '/data',
  },
});
