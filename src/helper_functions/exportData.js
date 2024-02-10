const exportFlow = (data) => {
    // Implement your export logic here
    const confirmExport = confirm('You are about to export this data, do you want to proceed?.');

    if(confirmExport){
        // Retrieve chatFlowData
        const chatFlowData = data;

        // Convert chatFlowData to JSON
        const jsonData = JSON.stringify(chatFlowData);

        // Create a Blob containing the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        // Get the current timestamp
        const timestamp = new Date().getTime();

        // Append the timestamp to the file name
        const fileName = `chatFlowData_${timestamp}.json`;

        // Set the file name with timestamp to the download attribute
        link.download = fileName;

        // Trigger the download
        link.click();
    }
}

export default exportFlow