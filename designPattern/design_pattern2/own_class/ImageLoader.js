const ImageLoader = class {
  constructor(el) {
    this._el = el;
  }
  parse(v) {
    const el = document.querySelector(this._el);
    el.src = 'data:text/plain;base64,' + v;
  }
}