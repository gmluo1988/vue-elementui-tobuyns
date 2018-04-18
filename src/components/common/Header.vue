<template>
	<div class="header">
		<div class="logo">
			<span ><img src="../../assets/img/homepagelogo.jpg" class="logoimg"/></span>
			我要买一台NS</div>
		<div class="user-info">
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
                    <img class="user-logo" src="../../assets/img/personimg.jpg">
                    {{username}}                   
                </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="loginout">安全退出</el-dropdown-item>
					<el-dropdown-item command="changeuser">切换用户</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				name: 'gmluo'
			}
		},
		computed: {
			username() {
				let username = localStorage.getItem('ms_username');
				return username ? username : this.name;
			}
		},
		methods: {
			handleCommand(command) {
				if(command == 'loginout') {
					localStorage.removeItem('ms_username')
					this.$router.push('/login');
				}
				if(command == 'changeuser') {
					localStorage.removeItem('ms_username')
					this.$router.push('/login');
				}

			}
		}
	}
</script>
<style scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		line-height: 70px;
		background: #13C7E3;
	}
	
	.header .logo {
		float: left;
		width: 250px;
		text-align: center;
	}
	
	.logoimg{
		width: 60px;
		height: 60px;
		/*margin-bottom: 5px;*/
	}
	
	.user-info {
		float: right;
		padding-right: 100px;
		font-size: 16px;
		/*color: #fff;*/
	}
	
	.user-info .el-dropdown-link {
		position: relative;
		display: inline-block;
		padding-left: 50px;
		/*color: #fff;*/
		cursor: pointer;
		vertical-align: middle;
	}
	
	.user-info .user-logo {
		position: absolute;
		left: 0;
		top: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.el-dropdown-menu__item {
		text-align: center;
	}
</style>