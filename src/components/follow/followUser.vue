<template>
    <div class="follow-user">
        <p class="desc">关注的用户</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FollowUser extends Vue {

}
</script>

<style lang="scss" scoped>
    .desc {
        font-size: 30px;
        margin: 10px 20px;
    }
</style>
