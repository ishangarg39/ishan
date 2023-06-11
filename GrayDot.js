const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const button = document.querySelector('.button');

// Store the original state of containers
let originalState1 = [];
let originalState2 = [];

const firstContainer = document.querySelector('.container:first-child');
firstContainer.childNodes.forEach(node => {
    if (node.classList && node.classList.contains('draggable')) {
        originalState1.push(node.cloneNode(true));
    }
});

const secondContainer = document.querySelector('.container:last-child');
secondContainer.childNodes.forEach(node => {
    if (node.classList && node.classList.contains('draggable')) {
        originalState2.push(node.cloneNode(true));
    }
});

button.addEventListener('click', () => {
    console.log('Reset button clicked');

    containers.forEach(container => {
        container.innerHTML = '';
    });

    originalState1.forEach(item => {
        firstContainer.appendChild(item.cloneNode(true));
    });

    originalState2.forEach(item => {
        secondContainer.appendChild(item.cloneNode(true));
    });

    setTimeout(() => {
        initializeDragging();
    }, 10);
});

function initializeDragging() {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
          alert("success")
            draggable.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (draggable !== null) {
                if (afterElement === null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            }
        });
    });
}

initializeDragging();

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
