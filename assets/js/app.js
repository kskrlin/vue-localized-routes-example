window._ = require('lodash');

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {}
})

import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store)

const i18n = Vue.i18n

import translationsEn from './locales/en.json'
import translationsHr from './locales/hr.json'

i18n.add('en', translationsEn)
i18n.add('hr', translationsHr)
i18n.set('en')
i18n.fallback('en')

// Core
import App from './components/App.vue'
import Navbar from './components/Navbar.vue'
import MainFooter from './components/Footer.vue'
// Pages
import Page from './components/views/Page.vue'
import HomePage from './components/views/Home.vue'
import AboutPage from './components/views/About.vue'
import ContactPage from './components/views/Contact.vue'
import NotFoundPage from './components/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        alias: '/:locale'
    },
    /**
     * UNTRANSLATED ROUTES
     * 
     * This will always set route path according to default locale
     * and it will be the same for every localized route.
     * 
     * This is goto approach if you don't need translated route names
     * 
     * Example: /en/about, /hr/about, /es/about, ...
     */
    // {
    //     path: '/:locale/' + i18n.translate('routes.about'),
    //     name: 'about',
    //     component: AboutPage
    // },
    // {
    //     path: '/:locale/' + i18n.translate('routes.contact'),
    //     name: 'about',
    //     component: ContactPage
    // },

    /**
     * TRANSLATED ROUTES
     * 
     * This is little bit of an experimental hack solution,
     * and it is simple for smaller amount of routes.
     * 
     * Required to do:
     * - set path for every language (en, hr)
     * - create dummy component which will contain view-router element (Page.vue)
     * - set children with translated path names
     * - set name in format {locale.routeName}
     * 
     * This can be done with the foreach loop to simplify the setup code
     * 
     * Example: /en/about, /hr/o-nama, /es/acerca-de, ...
     */
    {
        path: '/en',
        component: Page,
        children: [
            {
                path: i18n.translateIn('en', 'routes.about'),
                name: 'en.about',
                component: AboutPage
            },
            {
                path: i18n.translateIn('en', 'routes.contact'),
                name: 'en.contact',
                component: ContactPage
            }
        ]
    },
    {
        path: '/hr',
        component: Page,
        children: [
            {
                path: i18n.translateIn('hr', 'routes.about'),
                name: 'hr.about',
                component: AboutPage
            },
            {
                path: i18n.translateIn('hr', 'routes.contact'),
                name: 'hr.contact',
                component: ContactPage
            }
        ]
    },
    {
        path: '/:locale/*',
        name: 'not-found',
        component: NotFoundPage
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        //
    },
    mode: 'history'
})

window.router = router

/**
 * Fetch correct route based on language and route name
 */
router.beforeEach((to, from, next) => {
    let locale = '',
        localeUrlSegment = to.path.split('/'),
        currentLocale = i18n.locale()

    // Get locale from path
    localeUrlSegment.shift()
    locale = localeUrlSegment[0]

    // Locale fallback
    if (locale === '') locale = currentLocale

    // Set locale
    i18n.set(locale)
    to.params.locale = locale

    // Move on the next hook (render component view)
    next()
})

const app = new Vue({
    el: '#app',
    components: {
        App,
        Navbar,
        MainFooter
    },
    data: {},
    computed: {},
    methods: {},
    router
});