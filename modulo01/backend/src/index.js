const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

//  Adiciona um tipo de função onde todas as rotas vão ter que passar por ela
app.use(express.json());

/*
    Tipos de parâmetros:
    - Query Params: Filtros e paginação
    - Route Params:  Identificar recursos (Atualizar/Deletar)
    - Request Body: Conteúdo na hora de criar ou editar recurso (json)
*/

/*
    Middleware:
    - Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição
*/

const projects = [
    {
        "id": "9501331b-a5d6-4ed7-86b1-11eada8915ce",
        "title": "Teste",
        "owner": "Cleiton"
    },
    {
        "id": "696b4d3d-c3a8-4992-afa1-db79d74a2396",
        "title": "Projeto App React",
        "owner": "Angelo de Salves"
    }
];

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: "Invalid project id" })
    }

    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title) )
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner} = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log("🚀 Back-end started!");
});