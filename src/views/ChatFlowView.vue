<template>
    <div>
      <h1>Chatbot Flow</h1>
      <ChatFlow :chatFlow="chatFlowData" @new-message="handleNewMessage" />
    </div>
  </template>
  
  <script>
  import ChatFlow from '@/components/ChatFlow.vue';
  import chatData from '@/assets/chatData.json';
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    data() {
      return {
        // chatFlowData: null, // Set to null initially
      };
    },
    computed: {
        ...mapState(['chatFlowData']),
    },
    components: {
      ChatFlow,
    },
    created() {
    //   this.loadChatData();
        const fetchedData = this.loadChatData() // Fetch your data here
        this.setChatFlowData(fetchedData);
    },
    methods: {
    ...mapMutations(['setChatFlowData']),
      loadChatData() {
        // Get the flow id from the route parameter
        const flowId = this.$route.params.id;
        console.log(flowId)
  
        // Fetch the corresponding chat data based on the flow id
        // Replace this logic with your actual data loading mechanism
        // For now, I'm assuming the flow id is an index in the array
        // this.chatFlowData = chatData.find(chat => chat.id ==  flowId);
        return chatData.find(chat => chat.id ==  flowId);
      },

      handleNewMessage(newMessage) {
        // Update your chatFlow object here
        this.chatFlowData.messages.push(newMessage);
        console.log(this.chatFlowData)
      },
    },
    watch: {
      // Watch for changes in the route and reload the data accordingly
      '$route.params.id': 'loadChatData',
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  