// Seleção dos elementos do DOM
const listElement = document.querySelector("#app ul") as HTMLUListElement;
const inputElement = document.querySelector("#app input") as HTMLInputElement;
const buttonElement = document.querySelector("#app button") as HTMLButtonElement;

// Modelo da tarefa
interface Tarefa {
  texto: string;
  concluida: boolean;
}

// Recupera tarefas salvas
const listaSalva: string | null = localStorage.getItem("@listagem_tarefas");

let tarefas: Tarefa[] = listaSalva !== null
  ? JSON.parse(listaSalva)
  : [];

// Renderiza as tarefas na tela
function listarTarefas(): void {
  listElement.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const todoElement = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    checkbox.onclick = () => {
      tarefa.concluida = !tarefa.concluida;
      salvarDados();
      listarTarefas();
    };

    // Texto da tarefa
    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    if (tarefa.concluida) {
      texto.style.textDecoration = "line-through";
      texto.style.color = "#6b7280";
    }

    // Botão excluir
    const linkExcluir = document.createElement("a");
    linkExcluir.href = "#";
    linkExcluir.textContent = "Excluir";
    linkExcluir.style.marginLeft = "10px";

    linkExcluir.onclick = () => deletarTarefa(index);

    // Montagem do item
    todoElement.appendChild(checkbox);
    todoElement.appendChild(texto);
    todoElement.appendChild(linkExcluir);

    listElement.appendChild(todoElement);
  });
}

// Adiciona nova tarefa
function adicionarTarefa(): void {
  if (inputElement.value.trim() === "") {
    alert("Digite alguma tarefa!");
    return;
  }

  const novaTarefa: Tarefa = {
    texto: inputElement.value,
    concluida: false
  };

  tarefas.push(novaTarefa);
  inputElement.value = "";

  listarTarefas();
  salvarDados();
}

// Remove tarefa
function deletarTarefa(posicao: number): void {
  tarefas.splice(posicao, 1);

  listarTarefas();
  salvarDados();
}

// Salva no localStorage
function salvarDados(): void {
  localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}

// Evento do botão
buttonElement.onclick = adicionarTarefa;

// Renderização inicial
listarTarefas();
