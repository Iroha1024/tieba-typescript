<template>
    <div class="home">
        <el-scrollbar style="height: 100%">
            <div class="home-content">
                home
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {

}
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        .home-content {
            background-color: #fff;
            height: 1000px;
            margin: 0 10%;
            padding: 20px;
            width: 80%;
        }
    }
</style>