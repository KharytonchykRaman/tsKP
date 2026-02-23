/* 7. Реализовать функцию, которая принимает строку. Перемешивает символы. 
Возвращает новую строку с перемешанными символами внутри. */

import { randInt } from "../utils";

function shuffle(str: string) {
  const strArr: string[] = str.split("");
  const resArr: string[] = [];

  for (let i = 0; i < str.length - 1; i++) {
    const char: string = strArr[randInt(0, strArr.length - 1)];
    resArr.push(char);
    strArr.splice(strArr.indexOf(char), 1);
  }

  return resArr.join("");
}

const shuffleBtn: HTMLElement | null = document.getElementById("shuffleButton");
const firstInput: HTMLElement | null = document.getElementById("firstInput");
const firstRes: HTMLElement | null = document.getElementById("firstRes");

if (
  shuffleBtn instanceof HTMLElement &&
  firstInput instanceof HTMLInputElement &&
  firstRes instanceof HTMLTextAreaElement
) {
  shuffleBtn.addEventListener("click", () => {
    firstRes.value = shuffle(firstInput.value);
  });
}

/*
Задание 3: Массивы объектов

Легкий уровень: Создайте массив объектов users, каждый из которых будет представлять
пользователя (свойства: username, email). Выведите на экран все имена пользователей.

Средний уровень: Расширьте массив users, добавив свойство isAdmin (логическое значение). 
Напишите функцию getAdminUsers(users: User[]), которая будет возвращать массив 
администраторов (пользователей, у которых isAdmin равно true).

Сложный уровень: Создайте интерфейс Order, который будет содержать свойства user 
(имя пользователя) и components (массив комплектующих). Напишите функцию 
getUserOrders(orders: Order[], username: string), которая будет возвращать массив заказов 
для указанного пользователя. Затем создайте массив заказов и протестируйте свою функцию.
*/

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
}

const users: User[] = [
  { username: "vanya", email: "first@gmail.com", isAdmin: true },
  { username: "petya", email: "second@gmail.com", isAdmin: true },
  { username: "sasha", email: "third@gmail.com", isAdmin: false },
  { username: "igor'", email: "fourth@gmail.com", isAdmin: false },
  { username: "vlad", email: "fifth@gmail.com", isAdmin: false },
];

const userNameTA: HTMLElement | null = document.getElementById("usernames");
const adminUserTA: HTMLElement | null = document.getElementById("admins");

if (userNameTA instanceof HTMLTextAreaElement) {
  userNameTA.value = users.map((u) => u.username).join(", ");
}

function getAdminUsers(users: User[]): User[] {
  return users.filter((u) => u.isAdmin);
}

if (adminUserTA instanceof HTMLTextAreaElement) {
  adminUserTA.value = JSON.stringify(getAdminUsers(users));
}
interface Order {
  user: string;
  components: string[];
}

function getUserOrders(orders: Order[], username: string): Order[] {
  return orders.filter((o) => o.user === username);
}

const orders: Order[] = [
  { user: "vanya", components: ["first comp", "seconsd comp"] },
  { user: "petya", components: [] },
  { user: "sasha", components: ["third comp"] },
  { user: "vanya", components: ["fourth comp", "fifth comp", "sixth comp"] },
  { user: "vlad", components: ["seventh comp"] },
];

const orderBtn: HTMLElement | null = document.getElementById("orderButton");
const secondInput: HTMLElement | null = document.getElementById("secondInput");
const secondRes: HTMLElement | null = document.getElementById("orders");

if (
  orderBtn instanceof HTMLElement &&
  secondInput instanceof HTMLInputElement &&
  secondRes instanceof HTMLTextAreaElement
) {
  orderBtn.addEventListener("click", () => {
    secondRes.value = JSON.stringify(getUserOrders(orders, secondInput.value));
  });
}

/*
Задание 2: Работа с массивом объектов

1. Создайте интерфейс Item, который будет содержать свойства:
a. id: number
b. name: string
c. type: string

2. Создайте массив объектов inventory, который будет содержать несколько объектов типа Item.

3. Напишите функцию getItemById, которая принимает массив inventory и id элемента, 
и возвращает объект Item, если он найден, или undefined, если нет.
*/

interface Item {
  id: number;
  name: string;
  type: string;
}

const inventory: Item[] = [
  { id: 1, name: "firstname", type: "firstType" },
  { id: 2, name: "secondname", type: "secondType" },
  { id: 3, name: "thirdname", type: "thirdType" },
];

function getItemById(inventory: Item[], id: number): Item | undefined {
  return inventory.find((i) => i.id === id);
}

const itemBtn: HTMLElement | null = document.getElementById("itemButton");
const thirdInput: HTMLElement | null = document.getElementById("thirdInput");
const thirdRes: HTMLElement | null = document.getElementById("thirdRes");

if (
  itemBtn instanceof HTMLElement &&
  thirdInput instanceof HTMLInputElement &&
  thirdRes instanceof HTMLTextAreaElement
) {
  itemBtn.addEventListener("click", () => {
    thirdRes.value = JSON.stringify(
      getItemById(inventory, Number(thirdInput.value)),
    );
  });
}

/*
Задание 3: Наследование

· Создайте абстрактный класс Character, который будет иметь следующие свойства:
o name: string
o health: number

· Определите абстрактный метод attack(). Создайте два класса, Warrior и Mage, которые 
наследуются от Character и реализуют метод attack(). У Warrior метод должен выводить 
"Воин [имя] атакует с силой [damage]", а у Mage — "Маг [имя] использует заклинание на [damage]".
*/

abstract class Character {
  protected abstract name: string;
  protected abstract damage: number;

  abstract attack(): string;
}

class Warrior extends Character {
  constructor(
    protected name: string,
    protected damage: number,
  ) {
    super();
    this.damage = damage;
    this.name = name;
  }

  attack(): string {
    return `Warrior ${this.name} attacks with power ${this.damage}`;
  }
}

class Mage extends Character {
  constructor(
    protected name: string,
    protected damage: number,
  ) {
    super();
    this.damage = damage;
    this.name = name;
  }

  attack(): string {
    return `Mage ${this.name} casts spell with ${this.damage}`;
  }
}

const mageName: HTMLElement | null = document.getElementById("mageName");
const mageDmg: HTMLElement | null = document.getElementById("mageDmg");
const warriorName: HTMLElement | null = document.getElementById("warriorName");
const warriorDmg: HTMLElement | null = document.getElementById("warriorDmg");

const mageBtn: HTMLElement | null = document.getElementById("mageBtn");
const warriorBtn: HTMLElement | null = document.getElementById("warriorBtn");

const attackRes: HTMLElement | null = document.getElementById("attackRes");

if (
  warriorBtn instanceof HTMLElement &&
  warriorName instanceof HTMLInputElement &&
  warriorDmg instanceof HTMLInputElement &&
  mageBtn instanceof HTMLElement &&
  mageName instanceof HTMLInputElement &&
  mageDmg instanceof HTMLInputElement &&
  attackRes instanceof HTMLTextAreaElement
) {
  mageBtn.addEventListener("click", () => {
    attackRes.value = new Mage(mageName.value, Number(mageDmg.value)).attack();
  });

  warriorBtn.addEventListener("click", () => {
    attackRes.value = new Warrior(
      warriorName.value,
      Number(warriorDmg.value),
    ).attack();
  });
}

/*
3. Модификация вложенных массивов объектов

Задание: Определите интерфейс Library с полями name (строка) и books (массив объектов с 
полями title (строка) и author (строка)). Создайте объект library типа Library с 
несколькими книгами. Напишите функцию addBook, которая принимает объект Library и новый 
объект книги, добавляя книгу в массив books. Также напишите функцию removeBookByTitle, 
которая удаляет книгу из библиотеки по заданному названию.
*/

interface Library {
  name: string;
  books: Book[];
}

interface Book {
  title: string;
  author: string;
}

const library: Library = {
  name: "library1",
  books: [
    { title: "mertvie dushi", author: "Gogol'" },
    { title: "Prestuplenie i nakazanie", author: "Dostoevskiy" },
    { title: "Master i Margarita", author: "Bulgakov" },
  ],
};

function addBook(library: Library, book: Book): void {
  library.books.push(book);
}

function removeBookByTitle(library: Library, bookTitle: string): void {
  library.books.splice(
    library.books.findIndex((b) => b.title === bookTitle),
    1,
  );
}

const libraryTA: HTMLElement | null = document.getElementById("library");
const newTitle: HTMLElement | null = document.getElementById("newTitle");
const newAuthor: HTMLElement | null = document.getElementById("newAuthor");
const createBookBtn: HTMLElement | null = document.getElementById("newAuthor");
const deleteTitle: HTMLElement | null = document.getElementById("newAuthor");
const deleteBookBtn: HTMLElement | null = document.getElementById("newAuthor");

if (
  libraryTA instanceof HTMLTextAreaElement &&
  newTitle instanceof HTMLInputElement &&
  newAuthor instanceof HTMLInputElement &&
  createBookBtn instanceof HTMLElement &&
  deleteTitle instanceof HTMLInputElement &&
  deleteBookBtn instanceof HTMLInputElement
) {
  libraryTA.value = JSON.stringify(library);
  createBookBtn.addEventListener("click", () => {
    addBook(library, { title: newTitle.value, author: newAuthor.value });
    libraryTA.value = JSON.stringify(library);
  });

  deleteBookBtn.addEventListener("click", () => {
    removeBookByTitle(library, deleteTitle.value);
  });
}

/*
Задание 6: Комбинация интерфейсов и наследования (Уровень сложности: Продвинутый)

Описание: Создайте интерфейс Movable с методами move(distance: number):
void и getPosition(): number. Создайте абстрактный класс Vehicle, реализующий интерфейс
Movable, и имеющий свойство position (число). Реализуйте класс Car, наследующий от 
Vehicle, и добавьте свойство model (строка).

Требования:
· Обеспечьте корректную реализацию всех методов интерфейса в абстрактном классе.
· Реализуйте дополнительные свойства и методы в классе-наследнике.
*/

interface Movable {
  move(distance: number): void;
  getPosition(): number;
}

abstract class Vehicle implements Movable {
  protected position: number = 0;

  constructor(position?: number) {
    if (position) {
      this.position = position;
    }
  }

  move(distance: number): void {
    this.position += distance;
  }

  getPosition(): number {
    return this.position;
  }
}

class Car extends Vehicle {
  protected model: string;

  constructor(model: string, position?: number) {
    super(position);
    this.model = model;
  }

  toString(): string {
    return `Model : ${this.model}, Position ${this.position}`;
  }
}

const car1 = new Car("tesla", 10);

const carTA: HTMLElement | null = document.getElementById("car");

if (carTA instanceof HTMLTextAreaElement) {
  carTA.value = car1.toString();
}

/*
1. Абстрактный класс и наследование: Базовый элемент игры

Задание: Создайте абстрактный класс GameObject с:
a. Свойством position (объект с координатами x и y)
b. Абстрактным методом update()
Затем создайте классы Player и NPC, наследующие GameObject, и реализуйте метод update():
c. Для Player: увеличивает x на 1 и выводит текущую позицию.
d. Для NPC: увеличивает y на 1 и выводит текущую позицию.

Требования:
e. Создайте экземпляры Player и NPC и вызовите метод update несколько раз.
*/

abstract class GameObject {
  protected position: { x: number; y: number } = { x: 0, y: 0 };

  abstract update(): void;
}

class Player extends GameObject {
  update(): string {
    this.position.x += 1;
    return `x : ${this.position.x}; y : ${this.position.y}`;
  }
}

class NPC extends GameObject {
  update(): string {
    this.position.y += 1;
    return `x : ${this.position.x}; y : ${this.position.y}`;
  }
}

const player1: Player = new Player();
const npc1: NPC = new NPC();

const playerTA: HTMLElement | null = document.getElementById("playerTA");
const npcTA: HTMLElement | null = document.getElementById("npcTA");
const playerBtn: HTMLElement | null = document.getElementById("playerBtn");
const npcBtn: HTMLElement | null = document.getElementById("npcBtn");

if (
  playerTA instanceof HTMLTextAreaElement &&
  npcTA instanceof HTMLTextAreaElement &&
  playerBtn instanceof HTMLElement &&
  npcBtn instanceof HTMLElement
) {
  playerBtn.addEventListener("click", () => {
    playerTA.value = player1.update();
  });

  npcBtn.addEventListener("click", () => {
    npcTA.value = npc1.update();
  });
}

/*
Задание 1: Создание персонажа

Создайте тип Character с полями: name (строка), health (число), attack (число). 
Напишите функцию createCharacter, которая принимает эти параметры и возвращает объект 
типа Character. Выведите в консоль информацию о созданном персонаже.
*/

class Hero {
  protected name: string;
  protected health: number;
  protected attack: number;

  constructor(name: string, health: number, attack: number) {
    this.name = name;
    this.health = health;
    this.attack = attack;
  }

  toString(): string {
    return `Name: ${this.name}, health: ${this.health}, attack: ${this.attack}`;
  }
}

function createHero(name: string, health: number, attack: number): Hero {
  return new Hero(name, health, attack);
}

const newHeroName: HTMLElement | null = document.getElementById("newHeroName");
const newHeroHealth: HTMLElement | null =
  document.getElementById("newHeroHealth");
const newHeroAttack: HTMLElement | null =
  document.getElementById("newHeroAttack");
const createHeroBtn: HTMLElement | null =
  document.getElementById("createHeroBtn");
const heroTA: HTMLElement | null = document.getElementById("heroTA");

if (
  heroTA instanceof HTMLTextAreaElement &&
  createHeroBtn instanceof HTMLElement &&
  newHeroName instanceof HTMLInputElement &&
  newHeroHealth instanceof HTMLInputElement &&
  newHeroAttack instanceof HTMLInputElement
) {
  createHeroBtn.addEventListener("click", () => {
    const hero1 = createHero(
      newHeroName.value,
      Number(newHeroHealth.value),
      Number(newHeroAttack.value),
    );
    heroTA.value = hero1.toString();
  });
}
