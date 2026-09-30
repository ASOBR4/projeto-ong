/* Validação em tempo real do formulário e integração com o storage. */
import { campos } from "./dados.js";
import { salvar, carregar } from "./storage.js";
import { mostrarToast } from "./ui.js";

export function validarCampo(input) {
    const campo = campos.find(c => c.id === input.id);
    if (!campo) return true;
    const valor = input.value.trim();
    const mensagem = valor ? campo.valida(valor) : "Campo obrigatório.";
    input.classList.toggle("invalido", !!mensagem);
    input.classList.toggle("valido", !mensagem);
    input.setAttribute("aria-invalid", !!mensagem);
    document.getElementById("erro-" + input.id).textContent = mensagem;
    return !mensagem;
}

// O CPF não é persistido (dado pessoal sensível)
function coletar(form) {
    const dados = {};
    campos.filter(c => c.id !== "cpf").forEach(c => { dados[c.id] = form[c.id].value; });
    return dados;
}

export function iniciarFormulario() {
    const form = document.getElementById("form-voluntario");
    const resultado = document.getElementById("resultado");

    const rascunho = carregar();
    Object.keys(rascunho).forEach(id => { if (form[id]) form[id].value = rascunho[id]; });

    form.addEventListener("input", e => {
        if (e.target.classList.contains("invalido") || e.target.classList.contains("valido")) validarCampo(e.target);
        salvar(coletar(form));
    });
    form.addEventListener("change", e => validarCampo(e.target));

    form.addEventListener("submit", e => {
        e.preventDefault();
        const invalidos = campos.map(c => form[c.id]).filter(input => !validarCampo(input));
        if (invalidos.length) {
            invalidos[0].focus();
            resultado.innerHTML = `<div class="alert" style="border-color:var(--cor-erro)">Corrija ${invalidos.length} campo(s) destacado(s).</div>`;
            return;
        }
        salvar(coletar(form));
        resultado.innerHTML = `<div class="alert alert-success"><strong>Sucesso:</strong> os dados serão analisados pela equipe da ONG.</div>`;
        mostrarToast("Cadastro recebido!");
    });
}
