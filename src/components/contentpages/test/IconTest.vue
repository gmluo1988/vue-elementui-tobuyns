<template>
	<el-row>
		<el-col :span="24">
			<div class="grid-content">
				<h3>纯色icon展示</h3>
				<i class="iconfont icon-ziyuan61"></i>
				<i class="iconfont icon-icon-ziyuan51"></i>
				<i class="iconfont icon-ziyuan41"></i>
				<i class="iconfont icon-ziyuan31"></i>
				<i class="iconfont icon-ziyuan21"></i>
				<i class="iconfont icon-ziyuan11"></i>
				<i class="iconfont icon-ziyuan6"></i>
				<i class="iconfont icon-ICONbiaozhun_fuzhi-59"></i>
				<br /><br />
				<el-button icon="iconfont icon-ICONbiaozhun_fuzhi-4">显示在左</el-button>
				<el-button>显示在右<i class="iconfont icon-ICONbiaozhun_fuzhi-5"></i></el-button>
				<el-button type="primary" icon="iconfont icon-ICONbiaozhun_fuzhi-1">显示在左</el-button>
				<el-button type="primary">显示在右<i class="iconfont icon-ICONbiaozhun_fuzhi-3"></i></el-button>
				<br /><br />
				<el-button icon="iconfont icon-ICONbiaozhun_fuzhi-58" round>显示在左</el-button>
				<el-button round>显示在右<i class="iconfont icon-ICONbiaozhun_fuzhi-57"></i></el-button>
				<el-button type="primary" icon="iconfont icon-ICONbiaozhun_fuzhi-56" round>显示在左</el-button>
				<el-button type="primary" round>显示在右<i class="iconfont icon-ICONbiaozhun_fuzhi-55"></i></el-button>
				<!--<el-button type="success" >成功按钮</el-button>
				<el-button type="success" round>成功按钮</el-button>-->

			</div>
			<div class="grid-content">
				<h3>彩色icon展示</h3>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-23"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-22"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-21"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-20"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-19"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-18"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-17"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tubiaozhizuomobanyihuifu-16"></use>
				</svg>
				<br /><br />
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-kafei"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tuceng"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-gexinghua"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-ganmaoyaowu"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-diantai"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-hot"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-tingchechang"></use>
				</svg>
				<svg class="icon" aria-hidden="true" style="margin-top: 5px;">
					<use xlink:href="#icon-dasha"></use>
				</svg>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				}
			}
		},

	}
</script>

<style>

</style>