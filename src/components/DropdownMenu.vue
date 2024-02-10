<template>
    <div class="dropdown-container">

        <!-- Edit Dropdown Area -->
        <div class="edit-dropdown-area">
          <a :id="'edit-dropdown-button_'+message.id" class="dropdown-trigger" href="#" :data-target="'edit-dropdown_'+message.id">Dropdown Trigger</a>

          <!-- Dropdown Structure -->
          <ul :id="'edit-dropdown_'+message.id" class="dropdown-content">
            <li @click="openModal(message, 'edit', 'Conversation')"><a href="#!"><i class="material-icons">forum</i>conversation</a></li>
            <li @click="openEditOptionModal(message)"><a href="#!"><i class="material-icons">list</i>options</a></li>
            <li @click="openModal(message, 'edit', 'Condition')"><a href="#!"><i class="material-icons">settings</i>condition</a></li>
            <li class="divider" tabindex="-1"></li>
            <li @click="openModal(message, 'edit', 'AssignNext')"><a href="#!"><i class="material-icons">arrow_forward</i>next</a></li>
            <li @click="openModal(message, 'edit', 'AssignRerun')"><a href="#!"><i class="material-icons">replay</i>re-run</a></li>
          </ul>
        </div>

        <!-- Add Dropdown Area -->
        <div class="add-dropdown-area">
          <a :id="'add-dropdown-button_'+message.id" class="dropdown-trigger" href="#" :data-target="'add-dropdown_'+message.id">Dropdown Trigger</a>

          <!-- Dropdown Structure -->
          <ul :id="'add-dropdown_'+message.id" class="dropdown-content">
            <!-- <li><a href="#!"><i class="material-icons">forum</i>conversation</a></li> -->
            <li @click="openModal(message, 'add', 'Option')"><a href="#!"><i class="material-icons">list</i>options</a></li>
            <li @click="openModal(message, 'create', 'Condition')"><a href="#!"><i class="material-icons">settings</i>condition</a></li>
            <li class="divider" tabindex="-1"></li>
            <li @click="openModal(message, 'add', 'AssignNext')"><a href="#!"><i class="material-icons">arrow_forward</i>next</a></li>
            <li @click="openModal(message, 'add', 'AssignRerun')"><a href="#!"><i class="material-icons">replay</i>re-run</a></li>
          </ul>
        </div>

        <!-- Duplicate Dropdown Area -->
        <div class="duplicate-dropdown-area">
            <a :id="'duplicate-dropdown-button_'+message.id" class="dropdown-trigger" href="#" :data-target="'duplicate-dropdown_'+message.id">Dropdown Trigger</a>
        
            <!-- Dropdown Structure -->
            <ul :id="'duplicate-dropdown_'+message.id" class="dropdown-content">
              <li @click="duplicateConversation(message)"><a href="#!"><i class="material-icons">forum</i>conversation</a></li>
              <li @click="openModal(message, 'select', 'OptionDuplicate')"><a href="#!"><i class="material-icons">list</i>options</a></li>
              <!-- <li @click="openModal(message, 'duplicate', 'Condition')"><a href="#!"><i class="material-icons">settings</i>condition</a></li> -->
            </ul>
        </div>

        <!-- Delete Dropdown Area -->
        <div class="delete-dropdown-area">
          <a :id="'delete-dropdown-button_'+message.id" class="dropdown-trigger" href="#" :data-target="'delete-dropdown_'+message.id">Dropdown Trigger</a>

          <!-- Dropdown Structure -->
          <ul :id="'delete-dropdown_'+message.id" class="dropdown-content">
            <li @click="deleteConversation(message)"><a href="#!"><i class="material-icons">forum</i>conversation</a></li>
            <li @click="openDeleteOptionModal(message)"><a href="#!"><i class="material-icons">list</i>options</a></li>
            <li @click="openModal(message, 'select', 'ConditionDelete')"><a href="#!"><i class="material-icons">settings</i>condition</a></li>
            <li class="divider" tabindex="-1"></li>
            <li @click="deleteNext(message)"><a href="#!"><i class="material-icons">arrow_forward</i>next</a></li>
            <li @click="deleteRerun(message)"><a href="#!"><i class="material-icons">replay</i>re-run</a></li>
          </ul>
        </div>

        

        
    </div>
  </template>
  
  <script>
  import M from "materialize-css"
  import { mapMutations, mapState } from "vuex";
  import findMessageByIdRecursive from '@/helper_functions/findMessageByIdRecursive.js'
  
  export default {
    components: {
    },
    props: {
      message: Object,

    },
    methods: {
        ...mapMutations(['setSelectedObject']),

        findMessageByIdRecursive,

        openEditOptionModal(selectedObject){
            this.setSelectedObject(selectedObject)

            var elem = document.getElementById('editOptionModal');
            var instance = M.Modal.getInstance(elem, {});
            instance.open();
        },

        openDeleteOptionModal(selectedObject){
            this.setSelectedObject(selectedObject)

            var elem = document.getElementById('selectOptionDeleteModal');
            var instance = M.Modal.getInstance(elem, {});
            instance.open();

           
            var chip = document.getElementById('optionDeleteChip');
            var chipInstance = M.Chips.getInstance(chip);

            selectedObject.options.forEach(option => {
                chipInstance.addChip({tag: option});
            });
        },

        openModal(selectedObject, operation, type){
            this.setSelectedObject(selectedObject)

            var elem = document.getElementById(`${operation}${type}Modal`);
            var instance = M.Modal.getInstance(elem, {});
            instance.open();
        },

        deleteNext(selectedObject){
            this.setSelectedObject(selectedObject)
            this.selectedObject.next = {}
            console.log(this.selectedObject)
        },
        deleteRerun(selectedObject){
            this.setSelectedObject(selectedObject)
            this.selectedObject.next = null
            console.log(this.selectedObject)
        },

        duplicateConversation(message){
          this.chatFlowData.messages.push(message)
        },

        deleteConversation(message) {
          this.setSelectedObject(message)

          // Find the message object and delete it
          if(message.starts){
            // Check if the message has conditions
            if (message.conditions) {
              message.conditions.forEach(condition => {
                this.chatFlowData.messages.push(condition.content);
              });
            }

            // Check if the message has a next message
            if (message.next) {
              this.chatFlowData.messages.push(message.next);
            }

            message.conditions = []
            message.options = []
            message.next = {}
            message.rerun = null
          }else if(this.chatFlowData.messages){
            // Filter out the message with the specified ID
            const filteredMessages = this.chatFlowData.messages.filter(_message => _message.id != message.id);

            // Update this.chatFlowData.messages with the filtered result
            this.chatFlowData.messages = filteredMessages;

            // Optionally, you can log the filtered messages
            console.log(filteredMessages);
          }else{
            this.chatFlowData.messages.push(message);

            // Assuming getMessage and message are already defined
            const getMessage = findMessageByIdRecursive(this.chatFlowData.flow, message.parentId);

            // Remove conditions where condition.content.id === message.id
            if (getMessage) {
                getMessage.conditions = getMessage.conditions.filter(condition => condition.content.id !== message.id);
            }
          }
        }

    },
    mounted() {
        var tooltipped = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltipped, {});

        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {});

        var dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, { constrainWidth: false });
    },
    computed: {
        ...mapState(['selectedObject']),
        ...mapState(['chatFlowData'])
    }
  };
  </script>

  <style>
  .dropdown-container {
    display: flex;
    justify-items: left;
    justify-content: flex-start;
  }

  .dropdown-trigger{
    opacity: 0;
  }

  .delete-dropdown-area{
    margin-left: -76px;
  }

  .add-dropdown-area{
    margin-left: -76px;
  }

  .duplicate-dropdown-area{
    margin-left: -76px;
  }

  .edit-dropdown-area{
    margin-left: 35px;
  }
  
</style>
  