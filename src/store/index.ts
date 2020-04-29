import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    errorState: 'none',
    successState: 'none',
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    changeSuccessState(state){
      state.successState = 'none'
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back()
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state, payload: { id: string; name: string; iconName: string }) {
      const {id, name, iconName} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          //   window.alert('标签名重复了');
          // } else {
          //   const tag = state.tagList.filter(item => item.id === id)[0];
          //   tag.name = name;
          //   store.commit('saveTags');
          console.log('重复');
          return state.errorState = 'failed';
        } else {
          console.log('不重复');
          state.errorState = 'none';
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          tag.iconName = iconName;
          store.commit('saveTags');
        }
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
      state.successState = 'success'
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList') || `
            [
              {
                "id": "e46mmdwgnf7",
                "name": "购物",
                "iconName": "shopping"
              },
              {
                "id": "zu427xlf3h",
                "name": "娱乐",
                "iconName": "happy"
              },
              {
              "id": "k2a3cxa9kvl",
              "name": "餐饮",
              "iconName": "eat"
              },
              {
              "id": "1bejsj3xh49",
              "name": "通信",
              "iconName": "phone"
              },
              {
              "id": "ipshdvwgr3",
              "name": "宠物",
              "iconName": "pet"
              },
              {
              "id": "nkrs864gck",
              "name": "交通",
              "iconName": "transportation"
              },
              {
              "id": "gj26q6tsyaf",
              "name": "学习",
              "iconName": "study"
              },
              {
              "id": "nxvirwsgdub",
              "name": "旅行",
              "iconName": "travel"
              },
              {
              "id": "avhj7kh3enh",
              "name": "投资",
              "iconName": "financing"
              },
              {
              "id": "u1gcfr6h8fn",
              "name": "其他收入",
              "iconName": "othercome"
              },
              {
              "id": "plsvvup3xlf",
              "name": "兼职",
              "iconName": "parttimejob"
              },
              {
              "id": "kidhyl5p9y",
              "name": "工资",
              "iconName": "salary"
              },
              {
                "id": "71t6qxpji4",
                "name": "转账",
                "iconName": "transfer"
              }
            ]
        `);
    },
    createTag(state, tag: Tag) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(tag.name) >= 0) {
        // state.createTagError = new Error('tag name duplicated');
        // return;
        return state.errorState = 'failed';
      }
      state.errorState = 'none';
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  },
  actions: {},
  modules: {}
})

export default store;