import DefaultTheme from 'vitepress/theme-without-fonts'

import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/Comment.vue'
import Title from './components/Title.vue'
import Posts from './components/Posts.vue'
import Link from './components/Link.vue'

import {default as CopyButton, defaultSettings} from 'vitepress-copy-helper'

import 'vitepress-copy-helper/style.css'
import './custom.css'
import './custom.js'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        app.component('Tags', Tags)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Comment', Comment)
        app.component('Title', Title)
        app.component('C', CopyButton)
        app.component('Posts', Posts)
        app.component('Link', Link)
    }
}
