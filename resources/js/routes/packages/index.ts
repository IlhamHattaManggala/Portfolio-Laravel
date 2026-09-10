import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
export const show = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/packages/{vendor}/{package}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
show.url = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    vendor: args[0],
                    package: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vendor: args.vendor,
                                package: args.package,
                }

    return show.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace('{package}', parsedArgs.package.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
show.get = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
show.head = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
    const showForm = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
        showForm.get = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::show
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
        showForm.head = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const packages = {
    show: Object.assign(show, show),
}

export default packages