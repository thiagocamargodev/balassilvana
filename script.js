let balasData = [];

// Carregar dados — usa data.js (window.balasData) quando disponível
async function loadData() {
    try {
        if (window.balasData && Array.isArray(window.balasData) && window.balasData.length) {
            balasData = window.balasData;
            renderGrid();
            return;
        }

        // fallback — tenta carregar data.json (funciona se servido por servidor)
        const response = await fetch('data.json');
        balasData = await response.json();
        renderGrid();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Renderizar grid com cards
function renderGrid() {
    const grid = document.getElementById('grid');
    if (!grid) return;
    grid.innerHTML = '';

    balasData.forEach((bala, index) => {
        const thumb = (Array.isArray(bala.imagens) && bala.imagens.length) ? bala.imagens[0] : (bala.imagem || '');
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${thumb}" alt="${bala.nome}">
            <div class="card-overlay">
                <div class="card-name">${bala.nome}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `produto.html?id=${index}`;
        });

        grid.appendChild(card);
    });
}

// Menu hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Botão banner
const btnBanner = document.querySelector('.btn-banner');
if (btnBanner) {
    btnBanner.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        const el = document.getElementById('catalogo');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', loadData);
