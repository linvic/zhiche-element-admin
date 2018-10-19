<template>
	<div class="tags-nav">
		<div class="close-con">
			<el-dropdown>
				<div class="tagnav-dropdow-btn">
					<i class="el-icon-circle-close-outline"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="handlesCloseAll">关闭所有</el-dropdown-item>
					<el-dropdown-item @click.native="handlesCloseOthers">关闭其他</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="btn-con left-btn" @click="handleScroll(240)">
			<i class="el-icon-arrow-left"></i>
		</div>
		<div class="btn-con right-btn" @click="handleScroll(-240)">
			<i class="el-icon-arrow-right"></i>
		</div>
		<div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
			<div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
				<el-tag
					v-for="(item, index) in taglist"
					ref="tagsNav"
					:class="{'tag-default': !isCurrentTag(item)}"
					:key="`tag-nav-${index}`"
					:text="item.name"
					:closable="item.name !== 'Home'"
					@click.native="JumpRoute(item)"
					@close="handleClose(item)">
					<i class="el-icon-web-large-point"></i>
					{{item.meta.title}}
				</el-tag>
			</div>
		</div>
	</div>
</template>

<script>
import { routeEqual, getNewTagList, getNextRoute } from '@/config/auth'
import { mapMutations, mapActions } from 'vuex'
export default {
	props: {
		isCollapse: {
			type: Boolean
		}
	},
	data () {
		return {
			tagBodyLeft: 0, // 
			outerPadding: 4
		}
	},
	computed: {
		taglist() {
			return this.$store.state.tag.taglist
		},
		currentRouteObj () {
			const { name, params, query } = this.$route
			return { name, params, query }
		}
	},
	created() {
	},
	methods: {
		...mapMutations([
			'SET_TAGLIST',
			'CLOSE_TAG',
			'ADD_TAG'
		]),
		isCurrentTag (item) {
			// 判断是否和当前路由相等
			return routeEqual(this.currentRouteObj, item)
		},
		handlescroll (e) { // 触发鼠标滚动事件
			var type = e.type
			let delta = 0
			if (type === 'DOMMouseScroll' || type === 'mousewheel') {
				delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
			}
			this.handleScroll(delta)
		},
		handleScroll (offset) { // 点击滚动
			const outerWidth = this.$refs.scrollOuter.offsetWidth
			const bodyWidth = this.$refs.scrollBody.offsetWidth
			if (offset > 0) {
				this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
			} else {
				if (outerWidth < bodyWidth) {
					if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
						this.tagBodyLeft = this.tagBodyLeft
					} else {
						this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
					}
				} else {
					this.tagBodyLeft = 0
				}
			}
		},
		handlesCloseAll() {
			// 关闭所有，除了home
			let res = this.taglist.filter(item => item.name === 'Home')
			// 跳转到Home
			this.JumpRoute('Home')
			this.SET_TAGLIST(res)
		},
		handlesCloseOthers() {
			// 关闭除当前页和home页的其他页
			let res = this.taglist.filter(item => routeEqual(this.currentRouteObj, item) || item.name === 'Home')
			this.SET_TAGLIST(res)
			setTimeout(() => {
				this.getTagElementByName(this.currentRouteObj.name)
			}, 100)
		},
		JumpRoute(route) {
			// 点击tag跳转路由
			let { name, params, query } = {}
			if (typeof route === 'string') name = route
			else {
				name = route.name
				params = route.params
				query = route.query
			}
			this.$router.push({
				name,
				params,
				query
			})
		},
		handleClose (route) {
			// 关闭当前
			let res = this.taglist.filter(item => !routeEqual(route, item))
			const nextRoute = getNextRoute(this.taglist, route)
			this.$router.push(nextRoute)
			this.SET_TAGLIST(res)
		},
		moveToView (tag) {
			const outerWidth = this.$refs.scrollOuter.offsetWidth
			const bodyWidth = this.$refs.scrollBody.offsetWidth
			if (bodyWidth < outerWidth) {
				this.tagBodyLeft = 0
			} else if (tag.offsetLeft < -this.tagBodyLeft) {
				// 标签在可视区域左侧
				this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
			} else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
				// 标签在可视区域
				this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
			} else {
				// 标签在可视区域右侧
				this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
			}
		},
		getTagElementByName (name) {
			this.$nextTick(() => {
				this.refsTag = this.$refs.tagsNav;
				if(!this.refsTag) this.refsTag = []
				this.refsTag.forEach((item, index) => {
					if (name === item.text) { //找到当前对应的tag，并移动到该位置.
						let tag = this.refsTag[index].$el
						this.moveToView(tag)
					}
				})
			})
		}
	},
	watch: {
		'$route' (newRoute) { // 监听路由
			this.getTagElementByName(newRoute.name)

			// 新增一个tag
			const { name, query, params, meta } = newRoute
			this.ADD_TAG({
				route: { name, query, params, meta },
				type: 'push'
			})
			this.SET_TAGLIST(getNewTagList(this.taglist, newRoute))
			
		}
	},
	mounted () {
		setTimeout(() => { // 页面刷新后
			this.getTagElementByName(this.$route.name)
		}, 200)

		/*
		初始化
		先添加Home
		 */
		this.SET_TAGLIST()
		this.ADD_TAG({
			route: this.$store.state.tag.homeRoute
		})
	}
}
</script>

<style lang="scss">
	.tags-nav {
		position: relative;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		width: 100%;
		height: 100%;
	}
	.tags-nav .close-con {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 28px;
		text-align: center;
		z-index: 10;
		cursor: pointer;
	}
	.tags-nav .btn-con {
		position: absolute;
		top: 0px;
		height: 100%;
		z-index: 10;
		width: 28px;
		line-height: 36px;
		text-align: center;
		border-left: 1px solid #dcdee2;
		border-right: 1px solid #dcdee2;
		cursor: pointer;
	}
	.tags-nav .btn-con.left-btn {
		left: 0px;
	}
	.tags-nav .btn-con.right-btn {
		right: 28px;
		border-right: 1px solid #f0f0f0;
	}
	.tags-nav .scroll-outer {
		position: absolute;
		left: 33px;
		right: 61px;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}
	.tags-nav .scroll-outer .scroll-body {
		display: inline-block;
		position: absolute;
		overflow: visible;
		white-space: nowrap;
		transition: left .3s ease;
	}
	.tags-nav .scroll-outer .scroll-body .el-tag {
		transition: background .2s ease;
		height: 28px;
	    margin: 4px 3px;
	    border-radius: 0;
	    cursor: pointer;
	}
	.tags-nav .scroll-outer .scroll-body .el-tag.tag-default {
		background: #fff;
	    border-color: #d8dce5;
	    color: #9e9e9e;
	}
	.tags-nav .scroll-outer .scroll-body .el-tag.tag-default i.el-icon-web-large-point {
		color: #dcdcdc;
	}
	.tags-nav .scroll-outer .scroll-body .el-tag.tag-default i.el-icon-close {
		color: #d8dce5;
	}
	.tags-nav .scroll-outer .scroll-body .el-tag.tag-default i.el-icon-close:hover {
		color: #fff;
	}
	.isCollapse .tag-nav{
		left: 64px;
	}
	.tagnav-dropdow-btn {
		width: 28px;
		line-height: 36px;
	}
	.el-tag .el-icon-close::before {
		-webkit-transform: scale(.8);
		transform: scale(.8);
		display: inline-block;
	}
</style>
