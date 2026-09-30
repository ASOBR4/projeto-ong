/* Dados de origem: sem DOM, sem rede, sem dependências. */
export const projetos = [
    { titulo: "Doação de Alimentos", descricao: "Arrecadação e distribuição de alimentos para famílias em vulnerabilidade.", tipo: "doacao", rotulo: "Doação" },
    { titulo: "Programa de Voluntariado", descricao: "Ações de campo realizadas por voluntários em comunidades atendidas.", tipo: "voluntariado", rotulo: "Voluntariado" },
    { titulo: "Reforço Escolar", descricao: "Aulas de apoio para crianças e adolescentes.", tipo: "educacao", rotulo: "Educação" }
];

export const campos = [
    { id: "nome", label: "Nome completo", type: "text", ph: "Seu nome", auto: "name",
      valida: v => v.length < 3 ? "Informe o nome completo (mínimo 3 caracteres)." : "" },
    { id: "email", label: "E-mail", type: "email", ph: "exemplo@dominio.com", auto: "email",
      valida: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "E-mail em formato inválido." },
    { id: "cpf", label: "CPF", type: "text", ph: "000.000.000-00", auto: "off",
      valida: v => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(v) ? "" : "CPF inválido. Use 000.000.000-00." },
    { id: "telefone", label: "Telefone / WhatsApp", type: "tel", ph: "(11) 99999-9999", auto: "tel",
      valida: v => /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(v) ? "" : "Telefone inválido. Use (11) 99999-9999." },
    { id: "cep", label: "CEP", type: "text", ph: "00000-000", auto: "postal-code",
      valida: v => /^\d{5}-?\d{3}$/.test(v) ? "" : "CEP inválido. Use 00000-000." }
];
