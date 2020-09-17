class Dog {
    constructor(name) {
        this.name = name;
    }
    bite() {
        const feel = 'nice';
        return feel;
    }
}
class Human {
    constructor(name, feel = 'bad') {
        this.name = name;
        this.feel = feel;
    }
    hurt(dogName, feel) {
        const result = `${dogName}干了${this.name}一口，${feel}！`;
        return result;
    }
}

const dog = new Dog('热狗');
const human = new Human('我');

const dogName = dog.name;
const feel = dog.bite();

console.log(human.hurt(dogName, feel));
