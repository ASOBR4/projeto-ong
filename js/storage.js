/* Persistência (Web Storage). Recebe e devolve objetos simples: não conhece o DOM. */
const CHAVE = "voluntario";

export function salvar(dados) {
    try { localStorage.setItem(CHAVE, JSON.stringify(dados)); }
    catch (e) { /* armazenamento indisponível */ }
}

export function carregar() {
    try { return JSON.parse(localStorage.getItem(CHAVE) || "{}"); }
    catch (e) { return {}; }   // JSON corrompido
}
