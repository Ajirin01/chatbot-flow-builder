export const toggleMenuTray = (content) => {
    if (content != undefined) {
        content.showManu = !content.showManu;
    }
}

export const toggleHideChatBlock = (content) => {
    if (content != undefined) {
        content.collapsed = !content.collapsed;

        const id = 'toggle_' + content.id;
        const toggle = document.getElementById(id);

        if (toggle) {
            // Toggle the rotation based on the collapsed state
            toggle.style.transform = content.collapsed ? "rotate(0deg)" : "rotate(180deg)";
            toggle.style.color = content.collapsed ? "rgb(43, 158, 230)" : "black";
        }
    }
}