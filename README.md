# GoBarber-api
### Aplicação desenvolvida durante o curso GoStack da Rocketseat

<p> Aplicação usando os princípios de SOLID e TDD!!
Temos : Routes, Validação de Cadastro e Login, Unform, criação e exibição de tooltip, animações, Hooks,
Styled Components, Components, Autenticação de Rotas, API Context, Props, Conexão com a API -> backend: usando Postgre, Mongo e Redis.<p>




<ol>
<li>Backend com Nodejs</li>🌱 GoBarberBackend.
<li>Frontend com Reactjs</li>https://github.com/Delismachado/GoBarberWeb 🌱 GoBarberFrontend.
<li>Mobile com ReactNative</li>https://github.com/Delismachado/GoBarberMobile 🌱 GoBarberMobile.
</ol>

## Exemplos de chamadas para a API:

Criação de usuário:

```sh
curl --request POST \
  --url https://gobarber-api.derlimachado.xyz/users \
  --header 'content-type: application/json' \
  --data '{
	
	"name": "Derli 2 Machado",
	"email": "derli2@gmail.com",
	"password": "123456"
}'
```

## GoBarberWeb
### Pagina de cadastro, login, agendamento e recuperação de senha:

![GoBarberWeb](https://github.com/Delismachado/GoBarberWeb/blob/master/src/Gobarber.gif)
