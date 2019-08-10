<template>
    <div class="ba">
        <el-scrollbar style="height: 100%">
            <div class="ba-content">
                <div class="ba-profile">
                    <div class="bg-img">
                        <img v-lazy="ba.bg_img">
                    </div>
                    <div class="ba-img">
                        <img v-lazy="ba.img">
                    </div>
                    <div class="info">
                        <div class="ba-name">{{ ba.name }}吧</div>
                        <el-button type="primary" :class="{'follow-active': follow}" 
                            icon="el-icon-edit" @click="toggleFollow"> 
                            {{ isFollowed }}
                        </el-button>
                        <el-button type="primary" :class="{'follow-active': specialFollow}" 
                            icon="el-icon-share" @click="toggleSpecialFollow">
                            {{ isSpecialFollowed }}
                        </el-button>
                    </div>
                </div>
                <div class="article-list">
                    <ba-article v-for="(article, index) of article_list" :key="index" :article="article"></ba-article>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { User, Ba, Article } from '../interface/';
import BaArticle from '../components/ba/baArticle.vue';

@Component({
    components: {
        BaArticle
    }
})
export default class Tieba extends Vue {
    
    @Prop(String) readonly url!: string;
    @Getter('getLocalUser') getLocalUser!: User;

    //当前贴吧信息
    ba = <Ba>{};
    //缓存中读取用户关注吧信息
    userBaList = [];
    //帖子列表
    article_list: Article[] | [] = [];
    //关注
    follow = false;
    specialFollow = false;

    created() {
        this.requestBaInfo();
        this.getUserBaListfromSession();
        this.requestArticleList();
    }

    //关注按钮
    get isFollowed() {
        if (!this.ba.id) return;
        let flag = this.userBaList.some((ba: Ba): boolean => ba.id === this.ba.id);
        this.follow = flag;
        return flag ? '已关注' : '关注';
    }

    //特别关注按钮
    get isSpecialFollowed() {
        if (!this.ba.id) return;
        let flag: Ba[] = this.userBaList.filter((ba: Ba) => ba.id === this.ba.id);
        if (!flag[0]) {
            this.specialFollow = false;
            return '特殊关注';
        }
        this.specialFollow = <boolean>flag[0].special;
        return flag[0].special ? '已特殊关注' : '特殊关注';
    }

    //请求吧信息
    requestBaInfo() {
        this.$axios.get(this.$api.GET_BA_INFO + this.url)
            .then((result) => {
                if (result.data.error) {
                    this.$router.push({ name: 'error', params: { type: 'ba' } });
                    return;
                }
                this.ba = <Ba>result.data.ba;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //获取用户关注列表
    getUserBaListfromSession() {
        this.userBaList = JSON.parse(<string>sessionStorage.getItem('ba_list'));
    }

    //关注
    toggleFollow() {
        let ba_id = this.ba.id;
        let user_id = this.getLocalUser.id;
        this.$axios.get(this.$api.FOLLOW, {
            params: {
                ba_id,
                user_id
            }
        })
        .then((result) => {
            //关注后，再次请求关注列表
            if (result.data.success) {
                this.requestBaList();
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    //特别关注
    toggleSpecialFollow() {
        let ba_id = this.ba.id;
        let user_id = this.getLocalUser.id;
        this.$axios.get(this.$api.SPECIAL_FOLLOW, {
            params: {
                ba_id,
                user_id
            }
        })
        .then((result) => {
            //关注后，再次请求关注列表
            if (result.data.success) {
                this.requestBaList();
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    //请求关注吧列表
    requestBaList() {
        this.$axios.get(this.$api.GET_BA_LIST + this.getLocalUser.id)
        .then((result) => {
            let ba_list: Ba[] | [] = result.data.ba_list;
            sessionStorage.setItem('ba_list', JSON.stringify(ba_list));
            this.userBaList = JSON.parse(<string>sessionStorage.getItem('ba_list'));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    //请求帖子
    requestArticleList() {
        this.$axios.get(this.$api.GET_ARTICLE_LIST + this.url)
        .then((result) => {
            this.article_list = result.data.article_list;
        })
        .catch((err) => {
            console.log(err);
        });
        // let a = {
        //     id: 1,
        //     content: "2019DOTA2国际邀请赛（以下简称TI9）是全体DOTA2玩家的盛大聚会，届时将有无数DOTA2玩家前往赛事举办地梅赛德斯-奔驰文化中心。继玩家前往比赛场馆的重要换乘站——世纪大道地铁站后，近日，乘地铁前往梅赛德斯-奔驰文化中心的必经站点中华艺术宫地铁站也已完成DOTA2风格装扮，让玩家踏出地铁，就沉浸在DOTA2的世界之中，感受到DOTA2国际邀请赛的独特氛围！[https://imgsa.baidu.com/forum/w%3D580/sign=c0fda135af44ad342ebf878fe0a00c08/e3935ba98226cffc4fc9bc6ab7014a90f403ea59.jpg]本次完成DOTA2国际邀请赛主题装扮的是中华艺术宫地铁站，是上海轨道交通8号线的重要一站。本站4号口直通TI9主赛事场馆梅赛德斯-奔驰文化中心，是前往观看TI9的必经一站。目前，地铁站以换上了DOTA2主题的宣传内容，不仅会让DOTA2玩家体会到越来越浓的国际邀请赛气氛，也吸引了众多市民来了解TI9和DOTA2！[https://imgsa.baidu.com/forum/w%3D580/sign=51d6dd2cb94543a9f51bfac42e158a7b/c9c0e5faaf51f3de5640babc9aeef01f3829794a.jpg]“以热血铸梦想，以荣耀塑辉煌，DOTA2，这一次我将跟随你的脚步，一起拼到底，赢下去。”[https://imgsa.baidu.com/forum/w%3D580/sign=a7349b86d3c451daf6f60ce386ff52a5/31ee14d7912397dd1da59bdc5782b2b7d2a28764.jpg]",
        //     title: "这是我们的主场，上海地铁中华艺术宫站期待"
        // }
        // this.article_list = [
        //     a,
        //     a,
        //     a,
        //     a,
        //     a,
        //     a,
        //     a,
        //     a,
        // ]
    }

}
</script>

<style lang="scss" scoped>
    .ba {
        @include page-height;
        .ba-content {
            @include layout;
            .ba-profile {
                position: relative;
                background-color: $bg-color;
                .bg-img {
                    width: 100%;
                    height: 150px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
                .ba-img {
                    position: absolute;
                    top: 100px;
                    left: 30px;
                    padding: 5px;
                    background: #fff;
                    border-radius: 5px;
                    img {
                        width: 100px;
                    }
                }
                .info {
                    position: relative;
                    margin-left: 150px;
                    padding: 30px 20px;
                    .ba-name {
                        font-size: 30px;
                        display: inline-block;
                    }
                    .el-button {
                        display: inline-block;
                        vertical-align: top;
                        margin-left: 30px;
                    }
                    .follow-active {
                        background-color: #4bd277;
                        border-color: #4bd277;
                    }
                }
            }
        }
    }
</style>