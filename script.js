// Seleciona os elementos do formulario
const amount = document.getElementById("amount");
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
