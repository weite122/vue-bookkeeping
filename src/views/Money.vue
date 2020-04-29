<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes"
                :dateValue.sync="record.createDate"
      />
    </div>
    <Tags @update:value="onUpdateNotes"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Tabs from '@/components/Tabs.vue'
  import recordTypeList from "@/constants/recordTypeList";
  import message from "ant-design-vue";

  @Component({
    components: {Tabs, Tags, FormItem, NumberPad}
  })
  export default class Money extends Vue {

    record: RecordItem = {
      tags: [], notes: '', amount: 0, type: '-', createDate: ''
    }

    // get recordList() {
    //   return this.$store.state.recordList;
    // }

    recordTypeList = recordTypeList;

    created() {
      const now = new Date();
      const day = ("0" + now.getDate()).slice(-2);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      this.record.createDate = now.getFullYear() + "-" + (month) + "-" + (day);
    }

    onUpdateNotes(value: string) {
      this.record.notes = value
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return this.$message.warning('请选择1~2个标签!', 1);
      } else if (this.record.tags.length > 2) {
        return this.$message.warning('标签名太多啦,请重新选择', 1);
      } else if (this.record.amount === 0) {
        return this.$message.warning('您还没有输入金额哦!', 1)
      }
      this.$store.commit('createRecord', this.record)
      if (this.$store.state.createRecordError === null) {
        this.record.notes = '';
        this.$message.success('添加成功', 1);
      }
    }
  }


</script>
<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>

