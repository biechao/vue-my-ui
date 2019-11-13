<template>
  <div id="app">
    <div class="demo">
      <div class="demo_label">single usage: select value is {{signle_checked}}</div> 
      <div class="demo_picker">
        <vueMyRadio @change="single_change" class="inline" v-model="signle_checked" label="1">option 1</vueMyRadio>
        <vueMyRadio @change="single_change" class="inline" v-model="signle_checked" label="2">option 2</vueMyRadio>
        <vueMyRadio @change="single_change" class="inline"  v-model="signle_checked" label="3">option 3</vueMyRadio>
      </div>
    </div>
    <div class="demo">
      <div class="demo_label">group usage: select value is {{group_checked}}</div> 
      <div class="demo_picker">
        <vueMyRadioGroup v-model="group_checked" class="inline">
        <vueMyRadio @change="group_change"  label="1">option 1</vueMyRadio>
        <vueMyRadio @change="group_change"  label="2">option 2</vueMyRadio>
        <vueMyRadio @change="group_change"  label="3">option 3</vueMyRadio>
        </vueMyRadioGroup>
      </div>
    </div>    
  </div>
</template>

<script>
import {vueMyRadio,vueMyRadioGroup} from './../packages/index'
export default {
  name: 'app',
  components: {
    vueMyRadio,
    vueMyRadioGroup
  },
  data(){
    return {
      signle_checked:1,
      group_checked:2,
    }
  },
  methods:{
    single_change(){
      console.log(this.signle_checked);
    },
    group_change(){
      console.log(this.group_checked);
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  text-align: left;
  .demo{
    .demo_label{
      display:inline-block;
      margin-right:5px;
      line-height:32px;
    }
    .demo_picker{
      display:inline-block;
      width:100%;
    }
    .demo_notes{
      font-style:italic;
      color:green;
      margin-left:20px;
    }
  }
}
</style>
