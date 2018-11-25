const MdLoader = class {
  constructor(el) {
    this._el = el;
  }
  parse(v) {
    const el = document.querySelector(this._el);
    el.innerHTML = window.markdownit().render(decodeURIComponent(atob(v)));
  }
}