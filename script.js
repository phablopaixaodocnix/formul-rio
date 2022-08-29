'use strict';

//FUNÇÕES REULTILIZÁVEIS
let quantidadeDeContatos = 1;
function permitir_apenas_numeros_e_backspace_em_um_input(input) {
  input.addEventListener('keydown', function (e) {
    const condicao =
      !(e.key >= 0 && e.key <= 9) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'Shift' &&
      e.key !== 'Tab' &&
      e.key !== 'Delete';
    if (condicao) {
      e.preventDefault();
    }
  });
}

let nomeInput = document.getElementById('nome');
let emailInput = document.getElementById('e-mail');
let cidadeInput = document.getElementById('cidade');
let bairroInput = document.getElementById('bairro');
let ruaInput = document.getElementById('rua');

let ufSelect = document.getElementById('uf');
let escolaridadeSelect = document.getElementById('escolaridade');
let cpfInput = document.getElementById('cpf');
let quadraInput = document.getElementById('quadra');
let loteInput = document.getElementById('lote');
let casaInput = document.getElementById('casa');
let numeroInput = document.getElementById('numero');
let contatoTelefoneInput = document.getElementById('contato-telefone1');
let cepInput = document.getElementById('cep');
let allInputs = document.querySelectorAll('.input');
let form = document.getElementById('form');

//RESTRIÇÕES DOS CAMPOS QUE PERMITEM APENAS NÚMEROS
permitir_apenas_numeros_e_backspace_em_um_input(cpfInput);
permitir_apenas_numeros_e_backspace_em_um_input(quadraInput);
permitir_apenas_numeros_e_backspace_em_um_input(loteInput);
permitir_apenas_numeros_e_backspace_em_um_input(casaInput);
permitir_apenas_numeros_e_backspace_em_um_input(numeroInput);
permitir_apenas_numeros_e_backspace_em_um_input(contatoTelefoneInput);
permitir_apenas_numeros_e_backspace_em_um_input(cep);

//mascara cpf
cpfInput.addEventListener('keypress', () => {
  if (cpfInput.value.length === 3 || cpfInput.value.length === 7) {
    cpfInput.value += '.';
  }
  if (cpfInput.value.length === 11) {
    cpfInput.value += '-';
  }
});
//verificar se o cpf é valido de acordo com a receita federal
function cpfIsValid(cpf) {
  let cpfApenasNumeros = '';
  if (cpf.length !== 14) {
    alert('O cpf deve possuir 11 dígitos');
    return false;
  } else {
    cpfApenasNumeros = cpf.replace('.', ' ');
    cpfApenasNumeros = cpfApenasNumeros.replace('.', ' ');
    cpfApenasNumeros = cpfApenasNumeros.replace('.', ' ');
    cpfApenasNumeros = cpfApenasNumeros.replace('-', ' ');
    cpfApenasNumeros = cpfApenasNumeros.replace(/\s/g, '');

    let Soma = 0;
    let Resto;
    if (cpfApenasNumeros == '00000000000') {
      alert('Cpf Inválido');
      return false;
    }

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfApenasNumeros.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpfApenasNumeros.substring(9, 10))) {
      alert('Cpf Inválido');
      return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfApenasNumeros.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpfApenasNumeros.substring(10, 11))) {
      alert('Cpf Inválido');
      return false;
    }
    return true;
  }
}

//Armazenando os dados do formulário
const submitBtn = document.querySelector('.submit');
let dadosDoFormulario;

//criando um objeto com os dados informados
let dadosDoFormularioStr;
let dadosDoFormularioObj = []; //vetor onde será armazenado objetos que contém os dados informados no formulário;
let quantidadeDeFormulariosEnviados = 0;
let quantidadeDeFormulariosNaTabela = 0;
let eventListenerExcluir = 0;
let eventListenerEditar = 0;

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let formData = new FormData(form);
  if (quantidadeDeContatos < 2) {
    alert('Informe pelo ao menos 2 contatos');
  } else if (cpfIsValid(formData.get('cpf'))) {
    //criando a string a ser armazenada na variável dadosDoFormulário
    dadosDoFormularioStr = `Nome: ${formData.get('nome')}
    E-mail: ${formData.get('e-mail')}
    Cpf: ${formData.get('cpf')}
    Endereço: ${formData.get('e-mail')}
       Cidade: ${formData.get('cidade')}
       Bairro: ${formData.get('bairro')}
       Rua: ${formData.get('rua')}
       Quadra: ${formData.get('quadra')}
       Lote: ${formData.get('lote')}
       Casa: ${formData.get('casa')}
       Número: ${formData.get('numero')}
       CEP: ${formData.get('cep')}
       UF:  ${formData.get('uf')}
      Escolaridade: ${formData.get('escolaridade')}
      ${contatos()}`;
    function contatos() {
      let contatoss = `Contatos: `;
      let copy = contatoss;
      let i = 1;
      for (; i <= quantidadeDeContatos; i++) {
        let stringAserContatenada = ` 
        ${i}° Contato:
        Nome: ${formData.get(`contato-nome${i}`)}
        Telefone: ${formData.get(`contato-telefone${i}`)}
              E-mail: ${formData.get(`contato-email${i}`)}
              `;
        contatoss += stringAserContatenada;
      }
    }

    //criando objeto com todos os dados informados no formulário
    dadosDoFormularioObj[quantidadeDeFormulariosEnviados] = {
      nome: formData.get('nome'),
      email: formData.get('e-mail'),
      cpf: formData.get('cpf'),
      cidade: formData.get('cidade'),
      bairro: formData.get('bairro'),
      rua: formData.get('rua'),
      quadra: formData.get('quadra'),
      lote: formData.get('lote'),
      casa: formData.get('casa'),
      numero: formData.get('numero'),
      cep: formData.get('cep'),
      uf: formData.get('uf'),
      escolaridade: formData.get('escolaridade')
    };
    //armazenando os contatos
    let k = 1;
    for (; k <= quantidadeDeContatos; k++) {
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`nomeContato${k}`] = formData.get(`contato-nome${k}`);
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`telefoneContato${k}`] = formData.get(
        `contato-telefone${k}`
      );
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`emailContato${k}`] = formData.get(`contato-email${k}`);
    }
    dadosDoFormularioObj[quantidadeDeFormulariosEnviados].quantidadeDeContatosNesteFormulario = k - 1;
    quantidadeDeFormulariosEnviados++;

    //resetando o formulário pra que um novo seja preenchido
    form.reset();
    if (quantidadeDeContatos > 1) {
      for (let i = 2; i <= quantidadeDeContatos; i++) {
        let removerContato = document.getElementById(`contato-${i}`);
        removerContato.remove();
      }
      quantidadeDeContatos = 1;
    }

    //adicionando alguns dos dados informados na tabela
    adicionarNaTabela();

    //remover e editar dados da tabela
    let excluirBtn = document.querySelectorAll('.excluir');
    let editarBtn = document.querySelectorAll('.editar');
    let excluirBtnLength = excluirBtn.length;
    eventListenerEditar++;
    eventListenerExcluir++;

    const funçãoRemover = function (e) {
      eventListenerExcluir--;
      let i = Number(e.target.id);
      let remover = document.querySelectorAll(`.ref${i}`);
      remover[0].remove();
      remover[1].remove();
      remover[2].remove();
      remover[3].remove();

      dadosDoFormularioObj[i - 1].pop;
      quantidadeDeFormulariosNaTabela--;
      quantidadeDeFormulariosEnviados--;

      let itensTabela = document.querySelectorAll('.table-item');
      for (let w = i * 4 - 4, k = 1; w < itensTabela.length; w++, k++) {
        let classes = itensTabela[w].className;
        let numeroReferencia = classes.match(/(\d+)/)[0];
        itensTabela[w].classList.remove(`ref${numeroReferencia}`);
        itensTabela[w].classList.add(`ref${numeroReferencia - 1}`);
        if (k === 4) {
          k = 0;
          itensTabela[w].innerHTML = `
          <button class="editar ações-btn" id="${numeroReferencia - 1}">Editar</button>
          <button class="excluir ações-btn" id="${numeroReferencia - 1}">Excluir</button>
          `;
        }
      }

      recolocarEventListeners(i);
    };

    const funçãoEditar = function (e) {
      eventListenerEditar--;
      let i = e.target.id;
      let remover = document.querySelectorAll(`.ref${i}`);
      remover[0].remove();
      remover[1].remove();
      remover[2].remove();
      remover[3].remove();

      nomeInput.value = dadosDoFormularioObj[i - 1].nome;
      emailInput.value = dadosDoFormularioObj[i - 1].email;
      cpfInput.value = dadosDoFormularioObj[i - 1].cpf;
      cidadeInput.value = dadosDoFormularioObj[i - 1].cidade;
      bairroInput.value = dadosDoFormularioObj[i - 1].bairro;
      ruaInput.value = dadosDoFormularioObj[i - 1].rua;
      quadraInput.value = dadosDoFormularioObj[i - 1].quadra;
      loteInput.value = dadosDoFormularioObj[i - 1].lote;
      casaInput.value = dadosDoFormularioObj[i - 1].casa;
      numeroInput.value = dadosDoFormularioObj[i - 1].numero;
      cepInput.value = dadosDoFormularioObj[i - 1].cep;
      ufSelect.value = dadosDoFormularioObj[i - 1].uf;
      escolaridadeSelect.value = dadosDoFormularioObj[i - 1].escolaridade;
      let j = dadosDoFormularioObj[i - 1].quantidadeDeContatosNesteFormulario;
      for (let k = 1; k < j; k++) {
        adicionarContatoBtn.click();
      }
      for (let p = 1; p <= j; p++) {
        let contatoNome = document.getElementById(`contato-nome${p}`);
        let contatoTelefone = document.getElementById(`contato-telefone${p}`);
        let contatoEmail = document.getElementById(`contato-email${p}`);
        contatoNome.value = dadosDoFormularioObj[i - 1][`nomeContato${p}`];
        contatoTelefone.value = dadosDoFormularioObj[i - 1][`telefoneContato${p}`];
        contatoEmail.value = dadosDoFormularioObj[i - 1][`emailContato${p}`];
      }
      dadosDoFormularioObj.splice(i - 1, 1);
      quantidadeDeFormulariosEnviados--;
      quantidadeDeFormulariosNaTabela--;

      let itensTabela = document.querySelectorAll('.table-item');
      for (let w = i * 4 - 4, k = 1; w < itensTabela.length; w++, k++) {
        let classes = itensTabela[w].className;
        let numeroReferencia = classes.match(/(\d+)/)[0];
        itensTabela[w].classList.remove(`ref${numeroReferencia}`);
        itensTabela[w].classList.add(`ref${numeroReferencia - 1}`);
        if (k === 4) {
          k = 0;
          itensTabela[w].innerHTML = `
          <button class="editar ações-btn" id="${numeroReferencia - 1}">Editar</button>
          <button class="excluir ações-btn" id="${numeroReferencia - 1}">Excluir</button>
          `;
        }
      }

      recolocarEventListeners(i);
    };

    function recolocarEventListeners(i) {
      excluirBtn = document.querySelectorAll('.excluir');
      editarBtn = document.querySelectorAll('.editar');
      for (let a = i - 1; a < excluirBtn.length; a++) {
        excluirBtn[a].addEventListener('click', funçãoRemover);
        editarBtn[a].addEventListener('click', funçãoEditar);
      }
    }

    excluirBtn[excluirBtn.length - 1].addEventListener('click', funçãoRemover);
    editarBtn[editarBtn.length - 1].addEventListener('click', funçãoEditar);
  }
});

//adicionar dados do formulário na tabela
function adicionarNaTabela() {
  quantidadeDeFormulariosNaTabela++;
  let nomeAserAdicionado = document.createElement('div');
  let emailAserAdicionado = document.createElement('div');
  let escolaridadeAserAdicionado = document.createElement('div');
  let botoesAserAdicionado = document.createElement('div');

  nomeAserAdicionado.setAttribute(
    'class',
    `table-item nome border-right border-top ref${quantidadeDeFormulariosNaTabela}`
  );
  nomeAserAdicionado.textContent = String(dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].nome);
  emailAserAdicionado.setAttribute(
    'class',
    `table-item email border-right border-top ref${quantidadeDeFormulariosNaTabela}`
  );
  emailAserAdicionado.textContent = String(dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].email);
  escolaridadeAserAdicionado.setAttribute(
    'class',
    `table-item escolaridade border-right border-top ref${quantidadeDeFormulariosNaTabela}`
  );
  escolaridadeAserAdicionado.textContent = String(
    dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].escolaridade
  );
  botoesAserAdicionado.setAttribute('class', `table-item ações border-top ref${quantidadeDeFormulariosNaTabela}`);
  botoesAserAdicionado.innerHTML = `
        <button class="editar ações-btn" id="${quantidadeDeFormulariosNaTabela}">Editar</button>
        <button class="excluir ações-btn" id="${quantidadeDeFormulariosNaTabela}">Excluir</button>
  `;
  let divReferenciaInsercao = document.querySelector('.dados-da-tabela-serao-inseridos-antes-deste-div');
  divReferenciaInsercao.before(nomeAserAdicionado);
  divReferenciaInsercao.before(emailAserAdicionado);
  divReferenciaInsercao.before(escolaridadeAserAdicionado);
  divReferenciaInsercao.before(botoesAserAdicionado);
}

//criando um arquivo txt com uma string str
function criarTxt(str) {
  let blob = new Blob([JSON.stringify(str)], {
    type: 'text/plain;charset=utf-8'
  });
  saveAs(blob, 'Formulário.txt');
}

//Adicionar Contatos
const adicionarContatoBtn = document.getElementById('adicionar-contato');
const contato1 = document.getElementById('contato-1');

function criarContato() {
  quantidadeDeContatos++;
  let contatoAserAdicionado = document.createElement('div');
  contatoAserAdicionado.setAttribute('id', `contato-${quantidadeDeContatos}`);
  const node = `<p id="${quantidadeDeContatos}°contato" class="nth-contato">Contato ${quantidadeDeContatos} </p>
    <div class="contato-nome-container flexbox">
      <label for="contato-nome" class="padding-left-1rem">Nome</label>
      <input type="text" name="contato-nome${quantidadeDeContatos}" id="contato-nome${quantidadeDeContatos}" class="input" />
      </div>
    <div class="contato-telefone-container flexbox">
    <label for="contato-telefone" class="padding-left-1rem"
        >Telefone + DDD</label
      >
      <input
        type="tel" name="contato-telefone${quantidadeDeContatos}" id="contato-telefone${quantidadeDeContatos}" class="input" maxlength="14"
      />
    </div>
    <div class="contato-email-container flexbox">
      <label for="contato-email" class="padding-left-1rem"
        >E-mail</label
      >
      <input type="email" name="contato-email${quantidadeDeContatos}" id="contato-email${quantidadeDeContatos}" class="input" />
    </div>
    `;
  contatoAserAdicionado.innerHTML = node;

  return contatoAserAdicionado;
}

adicionarContatoBtn.addEventListener('click', function () {
  if (quantidadeDeContatos < 5) {
    document.getElementById('contatos-serao-inseridos-antes-deste-div').before(criarContato());
  }
});

//removerContatos
const removerContatoBtn = document.getElementById('remover-contato');

function removerContato() {
  if (quantidadeDeContatos > 1) {
    const contatoAserRemovido = document.getElementById(`contato-${quantidadeDeContatos}`);
    contatoAserRemovido.parentNode.removeChild(contatoAserRemovido);
    quantidadeDeContatos--;
  }
}

removerContatoBtn.addEventListener('click', function () {
  removerContato();
});

//excluir dados da tabela

// let excluirBtn = document.querySelectorAll('.excluir');
// console.log(excluirBtn);
// excluirBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   document.querySelectorAll(`.${excluirBtn.id}`).remove();
// });

//while(true){}
