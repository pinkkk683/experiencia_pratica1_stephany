// Máscaras e validação básica do formulário de cadastro.html

document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");
  const form = document.querySelector("form");

  // Máscara de CPF
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
  });

  // Máscara de Telefone (formato nacional)
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    e.target.value = value;
  });

  // Máscara de CEP
  cepInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
    e.target.value = value;
  });

  // Validação de CPF (simples)
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    return true;
  }

  // Envio do formulário com validação
  form.addEventListener("submit", function (e) {
    if (!validarCPF(cpfInput.value)) {
      e.preventDefault();
      alert("CPF inválido. Por favor, verifique o número informado.");
      cpfInput.focus();
    }
  });
});


const menuMobile = document.querySelector(".menu-mobile");
const navMenu = document.querySelector("nav ul");

if (menuMobile && navMenu) {
  menuMobile.addEventListener("click", () => {
    navMenu.classList.toggle("ativo");
  });
}

// Validação visual dos formulários
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input[required]");
    let valido = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.border = "2px solid red";
        valido = false;
      } else {
        input.style.border = "1px solid #ccc";
      }
    });

    if (!valido) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos obrigatórios!");
    }
  });
}
