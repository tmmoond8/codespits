const Renderer = class {
  constructor(processor) {
    this.p = processor;
    processor.addObserver(this);
  }
  render({task, list}) {
    this.oldTask = task;
    this.p.folder(task);
    this.p.parent(task);
    this.subTask(list);
  }

  observe(type) { type === 'rerender' && this.rerender(); }
  rerender() {
    this.oldTask && this.render(this.oldTask.list());
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

Renderer.Processor = class {
  constructor() { 
    this.prop = Object.create(null) 
    this._tv = TaskView.base;
    this._fv = FolderView.base;
  };
  observe(msg) { this.notify(msg); }
  addObserver(v) { this.observer = v}
  notify(msg) { this.observer && this.observer.observe(msg); }
  taskView(...tv) {
    tv.forEach(tv => this._tv = tv.set(this._tv));
  }
  taskRender(task) {
    this._tv.addObserver(this);
    return this._tv.task(this.prop.ptask, task);
  }
  folderView(...fv) {
    fv.forEach(fv => this._fv = fv.set(this._fv));
  }
  folderRender(folder, task) {
    this._fv.addObserver(this);
    this._fv.folder(folder, task);
  }
  folder(task) { throw 'override' };
  task(task) { throw 'override' };
  parent(task) { throw 'override' };
}