import vueMyTabGroup from './src/vue-my-tab-group.vue'
vueMyTabGroup.install = function (Vue) {
    Vue.component(vueMyTabGroup.name, vueMyTabGroup);
};
export default vueMyTabGroup