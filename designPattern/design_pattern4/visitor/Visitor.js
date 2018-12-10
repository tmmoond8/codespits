const Visitor = class {
  folder() {
    throw 'must be override!';
  }
  parent() {
    throw 'must be override!';
  }
  task() {
    throw 'must be override!';
  }
}