const participantes = [];

function exibirDataHora() {
    const dataHora = new Date();
    document.getElementById('data-hora').textContent = dataHora.toLocaleString();
}

function criarFormulario() {
    const container = document.querySelector('.formulario-container');
    const form = document.createElement('form');
    form.className = 'formulario';
    form.setAttribute('id', 'formulario');

    const campos = [
        { label: 'Nome', type: 'text', id: 'nome' },
        { label: 'E-mail', type: 'text', id: 'email' },
    ];

    campos.forEach(campo => {
        const label = document.createElement('label');
        label.setAttribute('for', campo.id);
        label.textContent = campo.label;
        const input = document.createElement('input');
        input.type = campo.type;
        input.id = campo.id;
        input.name = campo.id;
        form.appendChild(label);
        form.appendChild(input);
    });

    const presencaLabel = document.createElement('label');
    presencaLabel.textContent = 'Presença confirmada';
    form.appendChild(presencaLabel);

    const presencaDiv = document.createElement('div');
    presencaDiv.className = 'checkbox';
    presencaDiv.innerHTML = `
        <label><input type="checkbox" name="presenca" value="sim"> Sim</label>
        <label><input type="checkbox" name="presenca" value="nao"> Não</label>
    `;
    form.appendChild(presencaDiv);

    const ingressoLabel = document.createElement('label');
    ingressoLabel.setAttribute('for', 'ingresso');
    ingressoLabel.textContent = 'Tipo de ingresso';
    const select = document.createElement('select');
    select.name = 'ingresso';
    select.id = 'ingresso';
    ['Padrão', 'VIP', 'Convidado'].forEach(op => {
        const option = document.createElement('option');
        option.value = op;
        option.textContent = op;
        select.appendChild(option);
    });
    form.appendChild(ingressoLabel);
    form.appendChild(select);

    const novidadesLabel = document.createElement('label');
    novidadesLabel.textContent = 'Deseja receber novidades do evento?';
    form.appendChild(novidadesLabel);

    const novidadesDiv = document.createElement('div');
    novidadesDiv.className = 'checkbox';
    novidadesDiv.innerHTML = `
        <label><input type="checkbox" name="novidades" value="sim"> Sim</label>
        <label><input type="checkbox" name="novidades" value="nao"> Não</label>
    `;
    form.appendChild(novidadesDiv);

    const novidadesExtra = document.createElement('div');
    novidadesExtra.className = 'novidades';
    novidadesExtra.id = 'novidades';
    novidadesExtra.innerHTML = `
        <p>Qual assunto te interessa?</p>
        <div class="checkbox">
            <label><input type="checkbox" name="interesses" value="promocoes"> Promoções</label>
            <label><input type="checkbox" name="interesses" value="avisos"> Avisos</label>
            <label><input type="checkbox" name="interesses" value="noticias"> Notícias</label>
        </div>
    `;
    form.appendChild(novidadesExtra);

    const botaoCadastrar = document.createElement('button');
    botaoCadastrar.type = 'button';
    botaoCadastrar.className = 'botao cadastrar';
    botaoCadastrar.textContent = 'Cadastrar Participante';
    botaoCadastrar.onclick = cadastrar;

    const botaoLimpar = document.createElement('button');
    botaoLimpar.type = 'button';
    botaoLimpar.className = 'botao limpar';
    botaoLimpar.textContent = 'Limpar Campos';
    botaoLimpar.onclick = limparDados;

    form.appendChild(botaoCadastrar);
    form.appendChild(botaoLimpar);

    container.appendChild(form);
}

function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const presenca = document.querySelector('input[name="presenca"]:checked');
    const ingresso = document.getElementById('ingresso').value;

    if (!nome || !email || !presenca) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const participante = {
        nome,
        email,
        presenca: presenca.value,
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
};