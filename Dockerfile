# Imagen base
FROM node:16-alpine

# Instalar dependencias necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Crear un enlace simbólico para python3 -> python si es necesario
RUN if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
