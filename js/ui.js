/* Componentes de feedback: toast e modal (com gerenciamento de foco). */
const toast = document.getElementById("toast");
const modal = document.getElementById("modalBackdrop");
let focoAnterior = null;

export function mostrarToast(mensagem) {
    toast.textContent = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

function abrirModal() {
    focoAnterior = document.activeElement;
    modal.classList.add("show");
    document.getElementById("fecharModal").focus();
}

function fecharModal() {
    if (!modal.classList.contains("show")) return;
    modal.classList.remove("show");
    if (focoAnterior) focoAnterior.focus();   // devolve o foco a quem abriu
}

export function iniciarUI() {
    document.addEventListener("click", e => {
        if (e.target.id === "abrirModal") abrirModal();
        if (e.target.id === "fecharModal" || e.target === modal) fecharModal();
    });
    document.addEventListener("keydown", e => {
        if (!modal.classList.contains("show")) return;
        if (e.key === "Escape") fecharModal();
        if (e.key === "Tab") {              // mantém o foco dentro do modal
            const itens = modal.querySelectorAll("button, [href], input, select, textarea");
            const primeiro = itens[0], ultimo = itens[itens.length - 1];
            if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
            else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
        }
    });
}
