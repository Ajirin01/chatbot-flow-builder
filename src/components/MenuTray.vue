<template>
    <div class="tray-container">
        <div :class="{ 'menu-tray': true, 'indigo-text text-lighten-5': true, 'align-right': side === 'user', 'align-left': side === 'bot' }">
            <i class="material-icons" @click="editItem">edit</i>
            <i class="material-icons" @click="addItem">add</i>
            <i class="material-icons" @click="duplicateItem">content_copy</i>
            <i class="material-icons" @click="deleteItem">delete</i>
            <!-- <i class="material-icons" @click="moveItem">open_with</i> -->
        </div>
    </div>
</template>

<script>
    import M from "materialize-css"

    export default {
        props:{
            side: String
        },
        methods: {
            editItem() {
                // Handle edit logic
                this.$emit('edit');
            },
            addItem() {
                // Handle add logic
                this.$emit('add');
            },
            duplicateItem() {
                // Handle duplicate logic
                this.$emit('duplicate');
            },
            deleteItem() {
                // Handle delete logic
                this.$emit('delete');
            },
            moveItem() {
                // Handle move logic
                this.$emit('move');
            }
        },
        mounted() {
            var elems = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(elems, {});
        }
    };
</script>

<style scoped>
    .menu-tray {
        /*display: flex;*/
        margin-top: 5px
    }
    
    
    .menu-tray .material-icons {
        cursor: pointer;
        margin-right: 10px;
        transition: all .3s ease-in;
        padding: 3px;
        border-radius: 4px;
    }

    .menu-tray .material-icons:hover {
        color: rgb(43, 158, 230);
        background-color: rgba(240, 248, 255, 0.505);
    }

    .align-left {
        text-align: left;
    }
    
    .align-right {
        text-align: right;
    }

    .tray-container{
        padding-left: 35px
    }

</style>
  