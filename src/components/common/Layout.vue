<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHeader from './Header.vue'
    import vSidebar from './Sidebar.vue'
    export default {
        components: {
            vHeader,
            vSidebar
        },
        data() {
            return {
            }
        },
        created() {
    	}
    }
</script>
<style scoped>
    .content {
        position: absolute;
        padding: 20px;
        left: 220px;
        top: 60px;
        right: 0;
        bottom: 0;
        background: #fff;
        position: absolute;
        box-sizing: border-box;
        overflow: auto;
        -webkit-transition: left 0.38s;
        transition: left 0.38s;
    }
    .content > div {
        min-width: 800px;
    }
    
    /*fade-transform*/
    .fade-transform-leave-active,
    .fade-transform-enter-active {
      transition: all .5s;
    }
    .fade-transform-enter {
      opacity: 0;
      transform: translateX(-30px);
    }
    .fade-transform-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
</style>