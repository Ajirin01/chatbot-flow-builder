<template>
  <div>
    <!-- Messages Section -->
    <div>
      <input type="text" v-model="searchKeyword" placeholder="Search Messages">
      <div class="messages-container">
        <div class="option-card message-card"
             v-for="message in filteredMessages"
             :key="message.id"
             :class="{ 'selected': selectedMessage && selectedMessage.id === message.id }"
             @click="selectMessage(message)">
          {{ message.text }}
        </div>
      </div>
    </div>

    <!-- Button to Create New Condition -->
    <button class="waves-effect waves-light btn" @click="assignNextMessage">Assign Next Message</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import getMessageObjects from "@/helper_functions/getMessageObjects.js";

export default {
  data() {
    return {
      selectedMessage: null,
      searchKeyword: '',
    };
  },
  methods: {
    selectMessage(message) {
      this.selectedMessage = message;
    },
    assignNextMessage() {
      if (this.selectedMessage) {
        this.selectedObject.next = this.selectedMessage;
        console.log("Assigned next message:", this.selectedMessage, "to option:", this.selectedOption);
        // Reset selections
        this.selectedMessage = null;
      }

      console.log(this.selectedObject)

      const body = document.getElementsByTagName('body');
      body[0].style.overflow = "scroll"
      console.log(body[0])
      body[0].scrollTop = body[0].scrollHeight;
    },
  },
  computed: {
    ...mapState(["chatFlowData"]),
    ...mapState(["selectedObject"]),
    messages() {
      return getMessageObjects(this.chatFlowData);
    },
    filteredMessages() {
      // Implement filtering logic based on searchKeyword for messages
      return this.messages.filter(message => message.text.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    },
  },
};
</script>

<style scoped>
.option-card.selected, .messages-section ul li.selected {
  background-color: #b2ebf2;
}

.options-container, .messages-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.messages-container {
  max-height: 250px;
  overflow-y: auto;
}

.messages-container::-webkit-scrollbar {
  width: 3px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.option-card, .message-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option-card.selected, .message-card.selected {
  background-color: #b2ebf2;
}

.btn {
  margin-top: 20px;
}
</style>
