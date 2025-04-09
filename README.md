# Tienda de Tecnología
## Requisitos
### Tener instalado nodejs v20 o superior.
## Instrucciones
### Cree un archivo de variables de entorno .env en él ponga las siguientes variables
- **DB_HOST:** localhost
- **DB_DATABASE:** nombreBaseDeDatos
- **DB_USERNAME:** nombreDeUsuario
- **DB_PASSWORD:** passwordDelUsuario
### Ejecute npm install para instalar los paquetes necesarios para el proyecto.
### Abra una terminal y ejecute tsc -w para el modo observador de Typescript
### Abra otra terminal y ejecute node ./dist/app para ejecutar el servidor


Rutas del Sistema de Inventario
Rutas de Autenticación
1. Registro de Usuario

URL: http://localhost:10101/api/auth/register
Método: POST
Body:
{
    "username": "usuario1",
    "email": "usuario1@test.com",
    "password": "123456"
}

2. Login

URL: http://localhost:10101/api/auth/login
Método: POST
Body:
{
    "email": "usuario1@test.com",
    "password": "123456"
}
Rutas de Productos (Protegidas)

3. Crear Producto

URL: http://localhost:10101/api/products
Método: POST
Headers: Authorization: Bearer {token}
Body:
{
    "name": "Producto 1",
    "description": "Descripción del producto",
    "price": 99.99,
    "stock": 100,
    "category_id": 1,
    "supplier_id": 1
}

4. Obtener Productos

URL: http://localhost:10101/api/products
Método: GET
Headers: Authorization: Bearer {token}
5. Obtener Producto por ID

URL: http://localhost:10101/api/products/1
Método: GET
Headers: Authorization: Bearer {token}
6. Actualizar Producto

URL: http://localhost:10101/api/products/1
Método: PUT
Headers: Authorization: Bearer {token}
Body:
{
    "name": "Producto Actualizado",
    "price": 149.99,
    "stock": 200
}

Rutas de Categorías (Protegidas)
7. Crear Categoría

URL: http://localhost:10101/api/categories
Método: POST
Headers: Authorization: Bearer {token}
Body:
{
    "name": "Electrónicos",
    "description": "Productos electrónicos"
}
8. Obtener Categorías

URL: http://localhost:10101/api/categories
Método: GET
Headers: Authorization: Bearer {token}
9. Eliminar Categoría

URL: http://localhost:10101/api/categories/1
Método: DELETE
Headers: Authorization: Bearer {token}
Rutas de Proveedores (Protegidas)
10. Crear Proveedor

URL: http://localhost:10101/api/suppliers
Método: POST
Headers: Authorization: Bearer {token}
Body:
{
    "name": "Proveedor 1",
    "email": "proveedor1@test.com",
    "phone": "1234567890",
    "address": "Dirección del proveedor"
}

11. Obtener Proveedores

URL: http://localhost:10101/api/suppliers
Método: GET
Headers: Authorization: Bearer {token}
12. Obtener Proveedor por ID

URL: http://localhost:10101/api/suppliers/1
Método: GET
Headers: Authorization: Bearer {token}
Notas Importantes:
Reemplazar {token} con el token JWT recibido al hacer login
Todas las rutas protegidas requieren el header de autorización
El puerto usado es 10101
Los IDs en las URLs son ejemplos, usar los IDs reales
Para probar en Thunder Client:
Primero hacer login para obtener el token
Copiar el token recibido
En las rutas protegidas, agregar el header:
Authorization: Bearer {token}

Ejemplo de flujo de prueba:
Registrar usuario
Login para obtener token
Crear categoría
Crear proveedor
Crear producto
Obtener lista de productos