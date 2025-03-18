const currentEnv = process.env.NODE_ENV || 'development'
const mongoDBURLs = {
  test: 'mongodb+srv://teste-project:I7i2AXim1sRYr9IO@cluster-teste-project.qcmnnzx.mongodb.net/',
  development: 'mongodb+srv://teste-project:I7i2AXim1sRYr9IO@cluster-teste-project.qcmnnzx.mongodb.net/'
}

const sessionKey = 'ntalk.id'
const sessionSecret = 'ntalk_secret'

module.exports = {
  currentEnv,
  sessionKey,
  sessionSecret,
  mongoDBURL: mongoDBURLs[currentEnv],
  forever: {
    max: 10,
    silent: true,
    killtree: true,
    logFile: 'logs/forever.log',
    outFile: 'logs/app.log',
    errFile: 'logs/error.log'
  },
  redis: {
    host: 'localhot',
    port: 6379,
  },
  cache: {
    maxAge: 3600000
  }
};