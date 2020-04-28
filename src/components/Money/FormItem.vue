<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}:</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="this.placeholder">
      <span class="name date">日期:</span><input :value="dateValue" :max="defaultDateValue" @input="dateChanged($event.target.value)" type="date">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch, Prop} from 'vue-property-decorator'

  @Component
  export default class FormItem extends Vue {
    defaultDateValue = '';
    created(){
      const now = new Date();
      const day = ("0" + now.getDate()).slice(-2);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      this.defaultDateValue = now.getFullYear() + "-" + (month) + "-" + (day);
    }
    @Prop({default: ''}) readonly value!: string;
    @Prop({default: ''}) readonly dateValue!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string

    onValueChanged(value: string) {
      this.$emit('update:value', value)
    }
    dateChanged(value: string){
      this.$emit('update:dateValue',value);
    }
  }

</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 12px;
    background: #f5f5f5;
    justify-content: space-around;
    padding: 0 16px;
    min-height: 50px;
    display: flex;
    align-items: center;
    .name {
      flex-grow: 1;
    }
    input {
      height: 40px;
      flex-shrink: 1;
      background: transparent;
      border: none;

    }
  }
</style>