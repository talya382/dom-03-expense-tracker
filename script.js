// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)
const expense_form = document.getElementById("expense-form");
const BTN_submit = document.getElementById("submit");
const INPUT_descraption = document.getElementById("desc");
const INPUT_amount = document.getElementById("amount");
const category = document.getElementById("category");
const form_error = document.getElementById("form-error");
let counter = 0;
const expenses = [];
expense_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = INPUT_descraption.value.trim();
  if (text == "") {
    form_error.textContent = "Please add a description";
    form_error.hidden = false;
    INPUT_descraption.focus();
    return;
  }
  const amount = Number(INPUT_amount.value);
  if (Number.isNaN(amount) || amount <= 0) {
    form_error.textContent = "The amount must be larger than 0";
    form_error.hidden = false;
    INPUT_amount.focus();
    return;
  }

  const obj_tracker = {
    id: counter++,
    desc: text,
    amount: amount,
    category: category.value,
  };
  expenses.push(obj_tracker);
  render();
  form_error.hidden = true;
  INPUT_amount.value = "";
  INPUT_descraption.value = "";
  INPUT_descraption.focus();
});
// Step 2: render() - rebuild the table rows from the array
const rows = document.getElementById("rows");
const filter = document.getElementById("filter");
const no_rows = document.getElementById("no-rows");
function render(
  arr = expenses.filter((item) => {
    return filter.value === "all" || item.category === filter.value;
  }),
) {
  rows.innerHTML = "";
  let displayedExpenses = arr;
  if (isSorted) {
    displayedExpenses = displayedExpenses.toSorted((a, b) => {
      return b.amount - a.amount;
    });
  }
  displayedExpenses.forEach((item) => {
    const tr = document.createElement("tr");
    if (item.amount > 100) {
      tr.classList.add("big");
    }
    const delete_btn = document.createElement("button");
    delete_btn.classList.add("delete");
    delete_btn.dataset.id = item.id;
    const td_desc = document.createElement("td");
    td_desc.textContent = item.desc;
    tr.append(td_desc);
    const span = document.createElement("span");
    span.classList.add("badge");
    const td_category = document.createElement("td");
    span.textContent = item.category;
    td_category.append(span);
    tr.append(td_category);
    const td_amount = document.createElement("td");
    td_amount.textContent = item.amount.toFixed(2);
    tr.append(td_amount);
    const td_delete = document.createElement("td");
    delete_btn.textContent = "Delete";
    td_delete.append(delete_btn);
    tr.append(td_delete);
    rows.append(tr);
   
  }); 
  if (displayedExpenses.length > 0) {
      no_rows.hidden = true;
    }else{
      no_rows.hidden = false;
    }
  const total = document.getElementById("total");
  const totalExpenses = displayedExpenses.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0); // ה-0 בסוף הוא ערך ההתחלה של הסכום המצטבר
  total.textContent = totalExpenses.toFixed(2);
}
// Step 3: delete (one listener on #rows - event delegation, by data-id)
rows.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const findIndex = expenses.findIndex((item) => {
      return item.id === Number(e.target.dataset.id);
    });
    if (findIndex != -1) {
      expenses.splice(findIndex, 1);
    }
  }
  render();
});
// Step 4: total of the expenses that are shown
// Step 5: filter by category
filter.addEventListener("change", () => {
  render();
});
// Step 6: sort by amount (toSorted - the original array keeps its order)
const sort_btn = document.getElementById("sort-btn");
let isSorted = false;
sort_btn.addEventListener("click", () => {
  isSorted = !isSorted;
  if (isSorted) {
    sort_btn.textContent = "Sort by amount: on";
  } else {
    sort_btn.textContent = "Sort by amount: off";
  }

  render();
});

// Step 7: rows with an amount above 100 get the class "big"
