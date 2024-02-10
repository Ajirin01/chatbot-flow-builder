<template>
  <div>
    <!-- Options and Assigned Messages Section -->
    <div class="">
      <span v-if="!options || options.length == 0 " class="red-text">No unassigned options.</span>
      <div 
           v-for="(option) in options"
           :key="option.id"
           @click="selectOption(option)"
           style="display: flex; justify-content: start; margin-bottom: 15px"
          >
        <div class="option-card">{{ option }}</div>

        <i class="material-icons" style="transform: rotate(180deg);">reply_all</i>
        
        <div class="option-card" 
          @click.stop="openMessageDropdown(option, getContentOfSelectedOption(selectedObject.conditions, option))" 
          :class="{ 'selected': selectedOption && selectedOption === option }" 
          v-if="getContentOfSelectedOption(selectedObject.conditions, option)"
        >
          {{ getContentOfSelectedOption(selectedObject.conditions, option).text }}
        </div>
      </div>
    </div>

    <div v-if="messageDropdownOpen">
      <input type="text" v-model="searchKeyword" placeholder="Search Messages">
      <div class="messages-container" :id="'messagesContainer'">
        <div class="option-card message-card"
             v-for="message in filteredMessages"
             :key="message.id"
             :class="{ 'selected': selectedMessage && selectedMessage.id === message.id }"
              @click="replaceAssignedMessage(message)">
          {{ message.text }}
        </div>
      </div>
    </div>

    <!-- {{ myMessages }} -->

    <!-- Button to Create New Condition -->
    <!-- <button class="waves-effect waves-light btn" @click="createNewCondition">Update Conditions</button> -->
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
      messageDropdownOpen: false,
      selectedReplacementMessage: null,
      myMessages: this.getMessageObjects(this.chatFlowData)
    };
  },
  computed: {
    ...mapState(["chatFlowData"]),
    ...mapState(["selectedObject"]),
    ...mapState(["chatDataCopy"]),
    messages() {
      return this.getMessageObjects(this.chatFlowData);
    },
    options() {
      if (!this.selectedObject) {
        return [];
      }
      return this.selectedObject.options;
    },
    filteredOptions() {
      return this.options.filter(option => option.text.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    },
    filteredMessages() {
      const messagesCopy = cloneDeep(this.messages);
      return messagesCopy.filter(message => message.text.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    },
  },
  methods: {
    getMessageObjects,
    getContentOfSelectedOption,
    selectOption(option) {
      this.selectedOption = option;
    },
    selectMessage(message) {
      this.selectedMessage = message;

    },
    createNewCondition() {
      console.log(this.chatFlowData)
    },
    handleNewCondition(condition) {
      if (condition) {
        const newCondition = {
          selectedOption: condition.selectedOption,
          content: condition.selectedMessage,
        };
        const index = this.chatFlowData.messages.findIndex(
          (message) => message.id === this.selectedMessage.id
        );
        if (index !== -1) {
          this.chatFlowData.messages.splice(index, 1);
        }
        this.selectedObject.conditions.push(newCondition);
        this.selectedOption = null;
        this.selectedMessage = null;
      }
      console.log(this.chatFlowData);
    },
    openMessageDropdown(option, message) {
      this.selectedOption = option;
      this.messageDropdownOpen = true;
      this.selectedReplacementMessage = message
    },
    replaceAssignedMessage(message) {
      console.log(this.selectedOption)
      // Check if the selectedMessageObject is in chatFlowData.messages
      const removeIndex = this.chatFlowData.messages.findIndex(
                (item) => item.id === message.id
            );

            if (removeIndex !== -1) {
            // If found, remove it from chatFlowData.messages
            this.chatFlowData.messages.splice(removeIndex, 1);
            }



      const index = this.selectedObject.conditions.findIndex(condition => condition.selectedOption === this.selectedOption);
      // this.chatFlowData.messages.push(this.selectedReplacementMessage)
      
      // console.log(index)
      if (index !== -1) {
        this.selectedObject.conditions[index].content = message;
        this.messageDropdownOpen = false;
      }

      // Scroll to the bottom of the messages container
      // this.$nextTick(() => {
        const body = document.getElementsByTagName('body');
        body[0].style.overflow = "scroll"
        console.log(body[0])
        body[0].scrollTop = body[0].scrollHeight;
      // });

      console.log(this.chatFlowData)
      
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
