<template>
	<div class="pagecontent">
		<div class="pagecontent-breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理1</el-breadcrumb-item>
			</el-breadcrumb>
			<hr style="height:3px;border:none;border-top:3px double #3BCEF2;" />
		</div>
		<div class="pagecontent-body">
			<div>
				<el-row>
					<el-col :span="2" :offset="20">
						<!--添加新增报文的组件-->
						<AddUser></AddUser>
					</el-col>
				</el-row>
			</div>
			<UserTable></UserTable>
			<Pagination></Pagination>
		</div>
	</div>
</template>

<script>
	import UserTable from './components/UserTable.vue'
	import AddUser from './components/AddUser.vue'
	import Pagination from '../../common/Pagination.vue'
	
	export default{
		components:{
			UserTable,
			AddUser,
			Pagination
		}
	}
</script>

<style>

</style>