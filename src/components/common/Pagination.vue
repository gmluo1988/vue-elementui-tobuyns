<template>
	<div id="pagination">
		<el-pagination class="paginationcontent"
			background
			@size-change="handleSizeChange" 
			@current-change="handleCurrentChange" 
			:current-page="currentPage" 
			:page-sizes="pagesizes" 
			:page-size="pagesize" 
			layout="total, sizes, prev, pager, next, jumper" 
			:total="totalCount">
		</el-pagination>
		<!--<el-button type="primary" @click="clickBtn">主要按钮</el-button>-->
	</div>

</template>

<script>
	export default {
		methods: {
			handleSizeChange(val) {
				this.pagesize=val;
				console.log(`每页 ${val} 条`+'；'+this.pagesize);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
//			clickBtn(){
//				alert(this.pagesize)
//			}
		},
		data() {
			return {
				currentPage: 4,//设置当前页
				totalCount:100,//设置总条数
				pagesizes:[5, 10, 20],//每页显示个数选择器的选项设置
				pagesize:10//设置每页默认显示条目个数
			};
		}
	}
</script>

<style>
	#pagination{
		margin-top: 30px;
	}
	.paginationcontent{
		width: 60%;
		padding-left: 40%;
	}

</style>