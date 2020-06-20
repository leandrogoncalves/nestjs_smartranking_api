#! /bin/bash

#cria um novo modulo
nest g module jogadores

#Cria o controller
nest g controller Jogadores

#cria um service
nest g service jogadores

#instala uuid
yarn add uuid dotenv   

#instala mongoose
yarn add @nestjs/mongoose mongoosev

#Uso dos Pipes para validacao
yarn add class-validator class-transformer