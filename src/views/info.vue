<template>
    <div class="info">
        <el-scrollbar style="height: 100%">
            <div class="info-content">
                <div class="bg-img">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564058188123&di=6200736908c5f90ca9a86f5e09f0ee6b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F15%2F20170715114413_uNWMF.jpeg">
                </div>
                <div class="content">
                    <div class="head-img">
                        <img v-lazy="user.head_img">
                    </div>
                    <div class="profile">
                        <div class="username">{{ user.name }}</div>
                        <div class="edit" v-if="user.id === getLocalUser.id">
                            <el-button type="primary">编辑资料</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="帖子" name="article">
                        <div class="article-list">
                            <ba-article v-for="(article, index) of article_list" :key="index" :article="article"></ba-article>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="其他" name="other">其他</el-tab-pane>
                </el-tabs>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import BaArticle from '../components/ba/baArticle.vue';
import { User, Article } from '../interface/';

@Component({
    components: {
        BaArticle
    }
})
export default class Info extends Vue {

    @Prop() id!: string;

    @Getter('getLocalUser') getLocalUser!: User;

    activeName = 'article'
    user = <User>{};
    article_list: Article[] | [] = [];

    created() {
        this.getUserInfo();
        this.getArticleList();
    }

    //获取用户信息
    getUserInfo() {
        this.$axios.get(this.$api.GET_USER_INFO + this.id)
        .then((result) => {
            if (result.data.error) {
                this.$router.push({ name: 'error', params: { type: 'user' } });
                return;
            }
            this.user = <User>result.data.user;
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    //获取用户帖子
    getArticleList() {
        this.$axios.get(this.$api.GET_USER_ARTICLE_LIST + this.id)
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
    .info {
         @include view-height;
        .info-content {
            @include layout;
            min-height: 340px;
            .bg-img {
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .content {
                padding: 30px;
                position: relative;
                background: #fff;
                .head-img {
                    width: 150px;
                    position: absolute;
                    top: -50px;
                    left: 50px;
                    padding: 5px;
                    background: #fff;
                    border-radius: 5px;
                    img {
                        width: 100%;
                    }
                }
                .profile {
                    padding: 0 20px;
                    border-left: 180px solid transparent;
                    position: relative;
                    .username {
                        font-size: 30px;
                    }
                    .edit {
                        padding-top: 20px;
                    }
                }
            }
        }
        .main {
            margin: 40px auto;
            padding: 20px;
            width: 800px;
            min-height: 500px;
            background-color: #fff;
        }
    }
</style>
