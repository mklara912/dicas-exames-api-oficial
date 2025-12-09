// URL da sua API - AJUSTE AQUI para o endereço correto da sua API
const API_URL = 'http://localhost:3000/exames'; // Altere a porta se necessário

// Função para buscar exames da API
async function fetchExames() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar exames da API');
        }
        
        const exames = await response.json();
        return exames;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Função para exibir os exames na tela
function displayExams(exames) {
    const examsList = document.getElementById('examsList');
    
    if (!exames || exames.length === 0) {
        examsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Não foi possível carregar os exames. Verifique a conexão com a API.</p>
            </div>
        `;
        return;
    }
    
    examsList.innerHTML = exames.map(exam => `
        <div class="exam-card">
            <div class="exam-item"><span class="exam-label">Nome do exame:</span> ${exam.nome}</div>
            <div class="exam-item"><span class="exam-label">Com a frequência:</span> ${exam.frequencia}</div>
            <div class="exam-item"><span class="exam-label">Descrição:</span> ${exam.descricao}</div>
        </div>
    `).join('');
}

// Função para mostrar loading
function showLoading() {
    const examsList = document.getElementById('examsList');
    examsList.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⏳</div>
            <p>Carregando exames...</p>
        </div>
    `;
}

// Inicializar: buscar e exibir exames
async function init() {
    showLoading();
    const exames = await fetchExames();
    displayExams(exames);
}

// Executar quando a página carregar
init();