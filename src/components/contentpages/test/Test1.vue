<template>
	<div class="pagecontent">
		<div class="pagecontent-breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>Test</el-breadcrumb-item>
			</el-breadcrumb>
			<hr style="height:3px;border:none;border-top:3px double #3BCEF2;" />
		</div>
		<div class="pagecontent-body">
			<div>
				<el-row>
					<el-col :span="10" :offset="7">
						<Addu></Addu>
					</el-col>
				</el-row>
				<!--<Addu></Addu>-->
			</div>
		</div>
	</div>
</template>

<script>
	import Addu from './components/Addu.vue'
	
	export default{
		components:{
			Addu
		}
	}
</script>

<style>

</style>