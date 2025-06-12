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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || (!presencaSim.checked && !presencaNao.checked)) {
        alert('Por favor, preencha todos os campos obrigatórios e selecione uma opção de presença.');
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
}

function adicionarParticipanteNaTela(participante) {
    const lista = document.getElementById('lista-participantes');
    const div = document.createElement('div');
    div.className = 'participante';

    if (participante.ingresso === 'vip') div.classList.add('vip');
    if (participante.ingresso === 'convidado') div.classList.add('convidado');

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
        const target = e.target;

        // Simular radio nos checkboxes
        if (target.name === 'novidades') {
            const outros = document.querySelectorAll(`input[name="novidades"]:not([value="${target.value}"])`);
            outros.forEach(cb => cb.checked = false);

            document.getElementById('novidades').style.display = target.value === 'sim' && target.checked ? 'block' : 'none';
        }

        if (target.name === 'presenca') {
            const outros = document.querySelectorAll(`input[name="presenca"]:not([value="${target.value}"])`);
            outros.forEach(cb => cb.checked = false);
        }
    });
}

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

window.onload = () => {
    const mensagemBoasVindas = document.getElementById('mensagem-boas-vindas');
    const botaoFechar = mensagemBoasVindas.querySelector('.botao-fechar');

    mensagemBoasVindas.classList.add('visivel');

    const fecharMensagem = () => {
        mensagemBoasVindas.classList.remove('visivel');
    };

    botaoFechar.addEventListener('click', fecharMensagem);

    setTimeout(() => {
        if (mensagemBoasVindas.classList.contains('visivel')) {
            fecharMensagem();
        }
    }, 5000);

    exibirDataHora();
    configurarNovidades();

    const botaoCadastrar = document.querySelector('.botao.cadastrar');
    if (botaoCadastrar) botaoCadastrar.addEventListener('click', cadastrar);

    const botaoLimpar = document.querySelector('.botao.limpar');
    if (botaoLimpar) botaoLimpar.addEventListener('click', limparDados);
};
