<template>
    <div class="vue-my-table">
        <table @mouseup="mouse_up" @mousemove="mouse_move" @click="stop">
            <thead class="header">
                <tr>
                    <template v-for="(column,index) in columns">
                        <th :width="columnWidth(column)" v-if="column.isCheckbox" class="vue-checkbox">
                            <div class="checkbox" @click="clickCheckAll" :class="checkAllClass">
                                <span class="checkbox_span" :class="checkAllClass"> </span>
                            </div>
                        </th>
                        <th :width="columnWidth(column)" v-else-if="column.isDetailRow" class="vue-detail-row">
                        </th>
                        <th :width="columnWidth(column)" v-else :class="{'sortable':column.sortable,'resize_hover':column_hover(column),'column_click':column_click(column)}" @click="resort(column.sortable,column.index)" :align="column.align || 'left'">
                            {{column.label}}
                            <font-awesome-icon class="icon" :icon="['fas','sort-alpha-down-alt']" v-show="sortOrder =='desc' && sortColumn == column.index" />
                            <font-awesome-icon class="icon" :icon="['fas','sort-alpha-up']" v-show="sortOrder =='asc' && sortColumn == column.index" />
                            <div class="resize" @click.stop="stop" @mousedown.self="mouse_down(index,$event)" @mouseup.self="mouse_up()" @mouseout="hover_out(index)" @mouseover="hover_for_resize(index)" @mousemove="mouse_move(index,$event)" v-show="show_resize_hover(index)"></div>
                        </th>
                    </template>
                </tr>
            </thead>
        </table>
        <perfect-scrollbar :style="{height:needScroll?this.param.height+'px':''}">
            <table @mouseup="mouse_up" @mousemove="mouse_move" @click="stop">    
                <tbody>
                    <tr v-if="rows.length == 0">
                        <td :colspan="columns.length" class="no-data">{{$t("no_data")}}</td>
                    </tr>
                    <template v-else v-for="(row,index) in rows">
                        <tr :class="{active:row.checked,stripe:stripeTR(index)}">
                            <template v-for="(column, column_index) in columns">
                                <td :width="columnWidth(column)" v-if="column.isCheckbox" class="vue-checkbox" >
                                    <div @click="clickCheckItem(row,index)" class="checkbox" :class="{'checked':row.checked}">
                                        <span class="checkbox_span" :class="checkAllClass"></span>
                                    </div>
                                </td>
                                <td :width="columnWidth(column)" v-else-if="column.isDetailRow" class="vue-detail-row-col" @click="clickDetailRow(row,index)" :class="{'expand':row.expand}">
                                     <font-awesome-icon class="icon" :icon="['fas','angle-right']" />
                                </td>
                                <td :width="columnWidth(column)" v-else-if="column.callback" :class="{'sortable':column.sortable,'resize_hover':column_hover(column),'column_click':column_click(column)}" v-html="column.callback(row[column.index],row)" :style="{'text-align':column.align || 'left'}">
                                </td>
                                <td :width="columnWidth(column)" v-else-if="column.component_name" :class="{'sortable':column.sortable,'resize_hover':column_hover(column),'column_click':column_click(column)}" :style="{'text-align':column.align || 'left'}">
                                    <component :is="column.component_name" :row-data="row" :param="typeof(column.param) !='undefined'?column.param:{}" :key="row.id" v-on:update-component="updateComponent"></component>
                                </td>
                                <td :width="columnWidth(column)" v-else-if="column.delete" align="center" class="delete">
                                    <span class="tmicon tmicon-delete" @click.stop="removeRow(row,index)">&nbsp;</span>
                                </td>
                                <td :width="columnWidth(column)" v-else :class="{'sortable':column.sortable,'resize_hover':column_hover(column),'column_click':column_click(column)}" :style="{'text-align':column.align || 'left'}" :title="row[column.index]" :align="column.align || 'left'">
                                    {{row[column.index]}}
                                </td>
                            </template>
                        </tr>
                        <tr class="vue-table-detail" v-if="needDetailRow" v-show="row.expand">
                            <td v-if="needCheckbox" style="border:0px"></td>
                            <td style="border:0px"></td>
                            <td :colspan="columns.length - (needCheckbox?1:0) - (needDetailRow?1:0)" class="detail_td">
                                <component :is="param.detailRowComponentName" :row-data="row" :key="row.id" :ref="'detail_'+row.id"></component>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </perfect-scrollbar>
        <div class="table-pagination" v-show="showPagination">
            <div class="table-pagination-block">
                <div class="pagination-records">{{records}}</div>
                <div class="dropdown" v-if="pagerList.length > 1" v-on-clickaway="hide_pager_dropdown">
                    <div class="per-page" @click="show_pager_dropdown">
                        {{perPage}}
                        <font-awesome-icon class="icon" :icon="['fas','angle-down']" />
                    </div>
                    <ul class="dropdown-list" v-show="pager_dropdown_show">
                        <li v-for="item in pagerList" @click="changeLimit(item)"><a href="javascript:;">
                                <div class="icon-class">
                                    <font-awesome-icon v-show="limit==item" class="icon" :icon="['fas','check']" />&nbsp;</div>
                                <div class="number">{{item}}</div>
                            </a></li>
                    </ul>
                </div>
                <div class="pagination-input">
                    <input :disabled="total==0 || page == 0" :value="total==0?0:page" @blur="changePage" @keyup.enter="pageEnter" type="text"> / {{totalPage}}
                </div>
                <div>
                    <ul class="pagination">
                        <li :class="{disabled:(total==0 || page == 0 || page == 1)?true:page == 1}">
                            <a href="javascript:;" @click="goPrev()" aria-label="Previous">
                                <font-awesome-icon class="icon" :icon="['fas','angle-left']" />
                            </a>
                        </li>
                        <li :class="{disabled:(total==0 || page == 0)?true:page == totalPage}">
                            <a href="javascript:;" @click="goNext()" aria-label="Next">
                                <font-awesome-icon class="icon" :icon="['fas','angle-right']" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-show="loading" class="loader-overlay list">
          <span class="loader"></span>
        </div>        
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import _ from 'lodash'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(PerfectScrollbar)
Vue.use(VueI18n)
Vue.use(VueAxios,axios)
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCalendarAlt,faClock } from '@fortawesome/free-regular-svg-icons'
import { faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
import { directive as onClickaway } from 'vue-clickaway';
import './vue-my-table.less';
library.add(faSortAlphaUp, faSortAlphaDownAlt, faAngleLeft, faAngleRight, faAngleDown, faCheck);
export default {
    name: "vueMyTable",
    components: {
        PerfectScrollbar
    },   
    i18n: new VueI18n({
        locale: 'en_US',
        messages: {
            en_US: {
                no_data: "No data to display",
                records: "Records: {0} - {1} / {2}",
                per_page: "{0} per page",
                invalid_page: "Invalid page number.",
                past_4_hours: "Last 4 hours",
                past_24_hours: "Last 24 hours",
                past_7_days: "Last 7 days",
                past_30_days: "Last 30 days",
                past_90_days: "Last 90 days",
                custom_range: "Custom range",
            },
            ja_JP: {
                apply: "No data to display",
                cancel: "キャンセル",
                past_4_hours: "過去4時間",
                past_24_hours: "過去24時間",
                past_7_days: "過去7日間",
                past_30_days: "過去30日間",
                past_90_days: "過去90日間",
                custom_range: "カスタム範囲",
            },
            zh_CN: {
                apply: "确认",
                cancel: "取消",
                past_4_hours: "过去4小时",
                past_24_hours: "过去24小时",
                past_7_days: "过去7天",
                past_30_days: "过去30天",
                past_90_days: "过去90天",
                custom_range: "自定义时间段",
            }
        }
    }),
    props: {
        param: {
            type: Object,
            default:{
                columns: [],
                sortOrder: "desc",
                sortColumn: "",
                defaultPageNumber: 10,
                pageNumberList: [],
                url: "/json.data",
                detailRowComponentName: "",
                reloadFlag: false,
                buttonAdd: {},
                buttonAction: [],
                dataSet: [],
                mode: "local",
                resizable:false
            }
        }
    },
    data() {
        return {
            columns: _.map(this.param.columns,(column)=>{
                if(this.param.resizable){
                    column["hover"] = false;
                    column["mousedown"] = false;
                }
                return column;
            }),
            rows: [],
            sortOrder: this.param.sortOrder || "asc",
            sortColumn: this.param.sortColumn,
            page: this.param.autoQuery === false ? 0 : 1,
            pagerList: this.param.pagerList ? this.param.pagerList : [10, 20, 50, 100],
            limit: this.param.limit != undefined ? this.param.limit : 10,
            total: 0,
            mode: this.param.mode || 'local',
            showPagination: typeof(this.param.showPagination) === 'undefined' ? true : this.param.showPagination,
            loading: false,
            locale: this.param.locale || "en_US",
            pager_dropdown_show: false,
            current_column_index:"",
            current_column:"",
            current_column_width:"",
            next_column:"",
            next_column_width:"",
            pageX:""            
        }
    },
    computed: {
        records() {
            if (this.total == 0) {
                return this.$t("records", [0, 0, 0]);
            }
            var start_num = this.page > 0 ? (this.page - 1) * this.limit : 0;
            var end_num = this.total > (this.page * this.limit) ? (this.page * this.limit) : this.total;
            return this.$t("records", [start_num + 1, end_num, this.total]);
        },
        totalPage() {
            if (this.total % this.limit == 0) {
                return this.total / this.limit;
            } else {
                return parseInt(this.total / this.limit) + 1;
            }
        },
        perPage() {
            return this.$t("per_page", [this.limit]);
        },
        needDetailRow() {
            let res = _.find(this.columns, (column) => { return column.isDetailRow == true });
            return typeof(res) != 'undefined';
        },
        needCheckbox() {
            let res = _.find(this.columns, (column) => { 
                return column.isCheckbox == true 
            });
            return typeof(res) != 'undefined';
        },
        checkAllClass() {
            return {
                'checked': this.rows.length == this.getSelectedItems().length && this.rows.length != 0,
                'partial': this.getSelectedItems().length > 0 && this.rows.length != this.getSelectedItems().length
            }
        },
        pagerDisabled() {
            return this.totalPage <= 1;
        },
        needScroll() {
            return typeof(this.param.height) && parseInt(this.param.height) > 0 && this.rows.length > 0;
        },
        scrollWidth(){
            return '17px'
        },
        bodyStyle() {
            if(this.needScroll){
                return {
                    'height':this.param.height+'px',
                }
            }
        }
    },
    methods: {
        stop(){
            return false;
        },
        show_resize_hover(index){
            return this.param.resizable && ((index === 0 && (!this.needDetailRow && !this.needCheckbox) ) || index > 0) && index != this.columns.length -1 ;
        },
        column_hover(column){
            return (column.hover || column.mousedown) && this.param.resizable;
        },
        column_click(column){
            return column.mousedown && this.param.resizable;
        },
        hover_for_resize(index){
            let tmp = _.clone(this.columns[index]);
            tmp.hover = true;
            Vue.set(this.columns, index, tmp);
        },
        hover_out(index){
            let tmp = _.clone(this.columns[index]);
            if(tmp.mousedown === false){

            }
            tmp.hover = false;
            Vue.set(this.columns, index, tmp);
        },
        mouse_down(index,e){
            let tmp = _.clone(this.columns[index]);
            tmp.mousedown = true;
            Vue.set(this.columns, index, tmp);

            this.current_column_index = index;
            this.current_column = e.target.parentElement;
            this.current_column_width = this.current_column.offsetWidth;
            this.next_column = this.current_column.nextElementSibling;
            if(this.next_column){
                this.next_column_width = this.current_column.nextElementSibling.offsetWidth;
            }
            this.pageX = e.pageX;            
        },
        mouse_move(e){
            if(this.current_column){
                let diffX = e.pageX - this.pageX;
                let table_width = this.$root.$el.offsetWidth;
                if(diffX > 0){
                    var gap = 0;
                    if(this.next_column){
                        let tmp_next = _.clone(this.columns[this.current_column_index+1]);
                        let width = 0;
                        if((this.next_column_width - (diffX)) < 80){
                            gap = 80 - (this.next_column_width - (diffX));
                            width =   (80 / table_width).toFixed(4) * 100;
                        }else{
                            width =   ((this.next_column_width - diffX) / table_width).toFixed(3) * 100;                         
                        }
                        tmp_next.width = width;
                        Vue.set(this.columns, this.current_column_index+1, tmp_next);                        
                    }
                    let tmp_current = _.clone(this.columns[this.current_column_index]);
                    tmp_current.width = ((this.current_column_width + diffX - gap) / table_width).toFixed(4) * 100;
                    Vue.set(this.columns, this.current_column_index, tmp_current);


                }else{
                    var gap = 0;
                    let width = 0;
                    if((this.current_column_width + diffX) < 80){
                        width = 80;
                        gap = 80 - (this.current_column_width + diffX);
                    }else{
                        width = (this.current_column_width + diffX);
                    }
                    let tmp_current = _.clone(this.columns[this.current_column_index]);
                    tmp_current.width = (width / table_width).toFixed(4) * 100;
                    Vue.set(this.columns, this.current_column_index, tmp_current);                    
                    if (this.next_column){
                        let tmp_next = _.clone(this.columns[this.current_column_index+1]);
                        let width =   ((this.next_column_width - diffX - gap) / table_width).toFixed(4) * 100;
                        tmp_next.width = width;
                        Vue.set(this.columns, this.current_column_index+1, tmp_next);                        
                    }                    
                }
            }
        },
        mouse_up(){
            _.forEach(this.columns,(column,index)=>{
                let tmp = _.clone(this.columns[index]);
                tmp.mousedown = false;
                tmp.hover = false;
                Vue.set(this.columns, index, tmp);                
            })
            this.current_column_index = undefined;
            this.current_column = undefined;
            this.current_column_width = undefined;
            this.next_column = undefined;
            this.next_column_width = undefined;

        },
        getSelectedItems() {
            let arr = _.filter(this.rows, (row) => {
                return row.checked;
            });
            return arr;
        },
        hide_pager_dropdown() {
            this.pager_dropdown_show = false;
        },
        show_pager_dropdown() {
            this.pager_dropdown_show = true;
        },
        stripeTR(index){
            return this.param.stripe && index%2 == 1;
        },
        goPrev() {
            if (this.page == 0) {
                return;
            }
            if (this.page == 1)
                return;
            else
                this.page = this.page - 1;
            this.getData();
        },
        goNext() {
            if (this.page == 0) {
                return;
            }
            if (this.page == this.totalPage)
                return;
            else
                this.page = this.page + 1;
            this.getData();
        },
        columnWidth(column){
            return typeof(column.width)!=='undefined'?column.width+'%':'';
        },      
        clickCheckAll() {
            var _this = this;
            var selected_item_length = _this.getSelectedItems().length;
            this.rows.forEach((row, index) => {
                if (selected_item_length == _this.rows.length) {
                    row.checked = false;
                } else {
                    row.checked = true;
                }
                Vue.set(_this.rows, index, row);
            });
           /**
               * When selected item changes will trigger this function
               * @type {Event}
            */              
            this.$emit('selected-items',this.getSelectedItems());
        },
        clickCheckItem(row, index) {
            row.checked = !row.checked;
            Vue.set(this.rows, index, row);
            /**
               * When selected item changes will trigger this function
               * @type {Event}
            */            
            this.$emit('selected-items',this.getSelectedItems());
        },
        clickDetailRow(row,index) {
            row.expand = !row.expand;
            Vue.set(this.rows, index, row);
            if(_.isFunction(this.$refs["detail_" + row.id][0].callback)){
                this.$refs["detail_" + row.id][0].callback();
            }
        },
        resort(sortable, sort_column) {
            if (sortable) {
                this.sortOrder == "asc" ? this.sortOrder = "desc" : this.sortOrder = "asc";
                this.sortColumn = sort_column;
                this.page = 1;
                this.getData();
            }
        },
        changeLimit(limit) {
            this.limit = parseInt(limit);
            this.page = 1;
            this.pager_dropdown_show = false;
            this.getData();
        },
        pageEnter: function(e) {
            e.target.blur();
            return false;
        },
        changePage: function(e) {
            var page = e.target.value;
            var re = new RegExp("^[0-9]*$");
            if (re.test(page) && page != "") {
                if (parseInt(page) <= 0 || parseInt(page) > this.totalPage) {
                    alert(this.$t("invalid_page"));
                    return false;
                }
            } else {
                alert(this.$t("invalid_page"));
                return false;
            }
            if (page != this.page) {
                this.page = parseInt(page);
                this.getData();
            }
        },
        getData() {
            let needCheckbox = this.needCheckbox;
            let needDetailRow = this.needDetailRow;
            if (this.mode == 'local') {
                this.loading = true;
                this.total = this.param.dataSet.length;
                this.rows = [];
                var arr = _.orderBy(this.param.dataSet, [this.sortColumn], [this.sortOrder]);
                var start_num = this.page > 0 ? (this.page - 1) * this.limit : 0;
                var end_num = this.total > (this.page * this.limit) ? (this.page * this.limit) : this.total;
                if (this.showPagination) {
                    arr = arr.slice(start_num, end_num);
                }
                var _self = this;
                _.forEach(arr, function(value, key) {
                    var tmp = {};
                    if (needCheckbox) {
                        tmp["checked"] = false;
                    }
                    if (needDetailRow){
                        tmp["expand"] = false;
                    }
                    _.forEach(value, function(v, k) {
                        tmp[k] = v;
                    });
                    _self.rows.push(tmp);
                });
                this.loading = false;
            }else{
                this.loading = true;
                let _self = this;
                let parameters = '?rows='+this.limit+'&page='+this.page+'&sidx='+this.sortColumn+'&sord='+this.sortOrder;
                Vue.axios.get(this.param.url+parameters).then((response) => {
                    _self.total = parseInt(response.data.total);
                    if (_self.total == 0) {
                        _self.page = 0;
                    }
                    _.forEach(response.data.rows, function(value, key) {
                        var tmp = {};
                        if (needCheckbox) {
                            tmp["checked"] = false;
                        }
                        if (needDetailRow){
                            tmp["expand"] = false;
                        }
                        _.forEach(value, function(v, k) {
                            tmp[k] = v;
                        });
                        _self.rows.push(tmp);
                    });
                    _self.loading = false;
                })
            }
        },
        updateComponent() {

        }
    },
    created() {
        this.getData();
    },
    mounted() {
        this._i18n.locale = this.locale;
        //incase move out of the table during resize the column
        document.addEventListener('mouseup',this.mouse_up);
    },
    watch: {
        "param.reloadFlag": function() {

        }
    },
    directives: {
        onClickaway: onClickaway,
    },
};
</script>