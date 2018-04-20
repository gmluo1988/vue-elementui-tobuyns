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
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-date-picker v-model="filters.dateStr" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getReports">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="success" @click="handleAdd">新增</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="danger" @click="batchRemove" icon="el-icon-delete" :disabled="this.sels.length===0">批量删除</el-button>
					</el-form-item>

				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="reports" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column type="index">
				</el-table-column>
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="碳酸饮料">
								<span>{{ props.row.cola | colaFilter}}</span>
							</el-form-item>
							<el-form-item label="油腻食物">
								<span>{{ props.row.fattyfood |fattyfoodAndSnacksFilter}}</span>
							</el-form-item>
							<el-form-item label="零食">
								<span>{{ props.row.snacks|fattyfoodAndSnacksFilter}}</span>
							</el-form-item>
							<el-form-item label="脏话">
								<span>{{ props.row.badword |badwordAndcomplainFilter}}</span>
							</el-form-item>
							<el-form-item label="抱怨">
								<span>{{ props.row.complain |badwordAndcomplainFilter}}</span>
							</el-form-item>
							<el-form-item label="熬夜">
								<span>{{ props.row.stayuplate |stayuplateFilter}}</span>
							</el-form-item>
							<el-form-item label="阅读书籍">
								<span>{{ props.row.readbook |improvementFilter}}</span>
							</el-form-item>
							<el-form-item label="学习技能">
								<span>{{ props.row.learnskills |improvementFilter}}</span>
							</el-form-item>
							<el-form-item label="拓展技能">
								<span>{{ props.row.developskills |improvementFilter}}</span>
							</el-form-item>
							<el-form-item label="跑步">
								<span v-popover:runningPopover>{{ props.row.running |runningFilter}}</span>
							</el-form-item>
							<el-form-item label="Keep">
								<span v-popover:keepPopover>{{ props.row.keep |keepFilter}}</span>
							</el-form-item>
							<el-form-item label="早餐">
								<span>{{ props.row.breakfast |breakfastAndLunchFilter}}</span>
							</el-form-item>
							<el-form-item label="午餐">
								<span>{{ props.row.lunch |breakfastAndLunchFilter}}</span>
							</el-form-item>
							<el-form-item label="其他餐点">
								<span v-popover:otherfoodPopover>{{ props.row.otherfood |otherfoodFilter}}</span>
							</el-form-item>
						</el-form>
						<!--跑步距离得分明细Popover 弹出框设置-->
						<el-popover ref="runningPopover" placement="top-start" title="跑步距离得分明细" width="200" trigger="hover" 
							content="0, -2分;0公里:-2分;1公里:1分;2公里:3分;3公里:5分;4公里:8分;5公里:10分;6公里:12分;7公里:14分;8公里:16分;9公里:18分;10公里:25分;11公里:30分;12公里:35分;13公里:40分;14公里:45分;15公里:60分;16公里:70分;17公里:80分;18公里:90分;19公里:100分;20公里:150分;21公里:200分;">
						</el-popover>
						<!--Keep完成得分明细Popover 弹出框设置-->
						<el-popover ref="keepPopover" placement="top-start" title="Keep完成得分明细" width="200" trigger="hover" content="完成1组Keep(+3分);完成2组Keep(+6分);完成3组Keep(+9分);未完成(+0分)">
						</el-popover>
						<!--其他餐点得分明细Popover 弹出框设置-->
						<el-popover ref="otherfoodPopover" placement="top-start" title="其他餐点制作得分明细" width="200" trigger="hover" content="完成1种餐点(+3分);完成2种餐点(+6分);完成3种餐点(+9分);未完成(+0分)">
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="dataChange_LastTime" label="日期">
				</el-table-column>
				<el-table-column prop="score" label="得分">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="warning" size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--编辑界面弹出框-->
			<el-dialog title="修改用户信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" ref="editForm" :inline="true">
					<el-form-item label="碳酸饮料">
						<el-radio-group v-model="editForm.cola" size="mini">
							<el-radio class="radio" :label="1" border>没喝</el-radio>
							<el-radio class="radio" :label="0" border>喝了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="油腻食物">
						<el-radio-group v-model="editForm.fattyfood" size="mini">
							<el-radio class="radio" :label="1" border>没吃</el-radio>
							<el-radio class="radio" :label="0" border>吃了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="零食">
						<el-radio-group v-model="editForm.snacks" size="mini">
							<el-radio class="radio" :label="1" border>没吃</el-radio>
							<el-radio class="radio" :label="0" border>吃了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="脏话">
						<el-radio-group v-model="editForm.badword" size="mini">
							<el-radio class="radio" :label="1" border>没说</el-radio>
							<el-radio class="radio" :label="0" border>说了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="抱怨的话">
						<el-radio-group v-model="editForm.complain" size="mini">
							<el-radio class="radio" :label="1" border>没说</el-radio>
							<el-radio class="radio" :label="0" border>说了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="熬夜">
						<el-radio-group v-model="editForm.stayuplate" size="mini">
							<el-radio class="radio" :label="1" border>没熬夜</el-radio>
							<el-radio class="radio" :label="0" border>熬夜了</el-radio>
						</el-radio-group>
					</el-form-item>
					<hr />
					<el-form-item label="阅读">
						<el-radio-group v-model="editForm.readbook" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="学习技能">
						<el-radio-group v-model="editForm.learnskills" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="拓展技能">
						<el-radio-group v-model="editForm.developskills" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<hr />
					<!--<el-form-item label="跑步" prop="running">-->
					<el-form-item label="跑步">
						<el-input v-model="editForm.running" suffix-icon="el-icon-location-outline" placeholder="记得跑步哦" clearable>
						</el-input>

					</el-form-item>
					<!--<el-form-item label="Keep" prop="keep">-->
					<el-form-item label="Keep">
						<el-select v-model="editForm.keep" placeholder="记得来一组Keep">
							<el-option v-for="item in keep0ptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<hr />
					<el-form-item label="早餐">
						<el-radio-group v-model="editForm.breakfast" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="午餐">
						<el-radio-group v-model="editForm.lunch" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="其他餐点">
						<el-select v-model="editForm.otherfood" placeholder="记得做好吃的">
							<el-option v-for="item in otherfood0ptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>

			<!--新增界面弹出框-->
			<el-dialog title="新增每日总结" :visible.sync="addFormVisible" :close-on-click-modal="false">
				<!--<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">-->
				<el-form :model="addForm" label-width="80px" ref="addForm" :inline="true">
					<el-form-item label="碳酸饮料">
						<el-radio-group v-model="addForm.cola" size="mini">
							<el-radio class="radio" :label="1" border>没喝</el-radio>
							<el-radio class="radio" :label="0" border>喝了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="油腻食物">
						<el-radio-group v-model="addForm.fattyfood" size="mini">
							<el-radio class="radio" :label="1" border>没吃</el-radio>
							<el-radio class="radio" :label="0" border>吃了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="零食">
						<el-radio-group v-model="addForm.snacks" size="mini">
							<el-radio class="radio" :label="1" border>没吃</el-radio>
							<el-radio class="radio" :label="0" border>吃了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="脏话">
						<el-radio-group v-model="addForm.badword" size="mini">
							<el-radio class="radio" :label="1" border>没说</el-radio>
							<el-radio class="radio" :label="0" border>说了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="抱怨的话">
						<el-radio-group v-model="addForm.complain" size="mini">
							<el-radio class="radio" :label="1" border>没说</el-radio>
							<el-radio class="radio" :label="0" border>说了</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="熬夜">
						<el-radio-group v-model="addForm.stayuplate" size="mini">
							<el-radio class="radio" :label="1" border>没熬夜</el-radio>
							<el-radio class="radio" :label="0" border>熬夜了</el-radio>
						</el-radio-group>
					</el-form-item>
					<hr />
					<el-form-item label="阅读">
						<el-radio-group v-model="addForm.readbook" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="学习技能">
						<el-radio-group v-model="addForm.learnskills" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="拓展技能">
						<el-radio-group v-model="addForm.developskills" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<hr />
					<!--<el-form-item label="跑步" prop="running">-->
					<el-form-item label="跑步">
						<el-input v-model="addForm.running" suffix-icon="el-icon-location-outline" placeholder="记得跑步哦" clearable>
						</el-input>

					</el-form-item>
					<!--<el-form-item label="Keep" prop="keep">-->
					<el-form-item label="Keep">
						<el-select v-model="addForm.keep" placeholder="记得来一组Keep">
							<el-option v-for="item in keep0ptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<hr />
					<el-form-item label="早餐">
						<el-radio-group v-model="addForm.breakfast" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="午餐">
						<el-radio-group v-model="addForm.lunch" size="mini">
							<el-radio class="radio" :label="1" border>完成</el-radio>
							<el-radio class="radio" :label="0" border>未完成</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="其他餐点">
						<el-select v-model="addForm.otherfood" placeholder="记得做好吃的">
							<el-option v-for="item in otherfood0ptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				</el-pagination>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5, 10, 15 ,20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</div>
	</div>

</template>

<script>
	import { getReportList, removeReport, batchRemoveReport, addReport, editReport } from '../../../api/api';

	export default {
		data() {
			return {
				filters: {
					dateStr: '' //按名字进行筛选时的数据
				},
				reports: [],
				total: 0,
				page: 1,
				pageSize: 10,
				listLoading: false,
				sels: [], //列表选中列

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					keep: [{
						required: true,
						message: '请选择Keep完成情况',
						trigger: 'change'
					}],
					running: [{
							required: true,
							message: '跑步距离不能为空'
						},
						//						{
						//							type: 'number',
						//							message: '跑步距离必须为数字值'
						//						}
					],
				},
				//新增界面数据
				addForm: {
					cola: '',
					fattyfood: '',
					snacks: '',
					badword: '',
					complain: '',
					stayuplate: '',
					readbook: '',
					learnskills: '',
					developskills: '',
					running: '',
					keep: '',
					breakfast: '',
					lunch: '',
					otherfood: ''
				},
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					cola: '',
					fattyfood: '',
					snacks: '',
					badword: '',
					complain: '',
					stayuplate: '',
					readbook: '',
					learnskills: '',
					developskills: '',
					running: '',
					keep: '',
					breakfast: '',
					lunch: '',
					otherfood: ''
				},
				keep0ptions: [{
						value: '0',
						label: '下次记得来一组Keep'
					},
					{
						value: '1',
						label: '完成了1组Keep'
					}, {
						value: '2',
						label: '完成了2组Keep'
					}, {
						value: '3',
						label: '完成了3组Keep'
					}
				],
				otherfood0ptions: [{
						value: '0',
						label: '记得做好吃的'
					},
					{
						value: '1',
						label: '做了1个餐点'
					}, {
						value: '2',
						label: '做了2个餐点'
					}, {
						value: '3',
						label: '做了3个餐点'
					}
				],
			}
		},
		//表格内容过滤显示设置
		filters: {
			//碳酸饮料项过滤显示
			colaFilter: function(val) {
				return val == 1 ? '没喝(+3分)' : val == 0 ? '喝了(-1分)' : '未知';
			},
			//油腻食物和零食项过滤显示
			fattyfoodAndSnacksFilter: function(val) {
				return val == 1 ? '没吃(+3分)' : val == 0 ? '吃了(-1分)' : '未知';
			},
			//脏话和抱怨项过滤显示
			badwordAndcomplainFilter: function(val) {
				return val == 1 ? '没说(+3分)' : val == 0 ? '说了(-1分)' : '未知';
			},
			//熬夜项过滤显示
			stayuplateFilter: function(val) {
				return val == 1 ? '没熬夜(+3分)' : val == 0 ? '熬夜了(-1分)' : '未知';
			},
			//阅读、学习技能、拓展技能项过滤显示
			improvementFilter: function(val) {
				return val == 1 ? '完成(+3分)' : val == 0 ? '未完成(-1分)' : '未知';
			},
			//制作早餐、午餐项过滤显示
			breakfastAndLunchFilter: function(val) {
				return val == 1 ? '完成(+3分)' : val == 0 ? '未完成(+0分)' : '未知';
			},
			//跑步项过滤显示
			runningFilter: function(val) {
				switch(val) {
					case 0:
						return "要坚持跑步(-2分)";
						break;
//					case 5:
//						return "要坚持跑步哦(不得分)";
//						break;
					case 10:
						return "10公里!厉害咯!";
						break;
					default:
						return val + '公里(点击查看得分)';
						break;
				};
				//				let ditance=val;
				//				let intVal=parseInt(val); 
				//				switch (intVal){
				//					case 0:
				//						return "要坚持跑步哦(不得分)";
				//						break;
				//					case 5:
				//						return "要坚持跑步哦(不得分)";
				//						break;
				//					case 10:
				//						return "10公里!厉害咯!";
				//						break;
				//					default:
				//						return ditance+'公里('+ditance+'分)';
				////						return val+'公里';
				//						break;
				//				};
			},
			//Keep想过滤显示
			keepFilter: function(val) {
				switch(val) {
					case 1:
						return '完成1组(+3分)';
						break;
					case 2:
						return '完成2组(+6分)';
						break;
					case 3:
						return '完成3组(+9分)';
						break;
					default:
						return '未完成(+0分)';
						break;
				};
			},
			//制作其他餐点想过滤显示
			otherfoodFilter: function(val) {
				switch(val) {
					case 1:
						return '制作1个(+3分)';
						break;
					case 2:
						return '制作2个(+6分)';
						break;
					case 3:
						return '制作3个(+9分)';
						break;
					default:
						return '未完成(+0分)';
						break;
				};
			},
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

			//获取选中的表格列表
			selsChange: function(sels) {
				this.sels = sels;
			},
			//获取报告列表
			getReports() {
				let para = {
					date: this.filters.dateStr,
					pageIndex: this.page,
					pageSize: this.pageSize

				};
				this.listLoading = true;
				//NProgress.start();
				getReportList(para).then((res) => {
					this.total = res.totalCount;
					this.reports = res.pageData;
					this.listLoading = false;
					//NProgress.done();
				});
			},

			//每页显示条目数切换时
			handleSizeChange(val) {
				this.pageSize = val;
				this.getReports();
			},
			//分页按钮查询
			handleCurrentChange(val) {
				this.page = val;
				this.getReports();
			},
			//列表删除按钮执行操作
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						id: row.id
					};
					removeReport(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getReports();
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
					batchRemoveReport(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getReports();
					});
				}).catch(() => {

				});
			},

			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					cola: 0,
					fattyfood: 0,
					snacks: 0,
					badword: 0,
					complain: 0,
					stayuplate: 0,
					readbook: 0,
					learnskills: 0,
					developskills: 0,
					running: 0,
					//					keep: '',
					keep: 0,
					breakfast: 0,
					lunch: 0,
					//					otherfood: ''
					otherfood: 0
					//					cola: '',
					//					fattyfood: '',
					//					snacks: '',
					//					badword: '',
					//					complain: '',
					//					stayuplate: '',
					//					readbook: '',
					//					learnskills: '',
					//					developskills: '',
					//					running: '',
					//					keep: '',
					//					breakfast: '',
					//					lunch: '',
					//					otherfood: ''
				};
			},
			//新增界面提交按钮执行操作
			addSubmit: function() {
				//				console.log(this.addForm);
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = this.addForm;
							addReport(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getReports();
							});
						});
					}
				});
			},

			//显示编辑界面
			handleEdit: function(index, row) {
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
							editReport(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getReports();
							});
						});
					}
				});
			},

		},
		mounted() {
			this.getReports();
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
	/*设置表格展开项的样式*/
	
	.demo-table-expand {
		font-size: 0;
		background-color: aliceblue;
	}
	
	.demo-table-expand label {
		width: 90px;
		/*color: #99a9bf;*/
		color: deepskyblue;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		/*设置展开项中每个展示项的大小*/
		width: 20%;
	}
</style>