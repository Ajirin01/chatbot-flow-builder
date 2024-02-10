const getMessageObjects = (data) => {
    let messageObjects = [];
    let seenIds = new Set();
    let seenTexts = new Set();


    const extractFromObject = (obj) => {
        if (obj && obj.id != undefined && !seenIds.has(obj.id) && obj.text != null && !obj.starts && !seenTexts.has(obj.text)) {
            messageObjects.push(obj);
            seenIds.add(obj.id);
            seenTexts.add(obj.text)
        }

        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                extractFromObject(obj[key]);
            } else if (Array.isArray(obj[key])) {
                obj[key].forEach((item) => extractFromObject(item));
            }
        }
    };

    extractFromObject(data);

    return messageObjects;
};

export default getMessageObjects;
