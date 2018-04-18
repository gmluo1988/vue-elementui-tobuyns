<template>
	<div id="tableContent">
		<!--搜索按钮操作的报文列表-->
		<el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" border>
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="userName" label="用户名">
			</el-table-column>
			<el-table-column prop="password" label="密码">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column prop="birthday" label="生日">
			</el-table-column>
			<el-table-column prop="gender" label="性别">
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-row>
						<el-col :span="16">
							<el-button type="primary" round size="mini" @click="updateSourceBtn(scope.row,scope.$index)" class="tabelUpdateBtn">查看/编辑</el-button>
						</el-col>
						<el-col :span="8">
							<el-button @click="deleteUserBtn(scope.row)" type="danger" size="mini" round class="tableDeleteBtn">删除</el-button>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<!--查看/编辑按钮操作的对话框-->
		<el-dialog title="查看/修改用户信息" :visible.sync="updateVisible" :before-close="handleClose" center>
			<el-form :model="updateForm">
				<el-form-item label="用户名">
					<el-input v-model="updateForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="updateForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="updateForm.email"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-date-picker v-model="updateForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="性别">
					<!--<el-switch style="display: block" v-model="updateForm.gender" active-color="#13ce66" inactive-color="#ff4949" active-text="男" inactive-text="女" active-value="1" inactive-value="0">
						>
					</el-switch>-->
					<!--<el-radio v-model="updateForm.gender" label="1" checked="true">男</el-radio>-->
					<el-radio v-model="updateForm.gender" label="1">男</el-radio>
					<el-radio v-model="updateForm.gender" label="0">女</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelUpdate">取消变更</el-button>
				<el-button type="primary" @click="saveUpdate">提交修改</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		mounted() {
			//获取数据
			this.fetchData();
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex % 2 == 1) {
					return 'success-row';
				}
				return '';
			},
			updateSourceBtn(row, _index) {
				console.log(row);
				//记录索引
				this.tableDataIndex = _index;
				//记录数据
				this.updateForm = row;
				this.updateVisible = true;
			},
			cancelUpdate() {
				this.$message('取消修改...');
				this.updateVisible = false;
			},
			saveUpdate() {
				//执行数据修改操作
				this.$http.post("http://localhost:8080/tobuyns/user/updateUser",this.updateForm).then(function(res){
					
				}).catch(function(err){
					
				});
				this.$message({
					message: '修改成功!',
					type: 'success'
				});
				this.updateVisible = false;
			},
			handleClose(done) {
				this.$confirm('是否放弃此次修改？')
					.then(_ => {
						done();
						this.$message('取消修改...');
					})
					.catch(_ => {});
			},
			//删除按钮执行的操作
			deleteUserBtn(row) {
				console.log(row)
				var userid = row.id;
				var username = row.userName
				this.$confirm('是否删除【' + username + '】, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$http.get("http://localhost:8080/tobuyns/user/deleteUser", {params: {id: userid}}).then(function(res) {
						console.log(res);
//						 this.$options.methods.fetchData();
					}).catch(function(err) {

					});
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除...'
					});
				});
			},
			indexMethod(index) {
				return index + 1;
			},
			//获取分页数据
			fetchData() {
				var _this = this;
				var pageindex=_this.pageIndex;
				this.$http.get("http://localhost:8080/tobuyns/user/getUsersByPageIndex", {params: {pageIndex: pageindex}}).then(function(res) {
					_this.tableData = res.data.pageData;
				}).catch(function(err) {});
			}
		},
		data() {
			return {
				updateVisible: false,
				updateForm: {
					id: '',
					userName: '',
					password: '',
					email: '',
					birthday: '',
					gender: ''
				},
				tableData: [],
				pageIndex: 1
			}
		}
	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}
	
	.el-table .success-row {
		background: #f0f9eb;
	}
	
	.tableDeleteBtn {
		/*margin-left: -100px;*/
	}
</style>