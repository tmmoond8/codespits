const Renderer = class {

  render({task, list}) {
    const v = this._folder(task, this._root);
    this.subTask(this._parent(v, task), list);
  }

  subTask(parent, list) {
    list.forEach(task => {
      const v = this._task(parent, task);
      this.subTask(this._parent(v, task), task._list);
    })
  }
  _folder() {
    throw 'must be override!';
  }
  _parent() {
    throw 'must be override!';
  }
  _task() {
    throw 'must be override!';
  }
}