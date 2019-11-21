import vueMyTab from './src/vue-my-tab.vue'
vueMyTab.install = function (Vue) {
    Vue.component(vueMyTab.name, vueMyTab);
};
export default vueMyTab