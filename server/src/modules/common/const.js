const config = require("../../../config/default.json");

const PORT = config.PORT;
const DBURI = config.DBURI;
const SALTROUNDS = config.SALTROUNDS;
const PUBLICADDRESS = config.PUBLICADDRESS;

module.exports = {
	PORT,
	DBURI,
	SALTROUNDS,
	PUBLICADDRESS
};