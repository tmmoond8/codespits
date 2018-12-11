const ConsoleProcessor = class extends Renderer.Processor {
  constructor() { 
    super();
    this.prop = {};
    this._parent = parent;
  }
  folder({_title: title}) {
    console.log('--------------------------');
    console.log('folder:', title);;
    this.prop.parent = '';
  }

  parent(task) {
    this.prop.parent += '--';
  }

  task({_title: title}, inner) {
    const parent = this.prop.parent;
    console.log(parent, title);
    inner();
    this.prop.parent = parent;
  }
}