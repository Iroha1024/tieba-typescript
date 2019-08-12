<template>
    <div class="ba-item" :title="ba.name" @click="linkToBa(ba.url)">
        <img v-lazy="ba.img">
        <p>{{ ba.name }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Ba } from '@/interface/';

@Component
export default class BaProfile extends Vue {

    @Prop() ba!: Ba;

    //跳转到贴吧页面
    linkToBa(url: string) {
        this.$router.push({ path: `/ba/${url}`});
    }

}
</script>

<style lang="scss" scoped>
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
</style>
