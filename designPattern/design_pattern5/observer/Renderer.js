const Renderer = class {
  constructor(processor) {
    this.p = processor;
  }
  render({task, list}) {
    this.p.folder(task);
    this.p.parent(task);
    this.subTask(list);
  }

  subTask(list) {
    list.forEach(({task, list}) => {
      this.p.task(task, _ => {
        if(list.length) {
          this.p.parent(task);
          this.subTask(list);
        }
      });
    })
  }
}

const Processor = class {
  constructor() { 
    this.prop = Object.create(null) 
    this._tv = TaskView.base;
  };
  taskView(...tv) {
    tv.forEach(tv => this._tv = tv.set(this._tv));
  }
  taskRender(task) {
    return this._tv.task(this.prop.ptask, task);
  }
  folder(task) { throw 'override' };
  task(task) { throw 'override' };
  parent(task) { throw 'override' };
}