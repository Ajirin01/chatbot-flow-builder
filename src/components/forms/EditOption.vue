<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="options-container">
          <div
            v-for="option in options"
            :key="option"
            class="option-card"
            :class="{ 'selected': selectedOption === option }"
            @click="toggleOption(option)"
          >
            {{ option }}
          </div>
        </div>
  
        <div v-if="selectedOption">
          <label>Edit Option Text:</label>
          <input v-model="editedOptionText" type="text" />
        </div>
  
        <button class="waves-effect waves-light btn" type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    data() {
      return {
        selectedOption: null,
        editedOptionText: "",
      };
    },
    methods: {
      toggleOption(option) {
        if (this.selectedOption === option) {
          // If already selected, unselect it
          this.selectedOption = null;
          this.editedOptionText = "";
        } else {
          // If not selected, select it
          this.selectedOption = option;
          this.editedOptionText = option;
        }
      },
      handleSubmit() {
        // Handle the form submission logic here
        console.log("Selected option:", this.selectedOption);
        console.log("Edited option text:", this.editedOptionText);

        if (this.selectedOption) {
            // Update the text of the selected option
            const index = this.selectedObject.options.indexOf(this.selectedOption);
            if (index !== -1) {
                this.selectedObject.options[index] = this.editedOptionText;

                // Update other occurrences with the same initial text
                let condition = this.selectedObject.conditions.find((condition) => condition.selectedOption === this.selectedOption);

                if (condition) {
                    condition.selectedOption = this.editedOptionText;
                }
            }

            console.log(this.selectedObject)

            // Reset selectedOption and editedOptionText
            this.selectedOption = null;
            this.editedOptionText = "";
        }
    },


    },
    computed: {
      ...mapState(["selectedObject"]),
  
      options() {
        return this.selectedObject?.options;
      },
    },
  };
  </script>
  
  <style scoped>
  .options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
  