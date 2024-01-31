import 'dotenv/config'

const config = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  testDb: {
    uri: process.env.DB_TEST_URI,
  },
};

export default config;