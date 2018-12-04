const ConsoleRenderer = class extends Renderer {
  constructor() {
    super();
  }
  _folder({_title: title}) {
    console.log('--------------------------');
    console.log('folder:', title);;
    return '--';
  }

  _parent(v, list) {
    return v;
  }

  _task(v, {_title: title}) {
    console.log(v, title);
    return v + '--';
  }
}