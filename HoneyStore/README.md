# HoneyStore

**HoneyStore** es una aplicación que gestiona una base de datos y sus endpoints para la manipulación de productos de una tienda, basados en la apicultura, que cuenta con diferentes categorias de elaboración.

Está construida utilizando **Node.js** con **Express** para el manejo del servidor y **MongoDB** con **Mongoose** para la base de datos.

## Características

Este proyecto proporciona las siguientes funcionalidades:

- **Productos:** 
  - Obtener todos los productos o filtrarlos por distintos criterios como ID, nombre, stock, precio y categoría.
  - Agregar, actualizar y eliminar productos.
  
- **Categorías:**
  - Obtener todas las categorías o filtrarlas por ID y nombre.
  - Agregar, actualizar y eliminar categorías.

- **Usuarios:**
  - Registro y autenticación de usuarios.
  - Actualización de roles de usuario y eliminación de usuarios.

## Endpoints

La URL base del proyecto es: `http://localhost:3000/api/v1/`

### Productos

| Método  | Endpoint                          | Descripción                                 |
|---------|------------------------------------|---------------------------------------------|
| **GET** | `/products`                        | Obtener todos los productos.                |
| **GET** | `/products/:id`                    | Obtener un producto por ID.                 |
| **GET** | `/products/name/:name`             | Obtener productos por nombre.               |
| **GET** | `/products/stock/:stock`           | Obtener productos por stock.                |
| **GET** | `/products/price/:price`           | Obtener productos por precio.               |
| **GET** | `/products/category/:categoryId`   | Obtener productos por categoría.            |
| **POST**| `/products`                        | Agregar un nuevo producto.                  |
| **PUT** | `/products/:id`                    | Actualizar un producto existente.           |
| **DELETE**| `/products/:id`                  | Eliminar un producto.                       |

### Categorías

| Método  | Endpoint                          | Descripción                                   |
|---------|------------------------------------|-----------------------------------------------|
| **GET** | `/categories`                     | Obtener todas las categorías.                 |
| **GET** | `/categories/:id`                 | Obtener una categoría por ID.                 |
| **GET** | `/categories/name/:name`          | Obtener categorías por nombre.                |
| **POST**| `/categories`                     | Agregar una nueva categoría.                  |
| **PUT** | `/categories/:id`                 | Actualizar una categoría existente.           |
| **DELETE**| `/categories/:id`               | Eliminar una categoría.                       |


### Usuarios

| Método  | Endpoint                          | Descripción                                   |
|---------|------------------------------------|-----------------------------------------------|
| **GET** | `/users`                          | Obtener todos los usuarios.                   |
| **POST**| `/users/register`                 | Registrar un nuevo usuario.                   |
| **POST**| `/users/login`                    | Iniciar sesión de un usuario.                 |
| **PUT** | `/users/:id/roles`                | Actualizar los roles de un usuario.           |
| **DELETE**| `/users/:id`                    | Eliminar un usuario.                          |

## Instalación

### Pre-requisitos 

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

  - [Node.js](https://nodejs.org/) versión 14 o superior
  - [npm](https://www.npmjs.com/) 
  - Base de datos [MongoDB](https://www.mongodb.com/es)


#### 1. Clona el repositorio:

Aquí esta el repositorio del proyecto.[Repositorio del proyecto](https://github.com/Kiger22/WorldTourBBDD)

#### 2. Instala dependencias

```
>npm install
```
#### 3. Crear archivo _**.env**_

En nuestro caso ya lo proporcionamos en el repositorio del proyecto

    BD_URL = <tu_conexión_mongodb>  
    JWT_SECRET = <tu_secreto_jwt>  
    PORT = 3000

#### 4. Inicia wl servidor

```
>npm run dev
```

## Ejecutando las pruebas 

_Para probar que la base de datos y sus controladores funcionan correctamente hemos utilizado [INSOMNIA](https://insomnia.rest/)_

## Tecnologías Utilizadas

* [Node.js](https://nodejs.org/en) 
* [MongoDB](https://www.mongodb.com/es) -Plataforma de BBDD
* [Express](https://expressjs.com/es/): Framework de servidor para Node.js.
* [Mongoose](): ODM para MongoDB.
* [Bcrypt](): Para el hashing de contraseñas.
* [Dotenv](): Para la gestión de variables de entorno.
* [JWT (JsonWebToken)](): Para la autenticación basada en tokens.
* [Nodemon](): Para el reinicio automático del servidor durante el desarrollo.

## Autores 

_Este proyecto Esta realizado por Guillermo Mendoza_

* **Kiger22** - *Proyecto* - [LinkedIn](www.linkedin.com/in/guillermo-mendoza-costa-46a87744)

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

- Haz un fork del repositorio.
- Crea una nueva rama para tu funcionalidad (git checkout -b nueva-funcionalidad).
- Haz commit de tus cambios (git commit -m 'Añadir nueva funcionalidad').
- Haz push a la rama (git push origin nueva-funcionalidad).
- Abre un Pull Request.

## Licencia 

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 

* Rock the Code  
* Gracias por las contribuciones, feedback y correcciones.

---


##### ⌨️ por [kiger22](https://github.com/Kiger22) 