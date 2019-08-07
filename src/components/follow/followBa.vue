<template>
    <div class="follow-ba">
        <p class="desc">关注的吧</p>
        <div class="ba-list">
            <div class="ba-item" v-for="(ba, index) of ba_list" :key="index">
                <div>{{ ba.name }}</div>
                <img :src="ba.img" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { GET_BA_LIST } from '../../api/';
import { User, Ba } from '../../interface/';

@Component
export default class FollowBa extends Vue {

    @Getter('getLocalUser') getLocalUser!: User;

    ba_list = <Ba[] | []>[];

    created() {
        this.requestBaList();
    }

    requestBaList() {
        this.$axios.get(GET_BA_LIST + this.getLocalUser.id)
            .then((result) => {
                let ba_list = result.data.ba_list;
                this.ba_list = ba_list;
            })
            .catch((err) => {
                console.log(err);
            });
    }

}
</script>

<style lang="scss" scoped>
    .follow-ba {
        font-size: 20px;
        .desc {
            font-size: 30px;
        }
    }
</style>
