# Utiliza la imagen oficial de Node.js
FROM node:20

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación (asegúrate de incluir el archivo package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación NestJS está escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
