# Etapa 1: Construir a aplicação
FROM node:16-alpine AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir a aplicação
FROM node:16-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos construídos da etapa de build
COPY --from=build /app/dist /app/dist

# Instalar um servidor HTTP simples
RUN npm install -g serve

# Expor a porta 5000
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist", "-l", "5000"]