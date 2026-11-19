/* =============================================
   SISTEMA DE RESERVA DE LABORATÓRIOS - JavaScript
   RF01–RF05 + Novo Requisito (capacidade < 30)
   ============================================= */

// ========== DADOS INICIAIS (Slide 8) ==========
const laboratorios = [
    { id: 1, nome: "Laboratório 01", capacidade: 30, disponivel: true },
    { id: 2, nome: "Laboratório 02", capacidade: 40, disponivel: false },
    { id: 3, nome: "Laboratório 03", capacidade: 25, disponivel: true },
];

// Array para armazenar reservas em memória
const reservas = [];

// ========== ELEMENTOS DO DOM ==========
const tabelaLabs = document.querySelector("#tabela-laboratorios tbody");
const selectLab = document.getElementById("laboratorio");
const formReserva = document.getElementById("form-reserva");
const tabelaReservas = document.querySelector("#tabela-reservas tbody");
const tabelaReservasEl = document.getElementById("tabela-reservas");
const semReservas = document.getElementById("sem-reservas");
const modal = document.getElementById("modal-confirmacao");
const modalMensagem = document.getElementById("modal-mensagem");
const btnFecharModal = document.getElementById("btn-fechar-modal");

// ========== RF01: CONSULTAR LABORATÓRIOS ==========
function renderizarLaboratorios() {
    tabelaLabs.innerHTML = "";

    laboratorios.forEach((lab) => {
        const tr = document.createElement("tr");

        // Linha visual diferente para indisponível
        if (!lab.disponivel) {
            tr.classList.add("linha-indisponivel");
        }

        // Definir badge de status
        let badgeHTML = "";
        if (!lab.disponivel) {
            badgeHTML = `<span class="badge badge-indisponivel">Indisponível</span>`;
        } else if (lab.capacidade < 30) {
            badgeHTML = `<span class="badge badge-restrito">Restrito</span>`;
        } else {
            badgeHTML = `<span class="badge badge-disponivel">Disponível</span>`;
        }

        tr.innerHTML = `
            <td>${lab.nome}</td>
            <td>${lab.capacidade} alunos</td>
            <td>${badgeHTML}</td>
        `;

        tabelaLabs.appendChild(tr);
    });
}

// ========== POPULAR SELECT DE LABORATÓRIOS ==========
function popularSelectLaboratorios() {
    laboratorios.forEach((lab) => {
        const option = document.createElement("option");
        option.value = lab.id;

        if (!lab.disponivel) {
            option.textContent = `${lab.nome} (${lab.capacidade} alunos) — INDISPONÍVEL`;
            option.disabled = true;
        } else if (lab.capacidade < 30) {
            option.textContent = `${lab.nome} (${lab.capacidade} alunos) — Restrito para aulas regulares`;
        } else {
            option.textContent = `${lab.nome} (${lab.capacidade} alunos)`;
        }

        selectLab.appendChild(option);
    });
}

// ========== RF03: VALIDAR RESERVA ==========
function validarFormulario() {
    let valido = true;

    // Campos e seus IDs de erro
    const campos = [
        { id: "nome-professor", erroId: "erro-nome", msg: "Informe o nome do professor." },
        { id: "matricula", erroId: "erro-matricula", msg: "Informe a matrícula." },
        { id: "laboratorio", erroId: "erro-laboratorio", msg: "Selecione um laboratório." },
        { id: "data", erroId: "erro-data", msg: "Informe a data da reserva." },
        { id: "horario", erroId: "erro-horario", msg: "Informe o horário." },
        { id: "finalidade", erroId: "erro-finalidade", msg: "Selecione a finalidade." },
    ];

    // Limpar erros anteriores
    campos.forEach((campo) => {
        const el = document.getElementById(campo.id);
        const erroEl = document.getElementById(campo.erroId);
        el.classList.remove("campo-erro");
        erroEl.textContent = "";
    });

    // Validar campos obrigatórios
    campos.forEach((campo) => {
        const el = document.getElementById(campo.id);
        if (!el.value.trim()) {
            el.classList.add("campo-erro");
            document.getElementById(campo.erroId).textContent = campo.msg;
            valido = false;
        }
    });

    // NOVO REQUISITO (Slide 9): Lab com capacidade < 30 + Aula Regular
    const labId = parseInt(selectLab.value);
    const finalidade = document.getElementById("finalidade").value;

    if (labId && finalidade === "Aula Regular") {
        const labSelecionado = laboratorios.find((l) => l.id === labId);
        if (labSelecionado && labSelecionado.capacidade < 30) {
            const erroLab = document.getElementById("erro-laboratorio");
            const erroFin = document.getElementById("erro-finalidade");
            selectLab.classList.add("campo-erro");
            document.getElementById("finalidade").classList.add("campo-erro");
            erroLab.textContent = `${labSelecionado.nome} (${labSelecionado.capacidade} alunos) não aceita aulas regulares.`;
            erroFin.textContent = "Escolha outra finalidade ou outro laboratório.";
            valido = false;
        }
    }

    return valido;
}

// ========== RF02 + RF04: REALIZAR E CONFIRMAR RESERVA ==========
function realizarReserva(event) {
    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    // Coletar dados
    const labId = parseInt(selectLab.value);
    const labSelecionado = laboratorios.find((l) => l.id === labId);

    const reserva = {
        numero: reservas.length + 1,
        professor: document.getElementById("nome-professor").value.trim(),
        matricula: document.getElementById("matricula").value.trim(),
        laboratorio: labSelecionado.nome,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value,
        finalidade: document.getElementById("finalidade").value,
    };

    // Adicionar à lista
    reservas.push(reserva);

    // Atualizar tabela de reservas (RF05)
    renderizarReservas();

    // Exibir confirmação (RF04)
    exibirConfirmacao(reserva);

    // Limpar formulário
    formReserva.reset();
}

// ========== RF05: LISTAR RESERVAS ==========
function renderizarReservas() {
    if (reservas.length === 0) {
        semReservas.classList.remove("oculto");
        tabelaReservasEl.classList.add("oculto");
        return;
    }

    semReservas.classList.add("oculto");
    tabelaReservasEl.classList.remove("oculto");

    tabelaReservas.innerHTML = "";

    reservas.forEach((reserva) => {
        const tr = document.createElement("tr");

        // Formatar data para dd/mm/aaaa
        const partesData = reserva.data.split("-");
        const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

        tr.innerHTML = `
            <td>${reserva.numero}</td>
            <td>${reserva.professor}</td>
            <td>${reserva.matricula}</td>
            <td>${reserva.laboratorio}</td>
            <td>${dataFormatada}</td>
            <td>${reserva.horario}</td>
            <td>${reserva.finalidade}</td>
        `;

        tabelaReservas.appendChild(tr);
    });

    // Scroll suave até a tabela
    tabelaReservasEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ========== RF04: CONFIRMAR RESERVA (Modal) ==========
function exibirConfirmacao(reserva) {
    const partesData = reserva.data.split("-");
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

    modalMensagem.innerHTML = `
        <strong>${reserva.laboratorio}</strong> reservado com sucesso!<br>
        Professor: ${reserva.professor}<br>
        Data: ${dataFormatada} às ${reserva.horario}<br>
        Finalidade: ${reserva.finalidade}
    `;

    modal.classList.remove("oculto");
}

function fecharModal() {
    modal.classList.add("oculto");
}

// ========== EVENT LISTENERS ==========
formReserva.addEventListener("submit", realizarReserva);
btnFecharModal.addEventListener("click", fecharModal);

// Fechar modal ao clicar fora
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("oculto")) {
        fecharModal();
    }
});

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
    renderizarLaboratorios();
    popularSelectLaboratorios();
});
