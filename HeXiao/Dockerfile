FROM nginx:stable AS base 
WORKDIR /app
EXPOSE 80

FROM node:14 AS build
WORKDIR /src
COPY . .
RUN npm i
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=build /src/dist/ .
COPY --from=build /src/gateway/default.conf /etc/nginx/conf.d/
