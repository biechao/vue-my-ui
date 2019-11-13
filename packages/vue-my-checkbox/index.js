import vueMyCheckbox from './src/vue-my-checkbox.vue'
vueMyCheckbox.install = function (Vue) {
    Vue.component(vueMyCheckbox.name, vueMyCheckbox);
};
export default vueMyCheckbox