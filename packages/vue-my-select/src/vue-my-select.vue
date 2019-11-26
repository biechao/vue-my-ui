<template>
  <div class="vue-my-select" :style="{'width':width+'px'}" :class="dropdown_class" >
    <button class="selected-item" :class="{'focus':list_show}" @click="show_dropdown">
        <div class="items">
          <div class="item" @click="show_dropdown" v-for="(item,index) in current_value" v-show="current_value.length>0">
            <span :style="item_width_style" :title="(item_width && item_width > 0)?item.name:''" :class="{'limit':item_width && item_width > 0,'content':true}">{{item.name}}</span>
            <span class="close" @click.stop="remove(item)">
              <font-awesome-icon class="icon" :icon="['fas','times']" />
            </span>
          </div>
          <div class="input-area">
            <input type="text" class="filter" v-model="filter" :readonly="is_readonly" :class="{'readyonly':is_readonly}" :placeholder="placeholder" v-show="current_value.length==0 || filterable"/>
            <font-awesome-icon v-show="typing" class="pencil" :icon="['fas','pencil-alt']" />
          </div>
        </div>
        <font-awesome-icon @click="show_dropdown" class="icon" :icon="['fas','angle-down']" />
    </button>    
    <ul class="dropdown-list" v-show="list_show" v-on-clickaway="hide_dropdown">
      <li class="loading" v-show="loading">{{loading_text || 'Loading...'}}</li>
      <li class="no_data" v-show="filter_list.length == 0 && !loading">{{no_data_text || 'No data to display'}}</li>
      <template v-for="item in filter_list">
        <li @click="change(item)" :class="{'selected':is_selected(item),'disabled':item.disabled}" v-show="!loading">
          <a href="javascript:;">
            <div class="name">{{item.name}}</div>
            <div class="icon"><font-awesome-icon v-show="is_selected(item)" class="icon" :icon="['fas','check']" /></div>
          </a>
        </li>
      </template>
    </ul>    
  </div>    
</template>
<script>
  import "./vue-my-select.less";
  import { directive as onClickaway } from 'vue-clickaway';
  import _ from "lodash";
  export default {
    name: 'vueMyDropdown',
    props:{
      /**
        * Default selected value
      */          
      value:{
          type:Array,
          value:[]
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
      },
      /**
        * Default text for no item been selected
      */            
      placeholder:{
        type:String,
        value:"Select"
      },
      /**
        * Show input to filter the list.
      */            
      filterable:{
        type:Boolean,
        value:false
      },
      /**
        * Whether search data from server
      */            
      server_mode:{
        type:Boolean,
        value:true
      },
      /**
        * Method use to query data from server
      */            
      server_method:{
        type:Function,
        value:null
      },
      /**
        * if the widh of single item exceed this value, will show as xxx...
      */      
      item_width:{
        type:Number,
        value:null,
      },
      /**
        * Whether loading for query data from backend server.
      */      
      loading:{
        type:Boolean,
        value:false,
      },
      /**
        * String for loading data from backend server.
      */      
      loading_text:{
        type:String,
        value:"Loading...",
      },
      /**
        * String to display when no data from backend server.
      */      
      no_data_text:{
        type:String,
        value:"No data to display",
      }      
    },
    data(){
      return {
        current_value:this.value,
        list_show:false,
        filter:"",
        typing:false,
        filter_list:this.init_list,
        filter_triggered_by_change:false
      }
    },
    computed:{
      dropdown_class(){
        return {
          "disabled":this.disabled
        }
      },
      is_readonly(){
        return !this.filterable || this.disabled;
      },
      item_width_style(){
        if(this.item_width && this.item_width > 0){
          return {
            "max-width":this.item_width + 'px'
          }
        }else{
          return {};
        }
      }      
    },
    methods:{
      search:_.debounce(function(){
        this.typing = false;
        this.server_method(this.filter);
      },700),      
      show_dropdown(){
        if(this.disabled)return;
        this.list_show = true;
      },
      is_selected(item){
        return _.findIndex(this.current_value,value=>item.value == value.value) !== -1;
      },
      hide_dropdown(e){
        if(e && (e.target == this.$el.firstChild || e.target.parentElement == this.$el.firstChild || e.target.className.indexOf("content") !== -1 || e.target.className.indexOf("filter") !== -1))return;
        this.list_show = false;
      },
      remove(item){
        this.change(item);
      },
      change(item){
        if(this.disabled || item.disabled)return;
        if(_.findIndex(this.current_value,value=>value.value==item.value) == -1){
          this.current_value.push(item);
        }else{
          this.current_value = this.current_value.filter(value=>!(value.value == item.value));          
        }
        this.filter="";
        this.filter_triggered_by_change = true;
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
    watch:{
      filter(){
        if(this.server_mode){
          if(this.filter_triggered_by_change){
            this.filter_triggered_by_change = false;
            return;
          }
          this.typing = true;
          this.search();
        }else{
          if(this.filter.length > 0){
            this.filter_list = this.init_list.filter(item=>item.name.toLowerCase().indexOf(this.filter.toLowerCase())!== -1);
          }else{
            this.filter_list= this.init_list;
          }
        }
      },
      init_list:{
        handler(){
          this.filter_list = this.init_list;
        },        
        deep:true
      }
    }    
  }
</script>