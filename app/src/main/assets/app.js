const sampleTalents = [
    {
        id: 1,
        name: 'Sarah Johnson',
        age: 28,
        profession: 'Actor',
        bio: 'Experienced stage actor with a passion for Shakespearean roles. Looking for new opportunities in film and television.',
        image: 'file:///android_res/drawable/sarah_johnson.jpg',
        skills: ['Theater', 'Film', 'Voice Acting'],
        cv: 'file:///android_res/drawable/sarah_johnson_cv.pdf',
        portfolio: 'https://sarahjohnson-portfolio.com',
        rating: 4.7,
        reviews: [
            { name: 'Alex Thompson', rating: 5, text: 'Sarah brought incredible depth to our production. Her interpretation of the character was brilliant!' },
            { name: 'Maria Garcia', rating: 4, text: 'Professional and dedicated. Her attention to detail in character development is impressive.' },
            { name: 'James Wilson', rating: 5, text: 'A true talent. Her performance was the highlight of our show.' }
        ]
    },
    {
        id: 2,
        name: 'Michael Chen',
        age: 32,
        profession: 'Musician',
        bio: 'Classically trained pianist and composer. Specializes in film scores and contemporary classical music.',
        image: 'file:///android_res/drawable/michael_chen.jpg',
        skills: ['Piano', 'Composition', 'Film Scoring'],
        cv: 'file:///android_res/drawable/michael_chen_cv.pdf',
        portfolio: 'https://michaelchen-music.com',
        rating: 4.9,
        reviews: [
            { name: 'Rachel Lee', rating: 5, text: 'Michael\'s compositions are breathtaking. He captured the essence of our film perfectly.' },
            { name: 'David Park', rating: 5, text: 'Working with Michael was a dream. His musical intuition is unmatched.' },
            { name: 'Sophie Martin', rating: 4, text: 'Incredible talent and very professional. Would definitely collaborate again.' }
        ]
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        age: 25,
        profession: 'Dancer',
        bio: 'Contemporary dancer with experience in ballet and modern dance. Currently performing with a local dance company.',
        image: 'file:///android_res/drawable/emma_rodriguez.jpg',
        skills: ['Contemporary', 'Ballet', 'Choreography'],
        cv: 'file:///android_res/drawable/emma_rodriguez_cv.pdf',
        portfolio: 'https://emmarodriguez-dance.com',
        rating: 4.5,
        reviews: [
            { name: 'Thomas Brown', rating: 4, text: 'Emma\'s choreography is innovative and captivating. A rising star in the dance world.' },
            { name: 'Olivia White', rating: 5, text: 'Her performances are mesmerizing. Such grace and technical precision!' },
            { name: 'Daniel Kim', rating: 4, text: 'Professional and creative. Brought fresh ideas to our production.' }
        ]
    },
    {
        id: 4,
        name: 'David Kim',
        age: 30,
        profession: 'Visual Artist',
        bio: 'Mixed media artist specializing in digital and traditional painting. Recent exhibitions in major galleries.',
        image: 'file:///android_res/drawable/david_kim.jpg',
        skills: ['Digital Art', 'Painting', 'Installation'],
        cv: 'file:///android_res/drawable/david_kim_cv.pdf',
        portfolio: 'https://davidkim-art.com',
        rating: 4.8,
        reviews: [
            { name: 'Ethan Taylor', rating: 5, text: 'David\'s work is groundbreaking. His use of mixed media creates stunning visual narratives.' },
            { name: 'Lily Chen', rating: 4, text: 'Incredible attention to detail and unique perspective. A true visionary.' },
            { name: 'Ryan Patel', rating: 5, text: 'Working with David was inspiring. His creativity knows no bounds.' }
        ]
    },
    {
        id: 5,
        name: 'Sophia Patel',
        age: 27,
        profession: 'Photographer',
        bio: 'Award-winning photographer with a focus on portrait and fashion photography. Published in major magazines.',
        image: 'file:///android_res/drawable/sophia_patel.jpg',
        skills: ['Portrait', 'Fashion', 'Editorial'],
        cv: 'file:///android_res/drawable/sophia_patel_cv.pdf',
        portfolio: 'https://sophiapatel-photography.com',
        rating: 4.6,
        reviews: [
            { name: 'Nathan Wong', rating: 5, text: 'Sophia has an incredible eye for detail. Her portraits capture the essence of her subjects.' },
            { name: 'Isabella Rossi', rating: 4, text: 'Professional and creative. Made everyone feel comfortable during the shoot.' },
            { name: 'Benjamin Lee', rating: 5, text: 'Her work speaks for itself. Truly exceptional talent.' }
        ]
    }
];

const chatHistory = {
    'Sarah George': [
        { sender: 'Sarah', message: 'Hi! I saw your profile and I think we could work well together on a project.', time: '10:30 AM' },
        { sender: 'You', message: 'That sounds interesting! What kind of project are you thinking about?', time: '10:32 AM' },
        { sender: 'Sarah', message: 'I\'m working on a short film and need someone with your skills for the soundtrack.', time: '10:35 AM' }
    ],
    'Michael Nash': [
        { sender: 'Michael', message: 'Hello! I really enjoyed your recent performance.', time: 'Yesterday' },
        { sender: 'You', message: 'Thank you! I\'m glad you liked it.', time: 'Yesterday' },
        { sender: 'Michael', message: 'Would you be interested in collaborating on a music project?', time: 'Yesterday' }
    ],
    'Walter White': [
        { sender: 'Walter', message: 'Jesse, We need to cook', time: '20 minutes ago' },
        { sender: 'You', message: 'Mr white, did Skyler go see Ted again :/', time: '18 minutes ago' }
    ]
};

let currentIndex = 0;
let currentView = 'main'; // 'main', 'messages', or 'profile'
let currentTalent = null;

function createTalentCard(talent) {
    const card = document.createElement('div');
    card.className = 'talent-card';

    // Add swipe indicators
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'swipe-indicator left';
    leftIndicator.textContent = 'NOPE';
    
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'swipe-indicator right';
    rightIndicator.textContent = 'LIKE';

    const image = document.createElement('img');
    image.className = 'talent-image';
    image.src = talent.image;
    image.alt = talent.name;
    image.onclick = () => showModal(talent);

    const info = document.createElement('div');
    info.className = 'talent-info';

    const name = document.createElement('h2');
    name.className = 'talent-name';
    name.textContent = `${talent.name}, ${talent.age}`;

    const profession = document.createElement('p');
    profession.className = 'talent-profession';
    profession.textContent = talent.profession;

    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';
    ratingContainer.innerHTML = `
        <span class="rating-stars">${'★'.repeat(Math.floor(talent.rating))}${'☆'.repeat(5 - Math.floor(talent.rating))}</span>
        <span class="rating-value">${talent.rating.toFixed(1)}</span>
    `;

    const bio = document.createElement('p');
    bio.className = 'talent-bio';
    bio.textContent = talent.bio;

    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-container';
    talent.skills.forEach(skill => {
        const chip = document.createElement('span');
        chip.className = 'skill-chip';
        chip.textContent = skill;
        skillsContainer.appendChild(chip);
    });

    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';

    const dislikeButton = document.createElement('button');
    dislikeButton.className = 'action-button dislike';
    dislikeButton.innerHTML = '✕';
    dislikeButton.onclick = handleDislike;

    const likeButton = document.createElement('button');
    likeButton.className = 'action-button like';
    likeButton.innerHTML = '♥';
    likeButton.onclick = handleLike;

    actionButtons.appendChild(dislikeButton);
    actionButtons.appendChild(likeButton);

    info.appendChild(name);
    info.appendChild(profession);
    info.appendChild(ratingContainer);
    info.appendChild(bio);
    info.appendChild(skillsContainer);

    card.appendChild(leftIndicator);
    card.appendChild(rightIndicator);
    card.appendChild(image);
    card.appendChild(info);
    card.appendChild(actionButtons);

    // Initialize Hammer.js
    const hammer = new Hammer(card);
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let currentRotation = 0;

    hammer.on('panstart', (e) => {
        isDragging = true;
        startX = e.center.x;
        card.classList.add('swiping');
    });

    hammer.on('panmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.center.x - startX;
        currentRotation = (currentX / 20) * (currentX > 0 ? 1 : -1);
        
        card.style.transform = `translateX(${currentX}px) rotate(${currentRotation}deg)`;
        
        // Show/hide indicators based on swipe direction
        if (currentX > 50) {
            rightIndicator.classList.add('visible');
            leftIndicator.classList.remove('visible');
            showSwipeFeedback('like', currentX / 100);
        } else if (currentX < -50) {
            leftIndicator.classList.add('visible');
            rightIndicator.classList.remove('visible');
            showSwipeFeedback('dislike', Math.abs(currentX) / 100);
        } else {
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
            hideSwipeFeedback();
        }
    });

    hammer.on('panend', (e) => {
        isDragging = false;
        card.classList.remove('swiping');
        
        const threshold = 100;
        if (Math.abs(currentX) > threshold) {
            if (currentX > 0) {
                card.classList.add('swipe-right');
                showSwipeFeedback('like', 1, true);
                setTimeout(() => handleLike(), 300);
            } else {
                card.classList.add('swipe-left');
                showSwipeFeedback('dislike', 1, true);
                setTimeout(() => handleDislike(), 300);
            }
        } else {
            // Reset position
            card.style.transform = '';
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
            hideSwipeFeedback();
        }
    });

    return card;
}

function createMessagesView() {
    const container = document.createElement('div');
    container.className = 'messages-container';
    
    Object.entries(chatHistory).forEach(([name, messages]) => {
        const chatPreview = document.createElement('div');
        chatPreview.className = 'chat-preview';
        chatPreview.onclick = () => showChat(name);
        
        const lastMessage = messages[messages.length - 1];
        
        chatPreview.innerHTML = `
            <div class="chat-info">
                <h3>${name}</h3>
                <p>${lastMessage.message}</p>
            </div>
            <span class="chat-time">${lastMessage.time}</span>
        `;
        
        container.appendChild(chatPreview);
    });
    
    return container;
}

function showChat(name) {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    // Create messages area
    const messagesArea = document.createElement('div');
    messagesArea.className = 'messages-area';
    
    const messages = chatHistory[name];
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === 'You' ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-content">${msg.message}</div>
            <span class="message-time">${msg.time}</span>
        `;
        messagesArea.appendChild(messageDiv);
    });
    
    // Create chat input bar
    const chatInputBar = document.createElement('div');
    chatInputBar.className = 'chat-input-bar';
    chatInputBar.innerHTML = `
        <button class="chat-action-button" onclick="handleAttachment()">
            <i class="material-icons">attach_file</i>
        </button>
        <div class="chat-input-wrapper">
            <input type="text" class="chat-input" placeholder="Type a message..." onkeypress="handleKeyPress(event)">
        </div>
        <button class="chat-action-button" onclick="handleVoiceMemo()">
            <i class="material-icons">mic</i>
        </button>
        <button class="chat-send-button" onclick="sendMessage()">
            <i class="material-icons">send</i>
        </button>
    `;
    
    chatContainer.appendChild(messagesArea);
    chatContainer.appendChild(chatInputBar);
    app.appendChild(chatContainer);
    
    // Scroll to bottom of messages
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function handleAttachment() {
    // TODO: Implement file attachment functionality
    console.log('Attachment clicked');
}

function handleVoiceMemo() {
    // TODO: Implement voice memo functionality
    console.log('Voice memo clicked');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.querySelector('.chat-input');
    const message = input.value.trim();
    
    if (message) {
        const messagesArea = document.querySelector('.messages-area');
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <span class="message-time">${currentTime}</span>
        `;
        
        messagesArea.appendChild(messageDiv);
        input.value = '';
        
        // Scroll to bottom
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

function showMessages() {
    currentView = 'messages';
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(createMessagesView());
}

function showProfile() {
    currentView = 'profile';
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="profile-container">
            <img src="file:///android_res/drawable/profile_placeholder.jpg" alt="Your Profile" class="profile-image">
            <h2>Your Name</h2>
            <p class="profile-profession">Your Profession</p>
            <p class="profile-bio">Your bio goes here. Tell others about yourself and your skills.</p>
            <div class="profile-skills">
                <span class="skill-chip">Skill 1</span>
                <span class="skill-chip">Skill 2</span>
                <span class="skill-chip">Skill 3</span>
            </div>
        </div>
    `;
}

function handleLike() {
    const likeButton = document.querySelector('.like');
    likeButton.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        likeButton.style.transform = 'scale(1)';
        currentIndex = (currentIndex + 1) % sampleTalents.length;
        updateCard();
    }, 300);
}

function handleDislike() {
    const dislikeButton = document.querySelector('.dislike');
    dislikeButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        dislikeButton.style.transform = 'scale(1)';
        currentIndex = (currentIndex + 1) % sampleTalents.length;
        updateCard();
    }, 300);
}

function updateCard() {
    if (currentView !== 'main') return;
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(createTalentCard(sampleTalents[currentIndex]));
}

function showMain() {
    currentView = 'main';
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(createTalentCard(sampleTalents[currentIndex]));
}

function showModal(talent) {
    currentTalent = talent;
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Clear all previous content
    modalContent.innerHTML = `
        <div class="modal-header">
            <button class="close-button" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <img id="modalImage" class="modal-image" src="${talent.image}" alt="${talent.name}">
            <h2 id="modalName">${talent.name}, ${talent.age}</h2>
            <p id="modalProfession" class="modal-profession">${talent.profession}</p>
            <p id="modalBio" class="modal-bio">${talent.bio}</p>
            <div id="modalSkills" class="modal-skills">
                ${talent.skills.map(skill => `<span class="modal-skill">${skill}</span>`).join('')}
            </div>
            <div class="modal-section">
                <h3 class="modal-section-title">Rating</h3>
                <div class="modal-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(talent.rating))}${'☆'.repeat(5 - Math.floor(talent.rating))}</span>
                    <span class="rating-value">${talent.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="modal-section">
                <h3 class="modal-section-title">Reviews</h3>
                <div class="modal-reviews">
                    ${talent.reviews.map(review => `
                        <div class="review">
                            <div class="review-header">
                                <span class="reviewer-name">${review.name}</span>
                                <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                            </div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-actions">
                <button class="modal-button" onclick="downloadCV()">Download CV</button>
                <button class="modal-button" onclick="openPortfolio()">View Portfolio</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentTalent = null;
}

function downloadCV() {
    if (currentTalent && currentTalent.cv) {
        window.open(currentTalent.cv, '_blank');
    }
}

function openPortfolio() {
    if (currentTalent && currentTalent.portfolio) {
        window.open(currentTalent.portfolio, '_blank');
    }
}

// Close modal when clicking outside
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

function showSwipeFeedback(type, opacity, animate = false) {
    const feedback = document.getElementById('swipe-feedback');
    const likeFeedback = feedback.querySelector('.like-feedback');
    const dislikeFeedback = feedback.querySelector('.dislike-feedback');
    
    if (type === 'like') {
        likeFeedback.style.opacity = opacity;
        dislikeFeedback.style.opacity = 0;
        if (animate) {
            likeFeedback.classList.add('animate');
            setTimeout(() => {
                likeFeedback.classList.remove('animate');
                likeFeedback.style.opacity = 0;
            }, 500);
        }
    } else {
        dislikeFeedback.style.opacity = opacity;
        likeFeedback.style.opacity = 0;
        if (animate) {
            dislikeFeedback.classList.add('animate');
            setTimeout(() => {
                dislikeFeedback.classList.remove('animate');
                dislikeFeedback.style.opacity = 0;
            }, 500);
        }
    }
}

function hideSwipeFeedback() {
    const feedback = document.getElementById('swipe-feedback');
    const likeFeedback = feedback.querySelector('.like-feedback');
    const dislikeFeedback = feedback.querySelector('.dislike-feedback');
    
    likeFeedback.style.opacity = 0;
    dislikeFeedback.style.opacity = 0;
    likeFeedback.classList.remove('animate');
    dislikeFeedback.classList.remove('animate');
}

// Initialize the app
function initApp() {
    // Create swipe feedback elements if they don't exist
    if (!document.getElementById('swipe-feedback')) {
        const feedback = document.createElement('div');
        feedback.id = 'swipe-feedback';
        feedback.className = 'swipe-feedback';
        feedback.innerHTML = `
            <div class="swipe-feedback-content like-feedback">
                <i class="material-icons">favorite</i>
                <span>Liked</span>
            </div>
            <div class="swipe-feedback-content dislike-feedback">
                <i class="material-icons">close</i>
                <span>Disliked</span>
            </div>
        `;
        document.body.appendChild(feedback);
    }
    
    updateCard();
}

// Initialize the app
initApp(); 