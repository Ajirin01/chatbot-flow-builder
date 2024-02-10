// Convert Nested Structure to Flat Structure
const convertToFlatStructure = (data) => {
    let flatStructure = {
        messages: [],
        conditions: []
    };

    data.messages.forEach(message => {
        // Add message to flat structure
        flatStructure.messages.push({
            id: message.id,
            text: message.text,
            options: message.options,
            ends: message.ends,
            starts: message.starts,
            next: message.next,
            rerun: message.rerun,
            collapsed: message.collapsed,
            showMenu: message.showMenu,
            parent: message.parent
        });

        // Add conditions to flat structure
        if (message.conditions) {
            message.conditions.forEach(condition => {
                // If content is an object, assume it's already in the correct format
                if (typeof condition.content === 'object') {
                    flatStructure.conditions.push({
                        parent: message.id,
                        selectedOption: condition.selectedOption,
                        content: condition.content.id
                    });
                } else {
                    // If content is an ID, find the corresponding message and add it to conditions
                    let contentMessage = data.messages.find(msg => msg.id === condition.content);
                    if (contentMessage) {
                        flatStructure.conditions.push({
                            parent: message.id,
                            selectedOption: condition.selectedOption,
                            content: contentMessage
                        });
                    }
                }
            });
        }
    });

    return flatStructure;
}

// Convert Flat Structure to Nested Structure
const convertToNestedStructure = (flatData) => {
    let nestedData = {
        messages: [],
        conditions: []
    };

    flatData.messages.forEach(message => {
        // Add message to nested structure
        let nestedMessage = {
            id: message.id,
            text: message.text,
            options: message.options,
            ends: message.ends,
            starts: message.starts,
            next: message.next,
            rerun: message.rerun,
            collapsed: message.collapsed,
            showMenu: message.showMenu,
            conditions: [],
            parent: message.parent
        };

        // Add conditions to nested message
        flatData.conditions.forEach(condition => {
            if (condition.parent === message.id) {
                // If content is an object, assume it's already in the correct format
                if (typeof condition.content === 'object') {
                    nestedMessage.conditions.push({
                        selectedOption: condition.selectedOption,
                        content: condition.content
                    });
                } else {
                    // If content is a message ID, find the corresponding message and add it to conditions
                    let contentMessage = flatData.messages.find(msg => msg.id === condition.content);
                    if (contentMessage) {
                        nestedMessage.conditions.push({
                            selectedOption: condition.selectedOption,
                            content: contentMessage
                        });
                    }
                }
            }
        });

        nestedData.messages.push(nestedMessage);
    });

    return nestedData;
}

export { convertToFlatStructure, convertToNestedStructure };
