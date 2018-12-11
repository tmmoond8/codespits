const Renderer = class {
  constructor(processor) {
    this.p = processor;
  }
  render({task, list}) {
    this.p.folder(task);
    this.p.parent(task);
    this.subTask(list);
  }

  subTask(list) {
    list.forEach(({task, list}) => {
      this.p.task(task, _ => {
        if(list.length) {
          this.p.parent(task);
          this.subTask(list);
        }
      });
    })
  }
}

Renderer.Processor = class {
  constrcutor() { 
    this.prop = Object.create(null) 
  };
  folder(task) { throw 'override' };
  task(task) { throw 'override' };
  parent(task) { throw 'override' };
}