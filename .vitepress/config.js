import { defineConfig  } from 'vitepress'
import { getPosts } from './theme/serverUtils'

import { readdirSync, writeFileSync } from 'fs';
import { log } from 'console';

const pageSize = 10

const URL = 'https://mtillmann.blog';

const title = 'Martin\'s Blog';
const description = 'My personal blog about programming, technology, digital freedom and other stuff.'

export default defineConfig({
    title,
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description,
    ignoreDeadLinks: true,
    transformHead: ({pageData}) => {
        
        const head = [
            ['meta', { name: 'twitter:card', content: 'summary' }],
            ['meta', { property: 'og:site_name', content: title }],
            ['meta', { property: 'og:image', content: URL + '/resources/share-icon.jpg' }],
            ['meta', { property: 'og:type', content: 'website' }],
        ];

        



        if(/^index\.md$/.test(pageData.relativePath)){
            head.push(['link', { rel:"canonical", href: "https://mtillmann.blog" }])
            head.push(['meta', { property: 'og:title', content: title }])
            head.push(['meta', { property: 'og:description', content: description }])        
        }else{
            head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
            head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description ?? description}])
            head.push(['meta', { property: 'og:url', content: URL + '/' + pageData.relativePath.replace(/\.md$/, '.html') }])
        }

        return head;
    },
    themeConfig: {
        posts: await getPosts(pageSize),
        website: URL, //copyright link
        comment: {
            repo: 'Mtillmann/mtillmann.github.io',
            themes: 'github-light',
            issueTerm: 'pathname'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Archives', link: '/pages/archives' },
            {
                text: 'Projects',
                items: [
                  { text: 'isit.red', link: '/pages/is-it-red' },
                  //{ text: 'Item B', link: '/item-2' },
                  //{ text: 'Item C', link: '/item-3' }
                ]
              }
            // { text: 'About', link: '/pages/about' },
        ],
        search: {
            provider: 'local',
        },
        outline:[2,3],
        outlineTitle: 'Outline',
        socialLinks: [
            {
                icon: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                    </svg>`
                },
                ariaLabel: 'Privacy Options',
                link: '#',
            },
            {
                icon: 'github',
                link: 'https://github.com/Mtillmann/mtillmann.github.io'
            }]
    },
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

    vite: {
        build: { minify: true },
        server: { port: 5000 }
    },
    sitemap: {
        hostname: URL
    }
})

