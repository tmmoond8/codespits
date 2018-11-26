const TaskList = (_ => {
  const Private = Symbol();
  return class {
    constructor(title) {
      if(!title) throw 'invalid title';
      this[Private] = {
        title,
        list: []
      }
    }

    add(title, date) { this[Private].list.push(Task.get(title, date)); }
    remove(task) {
      const list = this[Private].list;
      if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }
    byTitle(stateGroup = true) { return this._getList(Sort.title, stateGroup); }
    byDate(stateGroup = true) { return this._getList(Sort.date, stateGroup); }
    _getList(sort, stateGroup) {
      const list = this[Private].list;
      return !stateGroup ? [...list].sort(sort) : [
        ...list.filter(v => !v.isComplete()).sort(sort),
        ...list.filter(v => v.isComplete()).sort(sort)
      ];
    }
  }
})()

module.exports = TaskList;