// ===== NOSSO AMOR - SITE ROMÂNTICO =====

class NossoAmor {
    constructor() {
        this.startDate = new Date('2025-06-20T00:00:00'); // Data de início do relacionamento
        this.targetDate = new Date('2025-10-04T10:00:00'); // Data alvo para contagem regressiva
        this.selectedMusic = null;
        this.audioPlayers = {
            iris: new Audio('msc/iris.mp3'),
            photograph: new Audio('msc/photograph.mp3'),
            TFT: new Audio('msc/TFT.mp3'),
            mari: new Audio('msc/mari.mp3')
        };
        
        // Baserow API
        this.baserowAPI = {
            messages: {
                endpoint: 'https://api.baserow.io/api/database/rows/table/689174/',
                token: 'AWZiAGvB73hrext58UZvVdBR1caahROH'
            },
            complaints: {
                endpoint: 'https://api.baserow.io/api/database/rows/table/691159/',
                token: 'AWZiAGvB73hrext58UZvVdBR1caahROH'
            }
        };
        
        // Frases de amor
        this.lovePhrases = [
            "Você é meu tudo! ❤️",
            "Te amo mais que tudo! 💕",
            "Meu coração é seu! 💖",
            "Você ilumina minha vida! ✨",
            "Juntos somos perfeitos! 👩‍❤️‍👨",
            "Meu amor por você é eterno! 🌹",
            "Você é minha felicidade! 😊",
            "Te amo infinitamente! 💑"
        ];
        
        // Fotos da galeria
        //Para adicionar outra foto basta colocar a foto na pasta img e adicionar o nome da foto no array
        this.galleryPhotos = [
            { src: 'img/1.jpeg', caption: 'Eu' },
            { src: 'img/2.jpeg', caption: 'Te' },
            { src: 'img/3.jpeg', caption: 'Amo' },
            { src: 'img/4.jpeg', caption: 'Muito' },
            { src: 'img/5.jpeg', caption: 'Meu Amor' },
            { src: 'img/6.jpeg', caption: '03/10/2025 ❤️},

        ];
        
        // Cores para post-its
        this.postItColors = ['#ffd1dc', '#fffacd', '#e0ffe0', '#e0f0ff', '#ffe0f0', '#fff0e0'];
        
        // Cores para reclamações (tons mais escuros/sérios)
        this.complaintColors = ['#ffcccb', '#ffe4b5', '#ffdab9', '#ffb6c1', '#ffc0cb', '#ffe4e1'];
        
        // Easter egg
        this.typedText = '';
        
        this.init();
    }
    
    init() {
        this.setupIntro();
        this.setupNavigation();
        this.setupTimeCounter();
        this.setupCountdown();
        this.setupGallery();
        this.setupMural();
        this.setupComplaints();
        this.setupMusicPlayers();
        this.setupClickHearts();
        this.startLovePhrases();
        this.setupEasterEgg();
        this.setupPWA();
    }
    
    // ===== INTRO =====
    setupIntro() {
        const introScreen = document.getElementById('intro-screen');
        const mainApp = document.getElementById('main-app');
        const enterBtn = document.getElementById('enter-btn');
        const musicBtns = document.querySelectorAll('.music-btn');
        
        musicBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                musicBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedMusic = btn.dataset.music;
                localStorage.setItem('selectedMusic', this.selectedMusic);
            });
        });
        
        enterBtn.addEventListener('click', () => {
            introScreen.classList.remove('active');
            mainApp.classList.add('active');
            
            // Tocar música selecionada
            if (this.selectedMusic) {
                setTimeout(() => {
                    this.audioPlayers[this.selectedMusic].volume = 0.05;
                    this.audioPlayers[this.selectedMusic].play();
                }, 500);
            }
        });
    }
    
    // ===== NAVEGAÇÃO =====
    setupNavigation() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                
                // Remover active de todos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Adicionar active ao selecionado
                btn.classList.add('active');
                document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
                
                // Salvar última aba
                localStorage.setItem('lastTab', tabName);
            });
        });
        
        // Restaurar última aba
        const lastTab = localStorage.getItem('lastTab');
        if (lastTab) {
            const btn = document.querySelector(`.tab-btn[data-tab="${lastTab}"]`);
            if (btn) btn.click();
        }
    }
    
    // ===== CONTADOR DE TEMPO =====
    setupTimeCounter() {
        this.updateTimeCounter();
        setInterval(() => this.updateTimeCounter(), 1000);
    }
    
    updateTimeCounter() {
        const now = new Date();
        const diff = now - this.startDate;
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        
        this.animateNumber('years', years);
        this.animateNumber('months', months);
        this.animateNumber('days', days);
    }
    
    animateNumber(id, value) {
        const element = document.getElementById(id);
        if (!element) return;
        
        const current = parseInt(element.textContent) || 0;
        if (current !== value) {
            element.textContent = value;
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // ===== CONTAGEM REGRESSIVA =====
    setupCountdown() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }
    
    updateCountdown() {
        const now = new Date();
        const diff = this.targetDate - now;
        
        if (diff <= 0) {
            document.querySelector('.countdown-container h3').textContent = '🎉 Hoje é o grande dia! 🎉';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // ===== GALERIA =====
    setupGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        // Adicionar fotos
        this.galleryPhotos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.setProperty('--rotation', `${Math.random() * 10 - 5}deg`);
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}" class="gallery-img">
                <div class="gallery-caption">${photo.caption}</div>
            `;
            
            item.addEventListener('click', () => {
                lightboxImg.src = photo.src;
                lightboxCaption.textContent = photo.caption;
                lightbox.classList.add('active');
            });
            
            galleryGrid.appendChild(item);
        });
        
        // Fechar lightbox
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
    
    // ===== MURAL DE RECADOS =====
    setupMural() {
        const addBtn = document.getElementById('add-message-btn');
        const authorInput = document.getElementById('author-input');
        const messageInput = document.getElementById('message-input');
        
        // Carregar recados
        this.loadMessages();
        
        // Adicionar recado
        addBtn.addEventListener('click', () => {
            const author = authorInput.value.trim();
            const message = messageInput.value.trim();
            
            if (author && message) {
                this.addMessage(author, message);
                authorInput.value = '';
                messageInput.value = '';
                
                // Salvar nome do autor
                localStorage.setItem('authorName', author);
            } else {
                alert('Por favor, preencha todos os campos!');
            }
        });
        
        // Restaurar nome do autor
        const savedAuthor = localStorage.getItem('authorName');
        if (savedAuthor) {
            authorInput.value = savedAuthor;
        }
    }
    
    async loadMessages() {
        try {
            const response = await fetch(`${this.baserowAPI.messages.endpoint}?user_field_names=true`, {
                headers: {
                    'Authorization': `Token ${this.baserowAPI.messages.token}`
                }
            });
            
            if (!response.ok) throw new Error('Erro ao carregar mensagens');
            
            const data = await response.json();
            this.displayMessages(data.results || []);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('messages-container').innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #999;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Não foi possível carregar os recados. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
    
    displayMessages(messages) {
        const container = document.getElementById('messages-container');
        container.innerHTML = '';
        
        messages.forEach((msg, index) => {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.style.setProperty('--post-it-color', this.postItColors[index % this.postItColors.length]);
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Try to get formatted date from database, fallback to Created_at
            let formattedDate;
            if (msg.Formatted_Date) {
                formattedDate = msg.Formatted_Date;
            } else if (msg.Created_at) {
                const date = new Date(msg.Created_at);
                formattedDate = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            } else {
                formattedDate = 'Data desconhecida';
            }
            
            card.innerHTML = `
                <div class="message-author">${msg.Author || 'Anônimo'}</div>
                <div class="message-text">${msg.Messages}</div>
                <div class="message-date">${formattedDate}</div>
                <button class="message-delete" onclick="app.deleteMessage(${msg.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Abrir modal ao clicar
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.message-delete')) {
                    this.showMessageModal(msg);
                }
            });
            
            container.appendChild(card);
        });
    }
    
    async addMessage(author, message) {
        try {
            // Create formatted date
            const now = new Date();
            const formattedDate = now.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            const response = await fetch(`${this.baserowAPI.messages.endpoint}?user_field_names=true`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${this.baserowAPI.messages.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Author: author,
                    Messages: message,
                    Formatted_Date: formattedDate
                })
            });
            
            if (response.ok) {
                this.loadMessages();
            } else {
                alert('Erro ao adicionar recado. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar recado. Verifique sua conexão.');
        }
    }
    
    async deleteMessage(id) {
        if (!confirm('Deseja realmente excluir este recado?')) return;
        
        try {
            const response = await fetch(`${this.baserowAPI.messages.endpoint}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${this.baserowAPI.messages.token}`
                }
            });
            
            if (response.ok) {
                this.loadMessages();
            } else {
                alert('Erro ao excluir recado.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir recado.');
        }
    }
    
    showMessageModal(msg) {
        const modal = document.getElementById('message-modal');
        
        // Try to get formatted date from database, fallback to Created_at
        let formattedDate;
        if (msg.Formatted_Date) {
            formattedDate = msg.Formatted_Date;
        } else if (msg.Created_at) {
            const date = new Date(msg.Created_at);
            formattedDate = date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });
        } else {
            formattedDate = 'Data desconhecida';
        }
        
        document.getElementById('modal-author').textContent = msg.Author || 'Anônimo';
        document.getElementById('modal-message').textContent = msg.Messages;
        document.getElementById('modal-date').textContent = formattedDate;
        
        modal.classList.add('active');
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.onclick = () => modal.classList.remove('active');
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // ===== CANTO DAS RECLAMAÇÕES =====
    setupComplaints() {
        const addBtn = document.getElementById('add-complaint-btn');
        const authorInput = document.getElementById('complaint-author-input');
        const aboutInput = document.getElementById('complaint-about-input');
        const severityInput = document.getElementById('complaint-severity-input');
        const textInput = document.getElementById('complaint-text-input');
        
        // Carregar reclamações
        this.loadComplaints();
        
        // Adicionar reclamação
        addBtn.addEventListener('click', () => {
            const author = authorInput.value.trim();
            const about = aboutInput.value;
            const severity = severityInput.value;
            const text = textInput.value.trim();
            
            if (author && about && severity && text) {
                this.addComplaint(author, about, severity, text);
                authorInput.value = '';
                aboutInput.value = '';
                severityInput.value = '';
                textInput.value = '';
                
                // Salvar nome do autor
                localStorage.setItem('complaintAuthorName', author);
            } else {
                alert('Por favor, preencha todos os campos!');
            }
        });
        
        // Restaurar nome do autor
        const savedAuthor = localStorage.getItem('complaintAuthorName');
        if (savedAuthor) {
            authorInput.value = savedAuthor;
        }
    }
    
    async loadComplaints() {
        try {
            const response = await fetch(`${this.baserowAPI.complaints.endpoint}?user_field_names=true`, {
                headers: {
                    'Authorization': `Token ${this.baserowAPI.complaints.token}`
                }
            });
            
            if (!response.ok) throw new Error('Erro ao carregar reclamações');
            
            const data = await response.json();
            this.displayComplaints(data.results || []);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('complaints-container').innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #999;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Não foi possível carregar as reclamações. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
    
    displayComplaints(complaints) {
        const container = document.getElementById('complaints-container');
        container.innerHTML = '';
        
        complaints.forEach((complaint, index) => {
            const card = document.createElement('div');
            card.className = 'complaint-card';
            card.style.setProperty('--complaint-color', this.complaintColors[index % this.complaintColors.length]);
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Try to get formatted date from database, fallback to Created_at
            let formattedDate;
            if (complaint.Formatted_Date) {
                formattedDate = complaint.Formatted_Date;
            } else if (complaint.Created_at) {
                const date = new Date(complaint.Created_at);
                formattedDate = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            } else {
                formattedDate = 'Data desconhecida';
            }
            
            // Truncar texto se for muito longo
            const maxLength = 100;
            const truncatedText = complaint.Complaint.length > maxLength 
                ? complaint.Complaint.substring(0, maxLength) + '...' 
                : complaint.Complaint;
            
            card.innerHTML = `
                <div class="complaint-header">
                    <span class="complaint-author">${complaint.Author || 'Anônimo'}</span>
                    <span class="complaint-severity">${complaint.Severity || '😤'}</span>
                </div>
                <div class="complaint-about">Reclamação sobre: <strong>${complaint.About_Who || 'Desconhecido'}</strong></div>
                <div class="complaint-text">${truncatedText}</div>
                <div class="complaint-date">${formattedDate}</div>
                <button class="complaint-delete" onclick="app.deleteComplaint(${complaint.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Abrir modal ao clicar
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.complaint-delete')) {
                    this.showComplaintModal(complaint);
                }
            });
            
            container.appendChild(card);
        });
    }
    
    async addComplaint(author, aboutWho, severity, complaint) {
        try {
            // Create formatted date
            const now = new Date();
            const formattedDate = now.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            const response = await fetch(`${this.baserowAPI.complaints.endpoint}?user_field_names=true`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${this.baserowAPI.complaints.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Author: author,
                    About_Who: aboutWho,
                    Severity: severity,
                    Complaint: complaint,
                    Formatted_Date: formattedDate
                })
            });
            
            if (response.ok) {
                this.loadComplaints();
            } else {
                alert('Erro ao adicionar reclamação. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar reclamação. Verifique sua conexão.');
        }
    }
    
    async deleteComplaint(id) {
        if (!confirm('Deseja realmente excluir esta reclamação?')) return;
        
        try {
            const response = await fetch(`${this.baserowAPI.complaints.endpoint}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${this.baserowAPI.complaints.token}`
                }
            });
            
            if (response.ok) {
                this.loadComplaints();
            } else {
                alert('Erro ao excluir reclamação.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir reclamação.');
        }
    }
    
    showComplaintModal(complaint) {
        const modal = document.getElementById('complaint-modal');
        
        // Try to get formatted date from database, fallback to Created_at
        let formattedDate;
        if (complaint.Formatted_Date) {
            formattedDate = complaint.Formatted_Date;
        } else if (complaint.Created_at) {
            const date = new Date(complaint.Created_at);
            formattedDate = date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });
        } else {
            formattedDate = 'Data desconhecida';
        }
        
        document.getElementById('complaint-modal-author').textContent = complaint.Author || 'Anônimo';
        document.getElementById('complaint-modal-severity').textContent = complaint.Severity || '😤';
        document.getElementById('complaint-modal-about-who').textContent = complaint.About_Who || 'Desconhecido';
        document.getElementById('complaint-modal-text').textContent = complaint.Complaint;
        document.getElementById('complaint-modal-date').textContent = formattedDate;
        
        modal.classList.add('active');
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.onclick = () => modal.classList.remove('active');
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // ===== PLAYERS DE MÚSICA =====
    setupMusicPlayers() {
        // Configurar volume inicial
        Object.values(this.audioPlayers).forEach(audio => {
            audio.volume = 0.3;
        });
        
        // Play buttons
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const player = btn.dataset.player;
                this.audioPlayers[player].play();
            });
        });
        
        // Pause buttons
        document.querySelectorAll('.pause-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const player = btn.dataset.player;
                this.audioPlayers[player].pause();
            });
        });
        
        // Stop buttons
        document.querySelectorAll('.stop-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const player = btn.dataset.player;
                this.audioPlayers[player].pause();
                this.audioPlayers[player].currentTime = 0;
            });
        });
        
        // Volume sliders
        document.querySelectorAll('.volume-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const player = slider.dataset.player;
                this.audioPlayers[player].volume = e.target.value / 100;
                
                // Atualizar gradiente do slider
                const percent = e.target.value;
                e.target.style.background = `linear-gradient(to right, #ff6b9d 0%, #ff6b9d ${percent}%, #ddd ${percent}%, #ddd 100%)`;
            });
        });
    }
    
    // ===== CORAÇÕES AO CLICAR =====
    setupClickHearts() {
        document.addEventListener('click', (e) => {
            // Não criar coração se clicar em botões ou inputs
            if (e.target.closest('button, input, textarea, a')) return;
            
            this.createClickHeart(e.clientX, e.clientY);
        });
    }
    
    createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        heart.innerHTML = '❤';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    // ===== FRASES DE AMOR =====
    startLovePhrases() {
        setInterval(() => {
            this.showLovePhrase();
        }, 20000);
        
        // Primeira frase após 5 segundos
        setTimeout(() => this.showLovePhrase(), 5000);
    }
    
    showLovePhrase() {
        const phrase = this.lovePhrases[Math.floor(Math.random() * this.lovePhrases.length)];
        const bubble = document.createElement('div');
        bubble.className = 'phrase-bubble';
        bubble.textContent = phrase;
        bubble.style.left = Math.random() * 80 + 10 + '%';
        
        document.getElementById('love-phrases').appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, 6000);
    }
    
    // ===== EASTER EGG =====
    setupEasterEgg() {
        document.addEventListener('keydown', (e) => {
            this.typedText += e.key.toLowerCase();
            
            if (this.typedText.includes('amor')) {
                this.triggerPetalRain();
                this.typedText = '';
            }
            
            // Reset após 2 segundos
            setTimeout(() => {
                this.typedText = '';
            }, 2000);
        });
    }
    
    triggerPetalRain() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.textContent = '🌸';
                petal.style.position = 'fixed';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.top = '-50px';
                petal.style.fontSize = '2rem';
                petal.style.pointerEvents = 'none';
                petal.style.zIndex = '10000';
                petal.style.animation = 'fall 3s linear forwards';
                
                document.body.appendChild(petal);
                
                setTimeout(() => {
                    petal.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    // ===== PWA =====
    setupPWA() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registrado'))
                    .catch(err => console.log('Erro no Service Worker:', err));
            });
        }
    }
    
    // ===== LOCAL STORAGE =====
    loadFromLocalStorage() {
        this.selectedMusic = localStorage.getItem('selectedMusic');
    }
    
    saveToLocalStorage() {
        if (this.selectedMusic) {
            localStorage.setItem('selectedMusic', this.selectedMusic);
        }
    }
}

// Inicializar aplicação
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NossoAmor();
});

// Prevenir zoom no mobile
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('lightbox')?.classList.remove('active');
        document.getElementById('message-modal')?.classList.remove('active');
        document.getElementById('complaint-modal')?.classList.remove('active');
    }
});
