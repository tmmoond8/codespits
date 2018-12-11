const TaskView = class {
  set(tv) { this._tv = tv; return this;}
  task(parent, task) {
    this.result = this._tv ? this._tv.task(parent, task) : task._title;
    return this._task(parent, task);
  }
  _task(parent, task) { throw "override" }
};
TaskView.base = new (class extends TaskView {
  _task(parent, task) {
    return this.result;
  }
});

const Priority = class extends TaskView {
  _task(parent, task) {
    return this.result.replace(
      /\[(urgent|high|normal|low)\]/gi, '<span class="$1">$1</span>'
    );
  }
};

const Member = class extends TaskView {
  constructor(...memebers) {
    this._reg = new RegExp(`@(${members.join('|')})`, 'g');
  }
}
