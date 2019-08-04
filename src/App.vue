<template>
    <div id="app" v-if="exist">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
    exist = true;
    
    provide() {
        return {
            reload: this.reload
        }
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
    }
}
</script>


<style lang="scss" scope>
    #app {
        height: 100%;
        font-family: KaiTi_GB2312;
    }
</style>
