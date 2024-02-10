<!-- components/ChatFlowItem.vue -->

<template>
    <div class="chat-flow-item">
      <p>{{ item.text }}</p>
      <ul v-if="item.options && item.options.length">
        <li v-for="(option, index) in item.options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: Object,
    },
    methods: {
      selectOption(option) {
        // Handle option selection logic here
        console.log(`Selected option: ${option}`);
        // You can emit an event to notify the parent component about the selected option
        // this.$emit('optionSelected', option);
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-flow-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
  