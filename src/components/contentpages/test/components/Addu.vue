<template>
		<el-form :model="adduserForm" status-icon :rules="adduserRules" ref="adduserForm" label-width="100px" class="registeForm">
				<el-form-item label="用户名" prop="username">
					<el-input type="text" v-model="adduserForm.username" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址" prop="email">
					<el-input type="email" v-model="adduserForm.email" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="adduserForm.pass" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="adduserForm.checkPass" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<div class="block">
						<el-date-picker v-model="adduserForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
							</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input type="age" v-model.number="adduserForm.age" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-switch v-model="adduserForm.gender" active-color="#13ce66" inactive-color="#ff4949" active-text="男" inactive-text="女">
					</el-switch>
				</el-form-item>
				<div class="adduserpage-btn">
					<el-button-group>
						<el-button type="primary" @click="submitForm('adduserForm')">提交</el-button>
						<el-button @click="resetForm('adduserForm')">重置</el-button>
					</el-button-group>
				</div>
		</el-form>
</template>

<script>
	export default {
		data() {

			var checkAge = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						//						console.log(typeof(value));
						callback(new Error('请输入数字值'));
					} else {
						if((value < 3) || (value > 150)) {
							//							console.log(typeof(value));
							callback(new Error('请输入正确的年龄'));
						} else {
							callback();
						}
					}
				}, 100);
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				}
				//				type="password"时,输入的值默认为String类型
				//				if(!Number.isInteger(value)) {
				//					console.log(typeof(value));
				//					callback(new Error('请输入数字值'));
				//				}
				if(value.length != 6) {
					callback(new Error('请输入6位长度的密码'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.adduserForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				adduserForm: {
					username: '',
					email: '',
					pass: '',
					checkPass: '',
					birthday: '',
					age: '',
					gender: ''
				},
				//				checkPass: '',
				adduserRules: {
					//					设置username的验证规则
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					//					设置邮箱地址的验证规则
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					//					设置第一次输入的密码验证规则，调用上方自定义方法validatePass
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					//					设置再次输入的密码验证规则，调用上方自定义方法validatePass2
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					//					设置年龄输入值验证规则，调用上方自定义方法checkAge
					age: [{
						validator: checkAge,
						trigger: 'blur'
					}],
					birthday: [{
						type: 'string',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]

				}
			};
		},
			methods: {
			submitForm(formName) {
				const self = this;
//				this.$http.post("http://localhost:8080/tobuyns/user/saveUser",this.registerForm).then(function(res){
//					console.log(res);
//				}).catch(function(err){
//					
//				});
				console.log(this.adduserForm);
				self.$refs[formName].validate((valid) => {
					if(valid) {
						localStorage.setItem('ms_username', self.registerForm.username); //传递username到下个页面
						this.$router.push('/home'); //注册成功后跳转至home页面
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			loginBtn() {
				const self = this;
				self.$router.push('/login'); //点击登录按钮跳转至登录页面
			}
		}
	}
</script>

<style>
	/*.adduserpage-adduser {
		position: relative;
		width: 70%;
		left: 15%;
		margin-top: 5%;
		border-radius: 5px;
	}*/
</style>