export const openDeleteDropdown = (id) => {
    openDropdown(id, 'delete')
  }

export const openEditDropdown = (id)=> {
    openDropdown(id, 'edit')
}

export const openAddDropdown = (id) =>  {
    openDropdown(id, 'add')
}

export const openDuplicateDropdown = (id) =>  {
    openDropdown(id, 'duplicate')
}

const openDropdown = (id, dropdownType) => {
    const dropdown = document.getElementById(`${dropdownType}-dropdown-button_${id}`);
    if (dropdown) {
        dropdown.click();
    }
};
  



