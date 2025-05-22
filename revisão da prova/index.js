const express = require('express');
const myslq = require('mysql2');


const app = express();

app.use(express.json());

const conexao = myslq.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consultorio_medico'
})

app.use(express.json())

app.post('/consultas', (req, res) => {
    const consulta = {
        paciente: req.body.paciente,
        medico: req.body.medico,
        especialidade: req.body.especialidade,
        data: req.body.data,
        horario: req.body.horario,
        observacoes: req.body.observacoes,
    }
    if (!consulta.paciente || typeof consulta.paciente != 'string' || consulta.paciente.trim() == '') {
        return res.status(400).send('Nome do Paciente é obrigatório e deve ser uma string não vazia.');
    }
    if (!consulta.medico || typeof consulta.medico  != 'string' || consulta.medico .trim() == '') {
        return res.status(400).send('Nome do médico é obrigatório e deve ser uma string não vazia.');
    }

    if (!consulta.especialidade|| typeof consulta.especialidade != 'string' || consulta.especialidade .trim() == '') {
        return res.status(400).send('A especialidade do médico é obrigatório e deve ser uma string não vazia.');
    }

    if (!consulta.data|| typeof consulta.data != 'string' || consulta.data .trim() == '') {
        return res.status(400).send('A data da consulta é obrigatória.');
    }
    if (!consulta.horario|| typeof consulta.horario != 'string' || consulta.horario .trim() == '') {
        return res.status(400).send('O horario da consulta é obrigatória..');
    }
    

    conexao.query(
        'INSERT INTO consultas(paciente,medico,especialidade,data,horario,observacoes) VALUES (?,?,?,?,?,?)',
    
        [consulta.paciente, consulta.medico, consulta.especialidade,consulta.data,consulta.horario,consulta.observacoes],
        () => {
            res.status(201).send('Consulta marcada com sucesso!')

        }
    );

})
 

app.get('/consultas', (req, res) => {
   conexao.query('SELECT * FROM consultas', (err, results) => {
    if (err){
        return res.status(500).send('Erro ao buscar consulta');
    }
    res.status(200).send(results);
   })
});

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})