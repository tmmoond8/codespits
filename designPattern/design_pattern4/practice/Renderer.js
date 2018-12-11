const Renderer = class {
  constructor(visitor) {
    this._visitor = visitor;
  }
  render({task, list}) {
    const v = this._visitor.folder(task, (parent, list) => {
      this.subTask(parent, list);
    });
    this.subTask(this._visitor.parent(v, task), list);
  }

  subTask(parent, list) {
    list.map(task => task.getData()).forEach(({task, list}) => {
      // list.forEach(item => task.isComplete() !== item.isComplete() && item.toggle());
      task.toggleList();
      const v = this._visitor.task(parent, task);
      this.subTask(this._visitor.parent(v, task), list);
    })
  }
}