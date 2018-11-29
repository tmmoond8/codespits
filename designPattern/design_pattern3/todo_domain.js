const list1 = new TaskList('디자인 패턴');
list1.add('팩토리 패턴');
list1.add('리포지트 패턴');

const list2 = new TaskList('컵밥');
list2.add('오뚜기');
list2.add('CJ');

console.log(list1.byRegister());
console.log(list2.byDate());