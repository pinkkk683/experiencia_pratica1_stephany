
const menuMobile = document.querySelector(".menu-mobile");
const nav = document.querySelector("nav ul");

menuMobile.addEventListener("click", () => {
  nav.classList.toggle("ativo");
});


function aplicarMascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function aplicarMascaraCEP(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2");
}


const form = document.getElementById("formCadastro");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");


cpf.addEventListener("input", () => (cpf.value = aplicarMascaraCPF(cpf.value)));
telefone.addEventListener("input", () => (telefone.value = aplicarMascaraTelefone(telefone.value)));
cep.addEventListener("input", () => (cep.value = aplicarMascaraCEP(cep.value)));


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;
  const camposObrigatorios = form.querySelectorAll("input[required], select[required]");
  camposObrigatorios.forEach((campo) => {
    if (!campo.value.trim()) {
      campo.classList.add("erro");
      valido = false;
    } else {
      campo.classList.remove("erro");
    }
  });


  if (cpf.value.length !== 14) {
    alert("CPF inválido. Verifique o formato (000.000.000-00).");
    valido = false;
  }


  if (cep.value.length !== 9) {
    alert("CEP inválido. Verifique o formato (00000-000).");
    valido = false;
  }

  if (!valido) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }


  const dados = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem("cadastroVoluntario", JSON.stringify(dados));

  alert("Cadastro realizado com sucesso! 🎉");
  form.reset();
});


document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("erro");
  });
});


const links = document.querySelectorAll("nav a");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href").includes(".html")) return; 
    e.preventDefault();
    const pagina = link.getAttribute("data-page");
    carregarConteudo(pagina);
  });
});

function carregarConteudo(pagina) {
  const main = document.querySelector("main");
  main.innerHTML = `<h2>Carregando ${pagina}...</h2>`;
  setTimeout(() => {
    main.innerHTML = `<h2>Página "${pagina}" carregada (SPA simulada)</h2>`;
  }, 800);
}
