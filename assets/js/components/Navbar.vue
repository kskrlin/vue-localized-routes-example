<template>
    <nav class="navbar navbar-dark bg-dark navbar-expand-sm justify-content-end">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'home', params: { locale: $i18n.locale() }}" v-html="$t('nav.home')"></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{name: $i18n.locale() + '.about', params: { locale: $i18n.locale() }}" v-html="$t('nav.about')"></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{name: $i18n.locale() + '.contact', params: { locale: $i18n.locale() }}" v-html="$t('nav.contact')"></router-link>
            </li>
        </ul>

        <ul class="navbar-nav ml-5">
            <li class="nav-item">
                <a class="nav-link" v-html="$t('string.langEn')" href="#en" @click.prevent="setLocale('en')"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-html="$t('string.langHr')" href="#hr" @click.prevent="setLocale('hr')"></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        setLocale (lang) {
            if (lang == 'en' || lang == 'hr') {
                let routeName = this.$route.name,
                    routeNameParts = routeName.split('.')

                // TODO: Save languages as Set for simpler implementation

                // Set new route name according to locale and current route name
                if (routeNameParts.length == 2 && (routeNameParts[0] == 'en' || routeNameParts[0] == 'hr')) {
                    // Dot "." is required due the mentioned hack
                    // Dot is used instead of dash so we can easily separate locale from name,
                    // because longer route names usually contain dashes
                    routeName = lang + '.' + routeNameParts[1]
                }

                // Set new locale and update route name and url
                this.$i18n.set(lang);
                router.push({name: routeName, params: { locale: lang }});
            }
        }
    }
}
</script>