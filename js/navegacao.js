/* Roteador SPA e menu hambúrguer. */
import { telas } from "./componentes.js";
import { iniciarFormulario } from "./formulario.js";

const titulos = { inicio: "Início", projetos: "Projetos", voluntariado: "Voluntariado", contato: "Contato" };
const conteudo = document.getElementById("conteudo");
const btnHamburger = document.getElementById("btnHamburger");
const menu = document.getElementById("menuPrincipal");
const rotaAtual = () => location.hash.replace("#/", "") || "inicio";

function alternarMenu(abrir) {
    menu.classList.toggle("active", abrir);
    btnHamburger.setAttribute("aria-expanded", abrir);
    btnHamburger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

function renderizar(rota) {
    if (!telas[rota]) rota = "inicio";
    conteudo.innerHTML = telas[rota]();
    document.title = `${titulos[rota]} - Nossa ONG`;
    document.querySelectorAll(".menu a[data-rota]").forEach(a => {
        if (a.dataset.rota === rota) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
    });
    if (rota === "voluntariado") iniciarFormulario();
    window.scrollTo(0, 0);
}

function navegar(rota) {
    history.pushState(null, "", "#/" + rota);
    renderizar(rota);
    conteudo.focus();
}

export function iniciarNavegacao() {
    document.addEventListener("click", event => {
        if (event.target.closest(".skip-link")) {   // evita conflito com as rotas em hash
            event.preventDefault();
            conteudo.focus();
            return;
        }
        const link = event.target.closest("a[data-rota]");
        if (!link) return;
        event.preventDefault();
        navegar(link.dataset.rota);
        alternarMenu(false);
    });
    window.addEventListener("popstate", () => renderizar(rotaAtual()));
    btnHamburger.addEventListener("click", () => alternarMenu(!menu.classList.contains("active")));
    document.addEventListener("keydown", e => { if (e.key === "Escape") alternarMenu(false); });
    renderizar(rotaAtual());
}
