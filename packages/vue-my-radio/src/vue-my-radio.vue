<template>
    <div class="vue-my-radio" :class="{'disabled':isDisabled}">
      <input type="radio" :value="label" @change="handleChange" :checked="checked" class="input-radio" :disabled="isDisabled" :class="{'disabled':disabledClass}">
      <label @click.stop="labelClick">
        <!-- @slot Default to label prop -->
        <slot></slot>
    </label>
    </div>    
</template>
<script>
    import "./vue-my-radio.less"
    export default {
        name: 'VueMyRadio',
        props:{
            value:{
                type:[String,Number,Boolean],
                value:""
            },
            label:{
                type:[String,Number],
                value:""
            },
            disabled:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return{
                checked:this.initChecked()
            }
        },
        computed:{
            isDisabled(){
                return this.disabled || this.$parent.disabled;//default disabled attribute is false
            },
            disabledClass(){
                return this.isDisabled || this.$parent.disabled;//only add disabled class for the unchecked radio to stop hover color change.
            }
        },
        methods:{
            isGroup(){
                return this.$parent.$options._componentTag === 'vueMyRadioGroup';
            },
            initChecked(){
                if(this.isGroup()){
                    return this.label == this.$parent.value;
                }else{
                    return this.value == this.label;
                }
            },            
            handleChange() {                
                this.$nextTick(function(){
                    if(this.isGroup()){
                        this.$parent.change({
                            value: this.label,
                            checked: this.value                            
                        })
                        this.checked = this.label == this.$parent.value;
                    }else{ 
                       /**
                           * Defaut triggered event for v-model
                           * @type {Event}
                        */                                           
                        this.$emit('input', this.label);
                       /**
                           * When value change will trigger this event
                           * @type {Event}
                        */                        
                        this.$emit('change', this.label);                        
                    }
                });
            },
            labelClick(){
                if(this.isDisabled || this.$parent.disabled)return;
                this.checked = true;
                this.handleChange();
            }
        },
        watch:{
            value(){
                this.checked = (this.value == this.label);
            },
            '$parent.value'(){
                this.checked = this.label == this.$parent.value;
            }
        }
    }
</script>