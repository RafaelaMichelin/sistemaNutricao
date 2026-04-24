# Sistema Nutrição - API Backend

## Alunos: Rafaela, Ariele e Renan
API desenvolvida com NestJS para gerenciamento de usuários(Paciente/Nutricionistas), com autenticação, validações e segurança de dados.

## Stack completa
* ` NestJS ` +  `TypeScript` + `Node.js`
* `Sequelize` + `MySQL`
* `Jwt Auth`
* `bcrypt(senhas)`
* `class-validator + DTOs`
---

## Arquitetura (Tabelas)
```
usuarios (nome, email, senha, tipoDeUsuario, cpf)
├── pacientes (usuarioId FK + dataNascimento, altura, objetivo)
└── nutricionistas (usuarioId FK + crn, especialidade, disponibilidade)
```
## DTOs e validações

### CreateUsuarioDto
> Utiliza o Class-validator para realizar a validação dos campos de entrada e Realiza as Validações de tipo de Usuario(Paciente/Nutricionista).

- Email válido (`@IsEmail`)
- Senha forte (`@MinLength`,`@MaxLength`, `@Matches`)
- CPF com 11 dígitos (`@Matches`)
- Nome obrigatório
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

## Instalação e Execução 
### 1. Clone o repositório
git clone https://github.com/RafaelaMichelin/sistemaNutricao.git

cd sistema-nutri

### 2. Instale dependências
npm install

### 3. Configure .env

Edite .env com suas credenciais MySQL

### 4. Inicie servidor
npm run start:dev


