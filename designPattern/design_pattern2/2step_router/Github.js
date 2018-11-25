const Github = (_ => {
  const Private = Symbol();
  return class {
    constructor() {
      this[Private] = {
        repos: {}
      }
    }
  
    addRepo(name, id, repository) {
      this[Private].repos[name] = new Repo(name, id, repository);
    }
    addRouter(name, ext, loader, el) {
      this[Private].repos[name].addRouter(ext, loader, el);
    }
    load(name, path) {
      const id = `callback${Github._id++}`;
      const f = Github[id] = ({ data: { content } }) => {
        delete Github[id];
        document.head.removeChild(s);
        this[Private].repos[name].parse(path, content);
      };
      const s = document.createElement('script');
      s.src = `${this[Private].repos[name].getBaseUrl() + path}?callback=Github.${id}`;
      document.head.appendChild(s);
    }
  }
})();
Github._id = 0;