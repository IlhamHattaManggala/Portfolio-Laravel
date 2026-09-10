# ==========================================
# STAGE 1: Frontend Asset Builder (Node.js)
# ==========================================
FROM node:20-alpine AS node-builder
WORKDIR /app

COPY package.json package-lock.json* vite.config.ts tsconfig.json components.json ./
COPY resources ./resources
COPY public ./public

ENV WAYFINDER_DISABLE=true
RUN npm ci && npm run build

# ==========================================
# STAGE 2: Composer Dependency Builder
# ==========================================
FROM composer:2 AS composer-builder
WORKDIR /app

COPY composer.json composer.lock ./
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY routes ./routes
COPY resources ./resources

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist \
    --optimize-autoloader

# ==========================================
# STAGE 3: Production Runtime (PHP 8.3-FPM + Nginx)
# ==========================================
FROM php:8.3-fpm-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    linux-headers \
    curl \
    unzip \
    bash \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        gd \
        bcmath \
        intl \
        zip \
        mbstring \
        pcntl \
        opcache

# Configure OPcache for Production
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
} > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Configure PHP settings for Production
RUN { \
    echo 'upload_max_filesize=50M'; \
    echo 'post_max_size=50M'; \
    echo 'memory_limit=256M'; \
    echo 'max_execution_time=60'; \
    echo 'date.timezone=Asia/Jakarta'; \
} > /usr/local/etc/php/conf.d/custom-php.ini

WORKDIR /var/www/html

# Copy application files from composer-builder
COPY --chown=www-data:www-data . /var/www/html
COPY --from=composer-builder --chown=www-data:www-data /app/vendor /var/www/html/vendor

# Copy built frontend assets from node-builder
COPY --from=node-builder --chown=www-data:www-data /app/public/build /var/www/html/public/build

# Copy Nginx & Supervisord configuration files
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Ensure storage & bootstrap/cache permissions
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
