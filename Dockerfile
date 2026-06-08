FROM nginx:alpine
COPY --chown=nginx:nginx . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
