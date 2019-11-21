<template>
    <div class="vue-my-tab" :class="{'disabled':isDisabled}" v-show="active">  
        <!-- @slot For the content of the tab-->
        <slot></slot>
    </div>    
</template>
<script>
    import "./vue-my-tab.less"
    export default {
        name: 'VueMyTab',
        props:{
            name:{
                type:String,
                value:""
            },
            disabled:{
                type:Boolean,
                default:false
            },
            label:{
                type:String,
                default:false
            }
        },
        data(){
            return{
                active:this.initActive()
            }
        },
        computed:{
            isDisabled(){
                return this.disabled ;
            },
            disabledClass(){
                return this.isDisabled;
            }
        },
        methods:{
            initActive(){
                return this.$parent.active == this.name;
            }
        },
        watch:{
            '$parent.active'(){
                this.active = this.initActive();
            }
        }
    }
</script>