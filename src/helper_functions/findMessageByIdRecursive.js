const findMessageByIdRecursive = (data, messageId) => {
    console.log(data)
    if(data?.id === messageId){
        return data
    }else if(data.conditions){
        for (const message of data.conditions) {
            if (message?.id === messageId) {
            // If id is parent id
                return message;
            } else if (message.conditions && message.conditions.length > 0) {
                // If conditions are present 
                const nestedResult = findMessageByIdRecursive(message.conditions, messageId);
                if (nestedResult) {
                    return nestedResult;
                }
            } else if (message.content) {
                if (message.content.id === messageId) {// if ID it's found in the content object of the parent instead i.e message > content
                    return message.content;
                } else if (message.content && (message.content.id !== messageId) && message.content.conditions.length > 0) {// if ID it's found in the conditions object of content of the parent instead i.e message > content > conditions
                    const nestedResult = findMessageByIdRecursive(message.content, messageId);
                    if (nestedResult) {
                        return nestedResult;
                    }
                    
                } else if (message.content.next && message.content.next.conditions) {// if ID it's found in the conditions object of next of content of the parent instead i.e message > content > next > conditions
                    // If conditions are present in the next property of content, recursively search within them
                    if (message.content.next.id === messageId) {
                        return message.content.next;
                    } else if (message.content.next.conditions && message.content.next.conditions.length > 0) {
                        const nestedResult = findMessageByIdRecursive(message.content.next.conditions, messageId);
                        if (nestedResult) {
                            return nestedResult;
                        }
                    }
                }
            }
        }
        return null;
    }else if(data.next){
        for (const message of data.next) {
            if (message.id === messageId) {
            // If id is parent id
            return message;
            } else if (message.conditions && message.conditions.length > 0) {
            // If conditions are present 
            const nestedResult = findMessageByIdRecursive(message.conditions, messageId);
            if (nestedResult) {
                return nestedResult;
            }
            } else if (message.content) {
            if (message.content.id === messageId) {// if ID it's found in the content object of the parent instead i.e message > content
                return message.content;
            } else if (message.content.id !== messageId && message.content.conditions.length > 0) {// if ID it's found in the conditions object of content of the parent instead i.e message > content > conditions
                const nestedResult = findMessageByIdRecursive(message.content.conditions, messageId);
                if (nestedResult) {
                return nestedResult;
                }
            } else if (message.content.next && message.content.next.conditions) {// if ID it's found in the conditions object of next of content of the parent instead i.e message > content > next > conditions
                // If conditions are present in the next property of content, recursively search within them
                if (message.content.next.id === messageId) {
                return message.content.next;
                } else if (message.content.next.conditions && message.content.next.conditions.length > 0) {
                const nestedResult = findMessageByIdRecursive(message.content.next.conditions, messageId);
                if (nestedResult) {
                    return nestedResult;
                }
                }
            }
            }
        }
        return null;
    }
    
    
}

export default findMessageByIdRecursive;