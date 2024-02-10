<template>
  <div>
    <!-- Messages Section -->
    <div>
      <input type="text" v-model="searchKeyword" placeholder="Search Messages">
      <div class="messages-container">
        <div class="message-card"
             v-for="message in filteredMessages"
             :key="message.id"
             :class="{ 'selected': isSelected(message) }"
             @click="toggleSelection(message)">
          {{ message.text }}
        </div>
      </div>
    </div>

    <!-- Button to Assign Next Message -->
    <!-- <button class="waves-effect waves-light btn" @click="assignNextMessage">Assign Next Message</button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import getMessageObjects from "@/helper_functions/getMessageObjects.js";

export default {
  data() {
    return {
      searchKeyword: '',
    };
  },
  methods: {
    isSelected(message) {
      if(this.selectedObject){
        return this.selectedObject.rerun && this.selectedObject.id === message.id;
      }
    },
    toggleSelection(message) {
      if (this.isSelected(message)) {
        this.selectedObject.rerun = null; // Deselect the message
      } else {
        this.selectedObject.rerun = message.id; // Select the message
      }
    },
    assignNextMessage() {
      console.log("Assigned rerun message:", this.selectedObject.rerun, "to option:", this.selectedOption);
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
.message-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.message-card.selected {
  background-color: #b2ebf2;
}

.btn {
  margin-top: 20px;
}
</style>
