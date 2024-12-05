FROM php:8.2-fpm

RUN apt-get update

WORKDIR /quizzapp/src/

CMD php -S  0.0.0.0


EXPOSE 8501