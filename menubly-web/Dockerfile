# build stage
FROM node:16-alpine as build-stage
# pass env name to dockerfile via arg
WORKDIR /app
COPY . .
ARG API_ENDPOINT
ENV REACT_APP_API_ENDPOINT=${API_ENDPOINT}
RUN yarn
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]