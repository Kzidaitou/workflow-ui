import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './css/override-element-ui.css'
import 'element-plus/es/components/message/style/css'

const app = createApp(App).use(createPinia()).use(router)
app.mount('#app')

import nodeWrap from '@/components/nodeWrap.vue'
app.component('nodeWrap', nodeWrap); //初始化组件
import addNode from '@/components/addNode.vue'
app.component('addNode', addNode); //初始化组件

app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

let debounce = (fn, delay) => {
  var delay = delay || 100;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}

app.directive('enterNumber', {
  mounted(el, { value = 100 }, vnode) {
    el = el.nodeName == "INPUT" ? el : el.children[0]
    var RegStr = value == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${value}}`;
    el.addEventListener('input', debounce(() => {
      el.value = el.value.match(new RegExp(RegStr, 'g'));
      el.dispatchEvent(new Event('input'))
    }));
  }
});