<template>
    <div>
      <div class="chips chips-placeholder"></div>
      <div class="waves-effect waves-light btn" @click="handleAddOptions()">submit</div>
    </div>
  </template>
  
  <script>
    // import findMessageByIdRecursive from '@/helper_functions/findMessageByIdRecursive';

  import M from "materialize-css"
  import { mapState } from 'vuex' 

  export default {
    methods: {
        handleAddOptions(){
            // console.log("SelectedObject from option form", this.selectedObject)
            var elem = document.querySelectorAll('.chips');
            let options = elem[0].M_Chips.chipsData

            let selectedObjectOptions = this.selectedObject.options

            options.forEach(option => {
                selectedObjectOptions.push(option.tag)
            });

            console.log(options)
        }
    },
    mounted(){
      var elems = document.querySelectorAll('.chips');
      M.Chips.init(elems, {});
    },
    computed:{
        ...mapState(['selectedObject']),
        ...mapState(['chatFlowData'])
    }
  };
  </script>
  
  <style scoped>
  /* Component-specific styles here */
  </style>
  