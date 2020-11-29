const server = require('./start.js');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

module.exports = server;
