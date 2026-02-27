import "./style.css";

import {
  User,
  Operation,
  OperationType,
  Timing,
  BuyCategory,
  PaymentMethod,
} from "./User";

const $ = (id: string) => document.getElementById(id) as HTMLElement;
const $$ = (sel: string) =>
  document.querySelectorAll(sel) as NodeListOf<HTMLElement>;

let users: User[] = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users") as string).map((u: any) =>
      User.fromData(u),
    )
  : [];
let currentUser: User | null = localStorage.getItem("currentUser")
  ? (users.find(
      (u) => u.username === localStorage.getItem("currentUser"),
    ) as User)
  : null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users.map((u) => u.toJSON())));
}

function renderTransaction(op: Operation, index: number): HTMLElement {
  const tpl = $("transaction-template") as HTMLTemplateElement;
  const clone = tpl.content.cloneNode(true) as DocumentFragment;
  const el = clone.querySelector(".transaction-item")!;

  if (op.category) {
    el.querySelector(".transaction-category")!.textContent = op.category;
  } else el.querySelector(".transaction-category")!.remove();

  if (op.method) {
    el.querySelector(".transaction-method")!.textContent = op.method;
  } else el.querySelector(".transaction-method")!.remove();

  el.querySelector(".transaction-amount")!.textContent =
    `${op.type === "expense" ? "-" : "+"}${op.amount} ₽`;
  el.querySelector(".transaction-amount")!.className =
    `transaction-amount ${op.type === "expense" ? "amount-expense" : "amount-income"}`;

  (el.querySelector("button.delete")! as HTMLElement).dataset.index =
    index.toString();
  return el as HTMLElement;
}

function renderList(container: HTMLElement, ops: Operation[], showCat = true) {
  container.innerHTML = "";
  if (ops.length === 0) {
    container.innerHTML = "<p>Нет записей</p>";
    return;
  }
  ops.forEach((op) => {
    const realIndex = currentUser!.operations.indexOf(op);
    const el = renderTransaction(op, realIndex);
    if (!showCat) el.querySelector(".transaction-category")?.remove();
    container.appendChild(el);
  });
}

function renderStats() {
  const grid = $("statsGrid");
  const topText = $("topCategoryText");
  grid.innerHTML = "";

  const stats = currentUser!.getCategoryStats();
  if (stats.length === 0) {
    grid.innerHTML = "<p>Нет данных</p>";
    topText.textContent = "Нет данных";
    return;
  }

  const top = stats[0];
  topText.textContent = `${top.category} — ${top.amount} ₽`;

  stats.forEach((s) => {
    const tpl = $("stat-template") as HTMLTemplateElement;
    const clone = tpl.content.cloneNode(true) as DocumentFragment;
    const el = clone.querySelector(".stat-card")!;

    el.querySelector(".stat-value")!.textContent = `${s.amount} ₽`;
    el.querySelector(".stat-label")!.textContent = s.category;
    (el.querySelector(".progress-fill")! as HTMLElement).style.width =
      `${s.percent}%`;
    el.querySelector(".stat-percent")!.textContent = `${s.percent.toFixed(1)}%`;
    grid.appendChild(el);
  });
}

function render() {
  if (!currentUser) return;

  $("totalBalanceAmount").textContent = `${currentUser.balance} ₽`;
  ($("cashNameInput") as HTMLInputElement).value = currentUser.cash.name;
  ($("cashAmountInput") as HTMLInputElement).value =
    currentUser.cash.balance.toString();
  ($("cardNameInput") as HTMLInputElement).value = currentUser.card.name;
  ($("cardAmountInput") as HTMLInputElement).value =
    currentUser.card.balance.toString();

  renderList(
    $("expensesList"),
    currentUser.getOperations("expense", "current"),
  );
  renderList(
    $("incomesList"),
    currentUser.getOperations("income", "current"),
    false,
  );
  renderList(
    $("plannedExpensesList"),
    currentUser.getOperations("expense", "future"),
  );
  renderList(
    $("plannedIncomesList"),
    currentUser.getOperations("income", "future"),
    false,
  );

  renderStats();
}

function login() {
  const name = ($("usernameInput") as HTMLInputElement).value.trim();
  if (!name) return;

  currentUser = users.find((u) => u.username === name) || new User(name);
  if (!users.find((u) => u.username === name)) users.push(currentUser);

  localStorage.setItem("currentUser", name);
  saveUsers();
  $("currentUsername").textContent = currentUser.username;
  $("currentUserDisplay").style.display = "block";
  render();
}

function updateWallet(type: "cash" | "card") {
  if (!currentUser) return;
  const wallet = type === "cash" ? currentUser.cash : currentUser.card;
  const nameInput = $(`${type}NameInput`) as HTMLInputElement;
  const amountInput = $(`${type}AmountInput`) as HTMLInputElement;

  if (nameInput.value) wallet.name = nameInput.value;
  wallet.balance = Number(amountInput.value);

  saveUsers();
  render();
}

function addOp(type: OperationType, timing: Timing, typeNtiming: string) {
  if (!currentUser) return;

  const amount = Number(
    ($(`${typeNtiming}AmountInput`) as HTMLInputElement).value,
  );
  const selectedCat = $(`${typeNtiming}CategorySelect`) as HTMLSelectElement;
  const category = selectedCat?.value as BuyCategory | undefined;
  const selectedMethod = $(`${typeNtiming}AccountSelect`) as HTMLSelectElement;
  const method = selectedMethod?.value as PaymentMethod | undefined;

  if (!amount) {
    alert("Введите сумму");
    return;
  }

  try {
    currentUser.addOperation({ amount, type, timing, category, method });
    ($(`${typeNtiming}AmountInput`) as HTMLInputElement).value = "";
    saveUsers();
    render();
  } catch (e: any) {
    alert(e.message);
  }
}

if (currentUser) {
  $("currentUsername").textContent = currentUser.username;
  $("currentUserDisplay").style.display = "block";
  render();
}

$("loginBtn").addEventListener("click", login);

$("cashNameInput").addEventListener("change", () => updateWallet("cash"));
$("cashAmountInput").addEventListener("change", () => updateWallet("cash"));
$("cardNameInput").addEventListener("change", () => updateWallet("card"));
$("cardAmountInput").addEventListener("change", () => updateWallet("card"));

$("tabs").addEventListener("click", (e) => {
  const tab = (e.target as HTMLElement).closest(".tab") as HTMLElement;
  if (!tab) return;
  $$(".tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  const targetId = tab.dataset.tab;
  $$(".tab-content").forEach((c) => c.classList.remove("active"));
  if (targetId) $(targetId).classList.add("active");
});

$("addExpenseBtn").addEventListener("click", () =>
  {debugger;
  addOp("expense", "current", "expense")},
);
$("addIncomeBtn").addEventListener("click", () =>
  addOp("income", "current", "income"),
);
$("addPlannedExpenseBtn").addEventListener("click", () =>
  addOp("expense", "future", "plannedExpense"),
);
$("addPlannedIncomeBtn").addEventListener("click", () =>
  addOp("income", "future", "plannedIncome"),
);

document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest("button.delete");
  if (!btn || !currentUser) return;
  const idx = Number((btn as HTMLElement).dataset.index || "-1");
  if (idx >= 0) {
    currentUser.deleteOperation(idx);
    saveUsers();
    render();
  }
});
