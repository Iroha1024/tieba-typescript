<template>
    <div id="app" v-if="exist">
        <head-nav @exit="reload" v-if="!showHeadNav"></head-nav>
        <keep-alive>
            <router-view :key="$route.path"/>
        </keep-alive>
        <footer></footer>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import headNav from './components/headNav/headNav.vue';

@Component({
    components: {
        headNav
    }
})
export default class App extends Vue {
    exist = true;
    
    get showHeadNav() {
        return this.$route.path === '/' || this.$route.path === '/register';
    }

    created() {
        this.changeBodyStyle();
    }

    //调整样式
    changeBodyStyle() {
        let body = document.body;
        body.style.height = '100%';
    }

    //重新加载app
    async reload () {
        this.exist = false;
        await this.$nextTick();
        this.exist = true;
        this.$router.push('/');
    }
}
</script>


<style lang="scss" scope>
    #app {
        height: 100%;
        font-family: KaiTi_GB2312;
        overflow-y: hidden;
        background-color: $bg-color;
    }
</style>
