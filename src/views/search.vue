<template>
    <div class="search">
        <el-scrollbar style="height: 100%">
            <div class="search-content">
                <div class="ba">
                    <p class="desc">吧</p>
                    <div class="ba-list">
                        <ba-profile v-for="(ba, index) of ba_list" :key="index" :ba="ba"></ba-profile>
                    </div>
                    <p v-if="!ba_list.length" class="info">无搜索内容</p>
                </div>
                <hr>
                <div class="article">
                    <p class="desc">帖子</p>
                    <div class="article-list">
                        <ba-article v-for="(article, index) of article_list" :key="index" :article="article"></ba-article>
                    </div>
                    <p v-if="!article_list.length" class="info">无搜索内容</p>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import BaArticle from '../components/ba/baArticle.vue';
import BaProfile from '../components/follow/followBa/baProfile.vue';
import { Article, Ba } from '@/interface/';

@Component({
    components: {
        BaArticle,
        BaProfile
    }
})
export default class Search extends Vue {

    @Prop() keyword!: string;

    ba_list: Ba[] | [] = [];
    article_list: Article[] | [] = [];

    created() {
        this.search();
    }

    //跳转到贴吧页面
    linkToBa(url: string) {
        this.$router.push({ path: `/ba/${url}`});
    }

    //查询
    search() {
        this.$axios.get(this.$api.SEARCH + this.keyword)
        .then((result) => {
            this.ba_list = result.data.ba_list;
            this.article_list = result.data.article_list;
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    //离开搜索内容页面，清空搜索框
    beforeRouteLeave (to: any, from: any, next: any) {
        (<HTMLInputElement>document.getElementById('search')).value = '';
        next();
    }

}
</script>

<style lang="scss" scoped>
    .search {
        @include view-height;
        .search-content {
            @include layout;
            .ba-list {
                .ba-item {
                    width: fit-content;
                    height: 60px;
                    margin: 20px;
                    cursor: pointer;
                    background-color: #e4e4e4d6;
                    border-radius: 10px;
                    display: inline-block;
                    img {
                        display: inline-block;
                        height: 100%;
                    }
                    p {
                        display: inline-block;
                        padding: 0 20px;
                        max-width: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .desc {
                font-size: 30px;
                padding-left: 20px;
            }
            hr {
                margin: 30px 20px;
                border: none;   
                border-top: 1px solid $border-color;
            }
            .info {
                font-size: 20px;
                padding: 40px 20px 10px;
            }
        }
    }
</style>
