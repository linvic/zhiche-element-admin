<template>
    <div :class="classObj">
        <v-header></v-header>
        <v-sidebar :isCollapse="isCollapse"></v-sidebar>
        <div class="tag-nav">
            <vTagsNav :isCollapse="isCollapse" @changeCollapse="changeCollapse"></vTagsNav>
        </div>
        <div class="content">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cacheList">
                    <router-view/>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ResizeMixin from './mixin/ResizeHandler'
    import vHeader from './Header.vue'
    import vSidebar from './Sidebar.vue'
    import vTagsNav from './TagsNav.vue'
    export default {
        components: {
            vHeader,
            vSidebar,
            vTagsNav
        },
      mixins: [ResizeMixin],
      computed: {
        ...mapGetters([
          'sidebar',
        ]),
        tagNavList () {
          return this.$store.state.tag.taglist
        },
        isCollapse() {
          return !this.sidebar.opened
        },
        device() {
          return this.$store.state.tag.device
        },
        cacheList () {
          return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.noCache)).map(item => item.name) : []
        },
        classObj() {
          return {
            hideSidebar: !this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === 'mobile',
            'wrapper': true,
            'isCollapse': this.isCollapse
          }
        }
      },
        created() {
    	},
        methods: {
            changeCollapse() {
              this.$store.dispatch('toggleSideBar')
            },
        }
    }
</script>
<style scoped>
    .tag-nav {
        position: absolute;
        left: 208px;
        top: 64px;
        right: 0;
        background: #fff;
        border-top: 1px solid #ddd;
        box-shadow:0px 2px 4px 0px rgba(0,28,56,0.12);
        height: 36px;
        z-index: 998;
        -webkit-transition: left 0.38s;
        transition: left 0.38s;
    }
    .content {
        position: absolute;
        left: 208px;
        top: 101px;
        right: 0;
        bottom: 0;
        background: #F0F2F5;
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
    
    .isCollapse .content {
        left: 64px;
    }
</style>