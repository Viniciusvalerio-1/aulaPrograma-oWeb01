// Animações de entrada das seções
function fadeInSections() {
    const sections = document.querySelectorAll('main section, main .image-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200); 
    });
}

// Menu responsivo (hamburger) - Adiciona classe para mobile
function initMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.classList.add('hamburger');
        hamburger.style.display = 'none'; 
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.fontSize = '24px';
        hamburger.style.color = 'white';
        hamburger.style.cursor = 'pointer';
        hamburger.style.position = 'absolute';
        hamburger.style.top = '20px';
        hamburger.style.right = '20px';
        
        document.querySelector('header').appendChild(hamburger);
        
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                nav.classList.add('mobile');
            } else {
                hamburger.style.display = 'none';
                nav.classList.remove('mobile', 'active');
            }
        });
        
        // Inicializar no load
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            nav.classList.add('mobile');
        }
    }
}

// Máscaras para CPF e CEP 
function applyMasks() {
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = v;
        });
    }
}

// Validação e confirmação do formulário
function initFormValidation() {
    const form = document.getElementById('cadastro');
    const confirmacao = document.getElementById('confirmacao');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const fields = ['nome', 'email', 'cpf', 'nascimento', 'cep', 'endereco', 'cidade', 'estado'];
            
            fields.forEach(field => {
                const input = document.getElementById(field);
                const error = document.getElementById('error-' + field);
                if (!input.checkValidity()) {
                    error.textContent = 'Campo obrigatório ou inválido.';
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    error.textContent = '';
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                confirmacao.style.display = 'block';
                form.style.display = 'none';

                console.log('Formulário enviado com sucesso!');
            }
        });
        
        // Limpar erros ao focar
        document.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('focus', function() {
                this.classList.remove('invalid');
                const error = document.getElementById('error-' + this.id);
                if (error) error.textContent = '';
            });
        });
    }
}

// Inicializar tudo ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    fadeInSections(); // Animações de entrada
    initMobileMenu(); // Menu responsivo
    applyMasks(); // Máscaras
    initFormValidation(); // Validação
});