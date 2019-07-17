const config = require("../../../config/default.json");

const PORT = config.PORT;
const DBURI = config.DBURI;
const SALTROUNDS = config.SALTROUNDS;

module.exports = {
	PORT,
	DBURI,
	SALTROUNDS
};