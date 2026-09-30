import test from "node:test";
import assert from "node:assert/strict";
import { campos } from "../js/dados.js";

const regra = id => campos.find(c => c.id === id).valida;
const casos = {
    nome: [["Ana Silva", true], ["Al", false]],
    email: [["ana@ong.org", true], ["ana@ong", false], ["ana.ong.org", false]],
    cpf: [["123.456.789-09", true], ["12345678909", true], ["123.456", false]],
    telefone: [["(11) 99999-9999", true], ["(11)3333-4444", true], ["11999999999", false]],
    cep: [["01310-100", true], ["01310100", true], ["123", false]]
};

for (const [id, lista] of Object.entries(casos)) {
    test(`validação de ${id}`, () => {
        for (const [valor, valido] of lista) {
            assert.equal(regra(id)(valor) === "", valido, `${id}: "${valor}"`);
        }
    });
}
