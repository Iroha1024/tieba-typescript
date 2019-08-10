<template>
    <div class="follow-ba">
        <p class="desc">关注的吧</p>
        <div class="ba-list">
            <div class="ba-item" v-for="(ba, index) of ba_list" :key="index" :title="ba.name" @click="linkToBa(ba.url)">
                <img v-lazy="ba.img">
                <p>{{ ba.name }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Ba } from '@/interface/';

@Component
export default class FollowBa extends Vue {

    ba_list: Ba[] | [] = [];

    created() {
        this.ba_list = JSON.parse(<string>sessionStorage.getItem('ba_list'));
    }

    //跳转到贴吧页面
    linkToBa(url: string) {
        this.$router.push({ path: `/ba/${url}`});
    }

}
</script>

<style lang="scss" scoped>
    .follow-ba {
        font-size: 20px;
        .desc {
            font-size: 30px;
            margin: 10px 20px;
        }
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
    }
</style>
