{
	"table": "hokejpeople",
	"listFields": [
		{"field":"id", "title": "ID"},
		{"field":"baseData.name", "title":"Meno"},
		{"field":"baseData.surName", "title":"Priezvisko"},
		{"field":"baseData.birthDate", "title":"Dátum narodenia"},
		{"field":"contactInfo.city", "title":"Mesto"},
		{"field":"hokej.hokejId", "title":"Členské ID"}
	],
	"properties": {
		"baseData": {
			"title": "Základné údaje",
			"type": "object",
			"properties": {
				"id": {
					"title": "Identifikátor",
					"type": "string",
					"required": true
				},
				"name": {
					"title": "Meno",
					"type": "string",
					"required": true
				},
				"surName": {
					"title": "Priezvisko",
					"type": "string",
					"required": true
				},
				"bornName": {
					"title": "Rodné priezvisko",
					"type": "string",
					"required": false
				},
				"title": {
					"title": "Titul",
					"type": "string",
					"required": false
				},
				"birthDate": {
					"title": "Dátum narodenia",
					"type": "date",
					"required": true
				},
				"gender": {
					"title": "Pohlavie",
					"type": " string",
					"enum": [
						"Muž",
						"Žena"
					],
					"required": true
				},
				"nationality": {
					"title": "Štatna prislusnosť",
					"type": "string",
					"required": true
				}
			}
		},
		"contactInfo": {
			"title": "Kontaktné údaje",
			"type": "object",
			"properties": {
				"street": {
					"title": "Ulica",
					"type": "string",
					"required": true
				},
				"houseNumber": {
					"title": "Číslo domu",
					"type": "string",
					"required": true
				},
				"city": {
					"title": "Obec",
					"type": "string",
					"required": true
				},
				"zipCode": {
					"title": "PSČ",
					"type": "string",
					"required": true
				},
				"country": {
					"title": "Štát",
					"type": "string",
					"required": true
				},
				"phoneNumber": {
					"title": "Telefón",
					"type": "string",
					"required": false
				},
				"mobileNumber": {
					"title": "Mobil",
					"type": "string",
					"required": false
				},
				"email": {
					"title": "E-mail",
					"type": "string",
					"required": false
				}
			}
		},
		"bankInfo": {
			"title": "Bankové spojenie",
			"type": "object",
			"properties": {
				"bankAccount": {
					"title": "Číslo účtu",
					"type": "string",
					"required": false
				},
				"bankCode": {
					"title": "Kód banky",
					"type": "string",
					"required": false
				},
				"iban": {
					"title": "IBAN",
					"type": "string",
					"required": false
				},
				"swift": {
					"title": "SWIFT",
					"type": "string",
					"required": false
				}
			}
		},
		"otherInfo": {
			"title": "Ostatné údaje",
			"type": "object",
			"properties": {
				"isPhotoPublic": {
					"title": "Je fotka verejná",
					"type": "boolean",
					"required": false
				},
				"idCardNumber": {
					"title": "Číslo OP",
					"type": "string",
					"required": false
				},
				"note": {
					"title": "Poznámka",
					"type": "string",
					"required": false,
					"large": true
				}
			}
		},
		"hokej": {
			"title": "Hokej dáta",
			"type": "object",
			"properties": {
				"dress": {
					"title": "Dres",
					"type": "string",
					"required": false
				},
				"hokejId": {
					"title": "Hokej identifikačné číslo",
					"type": "string",
					"required": false
				},
				"korcule": {
					"title": "korcule",
					"type": "string",
					"required": false,
					"large": true
				}
			}
		}
	}
}
