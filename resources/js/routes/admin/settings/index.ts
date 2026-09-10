import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SettingController::index
 * @see app/Http/Controllers/Admin/SettingController.php:15
 * @route '/admin/settings'
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
* @see \App\Http\Controllers\Admin\SettingController::update
 * @see app/Http/Controllers/Admin/SettingController.php:23
 * @route '/admin/settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::update
 * @see app/Http/Controllers/Admin/SettingController.php:23
 * @route '/admin/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::update
 * @see app/Http/Controllers/Admin/SettingController.php:23
 * @route '/admin/settings'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SettingController::update
 * @see app/Http/Controllers/Admin/SettingController.php:23
 * @route '/admin/settings'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingController::update
 * @see app/Http/Controllers/Admin/SettingController.php:23
 * @route '/admin/settings'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\SettingController::uploadResume
 * @see app/Http/Controllers/Admin/SettingController.php:41
 * @route '/admin/settings/upload-resume'
 */
export const uploadResume = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadResume.url(options),
    method: 'post',
})

uploadResume.definition = {
    methods: ["post"],
    url: '/admin/settings/upload-resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::uploadResume
 * @see app/Http/Controllers/Admin/SettingController.php:41
 * @route '/admin/settings/upload-resume'
 */
uploadResume.url = (options?: RouteQueryOptions) => {
    return uploadResume.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::uploadResume
 * @see app/Http/Controllers/Admin/SettingController.php:41
 * @route '/admin/settings/upload-resume'
 */
uploadResume.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadResume.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SettingController::uploadResume
 * @see app/Http/Controllers/Admin/SettingController.php:41
 * @route '/admin/settings/upload-resume'
 */
    const uploadResumeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadResume.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingController::uploadResume
 * @see app/Http/Controllers/Admin/SettingController.php:41
 * @route '/admin/settings/upload-resume'
 */
        uploadResumeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadResume.url(options),
            method: 'post',
        })
    
    uploadResume.form = uploadResumeForm
/**
* @see \App\Http\Controllers\Admin\SettingController::uploadOgImage
 * @see app/Http/Controllers/Admin/SettingController.php:75
 * @route '/admin/settings/upload-og-image'
 */
export const uploadOgImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadOgImage.url(options),
    method: 'post',
})

uploadOgImage.definition = {
    methods: ["post"],
    url: '/admin/settings/upload-og-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::uploadOgImage
 * @see app/Http/Controllers/Admin/SettingController.php:75
 * @route '/admin/settings/upload-og-image'
 */
uploadOgImage.url = (options?: RouteQueryOptions) => {
    return uploadOgImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::uploadOgImage
 * @see app/Http/Controllers/Admin/SettingController.php:75
 * @route '/admin/settings/upload-og-image'
 */
uploadOgImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadOgImage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SettingController::uploadOgImage
 * @see app/Http/Controllers/Admin/SettingController.php:75
 * @route '/admin/settings/upload-og-image'
 */
    const uploadOgImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadOgImage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingController::uploadOgImage
 * @see app/Http/Controllers/Admin/SettingController.php:75
 * @route '/admin/settings/upload-og-image'
 */
        uploadOgImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadOgImage.url(options),
            method: 'post',
        })
    
    uploadOgImage.form = uploadOgImageForm
const settings = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
uploadResume: Object.assign(uploadResume, uploadResume),
uploadOgImage: Object.assign(uploadOgImage, uploadOgImage),
}

export default settings