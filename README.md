# Nossa ONG

Site institucional de uma organização do terceiro setor, desenvolvido como **SPA** (Single Page Application) em HTML5, CSS3 e JavaScript puro (ES6 Modules). Apresenta a instituição, campanhas de doação, indicadores de impacto e um formulário de cadastro de voluntários com validação em tempo real.

> Projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.
> Autor: **<seu nome>** · Repositório: **<URL do GitHub>** · Site publicado: **<URL do deploy>**

## Tecnologias

| Área | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico, WAI-ARIA |
| Estilo | CSS3: variáveis, Grid de 12 colunas, Flexbox, Mobile First, modo escuro |
| Lógica | JavaScript ES6 Modules (sem frameworks), `localStorage` |
| Build | esbuild (bundle e minificação de JS/CSS), html-minifier-terser (HTML) |
| Imagens | sharp (conversão para WebP), `<picture>` e `loading="lazy"` |
| Testes | Test runner nativo do Node.js (`node:test`) |
| Versionamento | Git, GitHub, GitFlow, Conventional Commits, SemVer |

## Funcionalidades

- Navegação SPA por rotas em hash (`#/projetos`), sem recarregar a página.
- Menu responsivo: hambúrguer no celular e dropdown a partir de 768 px.
- Cards gerados por templates (Template Literals) a partir de dados.
- Formulário com validação em tempo real, mensagens de erro no DOM e rascunho salvo no `localStorage` (o CPF não é salvo).
- Modal e toast de feedback.
- Acessibilidade: landmarks, skip-link, foco visível, `aria-*`, foco gerenciado no modal e modo escuro.

## Estrutura do projeto

```
projeto-ong/
├── html/       index.html (casca da SPA)
├── css/        estilo.css
├── imagens/    logo, foto da ONG e gráfico
├── js/         módulos ES6
│   ├── dados.js        dados de origem (projetos e regras dos campos)
│   ├── storage.js      persistência no localStorage
│   ├── ui.js           toast e modal
│   ├── componentes.js  templates HTML
│   ├── formulario.js   validação em tempo real
│   ├── navegacao.js    roteador SPA e menu
│   └── script.js       ponto de entrada
├── tests/      testes automatizados
├── build.mjs   build de produção
└── otimizar-imagens.mjs
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (inclui o npm)
- Git
- Navegador moderno

## Instalação

```bash
git clone <URL-do-repositorio>
cd projeto-ong
npm install
```

## Executar em desenvolvimento

Módulos ES não funcionam com duplo clique no arquivo, então use um servidor local:

```bash
npm run dev
```

Abra `http://localhost:3000/html/index.html` (a porta aparece no terminal). Alternativas: extensão **Live Server** do VS Code ou `python -m http.server 8000`.

## Testes

```bash
npm test
```

Executa 5 testes das regras de validação (nome, e-mail, CPF, telefone e CEP).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` com o JS agrupado em um único arquivo, CSS e HTML minificados e cópia das imagens. Para conferir o resultado:

```bash
npm run preview
```

Redução medida na versão 1.0.0:

| Arquivo | Original | Minificado | Redução |
|---|---|---|---|
| JS (7 módulos → 1 bundle) | 10,79 KB | 7,48 KB | 30,7% |
| CSS | 9,02 KB | 6,55 KB | 27,3% |
| HTML | 2,29 KB | 1,76 KB | 23,0% |
| **Total** | **22,09 KB** | **15,79 KB** | **28,5%** |

## Otimização de imagens

```bash
npm run imagens
```

Converte PNG/JPG da pasta `imagens/` para WebP (qualidade 80, largura máxima de 1600 px). A foto da ONG usa `<picture>` com WebP e JPG de reserva, e as imagens abaixo da dobra usam `loading="lazy"`.

## Deploy

O `netlify.toml` já define o comando de build (`npm run build`) e a pasta publicada (`dist`). No Netlify: *Add new site > Import from Git*, escolha o repositório e confirme. O `dist/index.html` redireciona para `html/index.html`.

## Acessibilidade

- Landmarks `header`, `nav`, `main` e `footer`, link "Pular para o conteúdo" e `fieldset`/`legend` no formulário.
- ARIA: `aria-expanded`/`aria-controls` (hambúrguer), `aria-current` (menu), `aria-invalid`/`aria-describedby` e `role="alert"` (validação), `role="status"` (toast) e `role="dialog"`/`aria-modal` (modal).
- Foco visível com `:focus-visible`; no modal o foco é levado para dentro, mantido ali e devolvido ao fechar.
- Modo escuro automático (`prefers-color-scheme`) e `prefers-reduced-motion`.
- Contraste conferido pela fórmula do WCAG 2.1: todos os pares de cores testados atingem no mínimo 4,5:1 nos dois temas (menor valor: 4,56:1).

## Versionamento

Fluxo GitFlow: `main` (versões estáveis), `develop` (integração) e `feature/*` (novas funcionalidades). Mensagens seguem Conventional Commits (`feat:`, `fix:`, `docs:`) e as versões seguem SemVer (`v1.0.0`). Alterações entram na `develop` por Pull Requests ligados a issues do milestone **v1.0.0**.
