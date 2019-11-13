<template>
    <div class="vue-my-radio-group" :class="{disabled:disabled}">
      <!-- @slot For vue-my-radio component -->
      <slot></slot>
    </div>    
</template>
<script>
    import "./../../vue-my-radio/src/vue-my-radio.less";
    export default {
        name: 'vueMyRadioGroup',
        componentName:"vueMyRadioGroup",
        props:{
            value:{
                type:[String,Number,Boolean],
                value:""
            },
            disabled:{
                type:Boolean,
                value:false
            }
        },
        computed:{
        },
        methods:{
            change(data){
               /**
                   * Defaut triggered event for v-model
                   * @type {Event}
                */                
                this.$emit('input', data.value);
               /**
                   * Event triggered when radio value change
                   * @type {Event}
                */                
                this.$emit('change', data.value);
            }
        }
    }
</script>