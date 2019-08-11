<template>
    <div class="home-recommend">
        <div class="article-list">
            <ba-article v-for="(article, index) of article_list" :key="index" :article="article"></ba-article>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Article } from '@/interface/';
import BaArticle from '../ba/baArticle.vue';

@Component({
    components: {
        BaArticle
    }
})
export default class HomeRecommend extends Vue {

    //帖子列表
    article_list: Article[] | [] = [];

    created() {
        this.requestArticleList();
    }

     //请求帖子
    requestArticleList() {
        this.$axios.get(this.$api.GET_RECOMMEND_ARTICLE_LIST)
        .then((result) => {
            this.article_list = result.data.article_list;
        })
        .catch((err) => {
            console.log(err);
        });
    }

}
</script>

<style lang="scss" scoped>

</style>
