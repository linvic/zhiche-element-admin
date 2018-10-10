``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

一、 elementUI 
	自定义主题：@/assets/css/element-variables.scss文件重写主题色

二、 整体框架（上左右结构）
	@/components/Layout

三、 路由配置
	@/route

四、 es6兼容解决
	安装babel-polyfill

五、 axios数据交互/token验证
	@/api/https
	在拦截器上Token验证及请求loading效果

六、 字体图标iconfont
	static/font/iconfont

六、 图表使用v-charts