# AppWebGestionBasica

# Server
El servidor esta realizado en nodejs, con expres y mongosse.

## Bade de datos
Esta desplegada en mongo atlas, por lo tanto solo deben ejecutar el servidor

## Autenticacion con JWT
Operando

## Instalar dependencias 
`npm install`

## Run Server
Correr `node server.js` para ejecutar el servidor. Esta en el pueto 3001 `http://localhost:3001/`.

## Rutas
Las puntos de entrada son 
`http://localhost:3001/user`.
`http://localhost:3001/log`.
`http://localhost:3001/role`.

##Archivos adicionales
* Se adjunta Test  de prubas en Postman, Para realizarlas con facilidad recomiendo suprimir el metodo verifyToken  en Server/verifyToken/jwt/ 

# NgApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0-rc.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
