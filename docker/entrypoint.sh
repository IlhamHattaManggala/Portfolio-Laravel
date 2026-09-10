#!/bin/sh
set -e

# Ensure required storage directories exist
mkdir -p /var/www/html/storage/app/public \
         /var/www/html/storage/framework/cache \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Execute storage link if not already present
if [ ! -L /var/www/html/public/storage ]; then
    echo "Creating storage link..."
    php artisan storage:link --force || true
fi

# Run optimization if running in production mode and APP_KEY is available
if [ "$APP_ENV" = "production" ] && [ -n "$APP_KEY" ]; then
    echo "Running production optimizations..."
    php artisan config:cache || true
    php artisan route:cache || true
    php artisan view:cache || true
fi

# Execute passed command
exec "$@"
