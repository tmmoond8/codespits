const Task = (_ => {
  const Private = Symbol();
  return class {
    constructor(title, date) {
      this[Private] = { title, date, isComplete: false, list: [] }
    }
    
    isComplete() { return this[Private].isComplete };
    toggle() { this[Private].isComplete = !this[Private].isComplete; };
    getTitle() { return this[Private].title; };
    getDate() { return this[Private].date; };
    getList() { return this[Private].list; };
    add(title, date = null) { this[Private].list.push(new Task(title, date)); }
    remove(task) {
      const list = this[Private].list;
      if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }
    byTitle(stateGroup = true) { return this.list(this.getTitle, stateGroup); }
    byDate(stateGroup = true) { return this.list(getDate, stateGroup); }
    list(sortFunc, stateGroup = true) {
      const list = this[Private].list;
      const f = (a, b) => sortFunc.call(a) > sortFunc.call(b);
      return {
        task:this,
        list: !stateGroup ? [...list].sort(f) : [
          ...list.filter(v => !v.isComplete()).sort(f),
          ...list.filter(v => v.isComplete()).sort(f)
        ]
      };
    }
  };
})()