<template>
    <div>
      <div class="flow-title-area">
        <h4>{{ chatFlow.title }}</h4>
        <div class="add-new-message">
          <i class="material-icons create-message" id="create-message" @mouseenter="applyHoverCreateMessage()" @mouseleave="removeHoverCreateMessage()" @click="createNewMessage()">queue</i>
           <i class="material-icons" @click="exportFlow">file_download</i>
        </div>
      </div>
      <!-- v-if="chatFlow.flow.showManu" -->
      <div class="" style="margin-bottom: 40px;">
        <div class="">
          <!-- bot output -->
          <ul class="conversation-block">
            <BotMessage :text="chatFlow.flow.text" @click="toggleMenuTray(chatFlow.flow)" />
            <menu-tray
                v-if="chatFlow.flow.showManu"
                @edit="openEditDropdown(chatFlow.flow.id)"
                @add="openAddDropdown(chatFlow.flow.id)"
                @duplicate="openDuplicateDropdown(chatFlow.flow.id)"
                @delete="openDeleteDropdown(chatFlow.flow.id)"
                
                @createCondition="handleCreateCondition(chatFlow.flow)"
                :side="'bot'"
            />

            <!-- Dropdown Menu comes here -->
            <DropdownMenu :message="chatFlow.flow" />

            <ul class="conversation-block" v-for="option in chatFlow.flow.options" :key="option.id" style="margin-left: 20px">
              <li>
                <!-- user message output -->
                <div>
                    <div style="display: flex; justify-content: right; margin-top: 10px">
                        <!-- user output -->
                        <UserMessage :text="option" />
                        <div v-if="getContentOfSelectedOption(chatFlow.flow.conditions, option)" class="right">
                          <b
                            :id="'toggle_'+getContentOfSelectedOption(chatFlow.flow.conditions, option).id"
                            class="toggle-click tooltipped material-icons"
                            data-position="bottom"
                            data-tooltip="click to toggle conversation"
                            @click="toggleHideChatBlock(getContentOfSelectedOption(chatFlow.flow.conditions, option))"
                          >
                            person_pin
                          </b>
                        </div>
                      </div>
                </div>
  
                <!-- condition options of flow -->
                <transition name="slide">
                  <div v-if="getContentOfSelectedOption(chatFlow.flow.conditions, option)?.collapsed" class="slide-container">
                    <ul class="conversation-block" v-for="condition in chatFlow.flow.conditions.find(condition => condition.selectedOption === option)" :key="condition.id">
                      <li>
                        <NestedConditions :conditions="condition" />
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>

            <div v-if="chatFlow.flow.next && chatFlow.flow.next.text != null">
              <!-- <b>Bot: </b>{{ chatFlow.flow.next.text }} -->
              <div class="next-message">
                <BotMessage :text="chatFlow.flow.next.text" @click="toggleMenuTray(chatFlow.flow.next.conditions)" />
                  <i class="material-icons">arrow_forward</i>
              </div>
  
              <ul class="conversation-block condition" v-for="option in chatFlow.flow.next.options" :key="option.id">
                  <li class="condition-header">
                      <!-- <b class="toggle-click" @click="toggleHideChatBlock(getContentOfSelectedOption(conditions.next, option))">User: </b><span>{{ option }}</span> -->
                      
                      <div>
                        <div style="display: flex; justify-content: right; margin-top: 10px">
                            <!-- user output -->
                            <UserMessage :text="option"/>
                            <!-- <UserMessage :text="option" @click="toggleMenuTray(getContentOfSelectedOption(chatFlow.flow.conditions, option))" /> -->
                            <div v-if="getContentOfSelectedOption(chatFlow.flow.next.conditions, option)" class="right">
                              <b
                                :id="'toggle_'+getContentOfSelectedOption(chatFlow.flow.next.conditions, option).id"
                                class="toggle-click tooltipped material-icons"
                                data-position="bottom"
                                data-tooltip="click to toggle conversation"
                                @click="toggleHideChatBlock(getContentOfSelectedOption(chatFlow.flow.next.conditions, option))"
                              >
                                person_pin
                              </b>
                            </div>
                          </div>
                      </div>
                      
                      
                      
                      <transition name="slide">
                          <div v-if="getContentOfSelectedOption(chatFlow.flow.next.conditions, option)?.collapsed" class="slide-container">
                              <ul class="conversation-block" v-for="condition in chatFlow.flow.next.conditions.find(condition => condition.selectedOption === option)" :key="condition.id">
                                  <li>
                                      <NestedConditions v-if="condition.conditions" :conditions="condition" />
                                  </li>
                              </ul>
                          </div>
                      </transition>
                  </li>
              </ul>
            </div>
    
            <div v-if="chatFlow.flow.rerun != null">
                <div class="rerun-message" v-if="chatFlow.flow.rerun != null">
                  <BotMessage :text="findMessageByIdRecursive(chatFlow.flow, chatFlow.flow.rerun).text" @click="toggleMenuTray(chatFlow.flow)" />
                  <i class="material-icons">replay</i>
                </div>
            </div>

            <ul class="collapsible message-gallery">
              <li>
                <div class="collapsible-header"><i class="material-icons">collections_bookmark</i><h6>Message Gallery</h6></div>
                <div class="collapsible-body">
                  <div class="" v-if="chatFlowData.messages &&  chatFlowData.messages.length > 0">
                    <div class="" v-for="message in chatFlowData.messages" :key="message.id">
                      
                      <div class="rerun-message" v-if="message.text">
                        <BotMessage :text="message.text" @click="toggleMenuTray(message)" />
                        <i class="material-icons grey-text">assignment</i>
                      </div>
      
                      <menu-tray
                        v-if="message.showManu"
                        @edit="openEditDropdown(message.id)"
                        @add="openAddDropdown(message.id)"
                        @duplicate="openDuplicateDropdown(message.id)"
                        @delete="openDeleteDropdown(message.id)"
                        
                        @createCondition="handleCreateCondition(message)"
                        :side="'bot'"
                      />
      
                      <!-- Dropdown Menu comes here -->
                      <DropdownMenu v-if="message" :message="message" />
      
                      <ul class="conversation-block" v-for="option in message.options" :key="option.id" style="margin-left: 20px">
                        <li>
                          <!-- user message output -->
                          <div>
                              <div style="display: flex; justify-content: right; margin-top: 10px">
                                  <!-- user output -->
                                  <UserMessage :text="option"/>
                                  <div v-if="getContentOfSelectedOption(message.conditions, option)" class="right">
                                    <b
                                      :id="'toggle_'+getContentOfSelectedOption(message.conditions, option).id"
                                      class="toggle-click tooltipped material-icons"
                                      data-position="bottom"
                                      data-tooltip="click to toggle conversation"
                                      @click="toggleHideChatBlock(getContentOfSelectedOption(message.conditions, option))"
                                    >
                                      person_pin
                                    </b>
                                  </div>
                                </div>
                          </div>
            
                          <!-- condition options of flow -->
                          <transition name="slide">
                            <div v-if="getContentOfSelectedOption(message.conditions, option)?.collapsed" class="slide-container">
                              <ul class="conversation-block" v-for="condition in message.conditions.find(condition => condition.selectedOption === option)" :key="condition.id">
                                <li>
                                  <NestedConditions :conditions="condition" />
                                </li>
                              </ul>
                            </div>
                          </transition>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </li>
            </ul>

            

          </ul>
        </div>
      </div>

      <!-- modal component displayed here -->
      <ModalsComponent></ModalsComponent>
    </div>
  </template>
  
  <script>
  import NestedConditions from "@/components/NestedConditions.vue";
  import BotMessage from "@/components/BotMessage.vue";
  import UserMessage from "@/components/UserMessage.vue";
  import M from "materialize-css"
  import { mapMutations, mapState } from "vuex";
  import MenuTray from '@/components/MenuTray.vue';

  import findMessageByIdRecursive from '@/helper_functions/findMessageByIdRecursive.js'//utility function
  import { openAddDropdown, openDeleteDropdown, openEditDropdown, openDuplicateDropdown } from '@/helper_functions/openDropdownHandlers.js'//utility functions
  import { toggleHideChatBlock, toggleMenuTray } from '@/helper_functions/toggleContents.js'//utility functions
  import getContentOfSelectedOption  from '@/helper_functions/getContentOfSelectedOption.js'//utility function
  import { convertToFlatStructure } from "@/helper_functions/dataStructureConverter.js"

  import DropdownMenu from '@/components/DropdownMenu.vue'
  import ModalsComponent from "@/components/ModalsComponent.vue";
  import { v4 as uuidv4 } from 'uuid';

  import exportData from '@/helper_functions/exportData.js'
  

  export default {
    props: {
      chatFlow: Object,
    },
    methods: {
        ...mapMutations(['setSelectedObject']),
        ...mapMutations(['addMessageToChatFlowData']),
        ...mapMutations(['setChatDataCopy']),

        // Utility functions start here
        findMessageByIdRecursive,
        openEditDropdown,
        openAddDropdown,
        openDeleteDropdown,
        openDuplicateDropdown,

        toggleMenuTray,

        toggleHideChatBlock,

        getContentOfSelectedOption,

        convertToFlatStructure,
        // Utility functions ends here

        createNewMessage(){
          const newMessage = {
            id: uuidv4(),
            text: "New message object",
            options: [],
            ends: false,
            starts: false,
            next: {},
            rerun: null,
            collapsed: false,
            showMenu: false,
            content: [],
            conditions: []
          }

          this.addMessageToChatFlowData(newMessage)
          // this.$emit("new-message", newMessage);
          // console.log(this.chatFlowData)
        },

        applyHoverCreateMessage(){
          const createMessageButton = document.getElementById('create-message')
          createMessageButton.style.color = "rgb(43, 158, 230)"
          createMessageButton.style.backgroundColor = "rgba(128, 128, 128, 0.373)"
        },

        removeHoverCreateMessage(){
          const createMessageButton = document.getElementById('create-message')
          createMessageButton.style.backgroundColor = "transparent"
          createMessageButton.style.color = "black"
        },

        // Method for exporting flow (uitility function)
        exportFlow(){
          exportData(this.chatFlowData)
        }
    },
    components: {
        NestedConditions,
        BotMessage,
        UserMessage,
        MenuTray,
        ModalsComponent,
        DropdownMenu
    },
    mounted() {
        var tooltipped = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltipped, {});

        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        var dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, {constrainWidth: false});

        var collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible, {});
    },
    computed: {
        ...mapState(['selectedObject']),
        ...mapState(['chatFlowData'])
    }

  };
  </script>
  
  <style scoped>
  .material-icons{
    cursor: pointer;
  }
  .message-gallery{
    border-radius: 30px;
  }

  .collapsible{
    margin: 10px 10px 0px 20px;
    border: none
  }
  .rerun-message{
    display: flex;
    justify-content: flex-start;
    justify-items: flex-start;
  }

  .next-message{
      display: flex;
      justify-content: flex-start;
      justify-items: flex-start;
  }

  .rerun-message i {
      color: rgb(244, 235, 235);
      margin: 30px 0px 0px 10px
  }

  .next-message i {
      color: rgb(244, 235, 235);
      margin: 30px 0px 0px 10px
  }
  .create-message{
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    margin: 30px 0px 0px 0px;
    transition: .2s ease-in
  };

  .create-message:hover{
    background-color: rgba(128, 128, 128, 0.732) !important;
    color: red !important
  };

  .add-new-message{
    margin-top: 30px;
  }
  .flow-title-area{
    display: flex;
    justify-content: space-between;
  }
  .toggle-click{
    cursor: pointer;
    transition: .15s ease-in;
    transform: rotate(180deg);
  }

  .toggle-click:hover{
    color: rgb(43, 158, 230);
  }

  .slide-container {
    overflow: hidden;
    max-height: 3000px; /* Set to a sufficiently large value */
  }

  .slide-enter-active, .slide-leave-active {
    transition: max-height .3s;
  }

  .slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    max-height: 0;
  }

  .conversation-block{
    transition: .2s all ease-in;
    border-radius: 10px;
    padding-bottom: 10px;
    margin: 10px 10px 0px 10px;
    padding-top: 5px;
    background-color: rgba(128, 128, 128, 0.534);
    /*border-top: wheat solid 5px*/
    
  }

  .conversation-block:hover{
      border-top: wheat solid 2px
  }
  

  </style>
  