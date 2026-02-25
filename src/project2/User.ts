type PaymentMethod = "Cash" | "Card";
type Timing = "current" | "future";
type OperationType = "income" | "expense";
type buyCategory =
  | "food"
  | "entertainment"
  | "transport"
  | "present"
  | "education"
  | "other";

interface Operation {
  amount: number;
  method: PaymentMethod;
  type: OperationType;
  timing: Timing;
  category: buyCategory;
}

class Cash {
  public name: string;
  public balance: number;

  constructor(name: string, initialBalance: number = 0) {
    this.name = name;
    this.balance = initialBalance;
  }

  public addBalance(amount: number) {
    this.balance += amount;
  }

  public removeBalance(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw new Error("Недостаточно средств в наличных");
    }
  }
}

class Card {
  public name: string;
  public balance: number;

  constructor(name: string, initialBalance: number = 0) {
    this.name = name;
    this.balance = initialBalance;
  }

  public addBalance(amount: number) {
    this.balance += amount;
  }

  public removeBalance(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      throw new Error("Недостаточно средств на карте");
    }
  }
}

export class User {
  public username: string;
  public cash: Cash;
  public card: Card;
  public operations: Operation[];

  constructor(
    username: string,
    cash?: Cash,
    card?: Card,
    operations?: Operation[]
  ) {
    this.username = username;

    this.cash = cash || new Cash(`Кошелек ${this.username}`);
    this.card = card || new Card(`Карта ${this.username}`);

    this.operations = operations ? [...operations] : [];
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
    return this.card.balance + this.cash.balance;
  }

  get categories() {
    const fullAmount = this.operations.reduce((sum, obj) => sum + obj.amount, 0);

    if (fullAmount === 0) return [];

    const categories = this.operations.map((obj) => ({
      name: obj.category,
      percentage: (100 * obj.amount) / fullAmount,
    }));

    return categories.sort((a, b) => b.percentage - a.percentage);
  }

  get bestCategory() {
    return this.categories[0] || null;
  }

  public addOperation(operation: Operation) {
    this.operations.push(operation);

    if (operation.timing === "current") {
      const targetWallet = operation.method === "Cash" ? this.cash : this.card;

      if (operation.type === "income") {
        targetWallet.addBalance(operation.amount);
      } else {
        targetWallet.removeBalance(operation.amount);
      }
    }
  }
}