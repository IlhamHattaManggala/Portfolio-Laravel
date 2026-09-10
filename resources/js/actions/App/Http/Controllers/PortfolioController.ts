import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::index
 * @see app/Http/Controllers/PortfolioController.php:22
 * @route '/'
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
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
export const indexBlog = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexBlog.url(options),
    method: 'get',
})

indexBlog.definition = {
    methods: ["get","head"],
    url: '/blog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
indexBlog.url = (options?: RouteQueryOptions) => {
    return indexBlog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
indexBlog.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexBlog.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
indexBlog.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexBlog.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
    const indexBlogForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexBlog.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
        indexBlogForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexBlog.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::indexBlog
 * @see app/Http/Controllers/PortfolioController.php:259
 * @route '/blog'
 */
        indexBlogForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexBlog.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexBlog.form = indexBlogForm
/**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
export const showBlog = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBlog.url(args, options),
    method: 'get',
})

showBlog.definition = {
    methods: ["get","head"],
    url: '/blog/{blog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
showBlog.url = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return showBlog.definition.url
            .replace('{blog}', parsedArgs.blog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
showBlog.get = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showBlog.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
showBlog.head = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showBlog.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
    const showBlogForm = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showBlog.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
        showBlogForm.get = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showBlog.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::showBlog
 * @see app/Http/Controllers/PortfolioController.php:277
 * @route '/blog/{blog}'
 */
        showBlogForm.head = (args: { blog: string | { slug: string } } | [blog: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showBlog.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showBlog.form = showBlogForm
/**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
export const showPackage = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPackage.url(args, options),
    method: 'get',
})

showPackage.definition = {
    methods: ["get","head"],
    url: '/packages/{vendor}/{package}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
showPackage.url = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions) => {
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

    return showPackage.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace('{package}', parsedArgs.package.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
showPackage.get = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPackage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
showPackage.head = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPackage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
    const showPackageForm = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showPackage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
        showPackageForm.get = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showPackage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::showPackage
 * @see app/Http/Controllers/PortfolioController.php:286
 * @route '/packages/{vendor}/{package}'
 */
        showPackageForm.head = (args: { vendor: string | number, package: string | number } | [vendor: string | number, packageParam: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showPackage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showPackage.form = showPackageForm
/**
* @see \App\Http\Controllers\PortfolioController::storeMessage
 * @see app/Http/Controllers/PortfolioController.php:399
 * @route '/contact'
 */
export const storeMessage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMessage.url(options),
    method: 'post',
})

storeMessage.definition = {
    methods: ["post"],
    url: '/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortfolioController::storeMessage
 * @see app/Http/Controllers/PortfolioController.php:399
 * @route '/contact'
 */
storeMessage.url = (options?: RouteQueryOptions) => {
    return storeMessage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::storeMessage
 * @see app/Http/Controllers/PortfolioController.php:399
 * @route '/contact'
 */
storeMessage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMessage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PortfolioController::storeMessage
 * @see app/Http/Controllers/PortfolioController.php:399
 * @route '/contact'
 */
    const storeMessageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeMessage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::storeMessage
 * @see app/Http/Controllers/PortfolioController.php:399
 * @route '/contact'
 */
        storeMessageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeMessage.url(options),
            method: 'post',
        })
    
    storeMessage.form = storeMessageForm
/**
* @see \App\Http\Controllers\PortfolioController::storeTestimonial
 * @see app/Http/Controllers/PortfolioController.php:412
 * @route '/testimonials'
 */
export const storeTestimonial = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTestimonial.url(options),
    method: 'post',
})

storeTestimonial.definition = {
    methods: ["post"],
    url: '/testimonials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortfolioController::storeTestimonial
 * @see app/Http/Controllers/PortfolioController.php:412
 * @route '/testimonials'
 */
storeTestimonial.url = (options?: RouteQueryOptions) => {
    return storeTestimonial.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::storeTestimonial
 * @see app/Http/Controllers/PortfolioController.php:412
 * @route '/testimonials'
 */
storeTestimonial.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeTestimonial.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PortfolioController::storeTestimonial
 * @see app/Http/Controllers/PortfolioController.php:412
 * @route '/testimonials'
 */
    const storeTestimonialForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeTestimonial.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::storeTestimonial
 * @see app/Http/Controllers/PortfolioController.php:412
 * @route '/testimonials'
 */
        storeTestimonialForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeTestimonial.url(options),
            method: 'post',
        })
    
    storeTestimonial.form = storeTestimonialForm
/**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
export const terminalData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terminalData.url(options),
    method: 'get',
})

terminalData.definition = {
    methods: ["get","head"],
    url: '/api/terminal-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
terminalData.url = (options?: RouteQueryOptions) => {
    return terminalData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
terminalData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terminalData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
terminalData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terminalData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
    const terminalDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terminalData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
        terminalDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terminalData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::terminalData
 * @see app/Http/Controllers/PortfolioController.php:440
 * @route '/api/terminal-data'
 */
        terminalDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terminalData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terminalData.form = terminalDataForm
/**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
export const sitemap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/sitemap.xml',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
sitemap.url = (options?: RouteQueryOptions) => {
    return sitemap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
sitemap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
sitemap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
    const sitemapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sitemap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
        sitemapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::sitemap
 * @see app/Http/Controllers/PortfolioController.php:452
 * @route '/sitemap.xml'
 */
        sitemapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sitemap.form = sitemapForm
const PortfolioController = { index, indexBlog, showBlog, showPackage, storeMessage, storeTestimonial, terminalData, sitemap }

export default PortfolioController