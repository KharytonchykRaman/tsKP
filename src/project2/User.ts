export type PaymentMethod = "Cash" | "Card";
export type Timing = "current" | "future";
export type OperationType = "income" | "expense";
export type BuyCategory =
  | "food"
  | "entertainment"
  | "transport"
  | "gifts"
  | "education"
  | "other";

export interface Operation {
  amount: number;
  method?: PaymentMethod;
  type: OperationType;
  timing: Timing;
  category?: BuyCategory;
}

export class Cash {
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
      throw new Error("Недостаточно средств");
    }
  }
}

export class Card {
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
      throw new Error("Недостаточно средств");
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
    operations?: Operation[],
  ) {
    this.username = username;
    this.cash = cash || new Cash(`Кошелек ${this.username}`);
    this.card = card || new Card(`Карта ${this.username}`);
    this.operations = operations ? [...operations] : [];
  }

  static fromData(data: any): User {
    const cash = data.cash
      ? new Cash(data.cash.name, data.cash.balance ?? 0)
      : undefined;
    const card = data.card
      ? new Card(data.card.name, data.card.balance ?? 0)
      : undefined;
    const operations =
      data.operations?.map(
        (op: any): Operation => ({
          amount: op.amount,
          method: op.method,
          type: op.type,
          timing: op.timing,
          category: op?.category,
        }),
      ) || [];
    return new User(data.username, cash, card, operations);
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

  getOperations(type?: OperationType, timing?: Timing): Operation[] {
    return this.operations.filter((op) => {
      if (type && op.type !== type) return false;
      if (timing && op.timing !== timing) return false;
      return true;
    });
  }

  addOperation(operation: Operation) {
    const newOp: Operation = operation;

    if (newOp.timing === "current") {
      const wallet = newOp.method === "Cash" ? this.cash : this.card;
      if (newOp.type === "income") {
        wallet.addBalance(newOp.amount);
      } else {
        wallet.removeBalance(newOp.amount);
      }
    }

    this.operations.push(newOp);
  }

  deleteOperation(index: number) {
    if (index < 0 || index >= this.operations.length) return;
    const op = this.operations[index];

    if (op.timing === "current") {
      const wallet = op.method === "Cash" ? this.cash : this.card;
      if (op.type === "income") {
        wallet.removeBalance(op.amount);
      } else {
        wallet.addBalance(op.amount);
      }
    }
    this.operations.splice(index, 1);
  }

  getCategoryStats() {
    const stats: {
      category: BuyCategory;
      amount: number;
      percent: number;
    }[] = [];
    const expenses = this.operations.filter(
      (op) => op.type === "expense" && op.timing === "current",
    );
    const total = expenses.reduce((sum, op) => sum + op.amount, 0);
    if (total === 0) return stats;

    const map: Map<BuyCategory, number> = new Map();
    expenses.forEach((op) => {
      map.set(
        op.category as BuyCategory,
        (map.get(op.category as BuyCategory) || 0) + op.amount,
      );
    });

    for (const [cat, amount] of map.entries()) {
      stats.push({
        category: cat,
        amount: amount,
        percent: (amount * 100) / total,
      });
    }

    return stats.sort((a, b) => b.percent - a.percent);
  }

  toJSON() {
    return {
      username: this.username,
      cash: { name: this.cash.name, balance: this.cash.balance },
      card: { name: this.card.name, balance: this.card.balance },
      operations: this.operations,
    };
  }
}
