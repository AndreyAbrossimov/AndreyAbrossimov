class Animal {
    constructor(species, age, color, weight) {
      this.species = species;
      this.age = age;
      this.color = color;
      this.weight = weight;
    }
    
    sayHello() {
      console.log(`Привет, я ${this.species}, мне ${this.age} лет, мой цвет - ${this.color}, и мой вес - ${this.weight} кг.`);
    }
  }
  
  class Cat extends Animal {
    constructor(species, age, color, weight, breed, isIndoor) {
      super(species, age, color, weight);
      this.breed = breed;
      this.isIndoor = isIndoor;
    }
    
    meow() {
      console.log(`Мяу! Я ${this.species}, порода ${this.breed}.`);
    }
  }
  
  class Dog extends Animal {
    constructor(species, age, color, weight, breed, isFriendly) {
      super(species, age, color, weight);
      this.breed = breed;
      this.isFriendly = isFriendly;
    }
    
    bark() {
      console.log(`Гав! Я ${this.species}, порода ${this.breed}.`);
    }
  }
  
  const cats = [
    new Cat("Кошка", 2, "рыжий", 4, "Сиамская", true),
    new Cat("Кот", 4, "черный", 5, "Британская", false),
    new Cat("Кот", 1, "белый", 3, "Персидская", true)
  ];
  
  const dogs = [
    new Dog("Собака", 3, "коричневый", 10, "Хаски", true),
    new Dog("Собака", 6, "серый", 15, "Далматинец", true),
    new Dog("Собака", 2, "черный", 8, "Пудель", false)
  ];
  
  class Owner {
    constructor(pets) {
      this.pets = pets;
    }
    
    greet() {
      this.pets.forEach((pet) => {
        pet.sayHello();
        if (pet instanceof Cat) {
          pet.meow();
        } else if (pet instanceof Dog) {
          pet.bark();
        }
      });
    }
  }
  
  const owner = new Owner([...cats, ...dogs]);
  owner.greet();