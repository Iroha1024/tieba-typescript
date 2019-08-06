<template>
    <div class="head-tab">
        <div class="head-tab-content">
            <el-dropdown class="user" trigger="click">
                <img :src="imgUrl">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="exit()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class headNav extends Vue {

    @Getter('getUserHeadImg') imgUrl!: string;

    //注销
    @Emit()
    exit() {}
}
</script>

<style lang="scss" scoped>
    .head-tab {
        height: 70px;
        margin-bottom: 10px;
        .head-tab-content {
            position: relative;
            padding: 5px;
            height: inherit;
            box-sizing: border-box;
            box-shadow: 0 0 10px #a6acb2;
            .user {
                width: 50px;
                height: 50px;
                padding: 5px;
                position: relative;
                cursor: pointer;
                left: calc(100% - 100px);
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
