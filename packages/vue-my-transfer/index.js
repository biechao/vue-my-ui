import vueMyTransfer from './src/vue-my-transfer.vue'
vueMyTransfer.install = function (Vue) {
    Vue.component(vueMyTransfer.name, vueMyTransfer);
};
export default vueMyTransfer