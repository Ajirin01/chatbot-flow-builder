<template>
  <div>
    <!-- Options and Assigned Messages Section -->
    <div class="">
      <span v-if="!options || options.length == 0 " class="red-text">No unassigned options.</span>
      <div 
           v-for="(option) in options"
           :key="option.id"
           @click="toggleOptionSelection(option)"
           style="display: flex; justify-content: start; margin-bottom: 15px"
           :class="{ 'selected-option': isSelectedOption(option) }"
          >
        <div class="option-card">{{ option }}</div>

        <i class="material-icons" style="transform: rotate(180deg);">reply_all</i>
        
        <div class="option-card" 
          @click.stop="addMessageToDeletes(option)" 
          v-if="getContentOfSelectedOption(selectedObject.conditions, option)"
        >
          {{ getContentOfSelectedOption(selectedObject.conditions, option).text }}
        </div>
      </div>
    </div>

    <!-- Button to Delete Selected Conditions -->
    <button class="waves-effect waves-light btn" @click="deleteSelectedConditions">Delete Selected Conditions</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import getMessageObjects from "@/helper_functions/getMessageObjects.js";
import getContentOfSelectedOption from "@/helper_functions/getContentOfSelectedOption";
import { cloneDeep } from 'lodash';

export default {
  data() {
    return {
      selectedOption: null,
      selectedMessage: null,
      searchKeyword: '',
      selectedOptions: [], // Array to store selected options
    };
  },
  methods: {
    getMessageObjects,
    getContentOfSelectedOption,
    selectOption(option) {
      this.selectedOption = option;
    },
    // addMessageToDeletes(option, message) {
    //   this.selectedOption = option;
    // },
    isSelectedOption(option) {
      return this.selectedOptions.includes(option);
    },
    addMessageToDeletes(option) {
      

      if (this.isSelectedOption(option)) {
        const index = this.selectedOptions.indexOf(option);
        if (index !== -1) {
          this.selectedOptions.splice(index, 1); // Remove from selected options array
          event.target.style.backgroundColor = 'transparent'
        }
      } else {
        this.selectedOptions.push(option); // Add to selected options array
        event.target.style.backgroundColor = '#b2ebf2'
      }
    },
    isSelectedMessage(message) {
      return this.selectedMessage && this.selectedMessage.id === message.id;
    },
    toggleMessageSelection(message) {
      if (this.isSelectedMessage(message)) {
        this.selectedMessage = null; // Deselect the message
      } else {
        this.selectedMessage = message; // Select the message
      }
    },
    deleteSelectedConditions() {
      // Remove selected options from selectedObject.conditions
      this.selectedOptions.forEach(option => {
        const index = this.selectedObject.conditions.findIndex(condition => condition.selectedOption === option);
        if (index !== -1) {
          this.selectedObject.conditions.splice(index, 1);
        }
      });
      // Clear the selected options array
      this.selectedOptions = [];
    },
  },
  computed: {
    ...mapState(["chatFlowData"]),
    ...mapState(["selectedObject"]),
    options() {
      if (!this.selectedObject) {
        return [];
      }
      return this.selectedObject.options;
    },
    filteredMessages() {
      if (!this.messages) {
        return []; // Return an empty array if messages is undefined
      }
      const messagesCopy = cloneDeep(this.messages);
      return messagesCopy.filter(message => message.text.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    },
  },
};
</script>

<style scoped>
.option-card, .message-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.option-card.selected-option {
  background-color: #b2ebf2;
}

.message-card.selected-message {
  background-color: #b2ebf2;
}

.btn {
  margin-top: 20px;
}
</style>
