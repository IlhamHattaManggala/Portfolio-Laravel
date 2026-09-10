import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import projects from './projects'
import blogs from './blogs'
import messages from './messages'
import experience from './experience'
import certificates from './certificates'
import skills from './skills'
import testimonials from './testimonials'
import settings from './settings'
/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminController::dashboard
 * @see app/Http/Controllers/Admin/AdminController.php:16
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
projects: Object.assign(projects, projects),
blogs: Object.assign(blogs, blogs),
messages: Object.assign(messages, messages),
experience: Object.assign(experience, experience),
certificates: Object.assign(certificates, certificates),
skills: Object.assign(skills, skills),
testimonials: Object.assign(testimonials, testimonials),
settings: Object.assign(settings, settings),
}

export default admin