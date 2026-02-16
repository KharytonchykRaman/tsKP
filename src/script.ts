/* 7. Реализовать функцию, которая принимает строку. Перемешивает символы. 
Возвращает новую строку с перемешанными символами внутри. */

import { randInt } from "./utils";

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
