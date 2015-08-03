/// <reference path="../typings/tsd.d.ts" />

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,{
	dialect: "sqlite",
	storage: "quiz.sqlite"
});

// Importar definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// exportar definición de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa tabla preguntas en DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){//la tabla se inicializa solo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})

			.then(function(){
				console.log('Base de datos inicializada')
			});
		};
	});
});