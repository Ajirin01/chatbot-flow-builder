<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="options-container">
        <div
          v-for="option in options"
          :key="option"
          class="option-card"
          :class="{ 'selected': selectedOption.includes(option) }"
          @click="toggleOption(option)"
        >
          {{ option }}
        </div>
      </div>

      <button class="waves-effect waves-light btn" type="submit">Duplicate</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedOption: [],
    };
  },
  methods: {
    toggleOption(option) {
      if (this.selectedOption.includes(option)) {
        // If already selected, remove it
        this.selectedOption = this.selectedOption.filter((item) => item !== option);
      } else {
        // If not selected, add it
        this.selectedOption.push(option);
      }
    },
    handleSubmit() {
      // Handle the form submission logic here
      console.log("Selected options:", this.selectedOption);

      // Duplicate selected options with "copy" suffix
      const duplicatedOptions = this.selectedOption.map((option) => `${option} copy`);
      
      // Add duplicated options to the selectedObject
      this.selectedObject.options = [...this.selectedObject.options, ...duplicatedOptions];

      // Reset selectedOption
      this.selectedOption = [];
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
