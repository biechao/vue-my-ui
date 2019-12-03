import vueMyQrcode from './src/vue-my-qrcode.vue'
vueMyQrcode.install = function (Vue) {
    Vue.component(vueMyQrcode.name, vueMyQrcode);
};
export default vueMyQrcode