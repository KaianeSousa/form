const participantes = [];

function exibirDataHora() {
    const dataHora = new Date();
    document.getElementById('data-hora').textContent = dataHora.toLocaleString();
}

function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const presencaSim = document.querySelector('input[name="presenca"][value="sim"]');
    const presencaNao = document.querySelector('input[name="presenca"][value="nao"]');
    const ingresso = document.getElementById('ingresso').value;

    // Expressão regular para validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação de campos obrigatórios e presença (apenas um deve ser selecionado)
    if (!nome || !email || (!presencaSim.checked && !presencaNao.checked)) {
        alert('Por favor, preencha todos os campos obrigatórios e selecione uma opção de presença.');
        return;
    }

    if (presencaSim.checked && presencaNao.checked) {
        alert('Por favor, selecione apenas uma opção para Presença Confirmada.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    const participante = {
        nome,
        email,
        presenca: presencaSim.checked ? presencaSim.value : presencaNao.value,
        ingresso
    };

    participantes.push(participante);
    console.log(participantes);
    adicionarParticipanteNaTela(participante);
    document.getElementById('formulario').reset();
    document.getElementById('novidades').style.display = 'none';
    // Após resetar o formulário, certifique-se de que nenhum checkbox de presença esteja marcado
    if (presencaSim) presencaSim.checked = false;
    if (presencaNao) presencaNao.checked = false;
}

function adicionarParticipanteNaTela(participante) {
    const lista = document.getElementById('lista-participantes');
    const div = document.createElement('div');
    div.className = 'participante';

    if (participante.ingresso === 'VIP') div.classList.add('vip');
    if (participante.ingresso === 'Convidado') div.classList.add('convidado');

    div.innerHTML = `
        <p><strong>Nome:</strong> ${participante.nome}</p>
        <p><strong>Email:</strong> ${participante.email}</p>
        <p><strong>Presença:</strong> ${participante.presenca}</p>
        <p><strong>Ingresso:</strong> ${participante.ingresso}</p>
    `;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'remover';
    btnRemover.onclick = () => div.remove();

    div.appendChild(btnRemover);
    lista.appendChild(div);
}

function limparDados() {
    document.getElementById('formulario').reset();
    document.getElementById('novidades').style.display = 'none';
}

function configurarNovidades() {
    document.addEventListener('change', (e) => {
        if (e.target.name === 'novidades') {
            const mostrar = e.target.value === 'sim' && e.target.checked;
            document.getElementById('novidades').style.display = mostrar ? 'block' : 'none';

            // Desmarcar o outro checkbox de novidades para simular radio
            if (e.target.value === 'sim' && e.target.checked) {
                document.querySelector('input[name="novidades"][value="nao"]').checked = false;
            } else if (e.target.value === 'nao' && e.target.checked) {
                document.querySelector('input[name="novidades"][value="sim"]').checked = false;
                document.getElementById('novidades').style.display = 'none'; // Esconder se 'Não' for marcado
            }
        } else if (e.target.name === 'presenca') {
            // Desmarcar o outro checkbox de presença para simular radio
            if (e.target.value === 'sim' && e.target.checked) {
                document.querySelector('input[name="presenca"][value="nao"]').checked = false;
            } else if (e.target.value === 'nao' && e.target.checked) {
                document.querySelector('input[name="presenca"][value="sim"]').checked = false;
            }
        }
    });
}

// Função para atualizar a data e hora
function atualizarDataHora() {
    const elemento = document.getElementById('data-hora');
    const agora = new Date();
    const opcoes = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    elemento.textContent = agora.toLocaleDateString('pt-BR', opcoes);
}

setInterval(atualizarDataHora, 1000);

atualizarDataHora();

window.onload = () => {
    alert('Seja bem-vindo ao nosso sistema!');
    exibirDataHora();
    configurarNovidades();

    // Adicionar event listeners para os botões
    const botaoCadastrar = document.querySelector('.botao.cadastrar');
    if (botaoCadastrar) {
        botaoCadastrar.addEventListener('click', cadastrar);
    }

    const botaoLimpar = document.querySelector('.botao.limpar');
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', limparDados);
    }
};