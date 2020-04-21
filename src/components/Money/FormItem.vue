<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}:</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="this.placeholder">
      <span class="name date">日期:</span><input type="date">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch, Prop} from 'vue-property-decorator'

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string

    onValueChanged(value: string) {
      this.$emit('update:value', value)
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