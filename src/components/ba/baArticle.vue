<template>
    <div class="ba-article">
        <div class="title">{{ article.title }}</div>
        <!-- <router-link class="title">{{ article.title }}</router-link> -->
        <div class="article-content">{{ article.content | content }}</div>
        <div class="img-list">
            <img v-lazy="img" v-for="(img, index) of img_list" :key="index" v-if="index < 3">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Article } from '../../interface/';

@Component({
    filters: {
        //将含有图片的字符串过滤
        content(val: string) {
            return val.replace(/\[(.+?)\]/g, '');
        }
    }
})
export default class BaArticle extends Vue {

    @Prop() article!: Article;

    img_list = <string[]>[];

    created() {
        this.getImgList();
    }

    getImgList() {
        let img_list = this.article.content.match(/\[(.+?)\]/g);
        if (!img_list) return;
        img_list.forEach(img => {
            img = img.substring(1, img.length - 1);
            this.img_list.push(img);
        })
    }
}
</script>

<style lang="scss" scoped>
    .ba-article {
        margin-top: 10px;
        padding: 20px;
        border-bottom: 1px solid $border-color;
        .title {
            font-size: 30px;
            padding-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .article-content {
            font-size: 20px;
            padding-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .img-list {
            img {
                height: 150px;
                margin-right: 20px;
                max-width: 200px;
                object-fit: cover;
            }
        }
    }
</style>
