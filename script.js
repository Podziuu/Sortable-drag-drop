const draggableElements = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container')

draggableElements.forEach(element => {
    element.addEventListener('dragstart', () => {
        element.classList.add('dragging')
    })
    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const afterElement = getAfterElement(container, e.clientY);
        const draggingElement = document.querySelector('.dragging');
        if(afterElement == null) {
            container.appendChild(draggingElement);
        } else {
            container.insertBefore(draggingElement, afterElement);
        }


    })
})



function getAfterElement(container, y) {
    const draggingItems = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggingItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}