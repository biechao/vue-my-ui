<template>
  <div class="vue-my-qrcode">
    <canvas></canvas>
  </div>    
</template>
<script>
  import QRious from 'qrious';
  export default {
    name: 'vueMyDrcode',
    props:{
      /**
        * Content in the QR code
      */          
      value:{
          type:String,
          value:null
      },
      /**
        * size of the QR code image
      */            
      size:{
          type:[Number,String],
          value:200
      },
      /**
        * Error correction level of the QR code, it could be:L, M, Q, H.
      */            
      level:{
        type:String,
        value:'M'
      },
      /**
        * Background color of the QR code image
      */            
      background:{
        type:String,
        value:'#FFF'
      },
      /**
        * Foreground color of the QR code image
      */            
      foreground:{
        type:String,
        value:'#000'
      }            
    },
    data(){
      return {
        canvas:""
      }
    },
    methods:{
      generate(){
        let qr = new QRious({
          element: this.canvas,
          value: this.value,
          size:this.size || 200,
          background:this.background || '#FFF',
          foreground:this.foreground || '#000',
          level:this.level || 'M'
        });
      },
      change(){
        /**
          * Triggered when QR image regenerated
          * @type {Event}
        */            
        this.$emit('change');                      
      }
    },
    mounted(){
      this.canvas = this.$el.firstChild;
      this.generate();
    },
    watch:{
      $props: {
        handler() {
          this.generate();
          this.change();
        },
        deep: true,
        immediate: true,
      }
    }    
  }
</script>