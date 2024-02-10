<template>
    <div class="message-text bot-text">
        <div><img class="bot-logo" alt="App logo" src="../assets/bot.png" width="30" height="30"></div>
        <div class="bot-text-content">
          <span class="receiver-shoot-out"></span> <!-- Move shoot-out inside the content area -->
          {{text}}
        </div>

    </div>
</template>

<script>
    export default{
        props: {
            text: String
        }
    };
</script>

<style>
  .bot-text-content {
    white-space: pre-wrap;
    min-width: 50px;
    max-width: 250px;
    word-wrap: break-word;
    margin-left: 10px;
    background-color: #e0e0e0; /* Background color for user messages */
    border-radius: 0px 12px 12px 12px;
    padding: 8px;
    position: relative; /* Set position relative for positioning the shootout */
    box-shadow: 2px 2px 2px rgba(58, 58, 58, 0.701);
  }
  
  .receiver-shoot-out {
    position: absolute;
    top: 0px;
    left: -5px; /* Adjust the distance from the right side */
    width: 10px;
    height: 15px;
    border-radius: 0 0 0 10px; /* Adjust border-radius as needed */
    background-color: #e0e0e0; /* Color of the shootout */
  }
  
  .user-icon {
    margin-top: 5px;
  }
  
  .bot-text {
    display: flex;
    flex-direction: row;
    justify-content: left;
    justify-self: left;
    margin-top: 10px;
    margin-left: 10px
  }

  .message-text{
    cursor: pointer;
  }
</style>