const serverSettings = {
  port: process.env.PORT || 8080,
  url: process.env.URL || 'http://localhost'
}

export default Object.assign({}, { serverSettings });