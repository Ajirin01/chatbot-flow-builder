const findMessageByStartRecursive = (data) => {
    for (const message of data) {
        if (message.starts) {
        // If id is parent id
        return message;
        } else if (message.conditions && message.conditions.length > 0) {
        // If conditions are present 
        const nestedResult = this.findMessageByStartRecursive(message.conditions);
        if (nestedResult) {
            return nestedResult;
        }
        } else if (message.content) {
        if (message.content.starts) {// if ID it's found in the content object of the parent instead i.e message > content
            return message.content;
        } else if (!message.content.starts && message.content.conditions.length > 0) {// if ID it's found in the conditions object of content of the parent instead i.e message > content > conditions
            const nestedResult = this.findMessageByStartRecursive(message.content.conditions);
            if (nestedResult) {
            return nestedResult;
            }
        } else if (message.content.next && message.content.next.conditions) {// if ID it's found in the conditions object of next of content of the parent instead i.e message > content > next > conditions
            // If conditions are present in the next property of content, recursively search within them
            if (message.content.next.starts) {
            return message.content.next;
            } else if (message.content.next.conditions && message.content.next.conditions.length > 0) {
            const nestedResult = this.findMessageByStartRecursive(message.content.next.conditions);
            if (nestedResult) {
                return nestedResult;
            }
            }
        }
        }
    }
    return null;
}

export default findMessageByStartRecursive