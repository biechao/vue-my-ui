<template>
  <div class="vue-my-dropdown" :style="{'width':width+'px'}" :class="dropdown_class" >
    <button class="selected-item" :class="{'focus':list_show}" @click="show_dropdown">
        <span>{{selected_item}}</span>
        <font-awesome-icon class="icon" :icon="['fas','angle-down']" />
    </button>    
    <ul class="dropdown-list" v-show="list_show" v-on-clickaway="hide_dropdown">
      <li v-for="item in init_list" @click="change(item)" :class="{'selected':is_selected(item),'disabled':item.disabled}">
        <a href="javascript:;">
          <div class="name">{{item.name}}</div>
          <div class="icon"><font-awesome-icon v-show="is_selected(item)" class="icon" :icon="['fas','check']" /></div>
        </a>
      </li>
    </ul>    
  </div>    
</template>
<script>
  import "./vue-my-dropdown.less";
  import { directive as onClickaway } from 'vue-clickaway';
  import _ from "lodash";
  export default {
    name: 'vueMyDropdown',
    props:{
      /**
        * Default selected value
      */          
      value:{
          type:[String,Number],
          value:null
      },
      /**
        * Disabled the dropdown
      */            
      disabled:{
          type:Boolean,
          value:false
      },
      /**
        * Width of the dropdown
      */      
      width:{
        type:Number,
        value:null,
      },
      /**
        * Defaut list for select,it should be [{"name":"xxx","value":"xxx"}]
      */            
      init_list:{
        type:Array,
        value:null
      }
    },
    data(){
      return {
        current_value:this.value,
        list_show:false
      }
    },
    computed:{
      dropdown_class(){
        return {
          "disabled":this.disabled
        }
      },
      selected_item(){
        return _.find(this.init_list,item=>item.value == this.current_value).name;
      }
    },
    methods:{
      show_dropdown(){
        if(this.disabled)return;
        this.list_show = true;
      },
      is_selected(item){
        return item.value == this.current_value;
      },
      hide_dropdown(e){
        if(e && (e.target == this.$el.firstChild || e.target.parentElement == this.$el.firstChild))return;
        this.list_show = false;
      },
      change(item){
        if(this.disabled || item.disabled || this.current_value == item.value)return;
        this.current_value = item.value;
        this.hide_dropdown();
        /**
          * Defaut triggered event for v-model
          * @type {Event}
        */            
        this.$emit('input', this.current_value);
        /**
          * Triggered when selected value change
          * @type {Event}
        */            
        this.$emit('change', this.current_value);                      
      }
    },
    directives: {
      onClickaway: onClickaway,
    },    
  }
</script>