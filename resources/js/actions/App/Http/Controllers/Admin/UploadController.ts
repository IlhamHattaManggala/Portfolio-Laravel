import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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
const UploadController = { upload }

export default UploadController