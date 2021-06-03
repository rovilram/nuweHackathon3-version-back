# HACK THAT STARTUP V3 | BACKEND VERSION

Te proponemos ahora lo siguiente:

---

## Unit Testing

Para poder revisar que las funciones creadas funcionan complemente, implementa algún test unitario para revisar que realmente está funcionando.

Algunas librerias utilizadas por empresas para implementar tests:

- [Jest](https://github.com/facebook/jest)
- [Mocha](https://github.com/mochajs/mocha)
- [Supertest]()

---

## API (1ª Parte)

Ahora queremos crear una pequeña api que permita conectarse con nuestra base de datos que se encuentra en MongoDB y de esta forma poder enviar datos a nuestro squad de front.

**Obejtivos**

- Levantar un server en el puerto 3000
- Crear una base de datos en MongoDB Atlas y conectarse utilizando el string de conexión
- Crear un modelo de usuario y aplicar las condiciones que sean necesarias para que el username y el email sean únicos:

```js
{
    username:{type:string},
    password:{type:string},
    email:{type:string},
    repos:{type:Number}
}
```

- Cread un modelo de repositorio para poder almacenar las difererentes datos de los repositorios:

```js
{
    name:{type:string},
    url:{type:string},
    description:{type:string},
    stack:[]
}
```

- Cread un método para proteger las contraseñas guardadas por el usuarios
- Cread el CRUD de ambos modelos


## API (2ª Parte)

Vamos ahora a testear nuestro proyecto y hacer deploy de nuestra api para que el squad de front pueda conectar a el y utilizar la información de forma simple

**Obejtivos**

- Proteger las diferentes rutas creadas
- Crear pruebas de integración de tu API
- Finalmente hacer deploy con alguno de los providers gratuitos que más os guste:
  - Heroku
  - AWS
  - Azure
  - Digital Ocean
  - ...
- Refacto del códido si fuera necesario
- Documentar el proceso de creación del proyecto


## Evaluación del código

- Calidad de código (bugs, errores, duplicados, etc)
- Objetivos cumplidos
- Documentación proporcionada
- Velocidad de dessarrollo


## MODELOS

### USER

**id** String, unique, required, generado con nanoid
**username** String, unique, required
**password** String, required, hasheada SHA256
**email** String, required, validada.
**repos** Number

### REPO

**id** String, unique, required, generado con nanoid
**name**: String
**url** String
**description** String
**stack** Array


## ENDPOINTS CRUD

### USER

**/user/** _POST_ CREA nuevo usuario. Recibe objeto del modelo User.
**/user/** _GET_ DEVUELVE todos los usuarios.

**/user/:id/** _GET_ DEVUELVE el usuario pasado en _req.params_.
**/user/:id/** _PATCH_ MODIFICA el usuario pasado en _req.params_. Si se modifica la contraseña hace hash SHA256 antes de actualizar la base de datos
**/user/:id/** _DELETE_ BORRA el usuario pasado en _req.params_.

### REPO

**/repo/** _POST_ CREA nuevo repo. Recibe un objeto del modelo Repo
**/repo/** _GET_ DEVUELVE todos los repo.

**/repo/:id/** _GET_ DEVUELVE el repo con id pasado en _req.params_.
**/repo/:id/** _PATCH_ MODIFICA el repo con id pasado en _req.params_.
**/repo/:id/** _DELETE_ BORRA el repo con idr pasado en _req.params_.


## MIDDLEWARE ERRORES

middleware **errorMiddleware** que envía respuesta a front en caso de que haya habido algún error en los endpoints.

## INSTALACIÓN

1. Clonar repositorio: `git clone https://github.com/rovilram/HackThatStartupV3-Webdev-Backend`.
2. reconstituir dependencias npm: `npm install`.
3. añadir datos de configuración de base de datos en .env con este formato:
```bash
#API server
HTTP_API_PORT = 3000
HTTP_API_HOST = "localhost"

#mongoDB server
DB_URI = "mongodb+srv://<user>:<pass>@<atlashost>.mongodb.net/<database>"
```

4. lanzar con node el fichero js principal: `npm start`.
5. probar funcionamiento con postman. Se puede importar en postman el archivo `nuwe3.postman_collection.json` incluido.
6. Se ha desplegado la aplicación react en heroku. (https://nuwe3-back.herokuapp.com/)
