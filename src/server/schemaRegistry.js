'use strict';

var log = require('./logging.js').getLogger('SchemaRegistry.js');
var extend = require('extend');

var universalDaoModule = require('./UniversalDao.js');

var DEFAULT_CFG = {
	
};

var SchemaToolsModule = require('./SchemaTools.js');

var fs = require('fs');

/**
 * Works as 'static' registry for schemas.
 * <p>
 * Does: initial schema load delegates to SchemaTool
 * <P>
 */
var SchemaRegistry = function(options) {

	var cfg = extend(true, {}, DEFAULT_CFG, options);

	this.schemaTools = null;

	this.load = function() {
		var schemaToolsTmp = new SchemaToolsModule.SchemaTools();

		cfg.schemaRegistry.schemas.map(function(item) {
			log.info('Registering schema', item);
			var content = fs.readFileSync(cfg.paths.schemas+'/'+item);
			log.silly('Registering schema', content.toString());
			schemaToolsTmp.registerSchema(null, content.toString());
			
		});

		schemaToolsTmp.parse();
		schemaToolsTmp.compile();
		this.schemaTools=schemaToolsTmp;
	};

	this.load();

	this.createDefaultObject = function(schmaUri) {
		return this.schemaTools.createDefaultObject(schmaUri);
	}

	this.getSchema = function(schmaUri) {
		return this.schemaTools.getSchema(schmaUri);
	}

};

module.exports = {
	SchemaRegistry : SchemaRegistry
}
