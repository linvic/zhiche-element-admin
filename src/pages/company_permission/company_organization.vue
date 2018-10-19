<template>
  <div class="main">
    <el-collapse @change="handleChange" accordion>
      <el-collapse-item v-for="(item,index) in 5" :key="index">
        <template slot="title">
          智车科技
          <el-button type="success" size="small" plain class="addComany" @click.stop="addComapy()">新增</el-button>
        </template>
        <tree-table :data="data" :columns="columns" border></tree-table>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="新增级别"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span class="add_company">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm">
            <el-form-item label="父级：" prop="parent">
               <el-select v-model="ruleForm.parent" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="级别名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
           <el-form-item label="设备类型：" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="行车记录仪" name="type"></el-checkbox>
                  <el-checkbox label="手机终端" name="type"></el-checkbox>
                  <el-checkbox label="OBD" name="type"></el-checkbox>
               </el-checkbox-group>
           </el-form-item>
          <el-form-item label="负责人：" prop="principal">
            <el-input v-model="ruleForm.principal"></el-input>
          </el-form-item>
          <el-form-item label="级别地址：" prop="address" class="companyAddress">
            <el-input v-model="ruleForm.address"></el-input>
            <el-button type="primary" size="small" plain class="set-address">设置地址</el-button>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import treeTable from '../../components/TreeTable'
  export default {
    components: { treeTable },
    data() {
      return {
        dialogVisible:false,
        ruleForm:{
          parent:"",
          name:"",
          type: [],
          principal:"",
          address:""
        },
        rules:{
          name:[
            { required: true, message: '请输入级别名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { type: 'array', message: '请选择设备', trigger: 'change' }
          ],
          address:[
            { required: true, message: '请输入级别地址', trigger: 'blur' },
          ]
        },
        columns: [
          {
            text: '级别名称',
            value: 'event',
          },
          {
            text: '负责人姓名',
            value: 'name'
          },
          {
            text: '负责人账号',
            value: 'timeLine'
          },
          {
            text: '设备类型',
            value: 'comment'
          },
          {
            text: '操作',
            width:260,
            value: 'id'
          }
        ],
        data: [
          {
            id: 0,
            event: '东北区',
            timeLine: 50,
            comment: '无',
            name:"拉速度快",
            children: [
              {
                id: 2,
                event: '易鑫融资租赁青岛分公司',
                timeLine: 10,
                comment: '无',
                children: [
                  {
                    id: 4,
                    event: '事件4',
                    timeLine: 5,
                    comment: '无',
                    name:"拉速度快"
                  },
                  {
                    id: 5,
                    event: '事件5',
                    timeLine: 10,
                    comment: '无',
                    name:"拉速度快"
                  },
                  {
                    id: 6,
                    event: '事件6',
                    timeLine: 75,
                    name:"拉速度快",
                    comment: '无',
                    children: [
                      {
                        id: 7,
                        event: '事件7',
                        timeLine: 50,
                        name:"拉速度快",
                        comment: '无',
                        children: [
                          {
                            id: 71,
                            event: '事件71',
                            timeLine: 25,
                            name:"拉速度快",
                            comment: 'xx'
                          },
                          {
                            id: 72,
                            event: '事件72',
                            name:"拉速度快",
                            timeLine: 5,
                            comment: 'xx'
                          },
                          {
                            id: 73,
                            event: '事件73',
                            timeLine: 20,
                            name:"拉速度快",
                            comment: 'xx'
                          }
                        ]
                      },
                      {
                        id: 8,
                        event: '事件8',
                        timeLine: 25,
                        name:"拉速度快",
                        comment: '无'
                      }
                    ]
                  }
                ]
              },
              {
                id: 3,
                event: '易鑫融资租赁大连分公司',
                timeLine: 90,
                name:"拉速度快",
                comment: '无',
                children: [
                  {
                    id: 4,
                    event: '事件4',
                    timeLine: 5,
                    name:"拉速度快",
                    comment: '无'
                  },
                  {
                    id: 5,
                    event: '事件5',
                    name:"拉速度快",
                    timeLine: 10,
                    comment: '无'
                  },
                  {
                    id: 6,
                    event: '事件6',
                    name:"拉速度快",
                    timeLine: 75,
                    comment: '无',
                    children: [
                      {
                        id: 7,
                        event: '事件7',
                        timeLine: 50,
                        name:"拉速度快",
                        comment: '无',
                        children: [
                          {
                            id: 71,
                            event: '事件71',
                            timeLine: 25,
                            name:"拉速度快",
                            comment: 'xx'
                          },
                          {
                            id: 72,
                            event: '事件72',
                            timeLine: 5,
                            name:"拉速度快",
                            comment: 'xx'
                          },
                          {
                            id: 73,
                            event: '事件73',
                            name:"拉速度快",
                            timeLine: 20,
                            comment: 'xx'
                          }
                        ]
                      },
                      {
                        id: 8,
                        name:"拉速度快",
                        event: '事件8',
                        timeLine: 25,
                        comment: '无'
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      handleChange(val) {
        console.log(val);
      },
      showRow: function(row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function(trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.children && record.children.length > 0)
      },
      handleClose(){
        this.dialogVisible=false
      },
    //  新增
      addComapy(){
        this.dialogVisible=true
      },
    }
  }
</script>
<style lang="scss" scoped>
  .addComany{
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
  .companyAddress{
    position: relative;
    .set-address{
      position: absolute;
      top:0;
      right: 0;
    }
  }
</style>