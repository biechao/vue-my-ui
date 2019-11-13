<template>
    <div class="vue-my-checkbox-group" :class="{disabled:disabled}">
      <!-- @slot For vue-my-checkbox component -->
      <slot></slot>
    </div>    
</template>
<script>
    import "./../../vue-my-checkbox/src/vue-my-checkbox.less";
    export default {
        name: 'vueMyCheckboxGroup',
        componentName:"vueMyCheckboxGroup",
        props:{
            value:{
                type:Array,
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
                this.$emit('input', data);
               /**
                   * Event triggered when select value change
                   * @type {Event}
                */                 
                this.$emit('change', data);
            }
        }
    }
</script>