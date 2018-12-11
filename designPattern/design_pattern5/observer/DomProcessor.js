const el = (tag, attr = {}) => Object.entries(attr).reduce((accum, v) => {
  typeof accum[v[0]] === 'function' ? accum[v[0]](v[1]) : (accum[v[0]] = v[1]);
  return accum;
}, document.createElement(tag));

const DomProcessor = class extends Renderer.Processor {
  constructor(parent) {
    super(parent);
    this._parent = parent;
  }
  folder({_title: title}) {
    const parent = document.querySelector(this._parent);
    parent.innerHTML = '';
    parent.appendChild(el('h1', { innerHTML: title }));
    this.prop.parent = parent;
  }

  parent(task) {
    const ul = el('ul');
    this.prop.parent.appendChild(ul);
    this.prop.parent = ul;
    this.prop.ptask = task;
  }

  task(task, inner) {
    const parent = this.prop.parent;
    const li = this.prop.parent.appendChild(el('li'));
    li.appendChild(el('div', { 
      innerHTML: this.taskRender(task)
    }));
    this.prop.parent = li;
    inner();
    this.prop.parent = parent;
  }
}