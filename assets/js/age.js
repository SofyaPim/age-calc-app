"use srtict";
//inputs

const form = document.querySelector(".calc");
const day = form.querySelector("#day"),
  month = form.querySelector("#month"),
  year = form.querySelector("#year"),
  submit = form.querySelector("input.arrow");
const inputs = form.querySelectorAll(".number");
const alarm = form.querySelectorAll(".item__sub");
const inputSup = form.querySelectorAll(".tem__label");

// ===========
inputSup.forEach((el) => {
  el.classList.remove("alarmMark");
});
// ==========
alarm.forEach((el) => {
  el.classList.add("displayNone");
});

submit.disabled = true;
submit.classList.add("disabled");

inputs.forEach(input => {
    input.addEventListener("mousemove", validate);
  
});
// //touchend;
inputs.forEach(input => {
     input.addEventListener("touchend", (e) => {
       e.preventDefault();
       validate();
     });
  
})


//========functons valid
function validate() {
  let check = 0;
  //years
  let date = new Date();
  let now = date.getFullYear();
  // ---------- проверка на высокосность

  let leapYear = new Date(year.value, 1, 29).getDate();

  if (leapYear == 29) {
    console.log("высокосный");
  }

  // --------------
  if (year.value.length > 4 || year.value.length <= 0 || year.value > now) {
    year.nextElementSibling.classList.remove("displayNone");
     year.previousElementSibling.classList.add("alarmMark");
  } else {
    year.previousElementSibling.classList.remove("alarmMark");
    year.nextElementSibling.classList.add("displayNone");
    check++;
  }
  //days
  if (
    day.value.length > 2 ||
    day.value.length <= 0 ||
    day.value <= 0 ||
    day.value > 31 ||
    ((month.value == 4 ||
      month.value == 6 ||
      month.value == 9 ||
      month.value == 11) &&
      day.value > 30) ||
    (month.value == 2 && day.value > 28 && leapYear != 29) ||
    (day.value > 29 && month.value == 2 && leapYear == 29)
  ) {
    day.nextElementSibling.classList.remove("displayNone");
     day.previousElementSibling.classList.add("alarmMark");
  } else {
     day.previousElementSibling.classList.remove("alarmMark");
    day.nextElementSibling.classList.add("displayNone");
    check++;
  }
  //months
  if (
    month.value.length > 2 ||
    month.value.length <= 0 ||
    month.value < 0 ||
    month.value > 12 ||
    (day.value >= 31 &&
      (month.value == 4 ||
        month.value == 6 ||
        month.value == 9 ||
        month.value == 11)) ||
    (day.value > 28 && month.value == 2 && leapYear != 29) ||
    (day.value > 29 && month.value == 2 && leapYear == 29)
  ) {
    month.nextElementSibling.classList.remove("displayNone");
    month.previousElementSibling.classList.add("alarmMark");
  } else {
    month.previousElementSibling.classList.remove("alarmMark");
    month.nextElementSibling.classList.add("displayNone");
    check++;
  }

  if (check == 3) {
    submit.disabled = false;
    submit.classList.remove("disabled");
  }
  console.log(check);
}


//===submit
submit.addEventListener("click", (e) => {
  e.preventDefault();
  showAge();
  
});
function showAge() {
  //inputs
  const d1 = form.querySelector("#day").value,
    m1 = form.querySelector("#month").value,
    y1 = form.querySelector("#year").value;
  // 0 соответствует 01.01.1970 UTC+0
  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Вычитаем дату рождения пользователя из текущего времени и сохраняем ее как константу d, m, y.

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }

  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  let d = d2 - d1;
  if (d < 10) {
    d = `0${d}`;
  }
  let m = m2 - m1;
  if (m < 10) {
    m = `0${m}`;
  }
  let y = y2 - y1;
  if (y < 10) {
    y = `0${y}`;
  }
  //====innerHtml d, m, y
  document.querySelector(".age-month").innerHTML = m;
  document.querySelector(".age-days").innerHTML = d;
  document.querySelector(".age-years").innerHTML = y;
  clearInputs();
  


}

 function clearInputs(){
    submit.disabled = true;
submit.classList.add("disabled");

inputs.forEach((input) => {
  input.value = '';
});
 };

