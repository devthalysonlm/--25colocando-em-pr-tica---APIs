import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Lista de carros (simulando um banco de dados)
let carros: Carro[] = [];

// Classe Carro
class Carro {
    constructor(
        public id: number,
        public marca: string,
        public modelo: string,
        public categoria: string,
        public ano: number,
        public quilometragem: number,
        public valor: number
    ) {}
}

// Rota GET para listar todos os carros
app.get('/carros', (req: Request, res: Response) => {
    res.json(carros);
});

// Rota GET para buscar um carro por ID
app.get('/carros/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);
    if (carro) {
        res.json(carro);
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

// Rota POST para adicionar um novo carro
app.post('/carros', (req: Request, res: Response) => {
    const novoCarro = new Carro(
        carros.length + 1, // ID automático
        req.body.marca,
        req.body.modelo,
        req.body.categoria,
        req.body.ano,
        req.body.quilometragem,
        req.body.valor
    );
    carros.push(novoCarro);
    res.status(201).json(novoCarro);
});

// Rota PUT para atualizar um carro existente
app.put('/carros/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = carros.findIndex(c => c.id === id);
    if (index >= 0) {
        carros[index] = { ...carros[index], ...req.body };
        res.json(carros[index]);
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

// Rota DELETE para remover um carro
app.delete('/carros/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = carros.findIndex(c => c.id === id);
    if (index >= 0) {
        carros.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});