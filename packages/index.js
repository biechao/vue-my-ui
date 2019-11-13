// 导入所有组件
import vueMyRadio from './vue-my-radio/index.js'
import vueMyRadioGroup from './vue-my-radio-group/index.js'
import vueMyCheckbox from './vue-my-checkbox/index.js'
import vueMyCheckboxGroup from './vue-my-checkbox-group/index.js'
import vueMyTransfer from './vue-my-transfer/index.js'

const components = [vueMyRadio,vueMyRadioGroup,vueMyCheckbox,vueMyCheckboxGroup,vueMyTransfer]
const install = function(vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  vueMyRadio,
  vueMyRadioGroup,
  vueMyCheckbox,
  vueMyCheckboxGroup,
  vueMyTransfer
}