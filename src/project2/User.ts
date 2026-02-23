type PaymentMethod = "Cash" | "Card";
type Timing = "current" | "future";
type OperationType = "income" | "expense";
type buyCategory =
  | "food"
  | "entertainment"
  | "transport"
  | "present"
  | "education";

interface Operation {
  amount: number;
  method: PaymentMethod;
  type: OperationType;
  timing: Timing;
  category?: buyCategory;
}

class Cash {
  private _name: string;
  private _balance: number;

  constructor(name: string) {
    this._name = name;
    this._balance = 0;
  }

  get balance(): number {
    return this._balance;
  }

  get name() {
    return this._name;
  }
}

class Card {
  private _name: string;
  private _balance: number;

  constructor(name: string) {
    this._name = name;
    this._balance = 0;
  }

  get balance(): number {
    return this._balance;
  }

  get name() {
    return this._name;
  }
}

export class User {
  private _username: string;
  private _cash: Cash;
  private _card: Card;
  private operations: Operation[] = [];

  constructor(username: string) {
    this._username = username;
    this._cash = new Cash(`Кошелек ${this.username}`);
    this._card = new Card(`Карта ${this.username}`);
  }

  get username() {
    return this._username;
  }

  get currentExpenses(): number {
    return this.operations
      .filter((op) => op.type === "expense" && op.timing === "current")
      .reduce((sum, op) => sum + op.amount, 0);
  }

  get currentIncome(): number {
    return this.operations
      .filter((op) => op.type === "income" && op.timing === "current")
      .reduce((sum, op) => sum + op.amount, 0);
  }

  get futureExpenses(): number {
    return this.operations
      .filter((op) => op.type === "expense" && op.timing === "future")
      .reduce((sum, op) => sum + op.amount, 0);
  }

  get futureIncome(): number {
    return this.operations
      .filter((op) => op.type === "income" && op.timing === "future")
      .reduce((sum, op) => sum + op.amount, 0);
  }

  get balance(): number {
    return this.card.balance + this._cash.balance;
  }

  get card() {
    return this._card;
  }
  get cash() {
    return this._cash;
  }

  get categoryObj() {
    const fullAmount = this.operations
      .filter((op) => op.category)
      .reduce((sum, obj) => sum + obj.amount, 0);

    return this.operations.map((obj) => {
      return {
        category: obj.category,
        percentage: (100 * obj.amount) / fullAmount,
      };
    });
  }
}
