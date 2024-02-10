<!-- components/ChatFlow.vue -->

<template>
    <div class="chat-flow">
      <ChatFlowItem :item="chatFlow"  />
    </div>
  </template>
  
  <script>
  import ChatFlowItem from '@/components/ChatFlowItem.vue';
  
  export default {
    props: {
      chatFlow: Object,
    },
    
    components: {
      ChatFlowItem,
    },
  };
  </script>
  
  <style scoped>
  .chat-flow {
    max-width: 600px;
    margin: auto;
  }
  </style>
  