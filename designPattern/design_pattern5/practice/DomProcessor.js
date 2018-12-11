const DomProcessor = class extends Renderer.Processor {
  constructor(parent) {
    super(parent);
    this._parent = parent;
  }
  folder(task) {
    const parent = document.querySelector(this._parent);
    parent.innerHTML = '';
    this.folderRender( parent.appendChild(el('div')), task)
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