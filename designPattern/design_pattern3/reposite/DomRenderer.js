const DomRenderer = (_=> {
  const Private = Symbol();
  const el = (tag, attr = {}) => Object.entries(attr).reduce((accum, v) => {
    typeof accum[v[0]] === 'function' ? accum[v[0]](v[1]) : (accum[v[0]] = v[1]);
    return accum;
  }, document.createElement(tag));
  return class {
    constructor(parent) {
      this[Private] = { parent };
    }
    render(date) {
      const { task, list } = date;
      const parent = document.querySelector(this[Private].parent);
      parent.innerHTML = '';
      parent.appendChild(el('h1', { innerHTML : task._title }));
      parent.appendChild(this._render(el('ul'), list));
    }

    _render(parent, list) {
      list.forEach(({task, list}) => {
        const li = parent.appendChild(el('li'));
        li.appendChild(el('div', { innerHTML: task._title }));
        li.appendChild(this._render(el('ul'), list));
      });
      return parent;
    };
  }
})();