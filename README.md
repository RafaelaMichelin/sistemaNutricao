# Sistema Nutrição - Projeto Full Stack

O Sistema de Nutrição é um projeto full-stack composto por uma API REST desenvolvida em NestJS e um frontend em Next.js, responsável pela interface do usuário.

O sistema permite o gerenciamento de usuários (Pacientes e Nutricionistas), incluindo autenticação, validações e controle de dados.

## Backend(API)
* ` NestJS ` +  `TypeScript` + `Node.js`
* `Sequelize ORM` + `MySQL`
* `Jwt (Autenticação)`
* `bcrypt(criptografia de senhas)`
* `class-validator + DTOs`
* `Swagger(documentação e testes)`
* `Cors habilitado`
---

## Modelo de Dados
```
usuarios
├── id
├── nome
├── email
├── senha
├── cpf
└── tipoDeUsuario

pacientes
├── id
├── usuarioId (FK)
├── dataNascimento
├── altura
└── objetivo

nutricionistas
├── id
├── usuarioId (FK)
├── crn
├── especialidade
└── disponibilidade
```
## DTOs e validações

### CreateUsuarioDto
> Utiliza o Class-validator para realizar a validação dos campos de entrada e Realiza as Validações de tipo de Usuario(Paciente/Nutricionista).

- Email válido (`@IsEmail`)
- Senha forte (`@MinLength`,`@MaxLength`, `@Matches`)
- CPF com 11 dígitos (`@Matches`)
- Nome obrigatório(`IsEnum`)
- Tipo de usuário (`@IsEnum`) (`@ValidateIf()`)

### UpdateUsuarioDto
> Utiliza o PartialType que converte automaticamente todos os campos do CreateUsuarioDto em opcionais, permitindo que o usuário envie apenas o que deseja alterar.
---
## Endpoints do Usuario

```
POST /usuarios/create
→ Cria um novo usuário + paciente ou nutricionista

POST /auth/login
→ JWT token para Login

GET /usuarios/find_by_name
→ Busca usuários pelo nome

GET /usuarios/find_by_email
→ Busca um usuário pelo email

PUT /usuarios/update
→ Atualiza os dados de um usuário

DELETE /usuarios/delete
→ Remove um usuário do sistema
```

## Autenticação de Login (JWT)

> O sistema utiliza autenticação baseada em JSON Web Token (JWT) para garantir segurança no acesso às rotas protegidas. Após o login, o usuário recebe um token que deve ser enviado nas requisições para acessar recursos protegidos da API.
---

## Documentação da API (Swagger)

A API possui documentação interativa gerada com **Swagger**, permitindo visualizar e testar todos os endpoints diretamente pelo navegador.

Acesse a documentação: http://localhost:3000/api-swagger

---
## Frontend

O frontend do projeto foi desenvolvido com **Next.js**, utilizando uma arquitetura moderna baseada em React para construção da interface do usuário.

Ele é responsável por toda a camada visual e interação com o usuário, consumindo diretamente a API backend via requisições HTTP.

### Tecnologias
* `NextJS`
* `Tailwind CSS`
* `ESLint(padronização de código)`

### Estrutura e Arquitetura

O frontend utiliza a estrutura padrão do **Next.js App Router**, permitindo:

- Renderização otimizada (SSR/CSR)
- Organização baseada em rotas
- Componentização reutilizável
- Estilização com Tailwind CSS

---

## Instalação e Execução 
O projeto é dividido em duas partes: **backend (NestJS)** e **frontend (Next.js)**.  
Cada parte deve ser executada separadamente em seu respectivo diretório.

### 1. Clone o repositório
`git clone https://github.com/RafaelaMichelin/sistemaNutricao.git`

### 2. Instale dependências
`npm install`

### 3. Configure variáveis de ambiente .env
```
DB_HOST=localhost
DB_USER=root
DB_PASS=suasenha
DB_NAME=nutri

JWT_SECRET=suaChave
JWT_EXPIRES=1d
```

### 4. Executar o servidor(Backend)
Acesse a pasta Raiz do projeto
  
`cd sistemaNutricao`

Execute

`npm run start:dev`

### 5. Execute o Frontend

Acesse a Pasta do Frontend

`cd sistemaNutricao/frontend`

 Instale as dependências

  `npm install`
  
 Execute

  `npm run dev`

O Frontend ficará disponível em http://localhost:3001

---
### Autores: Rafaela Michelin, Renan Bernardes e Ariele Cohen
