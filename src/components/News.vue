<template lang="pug">
.section.news
    .header
        .group
            h1.title News
    .content
        .article(v-for="article in articles")
            h2.title {{formatTitle(article.title)}}
            h3.date {{formatDate(article.pubDate)}}
            p.summary {{formatDescription(article.description)}}
            a.link(:href="article.link" target="_blank")
                span Read On
                svg(viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg")
                    path(d="M12.17 7L8.59 10.59L10 12L16 6L10 0L8.59 1.41L12.17 5H0V7H12.17Z")
</template>


<script>
import SocialNetworks from '@/configuration/SocialNetworks'

export default {
    name: "Statistics",
    data() {
        return {
            articles: []
        }
    },
    async created() {
        this.getMediumData()
    },
    methods: {
        async getMediumData() {
            const RSSUrl = `https://medium.com/feed/${SocialNetworks.medium.account}`;
            const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;

            try {
                const response = await fetch(RSSConverter)
                const data = await response.json()
                this.articles = data.items.slice(0, 3)
            } catch (error) {
                console.error(error)
            }
        },
        formatDate(date) {
            const tmp = new Date(date.replace(/-/g, "/"))
            const months = {
                0: 'Jan',
                1: 'Feb',
                2: 'Mar',
                3: 'Apr',
                4: 'May',
                5: 'Jun',
                6: 'Jul',
                7: 'Aug',
                8: 'Sep',
                9: 'Oct',
                10: 'Nov',
                11: 'Dec'
            }
            return `${months[tmp.getMonth()]} ${tmp.getDate()} ${tmp.getFullYear()}`
        },
        formatDescription(description) {
            description = description.split('</h3>').slice(1).join('')
            const tmp = document.createElement("DIV")
            tmp.innerHTML = description
            return tmp.textContent || tmp.innerText || ""
        },
        formatTitle(title) {
            const tmp = new DOMParser().parseFromString(title, "text/html");
            return tmp.documentElement.textContent
        }
    }
}
</script>

<style lang="scss">
.section.news {
    .content {
        .article {
            width: 30%;
            text-decoration: none;

            @media (max-width:750px){
                width: 100%;
                max-width: 524px;
                margin : auto;
            }

            h2.title {
                font-size: 22px;
            }

            p.summary {
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: justify;
                margin-top: 8px;
            }

            a.link {
                text-decoration: none;
                display: flex;
                margin-top: 20px;
                gap: 10px;
                grid-gap: 10px;

                span {
                    font-family: "Roboto", sans-serif;
                    color: $primary-color;
                    font-size: 14px;
                }

                svg {
                    width: 16px;
                    transition: 0.4s;

                    &:hover {
                        transform: translateX(5px);
                    }

                    path {
                        fill: $primary-color
                    }
                }
            }
            
        }
    }
}
</style>
