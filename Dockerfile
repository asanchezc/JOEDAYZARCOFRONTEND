FROM nginx:1.11-alpine

# Se agregan metadatos a la imagen
LABEL Descripción="Web Arco Inkafarma" Autor="Arquitectura" Versión="v1.0.0"
WORKDIR /
RUN cd var && mkdir www && cd www && mkdir html && cd html && mkdir arco-inkafarma
WORKDIR /
RUN mkdir certificados && cd certificados && mkdir arco.inkafarma.com.pe
WORKDIR /
RUN rm -r /etc/nginx/nginx.conf && rm -r /etc/nginx/conf.d/default.conf
COPY docker/certificados/arco.inkafarma.com.pe /certificados/arco.inkafarma.com.pe
COPY docker/nginx/nginx.conf /etc/nginx/
COPY docker/nginx/arco.conf /etc/nginx/conf.d/
# Se copian los ficheros hacia la carpeta de nginx
COPY dist/arco-inkafarma /var/www/html/arco-inkafarma
