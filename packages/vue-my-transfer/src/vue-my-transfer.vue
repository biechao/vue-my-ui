<template>
    <div class="vue-my-transfer" :class="{'disabled':disabled}">
         
            <div class="selectable">
                <p>{{left_title}} <span class="sort" @click="change_left_sort" v-show="show_sort_icon" :class="left_sort_class">&nbsp;</span></p>
                <perfect-scrollbar :style="{'height':needScroll?height+'px':'','width':width+'px'}">
                <ul>
                    <template v-for="(item_,index) in left">
                        <template v-if="has_children(item_)">
                            <li :title="item_.name" @click="parent_toggle(item_,index)" :class="disable_li" class="parent">
                                <span class="tmicon" :class="parent_class(item_)"></span> {{item_.name}}
                            </li>
                            <template v-for="child in item_.children">
                                <li :title="child.name" v-show="show_child(item_)" :class="disable_li" class="child" @click="left_click(child)">
                                  <span>{{child.name}}</span>
                                </li>                                
                            </template>
                        </template>
                        <template v-else>
                            <li :title="item_.name" :class="disable_li(item_)" @click="left_click(item_,index)">    
                                <span>{{item_.name}}</span>
                            </li>
                        </template>
                    </template>
                </ul>
                </perfect-scrollbar>
            </div>
        
        
        <div class="exchange" :style="{'height':height + 30 +'px'}">&nbsp;</div>
        
        <div class="selected">
            <p>{{right_title}} <span class="sort" @click="change_right_sort" v-show="show_sort_icon" :class="right_sort_class">&nbsp;</span></p>
            <perfect-scrollbar :style="{'height':needScroll?height+'px':'','width':width+'px'}">
                <ul>
                    <li v-for="item_ in right" :title="item_.name" @click="right_click(item_)">
                        <span>{{item_.name}}</span>
                    </li>
                </ul>
            </perfect-scrollbar>
        </div>      
        
    </div>
</template>
<script>
    import "./vue-my-transfer.less"
    import _ from "lodash"
    import Vue from "vue"
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
    Vue.use(PerfectScrollbar)    
    export default {
        name: 'VueMyTransfer',
        components: {
            PerfectScrollbar
        },        
        props:{
            /**
             * Items for select, it should be [{"name":"xxx","value":"xxx"}]
             */       
            left_list:{
                type:Array,
                default:[]
            },
            /**
             * Title for the items for select
             */            
            left_title:{
                type:String,
                default:"" 
            },
            /**
             * Default selected items, it should be [{"name":"xxx","value":"xxx"}]
             */            
            right_list:{
                type:Array,
                default:[]
            },
            /**
             * Title for the selected items
             */ 
            right_title:{
                type:String,
                default:"" 
            },
            /**
             * Whether disable the transfer or not
             */ 
            disabled:{
                type:Boolean,
                default:false
            },
            /**
             * Height of the select area, if the content height bigger than this value, will show scrollbar
             */            
            height:{
                type:Number,
                default:null
            },
            /**
             * Width for the left and right select area, not the whole component
             */ 
            width:{
                type:Number,
                default:null
            },
            /**
             * Whether show sort icon for the list
             */            
            show_sort_icon:{
                type:Boolean,
                default:false
            }
        },
         data:function(){
            return {
                left_sort:"asc",
                right_sort:"asc",                
                left:this.init_left(),
                right:this.init_right()
            }
        },        
        computed:{
            needScroll() {
                return typeof(this.height) && parseInt(this.height) > 0;
            },
            left_sort_class(){
                return {
                    'asc':this.left_sort=='asc',
                    'desc':this.left_sort =='desc'
                }
            },
            right_sort_class(){
                return {
                    'asc':this.right_sort=='asc',
                    'desc':this.right_sort =='desc'
                }
            }      
        },
        methods: {
            disable_li(item){
                return{
                    "selectedLi":item.selected
                };
            },
            sort_left_list(){
                this.left = _.orderBy(this.left,['name'],[this.left_sort]);
            },
            sort_right_list(){
                this.right = _.orderBy(this.right,['name'],[this.right_sort]);
            },
            change_left_sort(){
                this.left_sort = this.left_sort=='asc'?'desc':'asc';
                this.sort_left_list();
            },
            change_right_sort(){
                this.right_sort = this.right_sort=='asc'?'desc':'asc';
                this.sort_right_list();
            },      
            init_left(){
                let tmp = _.orderBy(this.left_list,['name'],[this.left_sort ||'asc']);
                let _this = this;
                return _.map(tmp,function(item){
                    if(_this.arr_find(_this.right_list,item)){
                        item.selected = true;
                    }else{
                        item.selected = false;
                    }
                    return item;
                });
            },
            init_right(){
                let tmp = _.orderBy(this.right_list,['name'],[this.right_sort || 'asc'])
                return tmp;
            },
            left_click(object,index){
                if(object.selected || this.disabled){
                    return ;
                }
                object.selected = true;
                Vue.set(this.left, index, object);
                this.right = this.right.concat(object);
                this.sort_right_list();
               /**
                   * When selected items change will trigger this event
                   * @type {Event}
                */                
                this.$emit('change',this.right);
            },
            right_click(object){
                if(this.disabled){
                    return;
                }
                var index = _.findIndex(this.left,function(item){
                    return item.value == object.value;
                });

                let tmp = _.clone(this.left[index]);
                tmp.selected = false;
                Vue.set(this.left, index, tmp);

                this.right = this.right.filter(function(item){
                    return !(item.value == object.value);
                });
                this.sort_right_list();
               /**
                   * When selected items change will trigger this event
                   * @type {Event}
                */                
                this.$emit('change',this.right);
            },          
            arr_find(arr,need){
                var tmp = _.findIndex(arr,function(item){
                    return item.value == need.value;
                })
                return tmp !== -1;
            },
            has_children(object){
                return typeof(object.children) !== 'undefined';
            },
            parent_class(object){
                if(object.expand){
                    return "tmicon-minus-square-o";
                }else{
                    return "tmicon-add-square-o";
                }
            },
            parent_toggle(object,index){
                this.left[index].expand =  !this.left[index].expand;   
            },
            show_child(object){
                return object.expand;
            }  
        },
        watch:{
            left_list:{
                handler(){
                    this.left = this.init_left();
                },
                deep:true
            },
            right_list:{
                handler(){
                    this.right = this.init_right(); 
                },
                deep:true
            }
        }
    }
</script>