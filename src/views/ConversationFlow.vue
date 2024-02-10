<template>
  <div>
    <h3>Conversation Flow Objects  
      <!-- Add icon for creating a new flow -->
      <a class="btn-floating btn-large waves-effect waves-light" @click="toggleInput"><i class="material-icons">{{ inputVisible ? 'remove' : 'add' }}</i></a>
      
      <!-- Dropdown trigger for import/export options -->
      <i class="material-icons importExportBtn" @click="openImportExportDropdown">import_export</i>
      <a class="dropdown-trigger" id="dropdown-trigger" href="#" data-target="importExportDropdown"><i class="material-icons black-text">import_export</i></a>

    </h3>
    <!-- Dropdown Structure for import/export options -->
    <ul id="importExportDropdown" class="dropdown-content">
      <li><a href="#!" @click="openImportInput">Import</a></li>
      <li><a href="#!" @click="exportFlow(conversationFlowObjects)">Export</a></li>
    </ul>

    <input style="display: none;" type="file" name="importInput" id="importInput" @change="importFlow">
    
    <!-- Display text input if inputVisible is true -->
    <div v-if="inputVisible">
      <input type="text" v-model="newFlowTitle" placeholder="Enter flow name">
      <button class="waves-effect waves-light btn" @click="createNewFlow">Submit</button>
    </div>
    
    <!-- List of existing flow objects -->
    <ul>
      <li v-for="flowObject in conversationFlowObjects" :key="flowObject.id">
        <router-link :to="{ name: 'ChatFlow', params: { id: flowObject.id } }">
          {{ flowObject.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import chatData from '@/assets/chatData.json'
import { v4 as uuidv4 } from 'uuid';
import M from "materialize-css"

import exportData from '@/helper_functions/exportData.js'

export default {
  data() {
    return {
      // Sample conversation flow objects
      conversationFlowObjects: chatData,
      // Flag to toggle visibility of input field
      inputVisible: false,
      // New flow title
      newFlowTitle: ''
    };
  },

  methods: {
    // Toggle visibility of input field
    toggleInput() {
      this.inputVisible = !this.inputVisible;
      // Reset newFlowTitle when input becomes invisible
      if (!this.inputVisible) {
        this.newFlowTitle = '';
      }
    },

    // Create a new flow with the provided title
    createNewFlow() {
      if (this.newFlowTitle.trim() === '') {
        // Ensure the input is not empty
        alert('Please enter a flow name.');
        return;
      }

      const newChatFlow = {
          id: uuidv4(),
          title: this.newFlowTitle, // Use the title from the input field
          flow: {
            id: uuidv4(),
            text: "Start of conversation",
            options: [],
            ends: false,
            starts: true,
            next: {},
            rerun: null,
            collapsed: false,
            showMenu: false,
            parentId: null,
            content: [],
            conditions: []
          },
          messages: []
      }
      // Add the new flow to the list
      this.conversationFlowObjects.push(newChatFlow);
      // Reset input and hide the input field
      this.newFlowTitle = '';
      this.inputVisible = false;
    },

    openImportExportDropdown(){
      document.getElementById('dropdown-trigger').click()
    },

    openImportInput(){
      document.getElementById('importInput').click()
    },


    // Method for importing flow
    importFlow() {
      // Implement your import logic here
      let confirmImport = confirm('Are you sure you want to import this data?');

      if(confirmImport){
        const file = event.target.files[0];
        if (!file) return; // No file selected

        // Create a FileReader instance
        const reader = new FileReader();

        // Define the onload event handler
        reader.onload = (e) => {
          // Parse the JSON data
          const importedData = JSON.parse(e.target.result);

          // Update existing records or add new records
          importedData.forEach((importedFlow) => {
            const existingFlowIndex = this.conversationFlowObjects.findIndex(flow => flow.id === importedFlow.id);
            if (existingFlowIndex !== -1) {
              // Update existing record
              this.conversationFlowObjects[existingFlowIndex] = importedFlow;
            } else {
              // Add new record
              this.conversationFlowObjects.push(importedFlow);
            }
          });
        };

        // Read the file as text
        reader.readAsText(file);
      }
    },

    // Method for exporting flow (uitility function)
    exportFlow(){
      exportData(this.conversationFlowObjects)
    }
  },

  mounted() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {});
  }
};
</script>

<style scoped>
.importExportBtn{
  cursor: pointer;
  margin-left: 10px;
}
</style>
