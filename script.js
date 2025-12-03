// Seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");

// oniput, fica de olho em tudo que acontece dentro do input. neste medoto estamos pegando o evento do input para formatar o valor
amount.oninput = () => {
  //obtem o valor atual do input e remove os caracterias nao numericos
  let value = amount.value.replace(/\D/g, "");

  //transformar o valor em centavos
  value = Number(value) / 100;

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

// Captura o evneto de submit do formulario para obter os valores
form.onsubmit = (event) => {
  event.preventDefault();
  const newExpense = {
    // Criando um ID
    id: new Date().getTime(),
    // Pegando o valor da despesa
    expense: expense.value,
    // Pegando o valor da categoria
    category_id: category.value,
    // Pegando o nome da categoria
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar na lista.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria a categoria do icone
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);
    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");
    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;
    // Cria a span
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `
      <small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}
    `;

    // Cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.addEventListener("click", () => {
      console.log("clicado");
    });

    // Adiciona nome e categoria na div
    expenseInfo.append(expenseName, expenseCategory);

    // Adiciona o intem dentro da lista
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas");
    console.log(error);
  }
}
