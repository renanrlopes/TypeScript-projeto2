"use strict";
// Seleção dos elementos do DOM
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");
// Recupera tarefas salvas
var listaSalva = localStorage.getItem("@listagem_tarefas");
var tarefas = listaSalva !== null
    ? JSON.parse(listaSalva)
    : [];
// Renderiza as tarefas na tela
function listarTarefas() {
    listElement.innerHTML = "";
    tarefas.forEach(function (tarefa, index) {
        var todoElement = document.createElement("li");
        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.onclick = function () {
            tarefa.concluida = !tarefa.concluida;
            salvarDados();
            listarTarefas();
        };
        // Texto da tarefa
        var texto = document.createElement("span");
        texto.textContent = tarefa.texto;
        if (tarefa.concluida) {
            texto.style.textDecoration = "line-through";
            texto.style.color = "#6b7280";
        }
        // Botão excluir
        var linkExcluir = document.createElement("a");
        linkExcluir.href = "#";
        linkExcluir.textContent = "Excluir";
        linkExcluir.style.marginLeft = "10px";
        linkExcluir.onclick = function () { return deletarTarefa(index); };
        // Montagem do item
        todoElement.appendChild(checkbox);
        todoElement.appendChild(texto);
        todoElement.appendChild(linkExcluir);
        listElement.appendChild(todoElement);
    });
}
// Adiciona nova tarefa
function adicionarTarefa() {
    if (inputElement.value.trim() === "") {
        alert("Digite alguma tarefa!");
        return;
    }
    var novaTarefa = {
        texto: inputElement.value,
        concluida: false
    };
    tarefas.push(novaTarefa);
    inputElement.value = "";
    listarTarefas();
    salvarDados();
}
// Remove tarefa
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}
// Salva no localStorage
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
// Evento do botão
buttonElement.onclick = adicionarTarefa;
// Renderização inicial
listarTarefas();
