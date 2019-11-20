import Vue from "vue"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt,faClock } from '@fortawesome/free-regular-svg-icons'
import { faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck,faSortDown,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck,faSortDown,faChevronLeft,faChevronRight,faCalendarAlt,faClock);
// 导入所有组件
import vueMyRadio from './vue-my-radio/index.js'
import vueMyRadioGroup from './vue-my-radio-group/index.js'
import vueMyCheckbox from './vue-my-checkbox/index.js'
import vueMyCheckboxGroup from './vue-my-checkbox-group/index.js'
import vueMyTransfer from './vue-my-transfer/index.js'
import vueMySwitch from './vue-my-switch/index.js'
import vueMyDropdown from './vue-my-dropdown/index.js'
import vueMyTable from './vue-my-table/index.js'
import vueMyDatepicker from './vue-my-datepicker/index.js'

const components = [
  vueMyRadio,
  vueMyRadioGroup,
  vueMyCheckbox,
  vueMyCheckboxGroup,
  vueMyTransfer,
  vueMySwitch,
  vueMyDropdown,
  vueMyTable,
  vueMyDatepicker
]
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
  vueMyTransfer,
  vueMySwitch,
  vueMyDropdown,
  vueMyTable,
  vueMyDatepicker
}