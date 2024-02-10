const getContentOfSelectedOption = (conditions, option) =>{
    return conditions.find(condition => condition.selectedOption === option)?.content
}

export default getContentOfSelectedOption