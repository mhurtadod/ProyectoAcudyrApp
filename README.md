# Proyecto - Salvavidas.

## Instala las dependecias de servidor

### `npm install`

## Instala las dependencias de la carpeta client ejecutando el comando en dicha carpeta

### cd client ---> `npm install`

## Conecta tu servidor en en el archivo .env

### `Configura la ruta del servidor, y las claves`

MONGODB_URL =(Coloca la ruta de tu servidor)
ACCESS_TOKEN_SECRET = (Asigna una clave secreta)
REFRESH_TOKEN_SECRET = (Asigna una clave secreta)
ACTIVATION_TOKEN_SECRET = (Asigna una clave secreta)

### `Puedes colocar tus propias claves o ir a la siguiente página para generar claves aleatorias`

https://passwordsgenerator.net/

## Comando para arrancar tanto el servidor como el cliente

### `npm run dev`

## Comando para arrancar solo el servidor

### `npm run server`

## Comando para arrancar solo el cliente

### `npm run client`

### El servidor arranca en la ruta http://localhost:5000 y el cliente en la ruta http://localhost:3000
