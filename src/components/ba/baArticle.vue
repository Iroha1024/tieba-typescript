<template>
    <div class="ba-article">
        <router-link :to="{ path: `/article/${article.id}` }" class="title">{{ article.title }}</router-link>
        <div class="article-content">{{ article.content | content }}</div>
        <div class="img-list">
            <img v-lazy="img" v-for="(img, index) of img_list" :key="index" v-if="index < 3">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Article } from '@/interface/';

@Component({
    filters: {
        //将含有图片的字符串过滤
        content(val: string) {
            return val.replace('{', '').replace('}', '').replace(/\[(.+?)\]/g, '');
        }
    }
})
export default class BaArticle extends Vue {

    @Prop() article!: Article;

    img_list = <string[]>[];

    created() {
        this.getImgList();
    }

    //获取帖子展示图片
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
            display: block;
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
