<template>
    <div class="follow">
        <el-scrollbar style="height: 100%">
            <div class="follow-content">
                 <el-tabs v-model="activeName" @tab-click="tabClick" type="card">
                    <el-tab-pane v-for="(tab, index) of tabList" :label="tab.label" :name="tab.name" :key="index">
                    </el-tab-pane>
                </el-tabs>
                <router-view></router-view>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Follow extends Vue {

    tabList = [
        {
            label: '吧',
            name: '/follow/ba'
        },
        {
            label: '用户',
            name: '/follow/user'
        },
    ]

    get activeName() {
        return this.$route.path;
    }

    set activeName(val) {
        
    }

    tabClick(tab: any, event: any) {
        this.$router.push(tab.name);
    }
}
</script>

<style lang="scss" scoped>
    .follow {
        height: 100%;
        .follow-content {
            @include layout;
        }
    }
</style>
