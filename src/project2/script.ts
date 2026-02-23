// ------------------- Система учёта финансов ---------------------------

import "./style.css";
import { User } from "./User";

const loginBtn: HTMLElement | null = document.getElementById("loginBtn");
const usernameInput: HTMLElement | null =
  document.getElementById("usernameInput");
const existingUsersHTML: HTMLElement | null =
  document.getElementById("existingUsersList");
const totalBalanceAmount: HTMLElement | null =
  document.getElementById("totalBalanceAmount");
const cashNameInput: HTMLElement | null =
  document.getElementById("cashNameInput");
const cashAmountInput: HTMLElement | null =
  document.getElementById("cashAmountInput");
const cardNameInput: HTMLElement | null =
  document.getElementById("cashNameInput");
const cardAmountInput: HTMLElement | null =
  document.getElementById("cashAmountInput");
const tabs: HTMLElement | null = document.getElementById("tabs");
const tabContents: Element[] = Array.from(
  document.querySelectorAll(".tab-content"),
);
document.getElementById("cashAmountInput");
const expenseNameInput: HTMLElement | null =
  document.getElementById("expenseNameInput");
document.getElementById("cashAmountInput");
const expenseAmountInput: HTMLElement | null =
  document.getElementById("expenseAmountInput");
document.getElementById("cashAmountInput");
const expenseCategorySelect: HTMLElement | null = document.getElementById(
  "expenseCategorySelect",
);
document.getElementById("cashAmountInput");
const expenseAccountSelect: HTMLElement | null = document.getElementById(
  "expenseAccountSelect",
);
document.getElementById("cashAmountInput");
const addExpenseBtn: HTMLElement | null =
  document.getElementById("addExpenseBtn");
document.getElementById("cashAmountInput");
const incomeNameInput: HTMLElement | null =
  document.getElementById("incomeNameInput");
document.getElementById("cashAmountInput");
const incomeAmountInput: HTMLElement | null =
  document.getElementById("incomeAmountInput");
document.getElementById("cashAmountInput");
const incomeAccountSelect: HTMLElement | null = document.getElementById(
  "incomeAccountSelect",
);
document.getElementById("cashAmountInput");
const addIncomeBtn: HTMLElement | null =
  document.getElementById("addIncomeBtn");
document.getElementById("cashAmountInput");
const plannedExpenseNameInput: HTMLElement | null = document.getElementById(
  "plannedExpenseNameInput",
);
document.getElementById("cashAmountInput");
const plannedExpenseAmountInput: HTMLElement | null = document.getElementById(
  "plannedExpenseAmountInput",
);
document.getElementById("cashAmountInput");
const plannedExpenseCategorySelect: HTMLElement | null =
  document.getElementById("plannedExpenseCategorySelect");
document.getElementById("cashAmountInput");
const plannedExpenseAccountSelect: HTMLElement | null = document.getElementById(
  "plannedExpenseAccountSelect",
);
document.getElementById("cashAmountInput");
const addPlannedExpenseBtn: HTMLElement | null = document.getElementById(
  "addPlannedExpenseBtn",
);
document.getElementById("cashAmountInput");
const plannedIncomeNameInput: HTMLElement | null = document.getElementById(
  "plannedIncomeNameInput",
);
document.getElementById("cashAmountInput");
const plannedIncomeAmountInput: HTMLElement | null = document.getElementById(
  "plannedIncomeAmountInput",
);
document.getElementById("cashAmountInput");
const plannedIncomeAccountSelect: HTMLElement | null = document.getElementById(
  "plannedIncomeAccountSelect",
);
document.getElementById("cashAmountInput");
const addPlannedIncomeBtn: HTMLElement | null = document.getElementById(
  "addPlannedIncomeBtn",
);
const usernameSpan: HTMLElement | null = document.getElementById("username");
const topCategoryText: HTMLElement | null =
  document.getElementById("topCategoryText");

//--------------------------------------------------------------------------------

const users: User[] =
  localStorage.getItem("users") === null
    ? []
    : JSON.parse(localStorage.getItem("users") as string);

const existingUsers: string[] = users.map((u) => u.username);

if (
  loginBtn instanceof HTMLButtonElement &&
  usernameInput instanceof HTMLInputElement
) {
  loginBtn.addEventListener("click", () => {
    const input = usernameInput.value.trim();
    if (input !== "" && localStorage.getItem("currentUset") !== input) {
      if (existingUsers.includes(input)) {
        localStorage.setItem("currentUser", input);
        loadUser();
      } else {
        const newUser = new User(input);
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", input);
        loadUser();
      }
    }
  });
}

if (tabs instanceof HTMLElement) {
  tabs.addEventListener("click", (e) => {
    debugger;
    Array.from(tabs.children).forEach((element) => {
      element.classList.remove("active");
    });
    const targetEl: Element | null = (e.target as Element).closest(".tab");
    if (targetEl instanceof Element) {
      targetEl.classList.add("active");

      const value: string = targetEl.getAttribute("data-tab") as string;

      tabContents.forEach((tc) => tc.classList.remove("active"));
      document.querySelector(`#${value}`)?.classList.add("active");
    }
  });
}

function loadUser(): void {
  const currUsername: string = localStorage.getItem("currentUser") as string;
  const currUser: User = users.find((u) => u.username === currUsername) as User;

  (usernameSpan as HTMLElement).textContent = `: ${currUsername}`;
  (totalBalanceAmount as HTMLElement).textContent = `${currUser.balance} ₽`;
  (cardNameInput as HTMLInputElement).value = currUser.card.name;
  (cardAmountInput as HTMLInputElement).value =
    currUser.card.balance.toString();
  (cashNameInput as HTMLInputElement).value = currUser.cash.name;
  (cashAmountInput as HTMLInputElement).value =
    currUser.cash.balance.toString();
}
