import vueMyRadio from './src/vue-my-radio.vue'
vueMyRadio.install = function (Vue) {
    Vue.component(vueMyRadio.name, vueMyRadio);
};
export default vueMyRadio