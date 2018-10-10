<template>
	<div>
		<div class="breadcrumb">
			<span>您当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right" label="1">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="card">
			<div class="card_title">车辆概况</div>
			<el-row class="row-bg">
				<el-col :span="8">
					<div class="grid-content border-right">
						<h3>已上架</h3>
						<p>1896</p>
					</div>
				</el-col>
				<el-col :span="8">

					<div class="grid-content border-right">
						<h3>已下架</h3>
						<p>196</p>
					</div>
				</el-col>
				<el-col :span="8">
					
					<div class="grid-content">
						<h3>车辆总数</h3>
						<p>11896</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="card">
			<div class="card_title">客户总览</div>
			<el-row class="row-bg">
				<el-col :span="6">
					<div class="grid-content border-right">
						<h3>今日新增</h3>
						<p>14</p>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content border-right">
						<h3>昨日新增</h3>
						<p>19</p>
					</div>
				</el-col>
				<el-col :span="6">

					<div class="grid-content border-right">
						<h3>客户总数</h3>
						<p>19</p>
					</div>
				</el-col>
				<el-col :span="6">
					
					<div class="grid-content">
						<h3>日活量</h3>
						<p>196</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="card">
			<div class="card_title">销售统计</div>
			<el-row class="row-bg">
				<el-col :span="8">
					<div class="grid-content border-right">
						<h3>今日新增</h3>
						<p>11</p>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content border-right">
						<h3>昨日新增</h3>
						<p>13</p>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content border-right">
						<h3>销售总数</h3>
						<p>99</p>
					</div>
				</el-col>

			</el-row>

		</div>

		<div class="card">
			<div class="card_title">客户统计</div>
			<el-form class="text-center m-b">
				<el-button plain @click="ToDay('date1')">今日</el-button>
				<el-button plain @click="ThisWeek('date1')">本周</el-button>
				<el-button plain @click="ThisMonth('date1')">本月</el-button>
				<span style="margin-left: 20px;">选择日期：</span>
				<el-date-picker
					v-model="date1"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form>
			<ve-histogram :data="chartData" :extend="extend"></ve-histogram>
		</div>
		<div class="card">
			<div class="card_title">日活统计</div>
			<el-form class="text-center m-b">
				<el-button plain @click="ToDay('date1')">今日</el-button>
				<el-button plain @click="ThisWeek('date1')">本周</el-button>
				<el-button plain @click="ThisMonth('date1')">本月</el-button>
				<span style="margin-left: 20px;">选择日期：</span>
				<el-date-picker
					v-model="date1"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form>

			<ve-histogram :data="chartData" :extend="extend"></ve-histogram>
		</div>
	</div>
</template>

<script>
	import VeHistogram from 'v-charts/lib/histogram'
	export default {
        components: {
            VeHistogram
        },
		data() {
			this.extend = {
				series: {
					label: { show: true, position: "top" }
				}
			}
			return {
				text: '主页',
				date1: '',
				date2: '',
				chartData: {
					columns: ['日期', '访问用户', '下单用户', '下单率'],
					rows: [
						{ '日期': '2018-08-01', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
						{ '日期': '2018-08-02', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
						{ '日期': '2018-08-03', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
						{ '日期': '2018-08-04', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
						{ '日期': '2018-08-05', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
						{ '日期': '2018-08-06', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
						{ '日期': '2018-08-07', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
						{ '日期': '2018-08-08', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
						{ '日期': '2018-08-09', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
						{ '日期': '2018-08-10', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
						{ '日期': '2018-08-11', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
					]
				}
			}
		},
		methods: {
			ToDay(name) { // 今日
				const end = new Date();
				const start = new Date();
				this[name] = [start, end];
			},
			ThisWeek(name) { // 本周
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				this[name] = [start, end];
			},
			ThisMonth(name) { // 本月
				const end = new Date();
				const start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				this[name] = [start, end];
			}
		}
	}
</script>

<style scoped>
	.card {
		border: 1px solid #ebeef5;
    	background-color: #fff;
    	color: #303133;
    	border-radius: 4px;
    	padding: 10px 10px 20px 10px;
		margin-bottom: 15px;
	}
	.card_title {
		padding-left: 10px;
		line-height: 1.6;
		margin-bottom: 10px;
		border-left: 3px solid #4e97d9;
	}
	.grid-content {
		text-align: center;
	}
	.grid-content.border-right {
		border-right: 1px solid #eee;
	}
	.grid-content h3 {
		color: #666;
		font-weight: normal;
		font-size: 14px;
		margin-bottom: 8px;
	}
	.grid-content p {
		color: #000;
		font-size: 14px;
	}
</style>
