// let titulo = document.getElementById('titulo');
// let botaoteste = document.getElementById('botaoTeste');

// // console.log(titulo.innerText);
// console.log(titulo.innerHTML);
// titulo.innerText = 'oie'
// titulo.style.color = 'red'
// titulo.style.backgroundColor = 'blue'

// console.log(titulo.classList.add('azul'));
// console.log(titulo.classList);

// titulo.addEventListener('mouseenter', () =>  {
//     alert("oieee");
// })

// botaoteste.addEventListener('click', () =>  {
//     alert("oieee");
// })

// function clickTeste(event) {
// alert("Clicou");
// }

let input = document.getElementById('todos');
let botao = document.getElementById('botao');
let divItens = document.getElementById('divItens');
let corFundo = document.getElementById('corFundo');
let corTexto = document.getElementById('corTexto');
let inputEdit = document.getElementById('inputEdit')
let fundoEdit = document.getElementById('fundoEdit');
let textoEdit = document.getElementById('textoEdit');

let itens = [];
getLocalStorage();

botao.addEventListener('click', (_) => {
    if(input.value.replace(/ /g, '')){
        itens.push({
            descricao: input.value,
            cor: corFundo.value,
            corTxt: corTexto.value,
        })
    }
    addCard();
    addLocalStorage();
})

function addCard() {
    divItens.innerHTML = '';
    itens.forEach((objeto, indice) => {
        let { descricao, cor, corTxt } = objeto;
        let linha = document.createElement('div');
        linha.className = 'row mt-3';
        linha.innerHTML = 
        `
            <div class="col-12">
                <div style="background-color: ${cor}; color: ${corTxt}" class="card">
                    <div class="card-body">
                        <span class="col-10">
                            ${indice} - ${descricao}
                        </span>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="editar(${indice})" data-bs-target="#exampleModal">Editar</button>
                    </div>
                </div>
            </div>
        `;
        divItens.appendChild(linha);
    }
    )
    input.value = '';
}

function excluir(_) {
    const idExclusao = prompt('Informe o numero para exclusão');
    if(idExclusao.toString().replace(/\D/g, '')) {
        itens.splice(idExclusao, 1);
    }
    addCard();
    addLocalStorage();
}

function editar(idEdit) {

    inputEdit.value = '';
}

function atualizar(_){
    itens[idEdit].descricao = inputEdit.value;
    itens[idEdit].corTxt = textoEdit.value;
    itens[idEdit].cor = fundoEdit.value;
    addCard();
    addLocalStorage();
}

function getLocalStorage() {
    try {
        itens = JSON.parse(localStorage.getItem('itens'));
        addCard();
    } catch (error) {
        localStorage.setItem('itens', '[]');
    }
}

function addLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(itens))
}