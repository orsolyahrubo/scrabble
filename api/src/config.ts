import 'dotenv/config'

const config = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  testDb: {
    uri: process.env.DB_TEST_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
};
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scrabble',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${config.port}` }],
  },
  apis: ['./src/**/*.yaml'],
};

export default config;