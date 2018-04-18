<template>
	<div class="pagecontent">
		<div class="pagecontent-breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>BeBetterMe</el-breadcrumb-item>
			</el-breadcrumb>
			<hr style="height:3px;border:none;border-top:3px double #3BCEF2;" />
		</div>
		<div class="pagecontent-body">
			<h2>成为更好的自己</h2>
		</div>
	</div>

</template>

<script>
	export default{
		data(){
			return{
				filters: {
					name: ''//按名字进行筛选时的数据
				},
				page: 1,
				listLoading: false,
				
			}
		},
		methods:{
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
		}
	}
</script>

<style>

</style>