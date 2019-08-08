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
import { Getter } from 'vuex-class';

import { User, Ba } from '../interface/';

@Component
export default class Home extends Vue {

    @Getter('getLocalUser') getLocalUser!: User;

    created() {
        this.requestBaList();
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
        height: 100%;
        .home-content {
            @include layout;
        }
    }
</style>