<template>
  <div class="vue-my-tag-input" @click="focus_input" :class="{'disabled':disabled}">
     <ul>
      <li class="tag" v-for="(item,index) in current_value" @click.stop="stop">
        <span class="content" :title="item" :class="{'limit':tag_width && tag_width > 0}" :style="tag_width_style">{{item}}</span>
        <span class="close" @click="remove(item)"><font-awesome-icon class="icon" :icon="['fas','times']" /></span>
      </li>
      <input type="text" :style="{'width':input_width - 6 +'px'}" :disabled="disabled" v-focus="focused" @keydown.delete="remove_last" @blur="blur_input" @keyup.enter="add" v-model="input_value"/>
     </ul>
  </div>    
</template>
<script>
  import "./vue-my-tag-input.less";
  
  export default {
    name: 'vueMyTagInput',
    props:{
      /**
        * Default array for tags
      */          
      value:{
          type:Array,
          value:[],
      },
      /**
        * Disabled the tag
      */            
      disabled:{
          type:Boolean,
          value:false
      },
      /**
        * Width of the whole tag
      */      
      width:{
        type:Number,
        value:null,
      },
      /**
        * if the widh of single tage exceed this value, will show as xxx...
      */      
      tag_width:{
        type:Number,
        value:null,
      }      
    },
    computed:{
      tag_width_style(){
        if(this.tag_width && this.tag_width > 0){
          return {
            "max-width":this.tag_width + 'px'
          }
        }else{
          return {};
        }
      }
    },
    data(){
      return {
        current_value:this.value,
        focused:false,
        input_value:"",
        input_width:""
      }
    },
    methods:{
      stop(){
        return false;
      },
      remove(item){
        if(this.disabled)return;
        this.current_value = this.current_value.filter(function(value){
            return item != value;
        });
        this.emit();
      },
      remove_last(){
        if(this.current_value.length > 0 && this.input_value.trim().length == 0){
          let item = this.current_value[this.current_value.length-1];
          this.remove(item);
        }
      },
      add(){
        if(this.disabled)return;
        if(this.input_value.trim().length == 0)return;
        if(this.is_duplicate(this.input_value.trim())){
        /**
          * Event triggered if there are duplicate item in the tags.
          * @type {Event}
        */            
        this.$emit('duplicate');
        return false;         
        }
        this.current_value = this.current_value.concat(this.input_value.trim());
        this.input_value="";
        this.$nextTick(()=>{this.get_input_width()});
        this.emit();
      },
      focus_input(){
        if(this.disabled)return;
        this.focused=true;
      },
      blur_input(){
        if(this.disabled)return;
        this.focused=false;
        this.add();
      },
      is_duplicate(item){
        return _.findIndex(this.current_value,value=>item == value) != -1;
      },
      get_input_width(){
        let li_total_width = 0;
        _.forEach(this.$el.getElementsByClassName("tag"),(li)=>{
          li_total_width += li.offsetWidth + 4;// 4 for margin
        })
        let tag_total_width = this.$el.offsetWidth -10;
        if((tag_total_width - li_total_width ) > 80){
          this.input_width = tag_total_width - li_total_width;
        }
      },
      emit(){
        /**
          * Defaut triggered event for v-model
          * @type {Event}
        */            
        this.$emit('input', this.current_value);                     
      }
    },
    directives: {
      focus:{
        componentUpdated: function (el, value) {
          if ( value.value) {
            el.focus();
          }
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{this.get_input_width()});
    }    
  }
</script>