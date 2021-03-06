'use strict';

var log = require('./logging.js').getLogger('server.js');
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')
var path = require('path');
var photosRepoApp=require('./fsController.js');

var mongoDriver = require(path.join(process.cwd(), '/build/server/mongoDriver.js'));
var config = require(path.join(process.cwd(), '/build/server/config.js'));

var universalDaoControllerModule = require(process.cwd() + '/build/server/UniversalDaoController.js');
var loginControllerModule = require('./loginController.js');

var securityControllerModule = require('./securityController.js');
//var userControllerModule = require('./userController.js');

var schemaRegistryModule = require('./schemaRegistry.js');

var searchControllerModule = require('./searchController.js');
var schemaControllerModule = require('./schemaController.js');

var app = express();
app.disable('view cache');

// Static data
app.use(express.static(path.join(process.cwd(), 'build', 'client')));

mongoDriver.init(config.mongoDbURI, function(err) {
	if (err) {
		throw err;
	}
	
	var schemaRegistry = new schemaRegistryModule.SchemaRegistry(config);
	
	var udc = new universalDaoControllerModule.UniversalDaoController(mongoDriver);
	var loginCtrl= new loginControllerModule.LoginController(mongoDriver);
	
	var securityCtrl= new  securityControllerModule.SecurityController(mongoDriver,schemaRegistry,{});
//	var userCtrl = new  userControllerModule.UserController(mongoDriver,{});
	
	
	var searchCtrl = new  searchControllerModule.SearchController(mongoDriver,schemaRegistry,{});
	var schemaCtrl = new  schemaControllerModule.SchemaController(mongoDriver,schemaRegistry,{});
	
	app.use(cookieParser());
	app.use(loginCtrl.authFilter );
	
	app.put('/udao/save/:table', bodyParser(), function(req, res){udc.save(req, res);});
	app.get('/udao/get/:table/:id', bodyParser(), function(req, res){udc.get(req, res);});
	app.get('/udao/list/:table', bodyParser(), function(req, res){udc.list(req, res);});

	app.post('/login', bodyParser(), function(req, res){loginCtrl.login(req, res);});
	app.get('/logout', bodyParser(), function(req, res){loginCtrl.logout(req, res);});
	app.get('/user/current', bodyParser(), function(req, res){loginCtrl.getCurrentUser(req, res);});
	
	app.post('/resetPassword', bodyParser(), function(req, res){loginCtrl.resetPassword(req, res);});
    app.post('/changePassword', bodyParser(), function(req, res){loginCtrl.changePassword(req, res);});

    app.get('/security/permissions',function(req,res){securityCtrl.getPermissions(req,res)});
    
    app.get('/schema/compiled/*',bodyParser(),function(req,res){schemaCtrl.getCompiledSchema(req,res)});
    app.get('/schema/ls*',bodyParser(),function(req,res){schemaCtrl.schemaList(req,res)});
    app.get('/schema/get/*',bodyParser(),function(req,res){schemaCtrl.schemaRead(req,res)});
    app.put('/schema/replace/*',bodyParser(),function(req,res){schemaCtrl.schemaReplace(req,res)});
    
//    app.get('/user/list',function(req,res){userCtrl.getUserList(req,res)});
    app.get('/user/permissions/:id',bodyParser(),function(req,res){securityCtrl.getUserPermissions(req,res)});
    app.post('/user/permissions/update', bodyParser(),function(req,res){securityCtrl.updateUserPermissions(req,res)});
    app.post('/user/security/update', bodyParser(),function(req,res){securityCtrl.updateUserSecurity(req,res)});
    app.post('/group/security/update', bodyParser(),function(req,res){securityCtrl.updateGroupSecurity(req,res)});
    
    app.post('/search/def', bodyParser(),function(req,res){searchCtrl.getSearchDef(req,res)});
    app.post('/search/:schema', bodyParser(),function(req,res){searchCtrl.search(req,res)});
    
    
	// Static data
//	app.use(express.static(path.join(process.cwd(), 'build', 'client')));

//	app.all('/my*',fsCtrl2.handle);
	
	app.use(express.static(__dirname + '/public'));
	app.use(errorhandler({ dumpExceptions: true, showStack: true }));
	
	photosRepoApp.cfg({rootPath: config.paths.photos ,fileFilter: null});
	app.use('/photos',photosRepoApp);
	    
	var server = app.listen(config.webserverPort || 3000, config.webserverHost || "0.0.0.0", function(){
		log.info("Http server listening at %j", server.address(), {});
	});
});
