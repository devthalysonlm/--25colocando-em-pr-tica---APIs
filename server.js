"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware para processar JSON
app.use(body_parser_1.default.json());
// Lista de carros (simulando um banco de dados)
let carros = [];
// Classe Carro
class Carro {
    constructor(id, marca, modelo, categoria, ano, quilometragem, valor) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.categoria = categoria;
        this.ano = ano;
        this.quilometragem = quilometragem;
        this.valor = valor;
    }
}
// Rota GET para listar todos os carros
app.get('/carros', (req, res) => {
    res.json(carros);
});
// Rota GET para buscar um carro por ID
app.get('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);
    if (carro) {
        res.json(carro);
    }
    else {
        res.status(404).send('Carro não encontrado');
    }
});
// Rota POST para adicionar um novo carro
app.post('/carros', (req, res) => {
    const novoCarro = new Carro(carros.length + 1, // ID automático
    req.body.marca, req.body.modelo, req.body.categoria, req.body.ano, req.body.quilometragem, req.body.valor);
    carros.push(novoCarro);
    res.status(201).json(novoCarro);
});
// Rota PUT para atualizar um carro existente
app.put('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = carros.findIndex(c => c.id === id);
    if (index >= 0) {
        carros[index] = Object.assign(Object.assign({}, carros[index]), req.body);
        res.json(carros[index]);
    }
    else {
        res.status(404).send('Carro não encontrado');
    }
});
// Rota DELETE para remover um carro
app.delete('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = carros.findIndex(c => c.id === id);
    if (index >= 0) {
        carros.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Carro não encontrado');
    }
});
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
