<template>
    <div class="follow-ba">
        <p class="desc">关注的吧</p>
        <div class="ba-list">
            <ba-profile v-for="(ba, index) of ba_list" :key="index" :ba="ba"></ba-profile>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import BaProfile from './baProfile.vue';
import { Ba } from '@/interface/';

@Component({
    components: {
        BaProfile
    }
})
export default class FollowBa extends Vue {

    ba_list: Ba[] | [] = [];

    created() {
        this.ba_list = JSON.parse(<string>sessionStorage.getItem('ba_list'));
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
    }
</style>
