<template>
    <div class="vue-my-tab-group">
      <ul class="tab-header">
        <li v-for="tab in children" class="tab" @click="changeTab(tab)" :class="tab_type">
          <div :class="{'active':tab.active,'disabled':tab.disabled}">{{tab.label}}</div>
        </li>
      </ul>
      <div class="tab-content">
        <!-- @slot For vue-my-tab component -->
        <slot></slot>        
      </div>

    </div>    
</template>
<script>
    import "./vue-my-tab-group.less";
    export default {
        name: 'vueMyTabGroup',
        props:{
          value:{
              type:String,
              value:""
          },
          disabled:{
              type:Boolean,
              value:false
          },
          type:{
            type:String,
            value:"default"
          }
        },
        data(){
          return {
            children:[],
            active:this.value,
            tab_type:this.type || 'default'
          }
        },
        methods:{
            changeTab(tab){
              if(tab.disabled)return;
              this.active = tab.name;
              /**
                 * Defaut triggered event for v-model
                 * @type {Event}
              */                
              this.$emit('input', this.active);              
            }
        },
        mounted(){
          this.children = this.$children;
        }
    }
</script>