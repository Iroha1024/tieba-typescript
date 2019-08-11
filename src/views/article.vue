<template>
    <div class="article">
        <el-scrollbar style="height: 100%">
            <div class="article-content">
                <div class="header">
                    <div class="user">
                        <div class="head-img">
                            <img v-lazy="article.user_img">
                        </div>
                        <div class="user-name">{{ article.user_name }}</div>
                        <div class="time">{{ article.publish_time | time }}</div>
                    </div>
                    <hr>
                    <div class="head-content">
                        <div class="title">{{ article.title }}</div>
                        <div class="content" v-html="article.content"></div>
                    </div>
                </div>
                <div class="reply-content">
                    <reply v-for="(reply, index) of replies_list" :key="index" :reply="reply" :order="index"
                            :floor_replies_list="floor_replies_list" :id="id" @refresh="getReplies">
                    </reply>
                </div>
                <div class="comment-content">
                    <p>发表回复</p>
                    <div class="input">
                        <div class="list">
                            <div class="icon"><i class="el-icon-picture"></i></div>
                            <div class="icon"><i class="el-icon-cherry"></i></div>
                        </div>
                        <div class="text" id="comments-div" contenteditable="true"></div>
                    </div>
                    <el-button type="primary" icon="el-icon-upload" @click="submitComment">发表</el-button>
                </div>
            </div>
            <footer style="height: 100px;"></footer>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import reply from '../components/article/reply.vue';
import { User, Article, Reply } from '../interface/';

@Component({
    filters: {
        time(val: Date) {
            if (val) return val.toString().split(' ').shift();
        }
    },
    components: {
        reply
    }
})
export default class Article_ extends Vue {
    
    @Getter('getLocalUser') getLocalUser!: User;
    @Prop(String) id!: string;

    article = <Article>{};
    replies_list = <Reply[] | []>[];
    floor_replies_list = <Reply[] | []>[];


    created() {
        this.getArticle();
        this.getReplies();
    }

    //获取帖子信息
    getArticle() {
        this.$axios.get(this.$api.GET_ARTICLE + this.id)
        .then((result) => {
            if (result.data.error) {
                this.$router.push({ name: 'error', params: { type: 'article' } });
                return;
            }
            this.article = result.data.article;
            this.update(this.article, 600);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    //格式化内容
    update(info: Article | Reply, img_max_height: number) {
        if (!info.content) return;
        let text_list = <String[]>info.content.match(/\{(.+?)\}/g);
        let img_list = info.content.match(/\[(.+?)\]/g);
        if (text_list) {
            text_list.forEach(text => {
                text = text.substring(1, text.length - 1);
                info.content = info.content.replace(/\{(.+?)\}/, `
                    <p style="padding:10px 0;">${text}</p>
                `)
            });
        }
        if (!img_list) return;
        img_list.forEach(img => {
            img = img.substring(1, img.length - 1);
            info.content = info.content.replace(/\[(.+?)\]/, `
                <img src="${img}" 
                    style="max-height: ${img_max_height}px; object-fit: contain; max-width: 100%; display: block; margin-bottom: 10px;">
                </img>
            `)
        });
        console.log(img_list);
    }

    //获取回复
    getReplies() {
        this.$axios.get(this.$api.GET_REPLIES + this.id)
        .then((result) => {
            let replies_list = result.data.replies_list;
            this.updateReply(replies_list);
        }).catch((err) => {
            console.log(err);
        });
    }

    //格式化回复
    updateReply(replies_list: []) {
        this.floor_replies_list = replies_list.filter((reply: Reply) => !reply.is_owner);
        this.replies_list = replies_list.filter((reply: Reply) => reply.is_owner);
        this.replies_list.forEach((reply: Reply) => {
            this.update(reply, 500);
        })
    }

    //提交，检验
    submitComment() {
        let div = <HTMLDivElement>document.getElementById('comments-div');
        let text = div.innerHTML;
        //加上换行符
        text = '{' + text.replace(/<div>/g, '<br>').replace(/<\/div>/g, '') + '}';
        if (!div.innerText) {
            const h = this.$createElement;
            this.$msgbox({
                title: '警告',
                message: h('p', undefined, [
                    h('span', { style: 'color: #f00' }, '输入内容不能为空！！！'),
                ]),
                confirmButtonText: '确定',
            })
            return;
        }
        this.getFloorId(text);
    }

    //获取当前最大楼层id
    getFloorId(text: string) {
        this.$axios.get(this.$api.GEI_FLOOR_ID  + this.id) 
            .then((result) => {
                let floor_id = result.data.floor_id;
                let reply: Reply = {
                    a_id: Number(this.id),
                    user_id: this.getLocalUser.id,
                    content: text,
                    is_owner: true,
                    target: null,
                    target_name: null,
                    floor_id: floor_id + 1
                }
                this.submitReply(reply);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //提交回复
    submitReply(reply: Reply) {
        this.$axios.post(this.$api.REPLY, {
            reply
        })
        .then((result) => {
            if (result.data.success) {
                //发送成功后刷新，并清空评论区
                this.getReplies();
                let div = <HTMLDivElement>document.getElementById('comments-div');
                div.innerHTML = '';
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }
}
</script>

<style lang="scss" scoped>
    .article {
        @include page-height;
        letter-spacing: 1px;
        .article-content {
            @include layout;
            .header {
                border: 1px solid $border-color;
                padding: 10px;
                .user {
                    position: relative;
                    .head-img {
                        display: inline-block;
                        img {
                            width: 100px;
                        }
                    }
                    .user-name {
                        display: inline-block;
                        font-size: 30px;
                        padding-left: 20px;
                    }
                    .time {
                        display: inline-block;
                        position: absolute;
                        right: 20px;
                        bottom: 10px;
                        font-size: 20px;
                        color: #ccc;
                    }
                }
                hr {
                    height: 1px;
                    border-top: 1px dashed #585656;
                }
                .head-content {
                    font-size: 20px;
                    text-indent: 1em;
                    .title {
                        padding: 10px 0;
                        font-size: 30px;
                    }
                    .content {
                        word-break: break-word;
                        line-height: 30px;
                    }
                }
            }
            .reply-content {
                margin-top: 30px;
            }
            .comment-content {
                border: 1px solid $border-color;
                padding: 30px;
                p {
                    margin: 0 0 20px;
                    font-size: 20px;
                }
                .input {
                    border: 1px solid $border-color;
                    padding: 10px 20px 20px;
                    .list {
                        width: 100%;
                        font-size: 0;
                        .icon {
                            font-size: 20px;
                            display: inline-block;
                            padding: 10px;
                            border-radius: 20px;
                            cursor: pointer;
                        }
                        .icon:hover {
                            background: $icon-hover-color;
                        }
                    }
                    .text {
                        height: 200px;
                        background: #fff;
                        outline: none;
                        box-sizing: border-box;
                        font-size: 20px;
                        line-height: 25px;
                    }
                    .text:focus {
                        border: 1px solid #2fc4c4;
                    }
                }
                .el-button {
                    margin: 20px 0 0;
                }
            }
        }
    }
</style>
