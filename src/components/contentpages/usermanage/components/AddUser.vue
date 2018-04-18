<template>
	<div id="addsourcepanel">
		<el-button type="success" round @click="dialogFormVisible  = true">新增用户</el-button>
		<el-dialog title="新增用户信息" :visible.sync="dialogFormVisible" :before-close="handleClose" center>
			<el-form :model="addForm">
				<el-form-item label="用户名">
					<el-input v-model="addForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker v-model="addForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="addForm.age"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-switch style="display: block" v-model="addForm.gender" active-color="#13ce66" inactive-color="#ff4949" active-text="男" inactive-text="女" active-value="1" inactive-value="0">
						>
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelSave">取 消</el-button>
				<el-button type="primary" @click="saveBtn">保存</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				dialogFormVisible: false,
				addForm: {
					userName: '',
					password: '',
					email: '',
					birthday: '',
					age:'',
					gender: ''
				},
				formLabelWidth: '100%px'
			};
		},
		methods: {
			handleClose(done) {
				this.$confirm('是否放弃保存次报文？')
					.then(_ => {
						done();
						this.$message('取消保存...');
					})
					.catch(_ => {});
			},
			cancelSave() {
				//执行某些操作
				this.$message('取消保存...');
				this.dialogFormVisible = false;
			},
			saveBtn() {
				//执行save操作
				console.log(this.addForm);
				this.$http.post("http://localhost:8080/tobuyns/user/saveUser",this.addForm).then(function(res){
					console.log(res);
				}).catch(function(err){
					
				});
				
				this.$message({
					message: '保存成功!',
					type: 'success'
				});
				this.dialogFormVisible = false;
			}
		}
	};
</script>

<style>

</style>