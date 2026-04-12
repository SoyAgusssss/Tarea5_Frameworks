FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

EXPOSE 10000

CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-10000}
