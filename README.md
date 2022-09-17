<h1 align="center">
    <img  src="https://cdn-icons-png.flaticon.com/512/2490/2490291.png" width="100"> RepoProvas
</h1>

<h3 align="center">
   🧾 Seu sistema para compartilhamento de provas entre estudantes 🧾
</h3>

<h4 align="center">
	🚧   Concluído 🚀 🚧
</h4>

### 💻 Sobre o projeto

No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros.

### ⚙️ Funcionalidades

- [x] Estudantes podem se cadastrar e logar no sistema
- [x] Estudantes podem acessar provas procurando por disciplina
- [x] Estudantes podem acessar provas procurando por professor
- [x] Estudantes podem cadastrar provas antigas no sistema

### 🚀 Como executar o projeto

Este projeto é composto pelo Backend

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o servidor

```bash

# Clone este repositório
$ git clone https://github.com/jaquecaye2/Repo-Provas.git

# Acesse a pasta do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Crie um arquivo .env e use o .env.example como base

# Informe a porta, a url para acesso ao banco de dados e uma chave-secreta no arquivo
const PORT = 4000;
const DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};
const SECRET_KEY = nome_da_chave

# Execute a criação do banco de dados local
$ npx prisma migrate dev

# Execute a inserção de dados no banco de dados local
$ npx prisma db seed

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

#### 🎲 Rodando os testes

```bash

# Siga os passos anteriores até o passo de instalação das dependências

# Crie um arquivo .env.test e use o .env.test.example como base

# Informe a url para acesso ao banco de dados de teste e uma chave-secreta no arquivo
const DATABASE_URL = postgres://{user}:{password}@{hostname}:{port}/{database-name};
const SECRET_KEY = nome_da_chave

# Execute a aplicação em modo de test
$ npm test
```

### 🛠 Tecnologias

Segue abaixo algumas das tecnologias utilizadas neste projeto:

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" height="30px"/>

### 📄 Documentação da API

### 👨‍💼 Fluxo de cadastro e login

➡️ <span style="color:yellow"> **POST** </span> `/signup`

Nessa rota, usuários podem se cadastrar utilizando e-mail e senha.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "email": "fulano@gmail.com", #string
   "password": "0123456789" #string com no mínimo 10 caracteres
}
```

➡️ <span style="color:yellow"> **POST** </span> `/signin`

Nessa rota, usuários podem logar utilizando o e-mail e senha cadastrados.

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "email": "fulano@gmail.com", #string
   "password": "0123456789" #string com no mínimo 10 caracteres
}
```

A resposta da requisição virá no seguinte formato: `Token`

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzNDIyMzg0LCJleHAiOjE2NjM1MDg3ODR9.mMHu75gEifwiHTPz34fQT18D1-jdoPRTmpi7TgL_gEs
```

Importante salvar a resposta da requisição, visto que ela deverá ser utilizada nas demais rotas

### 📓 Fluxo de cadastro e acesso de provas

OBS: Todas as rotas abaixo exigem que seja passado um parâmetro no Headers, com o seguinte formato:

```bash
header: Authorization
value: Bearer {{token}} #obtido como resposta na rota de login
```

➡️ <span style="color:green"> **POST** </span> `/tests`

Nessa rota, é possível criar novas provas no sistema. 

O Body da requisição deve ser feito no seguinte formato:

```bash
{
   "name": "Fulano de Tal", #string
   "pdfUrl": "https://www.....", #string com no formato de URL
   "categoryId": 1, #number
   "teacherDisciplineId": 1 #number
}
```

➡️ <span style="color:yellow"> **GET** </span> `/tests/term`

Nessa rota, é possível acessar todos os períodos cadastrados.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "number": 1
  },
  {
    "id": 2,
    "number": 2
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/tests/term/:idTerm`

Nessa rota, é possível acessar todas as disciplinas de acordo com o período buscado.

O "idTerm" passado na rota é o id do período desejado.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "name": "HTML e CSS",
    "termId": 1
  },
  {
    "id": 4,
    "name": "Humildade",
    "termId": 1
  }
]
```

➡️ <span style="color:yellow"> **GET** </span> `/tests/discipline/:idDiscipline`

Nessa rota, é possível acessar todas as provas de acordo com a disciplina buscado.

O "idDiscipline" passado na rota é o id da disciplina desejada.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "category": "Projeto",
    "tests": []
  },
  {
    "category": "Prática",
    "tests": [
      {
        "name": "Prática Javascript 1",
        "pdfUrl": "https://www.google.com",
        "teacher": "Diego Pinho"
      },
      {
        "name": "Prática Javascript 2",
        "pdfUrl": "https://www.google.com",
        "teacher": "Diego Pinho"
      }
    ]
  },
  {
    "category": "Recuperação",
    "tests": []
  }
]
```
Por exemplo: no caso acima foi passado o id = 2 na rota da requisição que se refere a disciplina Javascript. Neste caso foi retornado que não há nenhum projeto ou recuperação cadastrados. Porém, há duas práticas que poderão ser visualizadas.

➡️ <span style="color:yellow"> **GET** </span> `/tests/teacher`

Nessa rota, é possível acessar todos os professores cadastrados.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "id": 1,
    "name": "Diego Pinho"
  },
  {
    "id": 2,
    "name": "Bruna Hamori"
  }
]
```
➡️ <span style="color:yellow"> **GET** </span> `/tests/teacher/:idTeacher`

Nessa rota, é possível acessar todas as provas de acordo com o professor buscado.

O "idTeacher" passado na rota é o id do professor desejado.

A resposta da requisição virá no seguinte formato:

```bash
[
  {
    "discipline": "HTML e CSS",
    "tests": [
      {
        "category": "Projeto",
        "tests": []
      },
      {
        "category": "Prática",
        "tests": []
      },
      {
        "category": "Recuperação",
        "tests": []
      }
    ]
  },
  {
    "discipline": "JavaScript",
    "tests": [
      {
        "category": "Projeto",
        "tests": []
      },
      {
        "category": "Prática",
        "tests": [
          {
            "name": "Prática Javascript 1",
            "pdfUrl": "https://www.google.com",
            "discipline": "JavaScript"
          },
          {
            "name": "Prática Javascript 2",
            "pdfUrl": "https://www.google.com",
            "discipline": "JavaScript"
          }
        ]
      },
      {
        "category": "Recuperação",
        "tests": []
      }
    ]
  }
]
```
Por exemplo: no caso acima foi passado o id = 1 na rota da requisição que se refere ao professor Diego Pinho. Neste caso foi retornado que o professor possui duas disciplinas (HTML e CSS | Javascript) em que é responsável por aulas, e em casa uma dessas possui projetos, práticas e recuperações. No caso temos castrados apenas duas práticas na disciplina de Javascript.

### 👩🏻 Autora
<img style="border-radius: 200" src="https://avatars.githubusercontent.com/u/102393976?s=400&u=aba5f19bf20b58d80146b343326cdb4fac491351&v=4" width="100" alt=""/>          |           <b>Jaqueline Caye</b>

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jaqueline-caye-614449137/)](https://www.linkedin.com/in/jaqueline-caye-614449137/)
[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white&link=https://www.instagram.com/jaquecaye/?hl=pt)](https://www.instagram.com/jaquecaye/?hl=pt)
