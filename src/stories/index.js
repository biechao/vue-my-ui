/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import {vueMyRadio,vueMyRadioGroup,vueMyCheckbox,vueMyCheckboxGroup,vueMyTransfer} from './../../packages/index'

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