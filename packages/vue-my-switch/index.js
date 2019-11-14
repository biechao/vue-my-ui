import vueMySwitch from './src/vue-my-switch.vue'
vueMySwitch.install = function (Vue) {
    Vue.component(vueMySwitch.name, vueMySwitch);
};
export default vueMySwitch