<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)"><h3>{{item.text}}</h3>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string; value: string }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array})
    dataSource!: DataSourceItem[];
    @Prop(String)
    readonly value!: string;
    @Prop(String)
    classPrefix?: string;
    @Prop({type: String, default: '64px'})
    height!: string;

    liClass(item: DataSourceItem) {
      return {
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value
      };
    }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/helper.scss';
  .tabs {
    background: $color-height;
    display: flex;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    &-item {
      width: 50%;
      min-height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: #ffffff;
      &.selected {
        &::after {
          content: '';
          background: $color-height;
          height: 2px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        background: #ffffff;
        color: $color-font;
      }
    }
  }
</style>