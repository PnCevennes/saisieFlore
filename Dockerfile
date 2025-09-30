# Utilise une image officielle Apache avec PHP 7.4
FROM php:7.4-apache

# Installe les extensions PHP nécessaires
RUN apt-get update &&  apt-get install -y libpq-dev \
    && docker-php-ext-install pgsql


# Active le module Apache rewrite
RUN a2enmod rewrite

# Copie les fichiers de l'application dans le conteneur
COPY . /var/www/html/

# Donne les bons droits
RUN chown -R www-data:www-data /var/www/html

# Modifier les limites d'upload
# Supprimer les warnings dans la configuration PHP
RUN echo "upload_max_filesize = 50M" >> /usr/local/etc/php/php.ini \
    && echo "post_max_size = 50M" >> /usr/local/etc/php/php.ini \
    && echo "error_reporting = E_ALL & ~E_WARNING & ~E_NOTICE" >> /usr/local/etc/php/php.ini \
    && echo "display_errors = Off" >> /usr/local/etc/php/php.ini

# Définit le répertoire de travail
WORKDIR /var/www/html

# Expose le port 80
EXPOSE 80
