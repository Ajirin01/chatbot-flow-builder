<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="input-field col s12">
          <textarea id="textarea1" v-model="text" class="materialize-textarea"></textarea>
          <!-- <label for="textarea1">Type message here</label> -->
        </div>
        <button class="waves-effect waves-light btn" type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import M from "materialize-css";
  import { mapState } from "vuex";
  import getMessageObjects from "@/helper_functions/getMessageObjects.js";
  // import { v4 as uuidv4 } from 'uuid';
  
  export default {
    props: {
      objectOptions: Object,
    },
    data() {
      return {
        selectedOption: null,
        selectedMessageObject: null,
        textValue: null, // Rename 'text' to 'textValue'
      };
    },
    methods: {
      handleSubmit() {
          // Handle the form submission logic here
          console.log(this.textValue)
          this.selectedObject.text = this.textValue
      },
    },
    computed: {
      ...mapState(["chatFlowData"]),
      ...mapState(["selectedObject"]),
      messageObjects() {
        return getMessageObjects(this.chatFlowData.flow);
      },

      text: {
        get() {
          return this.selectedObject?.text;
        },
        set(value) {
          // Optionally handle the setter logic if needed
          this.textValue = value
        },
      },
    },
    mounted() {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, {});
    },
  };
  </script>
  