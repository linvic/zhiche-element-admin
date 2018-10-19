import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../components/common/Layout'
//所有权限通用路由表 constantRouterMap
export const constantRouterMap = [
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/Login'], resolve),
    hidden: true
  },
  { path: '/401', component: resolve => require(['../pages/401'], resolve),hidden: true },
  { path: '/404', component: resolve => require(['../pages/404'], resolve),hidden: true },
  //首页路由
  {
    path: '',
    redirect: 'Home',
    component:Layout,
    children:[
      {
        path: 'Home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-web-home', noCache: true },
        component: resolve => require(['../pages/Home/Home'], resolve)
      }
    ]
  },
]
export default new Router({
  // mode: 'history',
  routes: constantRouterMap
})


//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
//	车辆监控
  {
    path: '/car_monitor',
    redirect: '/car_monitor/car_monitor',
    component: Layout,
    meta:{roles:['no'],},
    children:[
      {
        path: 'car_monitor',
        name: 'car_monitor',
        meta: { title: '车辆监控', icon: 'el-icon-web-home',roles:['no'], noCache: false },
        component: resolve => require(['../pages/car_monitor/car_monitor'], resolve)
      }
    ]
  },
//	车务管理
  {
    path: '/carManager',
    component: Layout,
    redirect: '/carManager/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '车务管理',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'carInfo',
        component: () => import('../pages/carManager/carInfo'),
        name: 'carInfo',
        meta: {
          title: '车辆档案',
          roles:['no'],
        }
      },
      {
        path: 'bind_info',
        component: () => import('../pages/carManager/bind_info'),
        name: 'bind_info',
        meta: {
          title: '绑定信息',
          roles:['no'],
        }
      },
      {
        path: 'device_info',
        component: () => import('../pages/carManager/device_info'),
        name: 'device_info',
        meta: {
          title: '设备信息',
          roles:['no'],
        }
      }
    ]
  },
//	工单管理
  {
    path: '/order_manager',
    component: Layout,
    redirect: '/order_manager/index',
    meta: {
      title: '工单管理',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'car_order',
        component: () => import('../pages/order_manager/car_order'),
        name: 'car_order',
        meta: {
          title: '车辆工单',
          roles:['no'],
        }
      },
      {
        path: 'bind_order',
        component: () => import('../pages/order_manager/bind_order'),
        name: 'bind_order',
        meta: {
          title: '绑定工单',
          roles:['no'],
        }
      },
      {
        path: 'repairOrder',
        component: () => import('../pages/order_manager/repairOrder'),
        name: 'repairOrder',
        meta: {
          title: '检修工单',
          roles:['no'],
        }
      },
      {
        path: 'rescue_order',
        component: () => import('../pages/order_manager/rescue_order'),
        name: 'rescue_order',
        meta: {
          title: '救援工单',
          roles:['no'],
        }
      },
      {
        path: 'repair_order',
        component: () => import('../pages/order_manager/repairOrder'),
        name: 'repair_order',
        meta: {
          title: '取消工单',
          roles:['no'],
        }
      }
    ]
  },
//	风险处理
  {
    path: '/riskManager',
    component: Layout,
    redirect: '/riskManager/index',
    meta: {
      title: '风险处理',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'high_risk_deal',
        component: () => import('../pages/riskManager/high_risk_deal'),
        name: 'high_risk_deal',
        meta: {
          title: '高危处理',
          roles:['no'],
        }
      },
      {
        path: 'alarm_abnormal',
        component: () => import('../pages/riskManager/alarm_abnormal'),
        name: 'alarm_abnormal',
        meta: {
          title: '告警异常',
          roles:['no'],
        }
      },
      {
        path: 'abnormal_car',
        component: () => import('../pages/riskManager/abnormal_car'),
        name: 'abnormal_car',
        meta: {
          title: '异常车辆',
          roles:['no'],
        }
      }
    ]
  },
//	驾驶习惯
  {
    path: '/driving_habit',
    component: Layout,
    redirect: '/driving_habit/index',
    meta: {
      title: '驾驶习惯',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'accelerate',
        component: () => import('../pages/driving_habit/accelerate'),
        name: 'accelerate',
        meta: {
          title: '急加速',
          roles:['no'],
        }
      },
      {
        path: 'slowdown',
        component: () => import('../pages/driving_habit/slowdown'),
        name: 'slowdown',
        meta: {
          title: '急减速',
          roles:['no'],
        }
      },
      {
        path: 'turn',
        component: () => import('../pages/driving_habit/turn'),
        name: 'turn',
        meta: {
          title: '急转弯',
          roles:['no'],
        }
      },
      {
        path: 'brakes',
        component: () => import('../pages/driving_habit/brakes'),
        name: 'brakes',
        meta: {
          title: '急刹车',
          roles:['no'],
        }
      }
    ]
  },
//	APP应用分析
  {
    path: '/app_analyze',
    component: Layout,
    redirect: '/app_analyze/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'APP应用分析',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'install_apply',
        component: () => import('../pages/app_analyze/install_apply'),
        name: 'install_apply',
        meta: {
          title: '安装应用',
          roles:['no'],
        }
      },
      {
        path: 'register_apply',
        component: () => import('../pages/app_analyze/register_apply'),
        name: 'register_apply',
        meta: {
          title: '注册应用',
          roles:['no'],
        }
      },
      {
        path: 'login_apply',
        component: () => import('../pages/app_analyze/login_apply'),
        name: 'login_apply',
        meta: {
          title: '登录应用',
          roles:['no'],
        }
      },
      {
        path: 'loginOut_apply',
        component: () => import('../pages/app_analyze/loginOut_apply'),
        name: 'loginOut_apply',
        meta: {
          title: '退出应用',
          roles:['no'],
        }
      },
      {
        path: 'uninstall_apply',
        component: () => import('../pages/app_analyze/uninstall_apply'),
        name: 'uninstall_apply',
        meta: {
          title: '卸载应用',
          roles:['no'],
        }
      },
    ]
  },
//  数据统计
  {
    path: '/data_count',
    component: Layout,
    redirect: '/data_count/index',
    meta: {
      title: '数据统计',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'car_increase',
        component: () => import('../pages/data_count/car_increase'),
        name: 'car_increase',
        meta: {
          title: '车辆增长',
          roles:['no'],
        }
      },
      {
        path: 'high_increase',
        component: () => import('../pages/data_count/high_increase'),
        name: 'high_increase',
        meta: {
          title: '高危增长',
          roles:['no'],
        }
      },
      {
        path: 'warning_increase',
        component: () => import('../pages/data_count/warning_increase'),
        name: 'warning_increase',
        meta: {
          title: '告警增长',
          roles:['no'],
        }
      },
      {
        path: 'risk_analyze',
        component: () => import('../pages/data_count/risk_analyze'),
        name: 'risk_analyze',
        meta: {
          title: '风险处理分析',
          roles:['no'],
        }
      },
      {
        path: 'resort_analyze',
        component: () => import('../pages/data_count/resort_analyze'),
        name: 'resort_analyze',
        meta: {
          title: '常去分析',
          roles:['no'],
        }
      },
      {
        path: 'stopdata',
        component: () => import('../pages/data_count/stopdata'),
        name: 'stopdata',
        meta: {
          title: '停靠统计',
          roles:['no'],
        }
      },
      {
        path: 'travelmainshow',
        component: () => import('../pages/data_count/travelmainshow'),
        name: 'travelmainshow',
        meta: {
          title: '行驶统计',
          roles:['no'],
        }
      },
      {
        path: 'carInformation',
        component: () => import('../pages/data_count/carInformation'),
        name: 'carInformation',
        meta: {
          title: '车况信息',
          roles:['no'],
        }
      },
      {
        path: 'maintainStatics',
        component: () => import('../pages/data_count/maintainStatics'),
        name: 'maintainStatics',
        meta: {
          title: '保养统计',
          roles:['no'],
        }
      },
      {
        path: 'surroundingCar',
        component: () => import('../pages/data_count/surroundingCar'),
        name: 'surroundingCar',
        meta: {
          title: '周边车辆',
          roles:['no'],
        }
      },
      {
        path: 'insuranceStatics',
        component: () => import('../pages/data_count/insuranceStatics'),
        name: 'insuranceStatics',
        meta: {
          title: '保险统计',
          roles:['no'],
        }
      },
      {
        path: 'repairStatics',
        component: () => import('../pages/data_count/repairStatics'),
        name: 'repairStatics',
        meta: {
          title: '维修分析',
          roles:['no'],
        }
      }
    ]
  },
//  对接ERP
  {
    path: '/dERP',
    component: Layout,
    redirect: '/dERP/index',
    meta: {
      title: '对接ERP',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'storage',
        component: () => import('../pages/dERP/storage'),
        name: 'storage',
        meta: {
          title: '设备入库',
          roles:['no'],
        }
      },
      {
        path: 'equiptInspect',
        component: () => import('../pages/dERP/equiptInspect'),
        name: 'equiptInspect',
        meta: {
          title: '设备检测',
          roles:['no'],
        }
      },
      {
        path: 'equiptManage',
        component: () => import('../pages/dERP/equiptManage'),
        name: 'equiptManage',
        meta: {
          title: '设备管理',
          roles:['no'],
        }
      }
    ]
  },
//  设备期限
  {
    path: '/equipment_deadline',
    component: Layout,
    redirect: '/equipment_deadline/index',
    meta: {
      title: '设备期限',
      icon: 'el-icon-web-home',
      roles:['no'],
    },
    children: [
      {
        path: 'deviceManage',
        component: () => import('../pages/equipment_deadline/deviceManage'),
        name: 'deviceManage',
        meta: {
          title: '续费申请',
          roles:['no'],
        }
      },
      {
        path: 'waitTreat',
        component: () => import('../pages/equipment_deadline/waitTreat'),
        name: 'waitTreat',
        meta: {
          title: '续费处理',
          roles:['no'],
        }
      },
      {
        path: 'hasTreated',
        component: () => import('../pages/equipment_deadline/hasTreated'),
        name: 'hasTreated',
        meta: {
          title: '处理完成',
          roles:['no'],
        }
      }
    ]
  },
//  企业权限架构
  {
    path: '/company_permission',
    component: Layout,
    redirect: '/company_permission/index',
    meta: {
      title: '业务权限架构',
      icon: 'el-icon-web-home',

    },
    children: [
      {
        path: 'company_manager',
        component: () => import('../pages/company_permission/company_manager'),
        name: 'company_manager',
        meta: {
          title: '企业管理',
        }
      },
      {
        path: 'add_company',
        component: () => import('../pages/company_permission/add_company'),
        name: 'add_company',
        meta: {
          title: '新增企业',
        },
        hidden:true
      },
      {
        path: 'editor_company',
        component: () => import('../pages/company_permission/editor_company'),
        name: 'editor_company',
        meta: {
          title: '编辑企业',
        },
        hidden:true
      },
      {
        path: 'company_organization',
        component: () => import('../pages/company_permission/company_organization'),
        name: 'company_organization',
        meta: {
          title: '级别管理',
        }
      }
    ]
  },
  //  系统管理
  {
    path: '/sysManager',
    component: Layout,
    redirect: '/sysManager/index',
    meta: {
      title: '系统管理',
      icon: 'el-icon-web-home',

    },
    children: [
      {
        path: 'roleManager',
        component: () => import('../pages/sysManager/roleManager'),
        name: 'roleManager',
        meta: {
          title: '角色管理',
        }
      },
      {
        path: 'roleAdd',
        component: () => import('../pages/sysManager/roleAdd'),
        name: 'roleAdd',
        meta: {
          title: '新增角色',
        },
        hidden: true
      },
      {
        path: 'roleAdd',
        component: () => import('../pages/sysManager/roleAdd'),
        name: 'roleAdd',
        meta: {
          title: '新增角色',
        },
        hidden: true
      },
      {
        path: 'roleEdit',
        component: () => import('../pages/sysManager/roleEdit'),
        name: 'roleEdit',
        meta: {
          title: '编辑角色',
        },
        hidden: true
      },
      {
        path: 'userManager',
        component: () => import('../pages/sysManager/userManager'),
        name: 'userManager',
        meta: {
          title: '用户管理',
        }
      },
      {
        path: 'userAdd',
        component: () => import('../pages/sysManager/userAdd'),
        name: 'userAdd',
        meta: {
          title: '新增用户',
        },
        hidden: true
      },
      {
        path: 'userEdit',
        component: () => import('../pages/sysManager/userEdit'),
        name: 'userEdit',
        meta: {
          title: '编辑用户',
        },
        hidden: true
      }
    ]
  }
];