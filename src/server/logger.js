const level = 'INFO';

module.exports = {
  log(message) {
    console.log(`${level}: ${message}`);
  }
};
