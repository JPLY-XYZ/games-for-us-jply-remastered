#!/bin/bash


# Ir al directorio del proyecto
cd games-for-us-jply-remastered/

# Instalar dependencias del proyecto
npm install

# Configurar el archivo .env (esto lo debes hacer manualmente)
nano .env

# Construir la aplicación Next.js
npm run build

# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar la aplicación con PM2
pm2 start npm --name "nextjs-app" -- start

# Guardar el estado de PM2 para reinicios del sistema
pm2 save

# Configurar PM2 para iniciar automáticamente con el sistema
pm2 startup

# Instalar Nginx
sudo yum install nginx -y

# Iniciar el servicio Nginx
sudo systemctl start nginx

# Habilitar Nginx para que inicie al arrancar
sudo systemctl enable nginx

# Verificar el estado de Nginx
sudo systemctl status nginx

# Editar configuración de Nginx (esto lo deberías ajustar a tu necesidad)
sudo nano /etc/nginx/nginx.conf

# Reiniciar Nginx para aplicar los cambios
sudo systemctl restart nginx

# Verificar el estado de PM2
pm2 list

# Obtener la IP pública de la instancia EC2
curl http://checkip.amazonaws.com
