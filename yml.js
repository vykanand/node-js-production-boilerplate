const YAML = require('yamljs');

const swaggerDocument = YAML.load('./userserver.yaml');

module.exports = swaggerDocument