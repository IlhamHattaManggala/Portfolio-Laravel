import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
* @see \App\Http\Controllers\Admin\UploadController::upload
 * @see app/Http/Controllers/Admin/UploadController.php:11
 * @route '/api/upload'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/api/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\UploadController::upload
 * @see app/Http/Controllers/Admin/UploadController.php:11
 * @route '/api/upload'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\UploadController::upload
 * @see app/Http/Controllers/Admin/UploadController.php:11
 * @route '/api/upload'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\UploadController::upload
 * @see app/Http/Controllers/Admin/UploadController.php:11
 * @route '/api/upload'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\UploadController::upload
 * @see app/Http/Controllers/Admin/UploadController.php:11
 * @route '/api/upload'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
const api = {
    terminalData: Object.assign(terminalData, terminalData),
upload: Object.assign(upload, upload),
}

export default api