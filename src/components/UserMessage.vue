<template>
    <!-- user chat area -->
    <div class="message-text user-text" @click="handleComponentClick()"  @keydown="handleKeyDownOnComponent()">
        <!-- <div class="material-icons user-icon white-text">person_pin</div> -->
        <div class="user-text-content">
        <span class="sender-shoot-out"></span> <!-- Move sender-shoot-out inside the content area -->
        {{ text }}
        </div>
    </div><br>
</template>

<script>
    export default{
        props: {
            text: String
        },
        emits: ['click', 'keyDownPressed'],
        methods: {
            handleComponentClick() {
                this.$emit('click')
            },
            handleKeyDownOnComponent(){
              console.log("Keydown")
              this.$emit('keyDownPressed')
            }
        }
    };
</script>

<style scoped>
.user-text {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end; /* Align user text to the right */
    margin-right: 8px;
  }
  
  .user-text-content {
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #dcf8c6; /* Background color for bot messages */
    border-radius: 12px 0px 12px 12px;
    padding: 8px;
    min-width: 50px;
    max-width: 250px;
    position: relative;
    box-shadow: 2px 2px 2px rgba(58, 58, 58, 0.701);
  }
  
  .sender-shoot-out {
    position: absolute;
    top: 0px;
    right: -6px; /* Adjust the distance from the right side */
    width: 10px;
    height: 15px;
    border-radius: 0 0 10px 0px; /* Adjust border-radius as needed */
    background-color: #dcf8c6; /* Color of the shootout */
  }
  
  .message-text{
    cursor: pointer;
  }
</style>