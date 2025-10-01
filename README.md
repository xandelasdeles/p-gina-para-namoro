# Nosso Amor ❤️

Um site romântico, moderno e interativo dedicado ao amor do casal.

## 🎯 Funcionalidades

### ✨ Tela de Introdução
- Texto animado "Te Amo ❤️"
- Coração pulsando com efeito glow
- Seleção de música inicial (Iris ou Photograph)
- Botão de entrada com animação

### 💕 Seções Principais

#### 1. Nosso Amor
- História personalizada do casal
- Contador automático de tempo juntos (anos, meses, dias)
- Foto principal em destaque com efeito glow
- Animações suaves de entrada

#### 2. Contagem Regressiva
- Timer animado até data específica (03/10/2025)
- Exibição de dias, horas, minutos e segundos
- Poema romântico com fade-in linha por linha
- Mensagem personalizada

#### 3. Nossa Galeria
- 6 fotos em estilo polaroid com rotação aleatória
- Hover com zoom e sombra
- Lightbox ao clicar com legenda
- Grid responsivo

#### 4. Mural de Recados
- **Integração completa com Baserow API**
- Adicionar recados com nome e mensagem
- Exibição em estilo post-it colorido
- Preview em modal ao clicar
- Botão de exclusão
- Cores alternadas automaticamente
- Animações de entrada

#### 5. Nossa Música
- Dois players de áudio independentes
- Controles: Play, Pause, Stop
- Slider de volume funcional
- Música selecionada na intro inicia automaticamente
- Volume inicial em 70%

### 🎨 Efeitos Visuais

#### Background Animado
- ⭐ Estrelas piscando
- ❤️ Corações flutuando
- 🌸 Pétalas caindo
- Animações CSS suaves

#### Interações
- Mini corações aparecem ao clicar na tela
- Frases de amor aleatórias a cada 20 segundos
- Easter egg: digite "amor" para chuva de pétalas

### 🌓 Modo Escuro/Claro
- Toggle no header
- Transição suave entre temas
- Salvo no LocalStorage

### 💾 LocalStorage
- Música selecionada
- Última aba visitada
- Nome do autor no mural
- Tema escolhido (claro/escuro)

### 📱 PWA (Progressive Web App)
- Instalável no celular como app
- Funciona offline
- Ícones personalizados
- Service Worker configurado

## 🚀 Como Usar

### Instalação Local

1. **Clone ou baixe os arquivos**
```bash
cd caminho/para/splitwise
```

2. **Execute um servidor local**
```bash
# Python 3
python -m http.server 8080

# Node.js (http-server)
npx http-server -p 8080

# PHP
php -S localhost:8080
```

3. **Abra no navegador**
```
http://localhost:8080
```

### Arquivos de Áudio

Para que os players funcionem, adicione os arquivos de música:
- `iris.mp3` - Música principal
- `photograph.mp3` - Música secundária

Coloque os arquivos na mesma pasta do `index.html`.

## 🔧 Configuração

### Personalizar Datas

Edite no arquivo `script.js`:

```javascript
this.startDate = new Date('2023-03-15T00:00:00'); // Data de início do relacionamento
this.targetDate = new Date('2025-10-03T00:00:00'); // Data alvo para contagem
```

### API Baserow

A integração já está configurada:
- **Endpoint**: `https://api.baserow.io/api/database/rows/table/689174/`
- **Token**: `AWZiAGvB73hrext58UZvVdBR1caahROH`
- **Campos**: `Author`, `Messages`, `Created_at`

### Personalizar Fotos

Substitua as URLs no array `galleryPhotos` em `script.js`:

```javascript
this.galleryPhotos = [
    { src: 'sua-foto-1.jpg', caption: 'Legenda 1' },
    { src: 'sua-foto-2.jpg', caption: 'Legenda 2' },
    // ...
];
```

### Personalizar Textos

Edite diretamente no `index.html`:
- História do casal (seção "Nosso Amor")
- Mensagem da contagem regressiva
- Poema romântico

## 🎨 Cores e Temas

### Tema Claro (Padrão)
- Rosa: `#ff6b9d`
- Pink: `#ff1493`
- Dourado: `#ffd93d`
- Gradiente: `#ff9a9e → #fecfef → #ffd1d1`

### Tema Escuro
- Fundo: `#2c1810 → #8b1538`
- Texto: `#e0e0e0`
- Cards: `rgba(30, 30, 30, 0.9)`

## 📱 Responsividade

O site é totalmente responsivo:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Ajustes de grid e espaçamento
- **Mobile**: Layout otimizado, navegação simplificada

### Breakpoints
- `768px`: Tablet
- `480px`: Mobile

## 🌟 Recursos Técnicos

### Tecnologias
- HTML5 semântico
- CSS3 com animações e gradientes
- JavaScript ES6+ (Classes, Async/Await)
- Font Awesome 6.0
- Google Fonts (Poppins + Dancing Script)

### APIs
- Baserow REST API
- LocalStorage API
- Service Worker API
- Audio API

### Animações
- CSS Keyframes
- Transform e Transition
- Opacity e Scale
- Rotate e Translate

## 🐛 Solução de Problemas

### Música não toca
- Verifique se os arquivos `iris.mp3` e `photograph.mp3` existem
- Alguns navegadores bloqueiam autoplay - interaja com a página primeiro

### Recados não carregam
- Verifique a conexão com internet
- Confirme se a API Baserow está acessível
- Abra o Console do navegador (F12) para ver erros

### PWA não instala
- Use HTTPS ou localhost
- Verifique se o Service Worker está registrado
- Limpe o cache do navegador

## 📄 Estrutura de Arquivos

```
splitwise/
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica e funcionalidades
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker
├── README.md          # Este arquivo
├── iris.mp3           # Música 1 (adicionar)
└── photograph.mp3     # Música 2 (adicionar)
```

## 💝 Créditos

Desenvolvido com muito amor e carinho para celebrar um relacionamento especial.

**Tipografia**: Poppins & Dancing Script (Google Fonts)  
**Ícones**: Font Awesome 6.0  
**API**: Baserow  
**Imagens**: Unsplash (placeholder)

---

**Feito com ❤️ para você**
