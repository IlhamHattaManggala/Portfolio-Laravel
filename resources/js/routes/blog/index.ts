import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/blog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
export const show = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/blog/{blog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
show.url = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { blog: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    blog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        blog: typeof args.blog === 'object'
                ? args.blog.slug
                : args.blog,
                }

    return show.definition.url
            .replace('{blog}', parsedArgs.blog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
show.get = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
show.head = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
    const showForm = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
        showForm.get = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
        showForm.head = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const blog = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default blog