const Repo = (() => {
  const Private = Symbol();
  return class {
    constructor(name, id, repository) {
      this[Private] = { name, id, repository, routerTable: new Map }
    }

    addRouter(ext, loader, ...arg) {
      const routerTable = this[Private].routerTable;
      ext.split(',').forEach(v => routerTable.set(v, [loader, ...arg]));
    }

    getBaseUrl() {
      const { id, repository } = this[Private];
      return `https://api.github.com/repos/${id}/${repository}/contents/`
    }

    parse(path, content) {
      const ext = path.split('.').pop();
      const routerTable = this[Private].routerTable.get(ext);
      routerTable[0](content, routerTable[1]);
    }
  }
})();