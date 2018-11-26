const Sort = class {
  static get title() { return (a, b) => a.sortTitle(b); }
  static get date() { return (a, b) => a.sortDate(b); }
  sortTitle(task) { throw 'need to override' }
  sortDate(task) { throw 'need to override' }
};

const Task = (_=> {
  const Private = Symbol();
  return class {
    static get(title, date = null) { return new Task(title, date); }
    constructor(title, date) {
      if(!title) throw 'invalid title';
      this[Private] = {
        title, date, isComplete : false
      }
    }

    isComplete() { return this[Private].isComplete };
    toggle() { this[Private].isComplete = !this[Private].isComplete; };
    getTitle() { return this[Private].title; }
    getDate() { return this[Private].date; }
    sortTitle(task) { return this.getTitle() > task.getTitle(); }
    sortTitle(task) { return this.getDate() > task.getDate(); }
  };
})();

module.exports = Task;