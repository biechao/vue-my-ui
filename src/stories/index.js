/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import colDetail from './../../demo_components/col-detail/index'
import comments from './../../demo_components/comments/index'
import Vue from 'vue'
Vue.component('col-detail', colDetail)
Vue.component('comments', comments)

import {
  vueMyRadio,
  vueMyRadioGroup,
  vueMyCheckbox,
  vueMyCheckboxGroup,
  vueMyTransfer,
  vueMySwitch,
  vueMyDropdown,
  vueMyTable,
  vueMyDatepicker,
  vueMyTabGroup,
  vueMyTab,
  vueMyTagInput,
  vueMySelect,
  vueMyQrcode
} from './../../packages/index'

storiesOf('Radio', module)
  .addDecorator(withInfo)
  .add('Single default radio', () => ({
    components: { vueMyRadio },
    template: `<div>
                  selected options is: option {{checked}} <br/>
                  <vueMyRadio @change="change" v-model="checked" label="1">option 1 <input type="text" v-show="checked==1" /></vueMyRadio>
                  <vueMyRadio @change="change" v-model="checked" label="2">option 2</vueMyRadio>
                  <vueMyRadio @change="change" v-model="checked" label="3">option 3 </vueMyRadio>
                </div>`,
    data(){return {checked:1}},
    methods: { change(){console.log(this.checked)} }
  }),{info:true})
  .add('Single disabled radio', () => ({
    components: { vueMyRadio },
    template: `<div>
                  selected options is: option {{checked}} <br/>
                  <vueMyRadio @change="change" :disabled="disabled" v-model="checked" label="1">option 1</vueMyRadio>
                  <vueMyRadio @change="change" :disabled="disabled" v-model="checked" label="2">option 2</vueMyRadio>
                  <vueMyRadio @change="change" :disabled="disabled" v-model="checked" label="3">option 3 <input type="text" v-show="checked==3" /></vueMyRadio>
                </div>`,
    data(){return {checked:1,disabled:true}},
    methods: { change(){console.log(this.checked)} }
  }),{info:true})  
  .add('Single inline radio', () => ({
    components: { vueMyRadio },
    template: `<div>
                selected options is: option {{checked}} <br/>
                <vueMyRadio @change="change" class="inline" v-model="checked" label="1">option 1</vueMyRadio>
                <vueMyRadio @change="change" class="inline" v-model="checked" label="2">option 2</vueMyRadio>
                <vueMyRadio @change="change" class="inline" v-model="checked" label="3">option 3 </vueMyRadio>
               </div>`,
    data(){return {checked:1}},
    methods: { 
      change(){
        console.log(this.checked)
      }
    }
  }),{info:true})
  .add('Group inline radio', () => ({
    components: { vueMyRadio,vueMyRadioGroup },
    template: `<div>
                selected options is: option {{checked}} <br/>
                  <vueMyRadioGroup @change="change" v-model="checked" class="inline">
                  <vueMyRadio label="1">option 1</vueMyRadio>
                  <vueMyRadio label="2">option 2</vueMyRadio>
                  <vueMyRadio label="3">option 3 </vueMyRadio>
                </vueMyRadioGroup>
              </div>`,
    data(){return {checked:1}},
    methods: { 
      change(){
        console.log(this.checked)
      }
    }
  }),{info:true})
  .add('Group disabled radio', () => ({
    components: { vueMyRadio,vueMyRadioGroup },
    template: `<div>
                selected options is: option {{checked}} <br/>
                  <vueMyRadioGroup @change="change" :disabled="disabled" v-model="checked" class="inline">
                  <vueMyRadio label="1">option 1</vueMyRadio>
                  <vueMyRadio label="2">option 2</vueMyRadio>
                  <vueMyRadio label="3">option 3 </vueMyRadio>
                </vueMyRadioGroup>
              </div>`,
    data(){return {checked:1,disabled:true}},
    methods: { 
      change(){
        console.log(this.checked)
      }
    }
  }),{info:true})   

storiesOf('Checkbox', module)
  .addDecorator(withInfo)
  .add('Single default checkbox', () => ({
    components: { vueMyCheckbox },
    template: `<div>
                  Options 1 checked status is {{checked_1}} <br/>
                  Options 2 checked status is {{checked_2}} <br/>
                  <vueMyCheckbox @change="change_1" v-model="checked_1">option 1</vueMyCheckbox>
                  <vueMyCheckbox @change="change_2" v-model="checked_2">option 2</vueMyCheckbox>
                </div>`,
    data(){return {checked_1:true,checked_2:false}},
    methods: { 
      change_1(){console.log(this.checked_1)},
      change_2(){console.log(this.checked_2)}
    }
  }),{info:true})
  .add('Single disabled checkbox', () => ({
    components: { vueMyCheckbox },
    template: `<div>
                  <vueMyCheckbox :disabled="disabled_1" v-model="checked_1">option 1</vueMyCheckbox>
                  <vueMyCheckbox :disabled="disabled_2" v-model="checked_2">option 2</vueMyCheckbox>
                </div>`,
    data(){return {checked_1:true,disabled_1:true,checked_2:false,disabled_2:true}},
    methods: { 
      
    }
  }),{info:true})
  .add('Single inline checkbox', () => ({
    components: { vueMyCheckbox },
    template: `<div>
                  Options 1 checked status is {{checked_1}} <br/>
                  Options 2 checked status is {{checked_2}} <br/>    
                  <vueMyCheckbox class="inline" v-model="checked_1">option 1</vueMyCheckbox>
                  <vueMyCheckbox class="inline" v-model="checked_2">option 2</vueMyCheckbox>
                </div>`,
    data(){return {checked_1:true,checked_2:false}},
    methods: { 
      
    }
  }),{info:true})  
  .add('Group inline checkbox', () => ({
    components: { vueMyCheckbox,vueMyCheckboxGroup },
    template: `<div>
                  selected options is {{checked.join(", ")}}
                  <vueMyCheckboxGroup class="inline" @change="change" v-model="checked">
                    <vueMyCheckbox :label="1">option 1</vueMyCheckbox>
                    <vueMyCheckbox :label="2">option 2</vueMyCheckbox>
                  </vueMyCheckboxGroup>
                </div>`,
    data(){return {checked:[1]}},
    methods: { 
      change(){
        console.log(this.checked);
      }
    }
  }),{info:true})
  .add('Group disabled checkbox', () => ({
    components: { vueMyCheckbox,vueMyCheckboxGroup },
    template: `<div>
                  selected options is {{checked.join(", ")}}
                  <vueMyCheckboxGroup :disabled="disabled" @change="change" v-model="checked">
                    <vueMyCheckbox :label="1">option 1</vueMyCheckbox>
                    <vueMyCheckbox :label="2">option 2</vueMyCheckbox>
                  </vueMyCheckboxGroup>
                </div>`,
    data(){return {checked:[1],disabled:true}},
    methods: { 
      change(){
        console.log(this.checked);
      }
    }
  }),{info:true})


storiesOf('Transfer', module)
  .addDecorator(withInfo)
  .add('Default transfer', () => ({
    components: { vueMyTransfer },
    template: `<div>
                  selected items is: {{selected()}}<br/>
                  <button @click="reset">Reset</button>
                  <vueMyTransfer :height="height" :show_sort_icon="show_sort_icon" :disabled="disabled" :width="width" @change="change" :left_title="left_title" :left_list="left_list" :right_title="right_title" :right_list="right_list">
                  </vueMyTransfer>
                </div>`,
    data(){return {
      left_title:"Items for select",
      left_list:[{name:"AAA",value:1},{name:"this is content test and should be truncated.",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6},{name:"GGG",value:7},{name:"HHH",value:8}],
      right_title:"Selected items",
      right_list:[{name:"AAA",value:1},{name:"DDD",value:4},{name:"EEE",value:5}],
      disabled:false,
      height:150,
      width:250,
      show_sort_icon:true,
      selected_items:[{name:"AAA",value:1},{name:"DDD",value:4},{name:"EEE",value:5}]
      }
    },
    methods: { 
      change(selected_items){this.selected_items = selected_items},
      selected(){
        let tmp = [];
        this.selected_items.forEach(function(item){
          tmp.push(item.name);
        });
        return tmp.join(", ");
      },
      reset(){
        this.left_list = [{name:"AAA",value:1},{name:"this is content test and should be truncated.",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6},{name:"GGG",value:7},{name:"HHH",value:8}];
        this.right_list = [{name:"CCC",value:3},{name:"FFF",value:6},{name:"GGG",value:7}]
      }
    }
  }),{info:true})
  .add('Disabled transfer', () => ({
    components: { vueMyTransfer },
    template: `<div>
                  selected items is: {{selected()}}<br/>
                  <vueMyTransfer :height="height" :width="width" :disabled="disabled" @change="change" :left_title="left_title" :left_list="left_list" :right_title="right_title" :right_list="right_list">
                  </vueMyTransfer>
                </div>`,
    data(){return {
      left_title:"Items for select",
      left_list:[{name:"AAA",value:1},{name:"this is content test and should be truncated.",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6},{name:"GGG",value:7},{name:"HHH",value:8}],
      right_title:"Selected items",
      right_list:[{name:"AAA",value:1},{name:"DDD",value:4},{name:"EEE",value:5}],
      disabled:true,
      height:150,
      width:300,
      selected_items:[{name:"AAA",value:1},{name:"DDD",value:4},{name:"EEE",value:5}]
      }
    },
    methods: { 
      change(selected_items){this.selected_items = selected_items},
      selected(){
        let tmp = [];
        this.selected_items.forEach(function(item){
          tmp.push(item.name);
        });
        return tmp.join(", ");
      }
    }
  }),{info:true}) 

storiesOf('Switch', module)
  .addDecorator(withInfo)
  .add('Default switch', () => ({
    components: { vueMySwitch },
    template: `<div>
                  Checked status is: {{checked_large}}, {{checked_medium}}, {{checked_small}} <br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" v-model="checked_large" size="large">Large: </vueMySwitch><br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" v-model="checked_medium">Medium: </vueMySwitch><br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" v-model="checked_small" size="small">Small: </vueMySwitch>
                </div>`,
    data(){return {checked_large:false,checked_medium:true,checked_small:false}},
    methods: { 
      change(){console.log(this.checked)},
    }
  }),{info:true})
  .add('Disabled switch', () => ({
    components: { vueMySwitch },
    template: `<div>
                  Checked status is: {{checked_large}}, {{checked_medium}}, {{checked_small}} <br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" :disabled="disabled" v-model="checked_large" size="large">Large: </vueMySwitch><br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" :disabled="disabled" v-model="checked_medium">Medium: </vueMySwitch><br/>
                  <vueMySwitch style="display:inline-block;margin:5px 0" :disabled="disabled" v-model="checked_small" size="small">Small: </vueMySwitch>
                </div>`,
    data(){return {checked_large:false,checked_medium:true,checked_small:false,disabled:true}},
    methods: { 
      change(){console.log(this.checked)},
    }
  }),{info:true}) 
  .add('Callback before change', () => ({
    components: { vueMySwitch },
    template: `<div>
                  Checked status is: {{checked}} <br/>
                  <vueMySwitch :before-change="beforeChange" v-model="checked"></vueMySwitch><br/>
                </div>`,
    data(){return {checked:false}},
    methods: { 
      beforeChange(){
        if(confirm("Do you want change the swith?")){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }),{info:true})

storiesOf('Dropdown', module)
  .addDecorator(withInfo)
  .add('Default dropdown', () => ({
    components: { vueMyDropdown },
    template: `<div>
                  Selected value: {{selected_1}}<br/>
                  <vueMyDropdown :width="200" v-model="selected_1" :init_list="init_list_1"></vueMyDropdown><br/>
                  Selected value: {{selected_2}}<br/>
                  <vueMyDropdown :width="300" @change="change" v-model="selected_2" :init_list="init_list_2"></vueMyDropdown><br/>
                </div>`,
    data(){return{
        selected_1:1,
        selected_2:3,
        init_list_1:[{name:"AAA",value:1},{name:"BBB",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6}],
        init_list_2:[{name:"AAA",value:1},{name:"BBB",value:2,disabled:true},{name:"CCC",value:3},{name:"DDD",value:4,disabled:true},{name:"EEE",value:5},{name:"FFF",value:6}]
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})
  .add('Disabled dropdown', () => ({
    components: { vueMyDropdown },
    template: `<div>
                  Selected value: {{selected_1}}<br/>
                  <vueMyDropdown :width="200" :disabled="disabled" v-model="selected_1" :init_list="init_list"></vueMyDropdown><br/>
                  Selected value: {{selected_2}}<br/>
                  <vueMyDropdown :width="300" :disabled="disabled" v-model="selected_2" :init_list="init_list"></vueMyDropdown><br/>
                </div>`,
    data(){return{
        selected_1:1,
        selected_2:3,
        disabled:true,
        init_list:[{name:"AAA",value:1},{name:"BBB",value:2},{name:"CCC",value:3},{name:"DDD",value:4}]
      }
    },
    methods: { 
      change(){console.log(this.checked)},
    }
  }),{info:true})

storiesOf('Table', module)
  .addDecorator(withInfo)
  .add('Basic table', () => ({
    components: { vueMyTable },
    template: `<div>
                  <vueMyTable :param="param"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[
            {
              index:"name",label:"Name",sortable:true,width:30
            },
            {
              index:"sender",label:"Sender",sortable:true,width:30,callback:this.formatSender,align:"left"
            },
            {
              index:"comments",label:"comments",sortable:false,width:38,component_name:"comments",align:"right"
            }
          ],
          dataSet:[
            {
              id:1,name:"aaa",sender:"aaa@domain.com","comments":"this is a test data"
            },
            {
              id:2,name:"bbb",sender:"bbb@domain.com","comments":"this is a test data"
            },
            {
              id:4,name:"ccc",sender:"ccc@domain.com","comments":"this is a test data"
            }
            ,{
              id:4,name:"ddd",sender:"ddd@domain.com","comments":"this is a test data"
            }
            ,{
              id:5,name:"eee",sender:"eee@domain.com","comments":"this is a test data"
            }
            ,{
              id:6,name:"fff",sender:"fff@domain.com","comments":"this is a test data"
            }
            ,{
              id:7,name:"ggg",sender:"ggg@domain.com","comments":"this is a test data"
            }
            ,{
              id:9,name:"hhh",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:10,name:"iii",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:11,name:"jjj",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:12,name:"kkk",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:13,name:"lll",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:14,name:"mmm",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:15,name:"nnn",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:16,name:"ooo",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:17,name:"ppp",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:18,name:"qqq",sender:"hhh@domain.com","comments":"this is a test data"
            }
          ],
          sortOrder:"asc",
          sortColumn:"name",
          stripe:true,
          mode:"local"
        }
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})
  .add('Tabel with fixed header', () => ({
    components: { vueMyTable },
    template: `<div>
                  <vueMyTable :param="param"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[
            {
              index:"name",label:"Name",sortable:true,width:30
            },
            {
              index:"sender",label:"Sender",sortable:true,width:30,callback:this.formatSender,align:"left"
            },
            {
              index:"comments",label:"comments",sortable:false,width:38,component_name:"comments",align:"right"
            }
          ],
          dataSet:[
            {
              id:1,name:"aaa",sender:"aaa@domain.com","comments":"this is a test data"
            },
            {
              id:2,name:"bbb",sender:"bbb@domain.com","comments":"this is a test data"
            },
            {
              id:4,name:"ccc",sender:"ccc@domain.com","comments":"this is a test data"
            }
            ,{
              id:4,name:"ddd",sender:"ddd@domain.com","comments":"this is a test data"
            }
            ,{
              id:5,name:"eee",sender:"eee@domain.com","comments":"this is a test data"
            }
            ,{
              id:6,name:"fff",sender:"fff@domain.com","comments":"this is a test data"
            }
            ,{
              id:7,name:"ggg",sender:"ggg@domain.com","comments":"this is a test data"
            }
            ,{
              id:9,name:"hhh",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:10,name:"iii",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:11,name:"jjj",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:12,name:"kkk",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:13,name:"lll",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:14,name:"mmm",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:15,name:"nnn",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:16,name:"ooo",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:17,name:"ppp",sender:"hhh@domain.com","comments":"this is a test data"
            }
            ,{
              id:18,name:"qqq",sender:"hhh@domain.com","comments":"this is a test data"
            }
          ],
          sortOrder:"asc",
          sortColumn:"name",
          height:200,
          stripe:true,
          mode:"local"
        }
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})  
  .add('Table with checkbox', () => ({
    components: { vueMyTable },
    template: `<div>
                  Selected items is {{selected_items}}
                  <vueMyTable :param="param" v-on:selected-items="selectedItems"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[
            {
              index:"id",isCheckbox:true
            },          
            {
              index:"name",label:"Name",sortable:true,width:30,align:"left"
            },
            {
              index:"sender",label:"Sender",sortable:true,width:30,callback:this.formatSender,align:"right"
            },
            {
              index:"comments",label:"comments",sortable:false,width:38,align:"right"
            }
          ],
          dataSet:[
            {
              id:1,name:"aaa",sender:"aaa@domain.com","comments":"this is a test data"
            },
            {
              id:2,name:"bbb",sender:"bbb@domain.com","comments":"this is a test data"
            },
            {
              id:4,name:"ccc",sender:"ccc@domain.com","comments":"this is a test data"
            }
            ,{
              id:4,name:"ddd",sender:"ddd@domain.com","comments":"this is a test data"
            }
            ,{
              id:5,name:"eee",sender:"eee@domain.com","comments":"this is a test data"
            }
            ,{
              id:6,name:"fff",sender:"fff@domain.com","comments":"this is a test data"
            }
            ,{
              id:7,name:"ggg",sender:"ggg@domain.com","comments":"this is a test data"
            }
            ,{
              id:9,name:"hhh",sender:"hhh@domain.com","comments":"this is a test data"
            }
          ],
          sortOrder:"asc",
          sortColumn:"name",
          stripe:true,
          mode:"local"
        },
        selected_items:[]
      }
    },
    methods: { 
      selectedItems(selectedItems){this.selected_items = selectedItems},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})
  .add('Expand table', () => ({
    components: { vueMyTable },
    template: `<div>
                  <vueMyTable :param="param"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[
            {
              index:"id",isDetailRow:true
            },                     
            {
              index:"name",label:"Name",sortable:true,width:30
            },
            {
              index:"sender",label:"Sender",sortable:true,width:30,callback:this.formatSender
            },
            {
              index:"comments",label:"comments",sortable:false,width:38
            }
          ],
          dataSet:[
            {
              id:1,name:"aaa",sender:"aaa@domain.com","comments":"this is a test data"
            },
            {
              id:2,name:"bbb",sender:"bbb@domain.com","comments":"this is a test data"
            },
            {
              id:4,name:"ccc",sender:"ccc@domain.com","comments":"this is a test data"
            }
            ,{
              id:4,name:"ddd",sender:"ddd@domain.com","comments":"this is a test data"
            }
            ,{
              id:5,name:"eee",sender:"eee@domain.com","comments":"this is a test data"
            }
            ,{
              id:6,name:"fff",sender:"fff@domain.com","comments":"this is a test data"
            }
            ,{
              id:7,name:"ggg",sender:"ggg@domain.com","comments":"this is a test data"
            }
            ,{
              id:9,name:"hhh",sender:"hhh@domain.com","comments":"this is a test data"
            }
          ],
          sortOrder:"asc",
          sortColumn:"name",
          stripe:true,
          detailRowComponentName:"col-detail",
          mode:"local"
        },
        selected_items:[]
      }
    },
    methods: { 
      selectedItems(selectedItems){this.selected_items = selectedItems},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})  
  .add('Resizable column table', () => ({
    components: { vueMyTable },
    template: `<div>
                  <vueMyTable :param="param"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[          
            {
              index:"name",label:"Name",sortable:true,width:10
            },
            {
              index:"sender",label:"Sender",sortable:true,width:20,callback:this.formatSender
            },
            {
              index:"recipient",label:"Recipient",sortable:true,width:20
            },
            {
              index:"subject",label:"Subject",sortable:true,width:20
            },           
            {
              index:"comments",label:"comments",sortable:false,width:30
            }
          ],
          dataSet:[
            {
              name:"aaa",sender:"aaa@domain.com",recipient:"aaa@test.com",subject:"test subject","comments":"this is a test data"
            },
            {
              name:"bbb",sender:"bbb@domain.com",recipient:"bbb@test.com",subject:"test subject","comments":"this is a test data"
            },
            {
              name:"ccc",sender:"ccc@domain.com",recipient:"ccc@test.com",subject:"test subject","comments":"this is a test data"
            }
            ,{
              name:"ddd",sender:"ddd@domain.com",recipient:"ddd@test.com",subject:"test subject","comments":"this is a test data"
            }
            ,{
              name:"eee",sender:"eee@domain.com",recipient:"eee@test.com",subject:"test subject","comments":"this is a test data"
            }
            ,{
              name:"fff",sender:"fff@domain.com",recipient:"fff@test.com",subject:"test subject","comments":"this is a test data"
            }
            ,{
              name:"ggg",sender:"ggg@domain.com",recipient:"ggg@test.com",subject:"test subject","comments":"this is a test data"
            }
            ,{
              name:"hhh",sender:"hhh@domain.com",recipient:"hhh@test.com",subject:"test subject","comments":"this is a test data"
            }
          ],
          sortOrder:"asc",
          sortColumn:"name",
          stripe:true,
          mode:"local",
          resizable:true
        },
        selected_items:[]
      }
    },
    methods: { 
      selectedItems(selectedItems){this.selected_items = selectedItems},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})
  .add('Table with data from backend service', () => ({
    components: { vueMyTable },
    template: `<div>
                  Go to demo_components/server folder and run node server.js to provide data for this table
                  <vueMyTable :param="param"></vueMyTable>
                </div>`,
    data(){return{
        param:{
          columns:[          
            {
              index:"name",label:"Name",sortable:true,width:10
            },
            {
              index:"sender",label:"Sender",sortable:true,width:20,callback:this.formatSender
            },
            {
              index:"recipient",label:"Recipient",sortable:true,width:20
            },
            {
              index:"subject",label:"Subject",sortable:true,width:20
            },           
            {
              index:"comments",label:"comments",sortable:false,width:30
            }
          ],

          sortOrder:"asc",
          sortColumn:"name",
          stripe:true,
          mode:"server",
          resizable:true,
          url:'http://localhost:3000'
        },
        selected_items:[]
      }
    },
    methods: { 
      selectedItems(selectedItems){this.selected_items = selectedItems},
      formatSender(cell_value,row){
        return '<b style="color:red;">'+cell_value+'</b>';
      },      
    }
  }),{info:true})

storiesOf('Datepicker', module)
  .addDecorator(withInfo)
  .add('Local datetime', () => ({
    components: { vueMyDatepicker },
    template: `<div>
                  Selected time_range is: {{time_range.start}} - {{time_range.end}}<br/>
                  <vueMyDatepicker :param="param" v-on:select-time-range="selectTimeRange"></vueMyDatepicker>
                </div>`,
    data(){return{
        param:{
          timeRange: 1,
          reloadFlag: false,
          dataTimeLabelPosition: 'right',
          initStart:"2019-09-16 01:43:10",
          initEnd:"2019-09-16 05:43:10",
          useLocalTime:true      
        },
        time_range:"",
      }
    },
    methods: { 
      selectTimeRange(time_range){
        this.time_range = time_range;
      },
    }
  }),{info:true})
  .add('Local datetime with left panel', () => ({
    components: { vueMyDatepicker },
    template: `<div>
                  Selected time_range is: {{time_range.start}} - {{time_range.end}}
                  <vueMyDatepicker style="display:inline-block" :param="param" v-on:select-time-range="selectTimeRange"></vueMyDatepicker>
                </div>`,
    data(){return{
        param:{
          timeRange: 2,
          reloadFlag: false,
          dataTimeLabelPosition: 'left',
          initStart:"2019-09-16 01:43:10",
          initEnd:"2019-09-16 05:43:10",
          useLocalTime:false     
        },
        time_range:"",
      }
    },
    methods: { 
      selectTimeRange(time_range){
        this.time_range = time_range;
      },
    }
  }),{info:true})  
  .add('Server datetime', () => ({
    components: { vueMyDatepicker },
    template: `<div>
                  Selected time_range is: {{time_range.start}} - {{time_range.end}}<br/>
                  <vueMyDatepicker :param="param" v-on:select-time-range="selectTimeRange" v-on:change-time-range="changeTimeRange"></vueMyDatepicker>
                </div>`,
    data(){return{
        param:{
          timeRange: 1,
          reloadFlag: false,
          dataTimeLabelPosition: 'right',
          initStart:"2019-09-16 01:43:10",//this should be start time from server
          initEnd:"2019-09-16 05:43:10",//this should be end time from server
          useLocalTime:false      
        },
        time_range:"",
      }
    },
    methods: { 
      selectTimeRange(time_range){
        this.time_range = time_range;
      },
      changeTimeRange(time_range_value){
      this.param.timeRange = time_range_value;
        if(time_range_value == 1){
          this.param.initStart = "2019-09-16 01:43:10";
          this.param.initEnd = "2019-09-16 05:43:10";
          this.reloadTimeRange();
        }else if(time_range_value == 2){
          this.param.initStart = "2019-09-15 05:43:10";
          this.param.initEnd = "2019-09-16 05:43:10";
          this.reloadTimeRange();
        }else if(time_range_value == 3){
          this.param.initStart = "2019-09-19 00:00:00";
          this.param.initEnd = "2019-09-16 05:43:10";
          this.reloadTimeRange();        
        }else if(time_range_value == 4){
          this.param.initStart = "2019-08-16 00:00:00";
          this.param.initEnd = "2019-09-16 05:43:10";
          this.reloadTimeRange();        
        }else if(time_range_value == 5){
          this.param.initStart = "2019-06-16 00:00:00";
          this.param.initEnd = "2019-09-16 05:43:10";
          this.reloadTimeRange();        
        }        
      },
      reloadTimeRange(){
        this.param.reloadFlag = !this.param.reloadFlag;
      }      
    }
  }),{info:true})
  .add('中文时间', () => ({
    components: { vueMyDatepicker },
    template: `<div>
                  Selected time_range is: {{time_range.start}} - {{time_range.end}}<br/>
                  <vueMyDatepicker :param="param" v-on:select-time-range="selectTimeRange"></vueMyDatepicker>
                </div>`,
    data(){return{
        param:{
          timeRange: 1,
          reloadFlag: false,
          dataTimeLabelPosition: 'right',
          initStart:"2019-09-16 01:43:10",
          initEnd:"2019-09-16 05:43:10",
          useLocalTime:true,
          locale:"zh_CN"      
        },
        time_range:"",
      }
    },
    methods: { 
      selectTimeRange(time_range){
        this.time_range = time_range;
      },
    }
  }),{info:true})
  .add('日本時間', () => ({
    components: { vueMyDatepicker },
    template: `<div>
                  Selected time_range is: {{time_range.start}} - {{time_range.end}}<br/>
                  <vueMyDatepicker :param="param" v-on:select-time-range="selectTimeRange"></vueMyDatepicker>
                </div>`,
    data(){return{
        param:{
          timeRange: 1,
          reloadFlag: false,
          dataTimeLabelPosition: 'right',
          initStart:"2019-09-16 01:43:10",
          initEnd:"2019-09-16 05:43:10",
          useLocalTime:true,
          locale:"ja_JP"      
        },
        time_range:"",
      }
    },
    methods: { 
      selectTimeRange(time_range){
        this.time_range = time_range;
      },
    }
  }),{info:true})

storiesOf('Tab', module)
  .addDecorator(withInfo)
  .add('Basic tab', () => ({
    components: { vueMyTabGroup,vueMyTab },
    template: `<div>
                  current active tab is {{current_tab}}<br/><br/>
                  <vueMyTabGroup v-model="current_tab">
                    <vueMyTab name="tab_1" label="tab 1">tab 1 content <button @click="tab_1_click">click me</button></vueMyTab>
                    <vueMyTab name="tab_2" label="tab 2">tab 2 content </vueMyTab>
                    <vueMyTab name="tab_3" label="tab 3">tab 3 content </vueMyTab>
                    <vueMyTab name="tab_4" label="tab 4">tab 4 content </vueMyTab>
                  </vueMyTabGroup>
                </div>`,
    data(){return{
        current_tab:"tab_1"
      }
    },
    methods: {
      tab_1_click(){
        alert("You clicked button in tab 1");
      }
    }
  }),{info:true})
  .add('Disabled basic tab', () => ({
    components: { vueMyTabGroup,vueMyTab },
    template: `<div>
                  current active tab is {{current_tab}}<br/><br/>
                  <vueMyTabGroup v-model="current_tab">
                    <vueMyTab name="tab_1" label="tab 1">tab 1 content <button @click="tab_1_click">click me</button></vueMyTab>
                    <vueMyTab name="tab_2" label="tab 2" :disabled="disabled">tab 2 content </vueMyTab>
                    <vueMyTab name="tab_3" label="tab 3">tab 3 content </vueMyTab>
                    <vueMyTab name="tab_4" label="tab 4">tab 4 content </vueMyTab>
                  </vueMyTabGroup>
                </div>`,
    data(){return{
        current_tab:"tab_1",
        disabled:true
      }
    },
    methods: {
      tab_1_click(){
        alert("You clicked button in tab 1");
      }
    }
  }),{info:true})  
  .add('Classic tab', () => ({
    components: { vueMyTabGroup,vueMyTab },
    template: `<div>
                  current active tab is {{current_tab}}<br/><br/>
                  <vueMyTabGroup v-model="current_tab" type="classic">
                    <vueMyTab name="tab_1" label="tab 1">tab 1 content <button @click="tab_1_click">click me</button></vueMyTab>
                    <vueMyTab name="tab_2" label="tab 2">tab 2 content </vueMyTab>
                    <vueMyTab name="tab_3" label="tab 3">tab 3 content </vueMyTab>
                    <vueMyTab name="tab_4" label="tab 4">tab 4 content </vueMyTab>
                  </vueMyTabGroup>
                </div>`,
    data(){return{
        current_tab:"tab_1"
      }
    },
    methods: {
      tab_1_click(){
        alert("You clicked button in tab 1");
      }
    }
  }),{info:true})   
  .add('Disabled classic tab', () => ({
    components: { vueMyTabGroup,vueMyTab },
    template: `<div>
                  current active tab is {{current_tab}}<br/><br/>
                  <vueMyTabGroup v-model="current_tab" type="classic">
                    <vueMyTab name="tab_1" label="tab 1">tab 1 content <button @click="tab_1_click">click me</button></vueMyTab>
                    <vueMyTab name="tab_2" label="tab 2" :disabled="disabled">tab 2 content </vueMyTab>
                    <vueMyTab name="tab_3" label="tab 3">tab 3 content </vueMyTab>
                    <vueMyTab name="tab_4" label="tab 4">tab 4 content </vueMyTab>
                  </vueMyTabGroup>
                </div>`,
    data(){return{
        current_tab:"tab_1",
        disabled:true
      }
    },
    methods: {
      tab_1_click(){
        alert("You clicked button in tab 1");
      }
    }
  }),{info:true})

storiesOf('Tag input', module)
  .addDecorator(withInfo)
  .add('Basic tag', () => ({
    components: { vueMyTagInput },
    template: `<div style="width:700px">
                  current active tab is {{current_value}} <br/> Duplicate status is {{is_duplicate}}<br/><br/>
                  <vueMyTagInput v-model="current_value" :width="500" v-on:duplicate="duplicate"></vueMyTagInput>
                </div>`,
    data(){return{
        current_value:["Tom","Jim","James"],
        is_duplicate:false,
      }
    },
    methods: {
      duplicate(){
        this.is_duplicate = true;
      }
    },
    watch:{
      current_value(){
        this.is_duplicate = false;
      }
    }
  }),{info:true}) 
  .add('Limit width tag', () => ({
    components: { vueMyTagInput },
    template: `<div style="width:700px">
                  current active tab is {{current_value}} <br/> Duplicate status is {{is_duplicate}}<br/><br/>
                  <vueMyTagInput v-model="current_value" :width="500" :tag_width="100" v-on:duplicate="duplicate"></vueMyTagInput>
                </div>`,
    data(){return{
        current_value:["Tommmmmmmm","Jim","Jamessssssssss"],
        is_duplicate:false,
      }
    },
    methods: {
      duplicate(){
        this.is_duplicate = true;
      }
    },
    watch:{
      current_value(){
        this.is_duplicate = false;
      }
    }
  }),{info:true}) 
  .add('Disabled tag', () => ({
    components: { vueMyTagInput },
    template: `<div style="width:700px">
                  current active tab is {{current_value}} <br/> Duplicate status is {{is_duplicate}}<br/><br/>
                  <vueMyTagInput v-model="current_value" :width="500" :disabled="disabled"  v-on:duplicate="duplicate"></vueMyTagInput>
                </div>`,
    data(){return{
        current_value:["Tom","Jim","James"],
        is_duplicate:false,
        disabled:true
      }
    },
    methods: {
      duplicate(){
        this.is_duplicate = true;
      }
    },
    watch:{
      current_value(){
        this.is_duplicate = false;
      }
    }
  }),{info:true})

storiesOf('Select', module)
  .addDecorator(withInfo)
  .add('Default select', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected}}<br/>
                  <vueMySelect placeholder="Select" :width="400" v-model="selected" :init_list="init_list_1"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected:[{name:"BBB",value:2},{name:"DDD",value:4}],
        init_list_1:[{name:"AAA",value:1},{name:"BBB",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6}],
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})
  .add('Disabled select', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected_1}}<br/>
                  <vueMySelect placeholder="Select" :width="400" :disabled="disabled" v-model="selected_1" :init_list="init_list_1"></vueMySelect><br/>
                  Selected value: {{selected}}<br/>
                  <vueMySelect placeholder="Select" :width="400" :disabled="disabled" v-model="selected" :init_list="init_list_1"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected_1:[{name:"AAA",value:1},{name:"CCC",value:3}],
        selected:[{name:"BBB",value:2},{name:"DDD",value:4}],
        disabled:true,
        init_list_1:[{name:"AAA",value:1},{name:"BBB",value:2},{name:"CCC",value:3},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6}],
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})  
  .add('Select with disabled item', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected}}<br/>
                  <vueMySelect placeholder="Select" :width="400" v-model="selected" :init_list="init_list_1"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected_1:[],
        selected:[{name:"BBB",value:2},{name:"DDD",value:4}],
        init_list_1:[{name:"AAA",value:1,disabled:true},{name:"BBB",value:2},{name:"CCC",value:3,disabled:true},{name:"DDD",value:4},{name:"EEE",value:5},{name:"FFF",value:6}],
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})
  .add('Select with fixed width', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected}}<br/>
                  <vueMySelect placeholder="Select" :item_width="50" :width="420" v-model="selected" :init_list="init_list_1"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected:[{name:"CCCCCCCCCC",value:3},{name:"EEEEEEEEEEE",value:5}],
        init_list_1:[{name:"AAAAA",value:1},{name:"BBBBBBBBBB",value:2},{name:"CCCCCCCCCC",value:3},{name:"DDDDDDDD",value:4},{name:"EEEEEEEEEEE",value:5},{name:"FFFFFFFFFFFF",value:6}],
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})  
  .add('Select with filter', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected}}<br/>
                  <vueMySelect placeholder="Select" :filterable="filterable" :width="400" v-model="selected" :init_list="init_list_1"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected:[],
        filterable:true,
        init_list_1:[{name:"A",value:1},{name:"AB",value:2},{name:"ABC",value:3},{name:"ABCD",value:4},{name:"ABCDE",value:5},{name:"ABCEF",value:6}],
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
    }
  }),{info:true})
  .add('Select with server data', () => ({
    components: { vueMySelect },
    template: `<div>
                  Selected value: {{selected}}<br/>
                  <vueMySelect :placeholder="placeholder" :filterable="filterable" :server_mode="server_mode" :server_method="server_method"  :width="400" v-model="selected" :loading="loading" :init_list="init_list_1" :loading_text="loading_text"></vueMySelect><br/>
                </div>`,
    data(){return{
        selected:[],
        filterable:true,
        server_mode:true,
        init_list_1:[],
        placeholder:"Type keyword to search",
        loading:false,
        loading_text:"Loading...",
        no_data_text:"No data to display"
      }
    },
    methods: { 
      change(value){alert("selected value is "+value);},
      server_method(keyword){
        this.loading = true;
        setTimeout(()=>{
          this.init_list_1 = _.filter([{name:"A",value:1},{name:"AB",value:2},{name:"ABC",value:3},{name:"ABCD",value:4},{name:"ABCDE",value:5},{name:"ABCEF",value:6}],item=>item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
          this.loading = false;
          if(this.init_list_1.length==0){
            this.init_list_1 = [];
          }
        },1000)
      }      
    }
  }),{info:true}) 

storiesOf('QRcode image', module)
  .addDecorator(withInfo)
  .add('Basic QRcode image', () => ({
    components: { vueMyQrcode },
    template: `<div>
                  <vueMyQrcode value="this is a test"></vueMyQrcode>
                </div>`,
    data(){return{
      }
    },
    methods: { 
      change(){alert("QRcode image regenerated");},
    }
  }),{info:true}) 
  .add('QRcode image options', () => ({
    components: { vueMyQrcode },
    template: `<div>
                  Content: <textarea v-model="value"></textarea><br/>
                  size: <input type="range" min="100" max="600" step="20" v-model="size"><br/><br/>
                  Level: <select v-model="level"><option value="L">L</option><option value="M">M</option><option value="Q">Q</option><option value="H">H</option></select><br/><br/>
                  Background:<input type="color" v-model="background"><br/><br/>
                  Foreground:<input type="color" v-model="foreground"><br/><br/>
                  <vueMyQrcode :value="value" :size="size" :level="level" :background="background" :foreground="foreground"></vueMyQrcode>
                </div>`,
    data(){
      return{
        value:"this is a test",
        size:200,
        level:"M",
        background:"#FFFFFF",
        foreground:"#000000"
      }
    },
    methods: { 
    }
  }),{info:true})
  .add('Change with callback function', () => ({
    components: { vueMyQrcode },
    template: `<div>
                  size: <input type="range" min="100" max="600" step="20" v-model="size" v-on:change="change"><br/><br/>
                  <vueMyQrcode :value="value" :size="size"></vueMyQrcode>
                </div>`,
    data(){
      return{
        value:"this is a test",
        size:200,

      }
    },
    methods: { 
      change(){alert("QRcode image regenerated");},
    }
  }),{info:true})     
  