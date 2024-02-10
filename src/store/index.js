import { createStore } from 'vuex'

export default createStore({
  state: {
    chatFlowData: [], // Your initial state
    selectedObject: null,
    isDuplicating: false,
    chatDataCopy: []
  },
  getters: {
    getChatFlowData(state) {
      return state.chatFlowData;
    },
    getselectedObject(state) {
      return state.selectedObject;
    },
  },
  mutations: {
    setChatFlowData(state, data) {
      state.chatFlowData = data;
    },
    setSelectedObject(state, data) {
      state.selectedObject = data;
    },
    addMessageToChatFlowData(state, message) {
      state.chatFlowData.messages.push(message)
    },
    setIsDuplicating(state, data){
      state.isDuplicating = data
    },
    setChatDataCopy(state, data){
      state.chatDataCopy = data
    }
  },
  actions: {
  },
  modules: {
  }
})
