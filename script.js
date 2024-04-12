let participantes = [
  {
    nome: "Bernardo Sá",
    email: "bernardosa@hotmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    /*dataCheckIn: new Date(2024, 2, 1, 20, 20)*/
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 14, 45),
    dataCheckIn: new Date(2024, 1, 15, 15, 0)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@outlook.com",
    dataInscricao: new Date(2024, 2, 10, 10, 30),
    dataCheckIn: new Date(2024, 2, 10, 11, 0)
  },
  {
    nome: "Elena Santos",
    email: "elena.santos@hotmail.com",
    dataInscricao: new Date(2024, 1, 28, 9, 15),
    /*dataCheckIn: new Date(2024, 1, 28, 9, 30)*/
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 16, 0),
    dataCheckIn: new Date(2024, 2, 5, 16, 30)
  },
  {
    nome: "Gabriel Oliveira",
    email: "gabriel.oliveira@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 8, 45),
    dataCheckIn: new Date(2024, 1, 10, 9, 0)
  },
  {
    nome: "Hugo Fernandes",
    email: "hugo.fernandes@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 11, 10),
    dataCheckIn: new Date(2024, 1, 20, 11, 30)
  },
  {
    nome: "Isabela Lima",
    email: "isabela.lima@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 13, 20),
    dataCheckIn: new Date(2024, 2, 8, 13, 45)
  },
  {
    nome: "João Silva",
    email: "joao.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 14, 0),
    dataCheckIn: new Date(2024, 2, 15, 14, 30)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = 
    `
      <button
        data-email = "${participante.email}"
        onclick = "fazerCheckIn(event)">
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br/>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>`
}

const atualizarLista = (participantes) => {
  let output = ''

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }


  document.querySelector('tbody').innerHTML = output 
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return 
  }

  participantes = [participante, ... participantes]
  atualizarLista(participantes)


  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}


const fazerCheckIn = (event) => {
  // confirmar se o usuário realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  
  // atualizar a lista de participantes
  atualizarLista(participantes)
}