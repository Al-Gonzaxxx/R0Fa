const config = require("../../../config/default.json");

const PORT = config.PORT;
const DBURI = config.DBURI;

module.exports = {
	PORT,
	DBURI
};