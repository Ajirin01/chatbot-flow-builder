<template>
    <div>
      <div
        v-for="(node, index) in nodes"
        :key="index"
        class="chat-node"
        :style="{ top: node.top + 'px', left: node.left + 'px' }"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragend="onDragEnd"
        ref="nodeRef"
      >
        {{ node.text }}
      </div>
      <div class="flow-connections">
        <div v-for="(connection, index) in connections" :key="index" class="flow-connection" :style="getConnectorStyles(connection)">
          <div class="connector"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const nodes = ref([
        { id: 1, text: 'Start', left: 50, top: 50 },
        { id: 2, text: 'Message 1', left: 200, top: 100 },
        { id: 3, text: 'Message 2', left: 200, top: 200 },
      ]);
  
      const connections = ref([
        { from: 0, to: 1 },
        { from: 0, to: 2 },
      ]);
  
      const nodeRefs = ref([]);
  
      const onDragStart = (index) => {
        // Additional logic when dragging starts
        console.log('Dragging started for index:', index);
      };
  
      const onDragEnd = (event) => {
        // Additional logic when dragging ends
        console.log('Dragging ended');
  
        // Find the dragged node based on the event target or other criteria
        const draggedNodeIndex = nodeRefs.value.findIndex((ref) => ref.contains(event.target));
  
        if (draggedNodeIndex !== -1) {
          // Update the position of the dragged node
          const draggedNode = nodes.value[draggedNodeIndex];
          draggedNode.left = event.clientX - draggedNode.width / 2;
          draggedNode.top = event.clientY - draggedNode.height / 2;
        }
      };
  
      const getConnectorStyles = (connection) => {
        const fromNode = nodes.value[connection.from];
        const toNode = nodes.value[connection.to];
  
        const deltaX = toNode.left - fromNode.left;
        const deltaY = toNode.top - fromNode.top;
  
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
        return {
          width: length + 'px',
          transform: `rotate(${angle}deg)`,
          top: fromNode.top + 15 + 'px',
          left: fromNode.left + 15 + 'px',
        };
      };
  
      return {
        nodes,
        connections,
        onDragStart,
        onDragEnd,
        getConnectorStyles,
        nodeRefs,
      };
    },
    mounted() {
      // Populate the nodeRefs array with refs to the nodes
      this.nodeRefs = this.nodes.map(() => ref(null));
    },
  };
  </script>
  
  <style>
  /* Add your styles if needed */
  .chat-node {
    position: absolute;
    background-color: #4caf50;
    padding: 10px;
    cursor: grab;
  }
  
  .flow-connections {
    position: absolute;
    pointer-events: none;
  }
  
  .flow-connection {
    position: absolute;
    background-color: #2196f3;
    height: 2px;
    transform-origin: left;
  }
  
  .connector {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #2196f3;
    border-radius: 50%;
    top: -4px;
    left: -5px;
    transform: translateX(-50%);
  }
  </style>
  