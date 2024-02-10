<template>
    <div>
        <div v-if="conditions.text != null">
            <!-- bot output -->
            <BotMessage :text="conditions.text" @click="toggleBotMenuTray(conditions)" />

            <menu-tray
                :id="'toggle_bot_menu_'+conditions.id"
                style="display: none;"
                @edit="openEditDropdown(conditions.id)"
                @add="openAddDropdown(conditions.id)"
                @duplicate="openDuplicateDropdown(conditions.id)"
                @delete="openDeleteDropdown(conditions.id)"
                @createCondition="handleCreateCondition(conditions)"
                :side="'bot'"
            />

            <!-- Dropdown Menu comes here -->
            <DropdownMenu :message="conditions" />
        </div>
        
        <ul class="conversation-block condition" v-for="option in conditions.options" :key="option">
            <li class="condition-header" style="margin-right: 30px;">
                <!-- <b class="toggle-click" @click="toggleHideChatBlock(getContentOfSelectedOption(conditions.conditions, option))">User: </b><span>{{ option }}</span> -->
                
                <div>
                    <!-- user output -->
                    <div style="display: flex; justify-content: right; margin-top: 10px">
                        <UserMessage :text="option" />
                        <!-- <UserMessage :text="option" @click="toggleMenuTray(getContentOfSelectedOption(conditions.conditions, option))" /> -->
                        <div v-if="getContentOfSelectedOption(conditions.conditions, option)" class="right">
                            <b 
                                :id="'toggle_'+getContentOfSelectedOption(conditions.conditions, option).id" 
                                class="toggle-click tooltipped material-icons" 
                                data-position="bottom" data-tooltip="toggle children" 
                                @click="toggleHideChatBlock(getContentOfSelectedOption(conditions.conditions, option))"
                            >
                                person_pin
                            </b>
                        </div>
                    </div>

                    <!-- <menu-tray
                        v-if="getContentOfSelectedOption(conditions.conditions, option) && getContentOfSelectedOption(conditions.conditions, option).showManu"
                        @edit="handleEdit"
                        @add="handleAdd"
                        @duplicate="handleDuplicate"
                        @delete="handleDelete"
                        @move="handleMove"
                        :side="'user'"
                    /> -->
                </div>

                <transition name="slide">
                    <div v-if="getContentOfSelectedOption(conditions.conditions, option)?.collapsed" class="slide-container">
                        <ul class="conversation-block condition" v-for="condition in conditions.conditions.find(condition => condition.selectedOption === option)" :key="condition">
                            <li>
                                <NestedConditions v-if="condition.conditions" :conditions="condition" />
                            </li>
                        </ul>
                    </div>
                </transition>
            </li>
        </ul>

        <div v-if="conditions.next && conditions.next.text != null">
            <!-- <b>Bot: </b>{{ conditions.next.text }} -->
            <div class="next-message">
                <BotMessage :text="conditions.next.text" @click="toggleBotMenuTray(conditions.next)" />
                <i class="material-icons">arrow_forward</i>
            </div>
            

            <menu-tray
                :id="'toggle_bot_menu_'+conditions.next.id"
                style="display: none;"
                @edit="openEditDropdown(conditions.next.id)"
                @add="openAddDropdown(conditions.next.id)"
                @duplicate="openDuplicateDropdown(conditions.next)"
                @delete="openDeleteDropdown(conditions.next.id)"
                @createCondition="handleCreateCondition(conditions.next)"
                :side="'bot'"
            />

            <!-- Dropdown Menu comes here -->
            <DropdownMenu :message="conditions.next" />

            <ul class="conversation-block condition" v-for="option in conditions.next.options" :key="option.id">
                <li class="condition-header">
                    <b class="toggle-click" @click="toggleHideChatBlock(getContentOfSelectedOption(conditions.next, option))">User: </b><span>{{ option }}</span>
                    
                    <transition name="slide">
                        <div v-if="getContentOfSelectedOption(conditions.next.conditions, option)?.collapsed" class="slide-container">
                            <ul class="conversation-block" v-for="condition in conditions.next.conditions.find(condition => condition.selectedOption === option)" :key="condition.id">
                                <li>
                                    <NestedConditions v-if="condition.conditions" :conditions="condition" />
                                </li>
                            </ul>
                        </div>
                    </transition>
                </li>
            </ul>
        </div>

        <div class="rerun-message" v-if="conditions.rerun != null">
            <BotMessage :text="findMessageByIdRecursive(chatFlowData.flow, conditions.rerun)?.text" />
            <i class="material-icons">replay</i>
        </div>

        <!-- modal component displayed here -->
        <ModalsComponent></ModalsComponent>
    </div>
</template>

<script>
//   import NestedConditions from "@/components/NestedConditions.vue";
import BotMessage from "@/components/BotMessage.vue";
import UserMessage from "@/components/UserMessage.vue";
import M from "materialize-css"
import MenuTray from '@/components/MenuTray.vue';

import findMessageByIdRecursive from '@/helper_functions/findMessageByIdRecursive.js'//utility function
import { openAddDropdown, openDeleteDropdown, openEditDropdown, openDuplicateDropdown } from '@/helper_functions/openDropdownHandlers.js'//utility functions
import { toggleHideChatBlock, toggleMenuTray } from '@/helper_functions/toggleContents.js'//utility functions
import getContentOfSelectedOption  from '@/helper_functions/getContentOfSelectedOption.js'//utility function

import DropdownMenu from '@/components/DropdownMenu.vue'
import ModalsComponent from "@/components/ModalsComponent.vue";

import { mapState, mapMutations } from 'vuex';  

export default {
    props: {
        conditions: {
            type: [Object, Array, String]
        }
    },
    computed: {
        ...mapState(['chatFlowData']),
        ...mapState(['selectedObject'])
    },
    components: {
        BotMessage,
        UserMessage,
        MenuTray,
        ModalsComponent,
        DropdownMenu
    },
    methods: {
        ...mapMutations(['setSelectedObject']),
        findMessageByIdRecursive,
        openEditDropdown,
        openAddDropdown,
        openDeleteDropdown,
        openDuplicateDropdown,
        toggleMenuTray,
        toggleHideChatBlock,
        getContentOfSelectedOption,

        toggleBotMenuTray(conditions) {
            if (conditions != undefined) {
                const id = 'toggle_bot_menu_' + conditions.id;
                const toggle = document.getElementById(id);

                if (toggle) {
                    // Toggle the visibility based on the current display property
                    toggle.style.display = toggle.style.display === "none" ? "block" : "none";
                }
            }
        },

        handleCreateCondition(selectedObject) {
            this.setSelectedObject(selectedObject)

            var elem = document.getElementById('createConditionModal');
            var instance = M.Modal.getInstance(elem, {});
            instance.open();
        },
    },
    mounted() {
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {});
    }
};
</script>

<style scoped>
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
.condition {
    margin-bottom: 10px;
    margin-left: 15px
}

.toggle-click{
    cursor: pointer;
    transition: .15s ease-in;
    transform: rotate(180deg);
}

.toggle-click:hover{
    color: rgb(43, 158, 230);
}

ul{
    transition: .2s ease-in-out;
}

.slide-container {
    overflow: hidden;
    max-height: 1000px; /* Set to a sufficiently large value */
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
    padding-top: 10px;
    background-color: rgba(128, 128, 128, 0.534);
    /*border-top: wheat solid 5px*/
    
  }

.conversation-block:hover{
    border-top: wheat solid 2px
}
</style>
