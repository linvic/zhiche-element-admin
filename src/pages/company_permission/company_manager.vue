<template>
  <div class="main">
        <el-row >
          <el-col :span="12">
            <el-input
              placeholder="企业名称/代码/管理员/手机号"
              v-model="filterForm.keyword" suffix-icon="el-icon-search" style="max-width:294px;">
            </el-input>
          </el-col>
          <el-col :span="12" class="text-right">
              <el-button type="primary" size="small">导出</el-button>
              <el-button type="success" size="small" @click="addCompany()">新增</el-button>
          </el-col>
        </el-row>
        <el-row class="table">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="95"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="企业名称"
              >
            </el-table-column>
            <el-table-column
              prop="code"
              label="企业代码"
              >
            </el-table-column>
            <el-table-column
              prop="admin"
              label="管理员"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="管理员手机号"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="340"
              class-name="operate"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" plain @click="editorCompany(1)">编辑</el-button>
                <el-button type="success" size="mini" plain @click="editorCompany(2)">业务配置</el-button>
                <el-button type="danger" size="mini" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:"company_manager",
    data() {
      return {
        filterForm:{
          keyword:""
        },
        currentPage4:1,
        tableData: [
          {
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          },{
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          },{
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          },{
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          },{
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          },{
            name: '智车科技',
            code: '王小虎',
            admin: 'admin',
            phone:"18146687702"
          }
        ],
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addCompany(){
        this.$router.push(
          {
            path:"/company_permission/add_company"
          }
        )
      },
      editorCompany(type){
          this.$router.push(
            {
              path:"/company_permission/editor_company",
              query:{
                type:type
              }
            }
          )
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table{
    margin-top: 10px;
  }
  .el-table .operate .cell{
    text-align: left;
  }
  .pagination{
    text-align: center;
    margin-top: 40px;
  }
</style>