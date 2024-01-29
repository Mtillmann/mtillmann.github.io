document.querySelectorAll('[data-params]').forEach(item => {
    const name = item.dataset.params?.match(/\[\[(\d+)/)?.[1];
    if (!name) { return false; }
    const node = document.createElement('code');
    node.innerText = `GET parameter: entry.${name}`;
    node.style.setProperty('margin', '1rem 0')
    item.querySelector('[role="heading"]')?.parentNode.appendChild(node);
})