<template>
  <Layout>
    <div class="statisticName">
      <h3>统计</h3>
    </div>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div>
      <div>
        <Echarts :total-list="groupedList"/>
      </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span class="tag" :key="tag.id" v-for="tag in item.tags"><Icon :name="tag.iconName"/><span
                class="labelName">{{tag.name}}</span></span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Echarts from '@/components/Echarts.vue';
  import 'echarts/lib/chart/bar';

  @Component({
    components: {Tabs, Echarts},
  })
  export default class Statistics extends Vue {

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        console.log('hi');
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const array = recordList.filter(r => r.type === this.type);
      if (array.length === 0) {return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      const result: RResult = [{
        title: dayjs(newList[0].createDate).format('YYYY-MM-DD'),
        total: 0,
        items: [newList[0]]
      }];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createDate).format('YYYY-MM-DD'), total: 0, items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          console.log(sum);
          console.log(item);
          return sum + item.amount;
        }, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
  #myEcharts {
    width: 100vw;
    height: 40vh;
  }

  .statisticName {
    text-align: center;
    min-width: 100vw;
    padding: 15px 0;
    background: #56C5B2;
    font-weight: normal;
    color: #ffffff;
  }
  .noResult {
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item {
      background: #C4C4C4;
      &.selected {
        background: white;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
    > .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999999;
    }
    > .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      .labelName {
        padding: 0 5px;
      }
    }
  }

</style>

