class Person {
  constructor(name = 'Anonymous', age = 0){
    this.name = name;
    this.age = age;
  }

  getDescription(){
    return `${this.name} is ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, major){
    super(name, age);
    this.major = major;
  }

  getDescription(){
    return `${this.name} studies ${this.major}`;
  }
}

class Traveler extends Person {
  constructor(name, age, location){
    super(name, age);
    this.location = location;
  }

  getDescription(){
    let greeting = super.getDescription();

    console.log(this.location);
    if(this.location){
      greeting += ` I live in ${this.location}`;
    }

    return greeting;
  }
}

let me = new Student('Miguel', 32, 'CS');
let traveler = new Traveler('Miguel', 32, 'Cuerns');
console.log(traveler.getDescription());