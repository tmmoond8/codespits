const el = (tag, attr = {}) => Object.entries(attr).reduce((accum, v) => {
  typeof accum[v[0]] === 'function' ? accum[v[0]](v[1]) : (accum[v[0]] = v[1]);
  return accum;
}, document.createElement(tag));

const DomVisitor = class extends Visitor {
  constructor(root) {
    super();
    this._root = root;
  }
  folder(task, subTaskTrigger) {
    this._subTaskTrigger  = subTaskTrigger;
    const parent = document.querySelector(this._root);
    parent.appendChild(el('h1', { innerHTML: task._title }));
    return parent;
  }

  parent(parent, task) {
    task._list.sort((a, b) => a._title < b._title ? -1 : 1)
    return parent.appendChild(el('ul'));
  }

  task(parent, task) {
    const li = parent.appendChild(el('li'));
    const label = el('label');
    li.appendChild(label);
    const checkbox = el('input', { type: 'checkbox', checked: task.isComplete()});
    checkbox.addEventListener('click', e => {
      this._checkHandler(task, e);
    });
    label.append(checkbox, task._title);
    return li;
  }

  _checkHandler(task, e) {
    task.toggle();
    task.toggleList();
    const subtask = e.target.parentNode.nextSibling;
    subtask.innerHTML = '';
    this._subTaskTrigger(subtask, task._list);
  }
}