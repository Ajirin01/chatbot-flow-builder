<template>
    <div>
      <!-- Options Section -->
      <div class="options-container">
        <span v-if="!options || options.length == 0 " class="red-text">No unassigned options.</span>
        <div class="option-card"
             v-for="option in options"
             :key="option"
             :class="{ 'selected': selectedOption && selectedOption === option }"
             @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
  
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
      <button class="waves-effect waves-light btn" @click="createNewCondition">Add Condition</button>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import getMessageObjects from "@/helper_functions/getMessageObjects.js";
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    data() {
      return {
        selectedOption: null,
        selectedMessage: null,
        searchKeyword: '',
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
      selectMessage(message) {
        this.selectedMessage = message;
      },
      createNewCondition() {
        if (this.selectedOption && this.selectedMessage) {
            // Create new condition using selected option and message
            const newMessage = { ...this.selectedMessage };
            newMessage.id = uuidv4();

            // Create new condition using selected option and copied message
            const newCondition = {
                selectedOption: this.selectedOption,
                selectedMessage: newMessage,
            };

            this.handleNewCondition(newCondition);

            const body = document.getElementsByTagName('body');
            body[0].style.overflow = "scroll"
            console.log(body[0])
            body[0].scrollTop = body[0].scrollHeight;
        }
      },
      handleNewCondition(condition) {
        // Handle logic to add the new condition to your data
        if (condition) {
            const newCondition = {
                selectedOption: condition.selectedOption,
                content: condition.selectedMessage,
            };

            // Check if the selectedMessageObject is in chatFlowData.messages
            const index = this.chatFlowData.messages.findIndex(
                (message) => message.id === this.selectedMessage.id
            );

            if (index !== -1) {
            // If found, remove it from chatFlowData.messages
            this.chatFlowData.messages.splice(index, 1);
            }

            // Add the new condition
            this.selectedObject.conditions.push(newCondition);

            // Reset selections
            this.selectedOption = null;
            this.selectedMessage = null;
        }

        console.log(this.chatFlowData)
      },
    },
    computed: {
      ...mapState(["chatFlowData"]),
      ...mapState(["selectedObject"]),
      messages() {
        return getMessageObjects(this.chatFlowData);
      },

        options() {
            if (!this.selectedObject) {
                return [];
            }

            // Get the IDs of options that have been assigned to a condition
            const assignedOption = this.selectedObject.conditions.map(condition => condition.selectedOption);

            // Filter out options that have been assigned to a condition
            return this.selectedObject.options.filter(option => !assignedOption.includes(option));
        },
      filteredOptions() {
        // Implement filtering logic based on searchKeyword for options
        return this.options.filter(option =>
          option.text.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      },
      filteredMessages() {
        // Implement filtering logic based on searchKeyword for messages
        return this.messages.filter(message =>
          message.text.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .option-card.selected, .messages-section ul li.selected {
    background-color: #b2ebf2;
  }
  
  .options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .messages-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 250px;
    overflow-y: auto;
    scrollbar-width: 3px; /* For Firefox */
  }
  
  .messages-container::-webkit-scrollbar { /* For WebKit browsers */
    width: 3px;
  }
  
  .messages-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .messages-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  .option-card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .option-card.selected {
    background-color: #b2ebf2;
  }
  
  .btn {
    margin-top: 20px;
  }
  </style>
  