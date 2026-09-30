/* Templates (Template Literals): transformam dados em HTML. */
import { projetos, campos } from "./dados.js";

const criarCard = p => `
    <article class="card col-12 col-sm-6 col-lg-4">
        <span class="badge badge-${p.tipo}">${p.rotulo}</span>
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
    </article>`;

const criarCampo = c => `
    <div class="campo">
        <label for="${c.id}">${c.label}:*</label>
        <input type="${c.type}" id="${c.id}" name="${c.id}" placeholder="${c.ph}"
               autocomplete="${c.auto}" aria-describedby="erro-${c.id}">
        <small class="erro" id="erro-${c.id}" role="alert"></small>
    </div>`;

export const telas = {
    inicio: () => `
        <section>
            <h1>Bem-vindo à Nossa ONG</h1>
            <p>Trabalhamos pela inclusão social, pela educação e pela melhoria da qualidade de vida de comunidades vulneráveis.</p>
            <a class="btn" href="#/projetos" data-rota="projetos">Conheça os projetos</a>
        </section>`,

    projetos: () => `
        <section>
            <h1>Nossos Projetos e Ações Sociais</h1>
            <div class="grid">${projetos.map(criarCard).join("")}</div>
        </section>
        <section>
            <picture>
                <source srcset="../imagens/ong.webp" type="image/webp">
                <img src="../imagens/ong.jpg" alt="Voluntários da ONG reunidos durante uma ação comunitária"
                     width="800" height="450" loading="lazy" decoding="async">
            </picture>
        </section>
        <section>
            <h2>Como Realizar uma Doação</h2>
            <div class="alert alert-info" role="alert">
                <strong>Informação:</strong> Toda contribuição ajuda a manter nossas ações sociais.
            </div>
            <p><strong>Chave Pix:</strong> contato@ong.org.br</p>
        </section>
        <section>
            <h2>Nosso Impacto em Números</h2>
            <figure>
                <img src="../imagens/doacao-grafico.svg" alt="Gráfico mostrando 60% de crescimento em doações no último ano" width="300" loading="lazy" decoding="async">
                <figcaption>Aumento de 60% no número de famílias atendidas no último ano.</figcaption>
            </figure>
        </section>`,

    voluntariado: () => `
        <section>
            <h1>Voluntariado</h1>
            <p>Preencha seus dados para participar do processo de seleção e treinamento.</p>
            <form id="form-voluntario" class="card" novalidate>
                <fieldset>
                    <legend>Dados do voluntário</legend>
                    ${campos.map(criarCampo).join("")}
                </fieldset>
                <div class="acoes-form">
                    <button type="submit" class="btn">Quero ser Voluntário</button>
                    <button type="button" class="btn btn-secundario" id="abrirModal">Ver informações</button>
                </div>
                <div id="resultado" role="status"></div>
            </form>
        </section>`,

    contato: () => `
        <section>
            <h1>Contato</h1>
            <p>E-mail: contato@ong.org.br<br>Endereço: São Paulo - SP</p>
        </section>`
};
