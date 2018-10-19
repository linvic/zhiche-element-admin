//异步加载地图JS
export function loadJScript() {
  let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://api.map.baidu.com/api?v=2.0&ak=iiqO8Qu5ORsRZEqW2fpq2QG59wU7IPYz&s=1&callback=init";
      document.body.appendChild(script);
}
