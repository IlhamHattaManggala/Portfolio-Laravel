import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CertificateController::bulkDestroy
 * @see app/Http/Controllers/Admin/CertificateController.php:85
 * @route '/admin/certificates/bulk-destroy'
 */
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDestroy.url(options),
    method: 'post',
})

bulkDestroy.definition = {
    methods: ["post"],
    url: '/admin/certificates/bulk-destroy',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::bulkDestroy
 * @see app/Http/Controllers/Admin/CertificateController.php:85
 * @route '/admin/certificates/bulk-destroy'
 */
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::bulkDestroy
 * @see app/Http/Controllers/Admin/CertificateController.php:85
 * @route '/admin/certificates/bulk-destroy'
 */
bulkDestroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDestroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::bulkDestroy
 * @see app/Http/Controllers/Admin/CertificateController.php:85
 * @route '/admin/certificates/bulk-destroy'
 */
    const bulkDestroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkDestroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::bulkDestroy
 * @see app/Http/Controllers/Admin/CertificateController.php:85
 * @route '/admin/certificates/bulk-destroy'
 */
        bulkDestroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkDestroy.url(options),
            method: 'post',
        })
    
    bulkDestroy.form = bulkDestroyForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CertificateController::index
 * @see app/Http/Controllers/Admin/CertificateController.php:12
 * @route '/admin/certificates'
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
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CertificateController::create
 * @see app/Http/Controllers/Admin/CertificateController.php:30
 * @route '/admin/certificates/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::store
 * @see app/Http/Controllers/Admin/CertificateController.php:35
 * @route '/admin/certificates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::store
 * @see app/Http/Controllers/Admin/CertificateController.php:35
 * @route '/admin/certificates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::store
 * @see app/Http/Controllers/Admin/CertificateController.php:35
 * @route '/admin/certificates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::store
 * @see app/Http/Controllers/Admin/CertificateController.php:35
 * @route '/admin/certificates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::store
 * @see app/Http/Controllers/Admin/CertificateController.php:35
 * @route '/admin/certificates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
export const show = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
show.url = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: args.certificate,
                }

    return show.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
show.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
show.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
    const showForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
        showForm.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CertificateController::show
 * @see app/Http/Controllers/Admin/CertificateController.php:0
 * @route '/admin/certificates/{certificate}'
 */
        showForm.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
export const edit = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
edit.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return edit.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
edit.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
edit.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
    const editForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
        editForm.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CertificateController::edit
 * @see app/Http/Controllers/Admin/CertificateController.php:53
 * @route '/admin/certificates/{certificate}/edit'
 */
        editForm.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
export const update = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
update.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return update.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
update.put = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
update.patch = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
    const updateForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
        updateForm.put = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CertificateController::update
 * @see app/Http/Controllers/Admin/CertificateController.php:60
 * @route '/admin/certificates/{certificate}'
 */
        updateForm.patch = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
 * @see app/Http/Controllers/Admin/CertificateController.php:78
 * @route '/admin/certificates/{certificate}'
 */
export const destroy = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
 * @see app/Http/Controllers/Admin/CertificateController.php:78
 * @route '/admin/certificates/{certificate}'
 */
destroy.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return destroy.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
 * @see app/Http/Controllers/Admin/CertificateController.php:78
 * @route '/admin/certificates/{certificate}'
 */
destroy.delete = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
 * @see app/Http/Controllers/Admin/CertificateController.php:78
 * @route '/admin/certificates/{certificate}'
 */
    const destroyForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CertificateController::destroy
 * @see app/Http/Controllers/Admin/CertificateController.php:78
 * @route '/admin/certificates/{certificate}'
 */
        destroyForm.delete = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const certificates = {
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default certificates