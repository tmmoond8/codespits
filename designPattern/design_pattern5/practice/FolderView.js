const FolderView = class {
  addObserver(v) {
    this.observer = v;
  }
  notify(msg) {
    this.observer && this.observer.observe(msg);
  }
  set(tv) { this._tv = tv; return this;}
  folder(parent, task) {
    this._tv && this._tv.folder(parent, task);
    this._folder(parent, task);
  }
  _folder(parent, task) { throw "override" }
};
FolderView.base = new (class extends FolderView {
  constructor() {
    super();
  }
  _folder(parent, task) {
    const title = el('h1', { innerHTML: task._title});
    title.style.display = 'inline';
    parent.appendChild(title)
  }
});

const Emoji = class extends FolderView {
  constructor() {
    super();
  }
  _folder(parent, task) {
    parent.insertBefore(el('span', { innerHTML: '🐳' }), parent.firstChild);
  }
};
Remove.id = 0;