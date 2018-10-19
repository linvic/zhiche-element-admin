<template>
  <div class="main">
    <div class="container">
      <div class="header clearfix">
        <div class="header-text">
          基本信息
        </div>
        <!--<div class="create-time">-->
          <!--创建时间：2018-10-11 17:20-->
        <!--</div>-->
      </div>
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm">
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="企业类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成立日期" prop="createTime">
            <el-date-picker
              v-model="ruleForm.createTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="注册资本" prop="money">
            <el-input v-model="ruleForm.money" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人代表" prop="legal">
            <el-input v-model="ruleForm.legal" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" prop="range">
            <el-input v-model="ruleForm.range" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="注册号" prop="registerNumber">
            <el-input v-model="ruleForm.registerNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="address">
            <el-cascader
              :options="options"
              v-model="ruleForm.address"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item prop="detail">
            <el-input v-model="ruleForm.detail" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="登证机关" prop="range">
            <el-input v-model="ruleForm.range" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="企业地址" prop="companyAddress" class="companyAddress">
            <el-input v-model="ruleForm.companyAddress" placeholder="请输入"></el-input>
            <el-button type="primary" size="small" plain class="set-address">设置地址</el-button>
          </el-form-item>
          <el-form-item style="margin-top: 40px">
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'add_company',
    data() {
      return {
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        ruleForm: {
          name: '',
          region: '',
          createTime: '',
          money:"",
          legal:"",
          range:"",
          registerNumber:"",
          address:[],
          detail:"",
          companyAddress:""
        },
        rules: {
          name: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择企业类型', trigger: 'change' }
          ],
          createTime: [
            { required: true, message: '请选择成立日期', trigger: 'change' }
          ],
          money: [
            { required: true, message: '请填写注册资本', trigger: 'change' }
          ],
        }
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container{
    background: #ffffff;
  }
  .content{
    padding: 20px;
    width: 400px;
    margin: 0 auto;
  }
.header{
  padding: 20px;
  .header-text{
    font-weight:500;
    color:rgba(0,0,0,0.85);
    float: left;
    font-size:18px;
  }
  .create-time{
    float: right;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    font-size:14px;
  }
}
  .companyAddress{
    position: relative;
    .set-address{
      position: absolute;
      top:0;
      right: -100px;
    }
  }
  .content .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
</style>