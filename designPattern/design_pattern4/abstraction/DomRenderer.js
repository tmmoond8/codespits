const el = (tag, attr = {}) => Object.entries(attr).reduce((accum, v) => {
  typeof accum[v[0]] === 'function' ? accum[v[0]](v[1]) : (accum[v[0]] = v[1]);
  return accum;
}, document.createElement(tag));

const DomRenderer = class extends Renderer {
  constructor(root) {
    super();
    this._root = root;
  }

  _folder(task) {
    const parent = document.querySelector(this._root);
    parent.appendChild(el('h1', { innerHTML: task._title }));
    return parent;
  }

  _parent(parent) {
    return parent.appendChild(el('ul'));
  }

  _task(parent, task) {
    const li = parent.appendChild(el('li'));
    li.appendChild(el('div', { innerHTML: task._title}));
    return li;
  }
}