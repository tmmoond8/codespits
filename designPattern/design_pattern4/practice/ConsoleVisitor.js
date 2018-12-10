const ConsoleVisitor = class extends Visitor {
  constructor() { super();}
  folder({_title: title}) {
    console.log('--------------------------');
    console.log('folder:', title);;
    return '--';
  }

  parent(v, task) {
    return v;
  }

  task(v, {_title: title}) {
    console.log(v, title);
    return v + '--';
  }
}