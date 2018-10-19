<template>
  <div>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width" class-name="operate">
        <template slot-scope="scope">
          <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
          <span v-if="index+1!=columns.length">{{scope.row[column.value]}}</span>
          <span v-else>
              <el-button type="success" @click.stop="addComapy(scope.row[column.value])" size="small" plain>新增</el-button>
              <el-button type="primary" size="small" plain @click.stop="editorComapy(scope.row[column.value])">编辑</el-button>
              <el-button type="danger"  size="mini" plain>删除</el-button>
        </span>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-dialog
      title="新增级别"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose1">
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
          <el-button size="small" @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" size="small" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑级别"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose2">
      <span class="add_company">
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" size="small" label-width="100px" class="demo-ruleForm">
            <el-form-item label="父级：" prop="parent">
               <el-select v-model="ruleForm1.parent" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="级别名称：" prop="name">
                <el-input v-model="ruleForm1.name"></el-input>
            </el-form-item>
           <el-form-item label="设备类型：" prop="type">
              <el-checkbox-group v-model="ruleForm1.type">
                  <el-checkbox label="行车记录仪" name="type"></el-checkbox>
                  <el-checkbox label="手机终端" name="type"></el-checkbox>
                  <el-checkbox label="OBD" name="type"></el-checkbox>
               </el-checkbox-group>
           </el-form-item>
          <el-form-item label="负责人：" prop="principal">
            <el-input v-model="ruleForm1.principal"></el-input>
          </el-form-item>
          <el-form-item label="级别地址：" prop="address" class="companyAddress">
            <el-input v-model="ruleForm1.address"></el-input>
            <el-button type="primary" size="small" plain class="set-address">设置地址</el-button>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" size="small" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      dialogVisible1:false,
      dialogVisible2:false,
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
      ruleForm1:{
        parent:"",
        name:"",
        type: [],
        principal:"",
        address:""
      },
      rules1:{
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
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
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
  //  新增
    addComapy(xx){
      this.dialogVisible1=true
    },
    //编辑
    editorComapy(){
      this.dialogVisible2=true
    },
    handleClose1(){
      this.dialogVisible1=false
    },
    handleClose2(){
      this.dialogVisible2=false
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
