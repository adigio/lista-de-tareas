# lista-de-tareas
Trabajo practico final de Taller Web II

# Alumnos

Di Giovanni, Alan Rodrigo

Villafañe, Nicolás Daniel

## PASOS PARA LEVANTAR EL BACKEND

(El proyecto cuenta con conexion a base de datos de MySQL, por lo que es necesario tener dicho motor de base de datos instalado)

1- Ejecutar el siguiente script para crear la base de datos

  CREATE DATABASE IF NOT EXISTS mis_tareas;

2- Ingresar con la terminal o linea de comandos a la carpeta /api, desde ahi ejecutar el siguiente comando

  npm install

3- Ingresar con un IDE hasta el archivo /config/database.js y cambiar el usuario y contraseña que actualmente se encuentra como "user" y "pass"

4- Ejecutar el siguiente comando para generar la tabla automaticamente en MySQL con Sequelize

  node ./utils/SyncDatabase.js

5- Iniciar el servidor con el siguiente comando

  npm start

## PASOS PARA LEVANTAR EL FRONTEND

(El proyecto fue creado con Angular 16 y Node 16, en caso de encontrar algun inconveniente)

1- Ingresar con la terminal o linea de comandos a la carpeta /front, desde ahi ejecutar el siguiente comando

  npm install

2- Iniciar el servidor con el siguiente comando

  ng serve


## POSIBLES DATOS A TENER EN CUENTA

- La configuracion del host, usuario y password de MySQL para el backend se encuentra en la carpeta /api/config/database.js
- El puerto configurado del backend es el que esta por defecto en ExpressJS, por lo que sera el 3000.
- Si es necesario cambiar el puerto del backend, ingresar a la carpeta /front/src/app/services/task.service.ts y en la variable apiUrl se puede cambiar el puerto o ruta de las apis
- Angular nos asigna el puerto 4200 por defecto, pero esto puede cambiar segun configuración, según entendemos