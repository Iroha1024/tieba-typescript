<template>
    <div class="home-special-follow">
        <div class="article-list">
            <ba-article v-for="(article, index) of article_list" :key="index" :article="article"></ba-article>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Article, Ba } from '@/interface/';
import BaArticle from '../ba/baArticle.vue';

@Component({
    components: {
        BaArticle
    }
})
export default class HomeSpecialFollow extends Vue {

    //帖子列表
    article_list: Article[] | [] = [];
    ba_list: Ba[] | [] = [];
    special_ba_list: number[] = [];

    created() {
        this.getUserBaListfromSession();
        this.getSpecialBaList();
        this.requestArticleList();
    }

    //获取用户关注列表
    getUserBaListfromSession() {
        this.ba_list = JSON.parse(<string>sessionStorage.getItem('ba_list'));
    }

    //获取特殊关注的吧的id
    getSpecialBaList() {
        if (!this.ba_list.length) return;
        this.ba_list.forEach(ba => {
            if (ba.special) {
                this.special_ba_list.push(ba.id);
            }
        })
    }

     //请求帖子
    requestArticleList() {
        if (!this.special_ba_list.length) return;
        this.$axios.post(this.$api.GET_SPECIAL_FOLLOW_ARTICLE_LIST, {
            id_list: this.special_ba_list
        })
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
