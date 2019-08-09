const config = require("../../../config/default.json");

const PORT = config.PORT;
const DBURI = config.DBURI;
const SALTROUNDS = config.SALTROUNDS;
const PUBLICADDRESS = config.PUBLICADDRESS;
const TOKENKEY = config.TOKENKEY;
const GETADDRESSURIBASE = PUBLICADDRESS+":"+PORT+"/graphql?query=";

module.exports = {
	PORT,
	DBURI,
	SALTROUNDS,
	PUBLICADDRESS,
	TOKENKEY,
	GETADDRESSURIBASE
};