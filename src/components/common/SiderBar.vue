<template>
	<div class="sidebar">
		<el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index">
						<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index">
						<i :class="item.icon"></i>{{ item.title }}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						icon: 'el-icon-document',
						index: 'home',
						title: '系统概述'
					},
					{
						icon: 'el-icon-bell',
						index: 'bebetterme',
						title: 'BeBetterMe'
					},
					{
						icon: 'el-icon-setting',
						index: 'usermanage',
						title: '用户管理',
						subs: [{
							index: 'usermanage1',
							title: '用户管理初版'
						}, {
							index: 'usermanage2',
							title: '用户管理综合'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'searchsource',
						title: '搜索报文',
						subs: [{
							index: 'sourceoperation',
							title: '查看报文'
						}, {
							index: 'getlogsource',
							title: '获取报文'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'testreport',
						title: '测试报告',
						subs: [{
							index: 'autotestreport',
							title: '自动化测试报告'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'apitest',
						title: 'Api测试',
						subs: [{
							index: 'searchapitest',
							title: '搜索接口测试'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'apptest',
						title: 'App测试',
						subs: [{
							index: 'androidtest',
							title: '安卓测试'
						}, {
							index: 'iostest',
							title: 'IOS测试'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'webtest',
						title: 'Web测试',
						subs: [{
							index: 'webtest',
							title: 'WEB测试'
						}, {
							index: 'h5test',
							title: 'H5测试'
						}]
					},
					{
						icon: 'el-icon-menu',
						index: 'test',
						title: 'TEST',
						subs: [{
							index: 'test1',
							title: 'TEST1'
						}, {
							index: 'test2',
							title: 'TEST2'
						}]
					}
				]
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
		}
	}
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		width: 200px;
		left: 10px;
		top: 70px;
		bottom: 0;
		/*background: #1396F4;*/
		margin-top: 10px;
	}
	
	.sidebar>ul {
		height: 100%;
		background: #A5D3F4;
	}
</style>