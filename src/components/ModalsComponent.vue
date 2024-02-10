<template>
    <div>
        <!-- Edit Conversation modal -->
      <div id="editConversationModal" class="modal">
        <div class="modal-content">
          <h4>Edit Text</h4>
          <EditConversationForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>
    
      <!-- Add options modal -->
      <div id="addOptionModal" class="modal">
        <div class="modal-content">
          <h4>Add Option</h4>
          <CreateOptionForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Edit options modal -->
      <div id="editOptionModal" class="modal">
        <div class="modal-content">
          <h4>Edit Options</h4>
          <EditOptionForm :objectOptions="selectedObject" />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Create condition modal -->
      <div id="createConditionModal" class="modal">
        <div class="modal-content">
          <h4>Add Conditions</h4>
          <CreateConditionForm :objectOptions="selectedObject" />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Edit condition modal -->
      <div id="editConditionModal" class="modal">
        <div class="modal-content">
          <h4>Edit Condition</h4>
          <EditConditionForm :chatData="chatFlowData" />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Assign next modal -->
      <div id="addAssignNextModal" class="modal">
        <div class="modal-content">
          <h4>Assign Next Message</h4>
          <AssignNextForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Assign rerun modal -->
      <div id="addAssignRerunModal" class="modal">
        <div class="modal-content">
          <h4>Assign Re-run conversation</h4>
          <AssignRerunForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Edit Assign Next modal -->
      <div id="editAssignNextModal" class="modal">
        <div class="modal-content">
          <h4>Edit Assign Next Conversation</h4>
          <EditAssignNextForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Edit Assign Next modal -->
      <div id="editAssignRerunModal" class="modal">
        <div class="modal-content">
          <h4>Edit Assign Rerun Conversation</h4>
          <EditAssignRerunForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Select option to delete modal modal -->
      <div id="selectOptionDeleteModal" class="modal">
        <div class="modal-content">
          <h4>Select Option to delete</h4>
          <SelectOptionDeleteForm/>
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Select condition to delete modal -->
      <div id="selectConditionDeleteModal" class="modal">
        <div class="modal-content">
          <h4>Select Condition to delete</h4>
          <SelectConditionDeleteForm/>
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>

      <!-- Select option to duplicate  modal -->
      <div id="selectOptionDuplicateModal" class="modal">
        <div class="modal-content">
          <h4>Select Option(s) to duplicate</h4>
          <SelectOptionDuplicateForm />
        </div>
        <div class="modal-footer">
          <span class="modal-close waves-effect waves-green btn-flat">close</span>
        </div>
      </div>


    </div>
  </template>
  
  <script>
  import M from "materialize-css"
//   import MenuTray from '@/components/MenuTray.vue';
  import CreateOptionForm from '@/components/forms/CreateOption.vue'
  import EditOptionForm from '@/components/forms/EditOption.vue'
  import CreateConditionForm from '@/components/forms/CreateCondition.vue'
  import EditConditionForm from '@/components/forms/EditCondition.vue'
  import EditConversationForm from '@/components/forms/EditConversation.vue'
  import AssignNextForm from '@/components/forms/AssignNext.vue'
  import AssignRerunForm from '@/components/forms/AssignRerun.vue'
  import EditAssignNextForm from '@/components/forms/EditAssignNext.vue'
  import EditAssignRerunForm from '@/components/forms/EditAssignRerun.vue'
  import SelectOptionDeleteForm from '@/components/forms/SelectOptionDelete.vue'
  import SelectConditionDeleteForm from '@/components/forms/SelectConditionDelete.vue'
  import SelectOptionDuplicateForm from '@/components/forms/SelectOptionDuplicate.vue'
  
  
  import { mapState } from 'vuex'

  
  

  export default {
    methods: {
        toggleMenuTray(content) {
            if (content != undefined) {
                content.showManu = !content.showManu;
            }
        },
    },
    components: {
        // MenuTray,
        CreateOptionForm,
        EditOptionForm,
        CreateConditionForm,
        EditConditionForm,
        EditConversationForm,
        AssignNextForm,
        AssignRerunForm,
        EditAssignNextForm,
        EditAssignRerunForm,
        SelectOptionDeleteForm,
        SelectConditionDeleteForm,
        SelectOptionDuplicateForm
    },
    mounted() {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {});
    },
    computed: {
        ...mapState(['selectedObject']),
        ...mapState(['chatFlowData'])
    }

  };
  </script>
  
  <style scoped>
  .modal{
    height: 400px
  }

  h4{
    margin-bottom: 50px
  }
  </style>
  