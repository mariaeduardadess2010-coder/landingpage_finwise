// Smooth Scroll para links da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.getElementById('mobileMenu').classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Intersection Observer para animações de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// ANIMAÇÃO DOS NÚMEROS COM CRESCIMENTO CONTÍNUO
const statNumbers = document.querySelectorAll('.stat-number');
let numerosAnimados = false;
let intervaloUsuarios = null;

function animarNumeros() {
    if (numerosAnimados) return;
    
    const secaoStats = document.querySelector('.stats');
    if (!secaoStats) return;
    
    const posicao = secaoStats.getBoundingClientRect().top;
    const tela = window.innerHeight;
    
    if (posicao < tela) {
        numerosAnimados = true;
        
        statNumbers.forEach(stat => {
            const alvo = parseFloat(stat.getAttribute('data-target'));
            const temDecimal = alvo % 1 !== 0;
            let atual = 0;
            const incremento = alvo / 50;
            
            const atualizar = () => {
                if (atual < alvo) {
                    atual += incremento;
                    if (temDecimal) {
                        stat.textContent = atual.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(atual);
                    }
                    setTimeout(atualizar, 20);
                } else {
                    stat.textContent = temDecimal ? alvo.toFixed(1) : alvo.toLocaleString();
                    
                    // Identifica qual stat é (pelo ícone ou posição)
                    const cardPai = stat.closest('.stat-card');
                    const temIconeUsuarios = cardPai && cardPai.querySelector('.fa-users');
                    
                    if (temIconeUsuarios) {
                        iniciarCrescimentoUsuarios(stat);
                    }
                }
            };
            atualizar();
        });
    }
}

function iniciarCrescimentoUsuarios(elemento) {
    if (intervaloUsuarios) clearInterval(intervaloUsuarios);
    
    let usuarios = 50000;
    
    intervaloUsuarios = setInterval(() => {
        usuarios += 0.5;
        elemento.textContent = Math.floor(usuarios).toLocaleString();
        
        // Efeito de destaque
        elemento.style.transition = 'all 0.2s ease';
        elemento.style.color = '#fbbf24';
        elemento.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            elemento.style.color = '';
            elemento.style.transform = '';
        }, 300);
    }, 2000);
}

// Efeito suave nos botões
const storeBtns = document.querySelectorAll('.store-btn');
storeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Eventos
window.addEventListener('scroll', animarNumeros);
window.addEventListener('load', () => {
    setTimeout(animarNumeros, 500);
    
    document.querySelectorAll('.fade-up').forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// Efeito hover nos cards de plano
const planCards = document.querySelectorAll('.plan-card');
planCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Parallax no hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < 600) {
        hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
        hero.style.opacity = 1 - window.scrollY * 0.002;
    }
});

// Animação das barras
const bars = document.querySelectorAll('.bar');
bars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
        bar.style.background = 'linear-gradient(180deg, #059669, #047857)';
        bar.style.transform = 'scaleY(1.05)';
    });
    
    bar.addEventListener('mouseleave', () => {
        bar.style.background = 'linear-gradient(180deg, #10b981, #059669)';
        bar.style.transform = 'scaleY(1)';
    });
});

// Controlar header ao scroll
let ultimoScroll = 0;
window.addEventListener('scroll', () => {
    const scrollAtual = window.pageYOffset;
    if (scrollAtual > ultimoScroll && scrollAtual > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    ultimoScroll = scrollAtual;
});

// Reset do menu mobile em resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});