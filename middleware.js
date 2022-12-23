const { Wit, log } = require("node-wit");

const witClient = new Wit({
  accessToken:"2TS2B3LXJQWS5FQAPAELJA3V6HRFJPIY",
  logger: new log.Logger(log.DEBUG)
})

module.exports = async(msg) => {
  let response = await witClient.message(msg);
};