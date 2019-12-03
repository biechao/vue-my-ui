import Vue from "vue"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt,faClock } from '@fortawesome/free-regular-svg-icons'
import { faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck,faSortDown,faChevronLeft,faChevronRight,faTimes,faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck,faSortDown,faChevronLeft,faChevronRight,faCalendarAlt,faClock,faTimes,faPencilAlt);
import _ from "lodash";

// import all components
import vueMyRadio from './vue-my-radio/index.js'
import vueMyRadioGroup from './vue-my-radio-group/index.js'
import vueMyCheckbox from './vue-my-checkbox/index.js'
import vueMyCheckboxGroup from './vue-my-checkbox-group/index.js'
import vueMyTransfer from './vue-my-transfer/index.js'
import vueMySwitch from './vue-my-switch/index.js'
import vueMyDropdown from './vue-my-dropdown/index.js'
import vueMyTable from './vue-my-table/index.js'
import vueMyDatepicker from './vue-my-datepicker/index.js'
import vueMyTabGroup from './vue-my-tab-group/index.js'
import vueMyTab from './vue-my-tab/index.js'
import vueMyTagInput from './vue-my-tag-input/index.js'
import vueMySelect from './vue-my-select/index.js'
import vueMyQrcode from './vue-my-qrcode/index.js'

const components = [
  vueMyRadio,
  vueMyRadioGroup,
  vueMyCheckbox,
  vueMyCheckboxGroup,
  vueMyTransfer,
  vueMySwitch,
  vueMyDropdown,
  vueMyTable,
  vueMyDatepicker,
  vueMyTabGroup,
  vueMyTab,
  vueMyTagInput,
  vueMySelect,
  vueMyQrcode
]
const install = function(vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component); 
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
  vueMyDatepicker,
  vueMyTabGroup,
  vueMyTab,
  vueMyTagInput,
  vueMySelect,
  vueMyQrcode
}