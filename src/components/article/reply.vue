<template>
    <div class="reply">
        <div class="user">
            <div class="head-img">
                <img v-lazy="reply.head_img">
            </div>
            <div class="user-name">{{ reply.user_name }}</div>
        </div>
        <div class="content">
            <div v-html="reply.content"></div>
            <!-- <el-collapse-transition> -->
                <div class="floor-reply" v-show="isActivated">
                    <div class="floor-reply-item" v-for="(floor_reply, key) of floor_replies_list" :key="key" 
                        v-if="reply.floor_id == floor_reply.floor_id">
                        <div class="floor-head-img">
                            <img v-lazy="floor_reply.head_img">
                        </div>
                        <div class="floor-user-name" :title="floor_reply.user_name">{{ floor_reply.user_name }}</div>
                        <div class="floor-content" v-html="floor_reply.content.substring(1, floor_reply.content.length - 1)"></div>
                    </div>
                    <div class="my-reply">
                        <div class="text floor-reply-div" contenteditable="true"></div>
                        <el-button 
                            type="primary" 
                            icon="el-icon-upload" 
                            :data-index="reply.floor_id"
                            @click="submit($event.currentTarget)">
                                发表
                        </el-button>
                    </div>
                </div>
            <!-- </el-collapse-transition> -->
            <div class="floor-info">
                <div class="floor-reply-button" @click="toggleFloorReply($event.currentTarget)">
                    回复
                </div>
                <div class="time">{{ reply.reply_time | time }}</div>
                <div class="floor-id">{{ reply.floor_id }}楼</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { User, Reply } from '@/interface/';

@Component({
    filters: {
        //过滤秒钟
        time(val: Date) {
            let str = val.toString();
            return str.substring(0, str.length - 3);
        }
    }
})
export default class Reply_ extends Vue {

    @Getter('getLocalUser') getLocalUser!: User;
    @Prop() reply!: Reply;
    @Prop() floor_replies_list!: Reply[] | [];
    @Prop(String) id!: string;

    isActivated = false;

    //点击回复，切换楼层回复框
    toggleFloorReply(div: HTMLDivElement) {
        this.isActivated = !this.isActivated;
        div.innerHTML = this.isActivated ? '收起回复' : '回复'
    }

    //提交
    submit(button: HTMLButtonElement) {
        let index = Number.parseInt(<string>button.getAttribute('data-index'));
        let div = <HTMLDivElement>document.getElementsByClassName('floor-reply-div')[index - 2];
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
        let reply: Reply = {
            a_id: Number(this.id),
            user_id: this.getLocalUser.id,
            floor_id: index,
            content: text,
            is_owner: false,
            target: null,
        }
        this.submitFloorReplt(reply, div);
    }

    //提交楼层回复
    submitFloorReplt(reply: Reply, div: HTMLDivElement) {
        this.$axios.post(this.$api.FLOOR_REPLY, {
            reply
        })
        .then((result) => {
            if (result.data.success) {
                //发送成功后刷新，并清空评论区
                this.refresh();
                div.innerHTML = '';
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }

    @Emit()
    refresh(){}

}
</script>

<style lang="scss" scoped>
    .reply {
        width: 100%;
        display: inline-flex;
        border: 1px solid $border-color;
        box-sizing: border-box;
        margin-bottom: 30px;
        .user {
            padding: 20px;
            width: 100px;
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            .head-img {
                width: 100px;
                img {
                    width: 100%;
                }
            }
            .user-name {
                margin-top: 10px;
                word-break: break-word;
            }
        }
        .content {
            width: 100%;
            font-size: 20px;
            line-height: 25px;
            position: relative;
            word-break: break-word;
            padding: 20px 0 60px 20px;
            border-left: 1px solid $border-color;
            .floor-reply {
                background: linear-gradient(rgba(255, 255, 255, 0.07), rgba(174, 174, 174, 0.62));
                padding: 20px;
                border-radius: 0 0 40px;
                .floor-reply-item {
                    display: flex;
                    padding-bottom: 20px;
                    .floor-head-img {
                        max-width: 50px;
                        img {
                            width: 100%;
                        }
                    }
                    .floor-user-name {
                        max-width: 100px;
                        width: fit-content;
                        overflow: hidden;
                        white-space: nowrap;
                        padding-left: 10px;
                    }
                    .floor-content::before {
                        content: '：'
                    }
                    .floor-content {
                        width: fit-content;
                    }
                }
                .my-reply {
                    padding: 10px 0 50px;
                    position: relative;
                    .text {
                        min-height: 80px;
                        max-height: 150px;
                        background: #fff;
                        outline: none;
                        overflow-x: hidden;
                    }
                    .el-button {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            }
            .floor-info {
                bottom: 10px;
                position: absolute;
                width: calc(100% - 20px);
                line-height: 30px;
                height: 30px;
                .floor-reply-button {
                    position: absolute;
                }
                .floor-reply-button:hover {
                    cursor: pointer;
                    color: $icon-hover-color;
                }
                .time {
                    position: absolute;
                    right: 80px;
                    color: #ccc;
                }
                .floor-id {
                    right: 0;
                    position: absolute;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
