<template>
	<div class="pagecontent">
		<div class="pagecontent-breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理2</el-breadcrumb-item>
			</el-breadcrumb>
			<hr style="height:3px;border:none;border-top:3px double #3BCEF2;" />
		</div>
		<div class="pagecontent-body">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.name" placeholder="输入姓名查询"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd">新增</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
						</el-form-item>
						
					</el-form>
				</el-col>

				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" >
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column prop="userName" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="password" label="密码" sortable>
					</el-table-column>
					<el-table-column prop="email" label="邮箱" sortable>
					</el-table-column>
					<el-table-column prop="birthday" label="生日" sortable>
					</el-table-column>
					<el-table-column prop="age" label="年龄" width="100" sortable>
					</el-table-column>
					<el-table-column prop="gender" label="性别" :formatter="formatSex" sortable>
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template scope="scope">
							<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">
					<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
					<!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">-->
					</el-pagination>
					<el-pagination
     							@size-change="handleSizeChange"
      							@current-change="handleCurrentChange"
      							:current-page="page"
      							:page-sizes="[5, 10, 20, 50]"
      							:page-size="100"
      							layout="total, sizes, prev, pager, next, jumper"
      							:total="total"
      							style="float:right;">
    			</el-pagination>
				</el-col>

				<!--编辑界面-->
				<el-dialog title="修改用户信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
					<el-form :model="editForm" label-width="80px" ref="editForm">
						<el-form-item label="用户名">
							<el-input v-model="editForm.userName" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="editForm.password" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-model="editForm.email" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出生日期">
							<el-date-picker v-model="editForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="editForm.gender">
								<el-radio class="radio" :label="1">男</el-radio>
								<el-radio class="radio" :label="0">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="editFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
					</div>
				</el-dialog>

				<!--新增界面-->
				<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
					<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="addForm.userName" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="addForm.password" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-model="addForm.email" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="生日">
							<el-date-picker v-model="addForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="addForm.gender">
								<el-radio class="radio" :label="1">男</el-radio>
								<el-radio class="radio" :label="0">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="addFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>
			</section>
		</div>
	</div>

</template>

<script>
	import { getUserListPage, editUser, addUser, removeUser, batchRemoveUser ,getUserList} from '../../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				pageSize:5,
				listLoading: false,
				sels: [], //列表选中列

				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				//				editFormRules: {
				//					name: [{
				//						required: true,
				//						message: '请输入姓名',
				//						trigger: 'blur'
				//					}]
				//				},
				//编辑界面数据
				editForm: {
					id: '',
					userName: '',
					password: '',
					email: '',
					birthday: '',
					age: '',
					gender: ''
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					userName: '',
					password: '',
					email: '',
					birthday: '',
					age: '',
					gender: ''
				}

			}
		},
		methods: {
			//用户列表中的性别显示转换
			formatSex: function(row, column) {
				return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			//获取用户列表
//			getUsers() {
//				let para = {
//					pageIndex: this.page,
//				};
//				this.listLoading = true;
//				//NProgress.start();
//				getUserListPage(para).then((res) => {
//					this.total = res.data.totalCount;
//					this.users = res.data.pageData;
//					this.listLoading = false;
//					//NProgress.done();
//				});
//			},
			
			//获取用户列表
			getUsers() {
				let para = {
					userName: this.filters.name,
					pageIndex: this.page,
					pageSize:this.pageSize
				};
				this.listLoading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					this.total = res.totalCount;
					this.users = res.pageData;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//显示编辑界面
			handleEdit: function(index, row) {
				//				console.log(row);
				//				console.log(index);
				this.editFormVisible = true;
				this.editForm = row;

			},
			//编辑页面提交按钮执行操作
			editSubmit: function() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = this.editForm
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},

			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					userName: '',
					password: '',
					email: '',
					birthday: '',
					age: '',
					gender: 0
				};
			},
			//新增界面提交按钮执行操作
			addSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = this.addForm;
							//							console.log(para);
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},

			//用户列表删除按钮执行操作
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						id: row.id
					};
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//批量删除按钮执行操作
			batchRemove: function() {
				//				var ids = this.sels.map(item => item.id).toString();
				var ids = this.sels.map(item => item.id);
				//				console.log(ids);
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						idList: ids
					};
					//					console.log(para);
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			
			//每页显示条目数切换时
			handleSizeChange(val) {
        		this.pageSize=val;
        		this.getUsers();
     		 },
			//分页按钮查询
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style>

</style>