<template>
    <div class="home">
        <el-scrollbar style="height: 100%">
            <div class="home-content">
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
import { Getter } from 'vuex-class';

import { User, Ba } from '../interface/';

@Component
export default class Home extends Vue {

    @Getter('getLocalUser') getLocalUser!: User;

        tabList = [
        {
            label: '推荐',
            name: '/home/recommend'
        },
        {
            label: '特别关注',
            name: '/home/specialFollow'
        },
    ]

    created() {
        this.requestBaList();
    }

    get activeName() {
        return this.$route.path;
    }

    set activeName(val) {
        
    }

    tabClick(tab: any, event: any) {
        this.$router.push(tab.name);
    }

    //请求关注吧列表
    requestBaList() {
        this.$axios.get(this.$api.GET_BA_LIST + this.getLocalUser.id)
        .then((result) => {
            let ba_list: Ba[] | [] = result.data.ba_list;
            sessionStorage.setItem('ba_list', JSON.stringify(ba_list));
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style lang="scss" scoped>
    .home {
        @include page-height;
        .home-content {
            @include layout;
        }
    }
</style>