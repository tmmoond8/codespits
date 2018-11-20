const MdLoader = class extends Github {
  constructor(id, repo, target) {
    super(id, repo);
    this._target = target;
  }
  _loaded(v) {
    this._target.innerHTML = this._parseMD(v);
  }
  _parseMD(v) {
    const md = window.markdownit();
    return md.render(d64(v));
  }
};

const d64 = v => decodeURIComponent(
  atob(v).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
);