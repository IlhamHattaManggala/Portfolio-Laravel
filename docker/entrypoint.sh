#!/bin/bash
set -e

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating Application Key..."
    php artisan key:generate --force
fi

# Run storage link
echo "Creating storage link..."
php artisan storage:link --force || true

# Run database migrations & seeders
echo "Running database migrations..."
php artisan migrate --force

if [ "$RUN_SEEDER" = "true" ]; then
    echo "Seeding database..."
    php artisan db:seed --force
fi

# Optimize Laravel cache in production
if [ "$APP_ENV" = "production" ]; then
    echo "Caching configurations..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "Starting Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
