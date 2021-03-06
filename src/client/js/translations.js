angular.module('registries')
.config(['$translateProvider', function($translateProvider) {
	$translateProvider.preferredLanguage('sk');

	$translateProvider.translations('sk', {
		'login.title': 'Prihlásenie',
		'login.loginName': 'Prihlasovacie meno',
		'login.password': 'Heslo',
		'login.forgottenPassword': 'Zabudnuté heslo',
		"schema.people.baseData": "Základné informácie",
		"schema.people.baseData.identifier": "Identifikátor",
		"schema.people.baseData.name": "Meno",
		"schema.people.baseData.surName": "Priezvisko",
		"schema.people.baseData.bornName": "Rodné priezvisko",
		"menu.member.title": "Člen",
		
		"errors.validation.required": "Povinné pole",


	});

	$translateProvider.translations('cz', {
		'login.title': 'Přihlášení',
		'login.loginName': 'Přihlašovací jméno',
		'login.password': 'Heslo',
		'login.forgottenPassword': 'Zapomenuté heslo',
		"schema.people.baseData": "Základní informace",
		"schema.people.baseData.identifier": "Identifikátor",
		"schema.people.baseData.name": "Jméno",
		"schema.people.baseData.surName": "Příjmení",
		"schema.people.baseData.bornName": "Rodné příjmení",
		//TODO
		"menu.member.title": "Člen_cz",

		"errors.validation.required": "Povinné pole",
	});
}])
.controller('langSelectCtrl', ['$scope', '$translate', function($scope, $translate) {
	$scope.setLang = function(lang) {
		$translate.use(lang);
	};
}]);
