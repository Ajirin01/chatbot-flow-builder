<template>
    <div>
        <div id="optionDeleteChip" class="chips chips-initial"></div>
        <div class="waves-effect waves-light btn" @click="handleUpdateAfterRemoveOptions()">submit</div>
    </div>
  </template>
  
  <script>
    // import findMessageByIdRecursive from '@/helper_functions/findMessageByIdRecursive';

  import M from "materialize-css"
  import { mapState } from 'vuex' 

  export default {
    props: {
        objectOptions: Object
    },
    methods: {
        handleUpdateAfterRemoveOptions() {
            console.log(this.selectedObject);
            var elem = document.getElementById('optionDeleteChip');
            let options = elem.M_Chips.chipsData;

            // Extract the tags from chipsData
            let newOptions = options.map(option => option.tag);

            // Update selectedObject options
            this.selectedObject.options = newOptions;

            // Remove conditions associated with removed options
            this.selectedObject.conditions = this.selectedObject.conditions.filter(
                condition => newOptions.includes(condition.selectedOption)
            );

            console.log(this.selectedObject)
        },
    },
    mounted(){
        var elems = document.querySelectorAll('.chips');
        // M.Chips.init(elems, {data: this.selectedObject.options});
        M.Chips.init(elems, {});
        console.log(this.selectedObject)
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
  