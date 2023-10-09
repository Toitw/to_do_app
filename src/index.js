
function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello webo';

    return element;
}

document.body.appendChild(component());
