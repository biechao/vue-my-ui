<template>
    <div class="vue-my-checkbox" :class="{'disabled':isDisabled}">  
      <input v-if="isGroup" type="checkbox" :value="label" @change="handleChange" :checked="checked" class="input-checkbox" :disabled="isDisabled" :class="{'disabled':disabledClass}">
      <input v-else type="checkbox" @change="handleChange" :checked="checked" class="input-checkbox" :disabled="isDisabled" :class="{'disabled':disabledClass}">
      <label @click.stop="labelClick">
        <!-- @slot Default to label prop -->
        <slot></slot>
    </label>
    </div>    
</template>
<script>
    import "./vue-my-checkbox.less"
    import _ from "lodash";
    export default {
        name: 'VueMyCheckbox',
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
                return this.$parent.$options._componentTag === 'vueMyCheckboxGroup';
            },
            initChecked(){
                if(this.isGroup()){
                    return _.indexOf(this.$parent.value, this.label) !== -1;
                }else{
                    return this.value;
                }
            },            
            handleChange() {                
                this.$nextTick(function(){
                    if(this.isGroup()){
                        let tmp = this.$parent.value;
                        if(_.indexOf(tmp, this.label) === -1){
                            tmp.push(this.label);
                            this.checked = true;
                        }else{
                            let _this = this;
                            tmp = tmp.filter(function(item){
                                return item != _this.label;
                            });
                            this.checked = false;
                        }
                        this.$parent.change(tmp);
                    }else{
                        this.checked = !this.checked;
                       /**
                           * Defaut triggered event for v-model
                           * @type {Event}
                        */                                           
                        this.$emit('input', this.checked);
                       /**
                           * When value change will trigger this event
                           * @type {Event}
                        */                        
                        this.$emit('change', this.checked);                        
                    }
                });
            },
            labelClick(){
                if(this.isDisabled || this.$parent.disabled)return;
                this.handleChange();
            }
        },
        watch:{
            value(){
                if(this.isGroup()){
                    this.checked = (this.value == this.label);
                }
            },
            '$parent.value'(){
                if(this.isGroup()){
                    this.checked = _.indexOf(this.$parent.value,this.label) !== -1;
                }
            }
        }
    }
</script>