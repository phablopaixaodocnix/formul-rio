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

let cpfInput = document.getElementById('cpf');
let quadraInput = document.getElementById('quadra');
let loteInput = document.getElementById('lote');
let casaInput = document.getElementById('casa');
let numeroInput = document.getElementById('numero');
let contatoTelefoneInput = document.getElementById('contato-telefone');
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

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfApenasNumeros.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpfApenasNumeros.substring(9, 10))) {
      alert('Cpf Inválido');
      return false;
    }

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfApenasNumeros.substring(i - 1, i)) * (12 - i);
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
    const obj1 = {
      nome: formData.get('nome'),
      email: formData.get('e-mail'),
      cpf: formData.get('cpf'),
      endereço: formData.get('e-mail'),
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
    dadosDoFormularioObj[quantidadeDeFormulariosEnviados] = obj1;
    //armazenando os contatos
    for (let i = 1; i <= quantidadeDeContatos; i++) {
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`nomeContato${i}`] = formData.get(`contato-nome${i}`);
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`telefoneContato${i}`] = formData.get(
        `contato-telefone${i}`
      );
      dadosDoFormularioObj[quantidadeDeFormulariosEnviados][`emailContato${i}`] = formData.get(`contato-email${i}`);
    }
    console.log(dadosDoFormularioObj);
    quantidadeDeFormulariosEnviados++;

    //resetando o formulário pra que um novo seja preenchido
    form.reset();

    //adicionando alguns dos dados informados na tabela
    adicionarNaTabela();
  }
});

//adicionar dados do formulário na tabela
function adicionarNaTabela() {
  quantidadeDeFormulariosNaTabela++;
  let nomeAserAdicionado = document.createElement('div');
  let emailAserAdicionado = document.createElement('div');
  let escolaridadeAserAdicionado = document.createElement('div');
  let botoesAserAdicionado = document.createElement('div');

  nomeAserAdicionado.setAttribute('class', 'table-item nome border-right border-top');
  nomeAserAdicionado.setAttribute('id', `${quantidadeDeFormulariosNaTabela}`);
  nomeAserAdicionado.textContent = String(dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].nome);
  emailAserAdicionado.setAttribute('class', 'table-item email border-right border-top');
  emailAserAdicionado.setAttribute('id', `${quantidadeDeFormulariosNaTabela}`);
  emailAserAdicionado.textContent = String(dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].email);
  escolaridadeAserAdicionado.setAttribute('class', 'table-item escolaridade border-right border-top');
  escolaridadeAserAdicionado.setAttribute('id', `${quantidadeDeFormulariosNaTabela}`);
  escolaridadeAserAdicionado.textContent = String(
    dadosDoFormularioObj[quantidadeDeFormulariosEnviados - 1].escolaridade
  );
  botoesAserAdicionado.setAttribute('class', 'table-item ações border-top');
  botoesAserAdicionado.setAttribute('id', `${quantidadeDeFormulariosNaTabela}`);
  botoesAserAdicionado.innerHTML = `
        <button class="editar ações-btn">Editar</button>
        <button class="excluir ações-btn">Excluir</button>
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
      <input type="text" name="contato-nome${quantidadeDeContatos}" id="contato-nome" class="input" />
      </div>
    <div class="contato-telefone-container flexbox">
    <label for="contato-telefone" class="padding-left-1rem"
        >Telefone + DDD</label
      >
      <input
        type="tel" name="contato-telefone${quantidadeDeContatos}" id="contato-telefone" class="input" maxlength="14"
      />
    </div>
    <div class="contato-email-container flexbox">
      <label for="contato-email" class="padding-left-1rem"
        >E-mail</label
      >
      <input type="email" name="contato-email${quantidadeDeContatos}" id="contato-email" class="input" />
    </div>
    `;
  contatoAserAdicionado.innerHTML = node;

  console.log(contatoAserAdicionado);
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
let excluirBtn = document.querySelector('.excluir');
excluirBtn.addEventListener('click', function (e) {
  e.preventDefault();
});
