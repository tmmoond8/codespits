const TAB = '   ';
const ConsoleRenderer = class {
  constructor() {}

  render(data) {
    const { task, list } = data;
    console.log('---------------');
    console.log(task.getTitle());
    this._render(TAB, list);
    console.log('---------------');
  }
  
  _render(tab, list) {
    list.forEach(item => {
      console.log(tab + item.getTitle());
      this._render(tab + TAB, item.getList());
    })
  }
}