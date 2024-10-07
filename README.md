# ecommerce_back_1
1º Pre entrega del curso Programación Backend I: Desarrollo Avanzado de Backend - Escotto Michael


# Proyecto de Gestión de Productos y usuarios.

Este proyecto es una API RESTful para la gestión de productos y usuarios, se desarrollo con Node.js y Express. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una colección de productos y usuarios almacenados en un archivo JSON.

## Estructura del Proyecto

-Archivo principal que configura el servidor Express. Incluye middleware para manejar peticiones, rutas y errores su puerto y funcion ready.

-Controlador que gestiona las operaciones relacionadas con los productos y usuarios. Incluye funciones para crear, leer, actualizar y eliminar.
  
-Archivo que almacena en formato .JSON. Contiene un array de objetos, cada uno representando un elemento con sus propiedades.

-Una clase que maneja la lógica. Proporciona métodos para leer desde el archivo JSON, crear nuevos, actualizar ya existentes, y eliminar.

-Middleware para manejar errores. Captura cualquier error que ocurra en la aplicación y devuelve una respuesta JSON con el mensaje de error. Y otro que maneja rutas no encontradas. Devuelve una respuesta JSON con un mensaje de error cuando la ruta solicitada no existe.

-Archivo que define las rutas de la API. Asocia cada ruta con las funciones correspondientes del controlador.

-Se creo otro archivo con una función que genera un ID único para cada nuevo producto o usuario utilizando el módulo `crypto`.