//导入相关引用
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用路由
Vue.use(VueRouter);
//页面路由映射配置
export default new VueRouter({
	mode: 'history', //切换路径模式，变成history模式
	scrollBehavior: () => ({
		y: 0
	}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
	routes: [
		//	使用重定向(redirect)配置默认页面
		{
			path: '/',
			redirect: '/login'

		},
		//	配置登录页面地址
		{
			path: '/login',
			// 懒加载方式，当路由被访问的时候才加载对应组件
			component: resolve => require(['../components/common/Login.vue'], resolve)

		},
		//	配置注册页面地址
		{
			path: '/register',
			component: resolve => require(['../components/common/Register.vue'], resolve)

		},
		{
			path: '/home',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			children: [
				//配置默认主页地址
				{
					path: '/',
					component: resolve => require(['../components/common/Readme.vue'], resolve)
				},
				//配置用户管理页面地址
				{
					path: '/usermanage1',
					component: resolve => require(['../components/contentpages/usermanage/UserManage1.vue'], resolve)
				},
				{
					path: '/usermanage2',
					component: resolve => require(['../components/contentpages/usermanage/UserManage2.vue'], resolve)
				}
				,
				//配置BeBetterMe页面地址
				{
					path: '/bebetterme',
					component: resolve => require(['../components/contentpages/bebetterme/BeBetterMe.vue'], resolve)
				},
				//配置测试页面地址
				{
					path: '/test1',
					component: resolve => require(['../components/contentpages/test/Test1.vue'], resolve)
				}
			]
		}
	]
})