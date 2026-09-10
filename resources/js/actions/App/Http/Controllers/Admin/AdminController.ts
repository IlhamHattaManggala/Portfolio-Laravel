import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
const dashboard42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

dashboard42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
dashboard42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return dashboard42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
dashboard42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
dashboard42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
    const dashboard42a740574ecbfbac32f8cc353fc32db9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard42a740574ecbfbac32f8cc353fc32db9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
        dashboard42a740574ecbfbac32f8cc353fc32db9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard42a740574ecbfbac32f8cc353fc32db9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/dashboard'
 */
        dashboard42a740574ecbfbac32f8cc353fc32db9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard42a740574ecbfbac32f8cc353fc32db9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard42a740574ecbfbac32f8cc353fc32db9.form = dashboard42a740574ecbfbac32f8cc353fc32db9Form
    /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
const dashboard35f58437d9250c39f332f5e8e70440b7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

dashboard35f58437d9250c39f332f5e8e70440b7.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard35f58437d9250c39f332f5e8e70440b7.url = (options?: RouteQueryOptions) => {
    return dashboard35f58437d9250c39f332f5e8e70440b7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard35f58437d9250c39f332f5e8e70440b7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard35f58437d9250c39f332f5e8e70440b7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
    const dashboard35f58437d9250c39f332f5e8e70440b7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard35f58437d9250c39f332f5e8e70440b7.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
        dashboard35f58437d9250c39f332f5e8e70440b7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard35f58437d9250c39f332f5e8e70440b7.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
        dashboard35f58437d9250c39f332f5e8e70440b7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard35f58437d9250c39f332f5e8e70440b7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard35f58437d9250c39f332f5e8e70440b7.form = dashboard35f58437d9250c39f332f5e8e70440b7Form

export const dashboard = {
    '/dashboard': dashboard42a740574ecbfbac32f8cc353fc32db9,
    '/admin': dashboard35f58437d9250c39f332f5e8e70440b7,
}

const AdminController = { dashboard }

export default AdminController