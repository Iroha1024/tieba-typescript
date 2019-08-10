<template>
    <div class="error">
        <div class="error-content">
            <img id="error" v-lazy="require('../assets/img/404.gif')">
            <p>{{ msg }}</p>
            <el-button type="primary" @click="back">返回上一页</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import animateCSS from '../utils/animateCSS';

@Component
export default class Error extends Vue {

    @Prop() type!: string;

    msg = '';

    created() {
        switch (this.type) {
            case 'ba':
                this.msg = '该贴吧并不存在！！！';
                break;
            case 'article':
                this.msg = '该贴并不存在！！！';
                break;
            default:
                this.msg = '资源地址错误！！！';
                break;
        }
    }

    mounted() {
        animateCSS('#error', 'bounceInDown');
    }

    back() {
        this.$router.go(-2);
    }

}
</script>

<style lang="scss" scoped>
    .error {
        @include page-height;
        .error-content {
            @include layout;
            img {
                width: 80%;
                display: block;
                margin: 0 auto;
            }
            p {
                position: relative;
                font-size: 40px;
                bottom: 100px;
                text-align: center;
                color: #fff;
            }
            .el-button {
                display: block;
                margin: 0 auto;
                font-size: 25px;
            }
        }
    }
</style>
