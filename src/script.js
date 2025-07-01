// Global variables
let currentQuizAnswers = {};
let quizSubmitted = false;

// Game variables
let gameState = {
    scenarios: [],
    selectedScenario: null,
    correctMatches: 0,
    incorrectAttempts: 0,
    totalScenarios: 0,
    gameComplete: false,
    startTime: null
};

// DOM Elements
let sidebar, mainContent, sidebarToggle, mobileMenuToggle, contentBody, breadcrumbText, comingSoonModal, expandBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    sidebar = document.getElementById('sidebar');
    mainContent = document.getElementById('mainContent');
    sidebarToggle = document.getElementById('sidebarToggle');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    contentBody = document.getElementById('contentBody');
    breadcrumbText = document.getElementById('breadcrumbText');
    comingSoonModal = document.getElementById('comingSoonModal');
    expandBtn = document.getElementById('expandBtn');
    
    // Load default content
    loadContent('task11-topic1');
    
    // Expand Domain 1 and Task 1.1 by default
    toggleSection('domain1');
    toggleTask('task11');
    
    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === comingSoonModal) {
            closeModal();
        }
    });
});

// Sidebar functionality
function toggleSidebar() {
    if (!sidebar || !mainContent) return;
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
    // Update expand button icon
    if (expandBtn) {
        const icon = expandBtn.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.className = 'fas fa-chevron-right';
        } else {
            icon.className = 'fas fa-chevron-left';
        }
    }
}

function toggleMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.toggle('mobile-open');
}

function toggleSection(sectionId) {
    // If sidebar is collapsed, expand it first
    if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
        // Wait for animation to complete before expanding section
        setTimeout(() => {
            expandSection(sectionId);
        }, 300);
    } else {
        expandSection(sectionId);
    }
}

function expandSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const header = section.previousElementSibling;
    if (!header) return;
    
    const icon = header.querySelector('.toggle-icon');
    
    if (section.classList.contains('expanded')) {
        section.classList.remove('expanded');
        if (icon) icon.classList.remove('rotated');
    } else {
        section.classList.add('expanded');
        if (icon) icon.classList.add('rotated');
    }
}

function toggleTask(taskId) {
    // If sidebar is collapsed, expand it first
    if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
        // Wait for animation to complete before expanding task
        setTimeout(() => {
            expandTask(taskId);
        }, 300);
    } else {
        expandTask(taskId);
    }
}

function expandTask(taskId) {
    const task = document.getElementById(taskId);
    if (!task) return;
    
    const header = task.previousElementSibling;
    if (!header) return;
    
    const icon = header.querySelector('.toggle-icon');
    
    if (task.classList.contains('expanded')) {
        task.classList.remove('expanded');
        if (icon) icon.classList.remove('rotated');
    } else {
        task.classList.add('expanded');
        if (icon) icon.classList.add('rotated');
    }
}

// Content loading
function loadContent(contentId) {
    if (!contentBody) return;
    
    // If sidebar is collapsed, expand it first to show navigation context
    if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show loading
    contentBody.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        switch(contentId) {
            case 'task11-topic1':
                loadTask11Topic1();
                break;
            default:
                showComingSoon();
        }
    }, 300);
}

function loadTask11Topic1() {
    if (!contentBody || !breadcrumbText) return;
    
    breadcrumbText.textContent = 'Domain 1 > Task 1.1 > Topic 1: Extracting Data from AWS Storage';
    
    const content = `
        <div class="lesson-header">
            <h1 class="lesson-title">Extracting Data from AWS Storage</h1>
            <p class="lesson-subtitle">Learn how to gather data from different AWS storage services for your ML projects</p>
            <div class="hero-image">
                <i class="fas fa-database"></i>
                <i class="fas fa-arrow-right" style="margin: 0 20px; font-size: 32px;"></i>
                <i class="fas fa-brain"></i>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon explanation">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <h2 class="section-title">Simple Explanation</h2>
            </div>
            <div class="section-content">
                <p>Think of your ML data like your schoolwork — scattered across different places:</p>
                
                <div class="storage-grid">
                    <div class="storage-card">
                        <div class="storage-icon s3">
                            <i class="fas fa-archive"></i>
                        </div>
                        <h4>Amazon S3</h4>
                        <div class="analogy-visual">
                            <div class="analogy-icon">🗄️</div>
                            <div>
                                <strong>Your Locker</strong><br>
                                Stores anything: PDFs, images, spreadsheets
                            </div>
                        </div>
                    </div>
                    
                    <div class="storage-card">
                        <div class="storage-icon ebs">
                            <i class="fas fa-hdd"></i>
                        </div>
                        <h4>Amazon EBS</h4>
                        <div class="analogy-visual">
                            <div class="analogy-icon">💾</div>
                            <div>
                                <strong>Personal USB Drive</strong><br>
                                Only one computer can use it at a time
                            </div>
                        </div>
                    </div>
                    
                    <div class="storage-card">
                        <div class="storage-icon efs">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <h4>Amazon EFS</h4>
                        <div class="analogy-visual">
                            <div class="analogy-icon">📁</div>
                            <div>
                                <strong>Shared Classroom Folder</strong><br>
                                All students can access it
                            </div>
                        </div>
                    </div>
                    
                    <div class="storage-card">
                        <div class="storage-icon rds">
                            <i class="fas fa-table"></i>
                        </div>
                        <h4>Amazon RDS</h4>
                        <div class="analogy-visual">
                            <div class="analogy-icon">📊</div>
                            <div>
                                <strong>Teacher's Gradebook</strong><br>
                                Organized rows and columns like Excel
                            </div>
                        </div>
                    </div>
                    
                    <div class="storage-card">
                        <div class="storage-icon dynamodb">
                            <i class="fas fa-sticky-note"></i>
                        </div>
                        <h4>Amazon DynamoDB</h4>
                        <div class="analogy-visual">
                            <div class="analogy-icon">📱</div>
                            <div>
                                <strong>Quick Notes App</strong><br>
                                Fast, flexible notes on your phone
                            </div>
                        </div>
                    </div>
                </div>
                
                <p style="text-align: center; font-size: 18px; margin-top: 30px; padding: 20px; background: #eff6ff; border-radius: 8px;">
                    <strong>💡 Key Idea:</strong> Before training your ML model, you need to gather all your data from these different storage places - just like collecting homework from multiple sources before starting your project!
                </p>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon assessment">
                    <i class="fas fa-gamepad"></i>
                </div>
                <h2 class="section-title">Interactive Game: Storage Detective</h2>
            </div>
            <div class="section-content">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🕵️</div>
                    <p style="font-size: 18px; color: #666;">Put your AWS storage knowledge to the test! Match data scenarios with the perfect AWS storage service.</p>
                </div>
                <div class="game-container" id="gameContainer">
                    <div style="text-align: center; padding: 40px;">
                        <button class="game-btn primary" onclick="initializeGame()" style="font-size: 18px; padding: 15px 30px;">
                            <i class="fas fa-play"></i> Start Storage Detective Game
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon assessment">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <h2 class="section-title">Knowledge Check Quiz</h2>
            </div>
            <div class="section-content">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🧠</div>
                    <p style="font-size: 18px; color: #666;">Test your understanding with this interactive quiz!</p>
                </div>
                <div class="quiz-container">
                    ${generateQuiz()}
                </div>
            </div>
        </div>
    `;
    
    contentBody.innerHTML = content;
    
    // Mark the current nav link as active
    const activeLink = document.querySelector('[onclick*="task11-topic1"]');
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function showComingSoon() {
    if (comingSoonModal) {
        comingSoonModal.style.display = 'block';
    }
}

function closeModal() {
    if (comingSoonModal) {
        comingSoonModal.style.display = 'none';
    }
}

function generateQuiz() {
    const questions = [
        {
            question: "Which service is best for storing large CSV datasets for training?",
            options: ["Amazon DynamoDB", "Amazon EFS", "Amazon S3", "Amazon RDS"],
            correct: 2
        },
        {
            question: "You want to speed up large S3 file downloads globally. What should you use?",
            options: ["EFS Performance Mode", "S3 Transfer Acceleration", "CloudFront", "DynamoDB Accelerator"],
            correct: 1
        },
        {
            question: "Which service is best for app-level real-time reads/writes?",
            options: ["S3", "RDS", "EBS", "DynamoDB"],
            correct: 3
        }
    ];

    let quizHTML = '';
    
    questions.forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span class="question-number">${index + 1}</span>
                    <span class="question-text">${q.question}</span>
                </div>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <div class="quiz-option" onclick="selectAnswer(${index}, ${optIndex})">
                            ${String.fromCharCode(65 + optIndex)}) ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
        <div class="quiz-actions">
            <button class="btn" onclick="submitQuiz()">Submit Quiz</button>
            <button class="btn" onclick="resetQuiz()" style="background: #6b7280;">Reset</button>
        </div>
        <div id="quizResults"></div>
    `;
    
    return quizHTML;
}

function selectAnswer(questionIndex, optionIndex) {
    const questionElement = document.querySelectorAll('.quiz-question')[questionIndex];
    if (!questionElement) return;
    
    questionElement.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = questionElement.querySelectorAll('.quiz-option')[optionIndex];
    if (selectedOption) {
        selectedOption.classList.add('selected');
        currentQuizAnswers[questionIndex] = optionIndex;
    }
}

function submitQuiz() {
    if (quizSubmitted) return;
    
    const questions = [
        { correct: 2 }, // Amazon S3
        { correct: 1 }, // S3 Transfer Acceleration
        { correct: 3 }  // DynamoDB
    ];
    
    let correctAnswers = 0;
    
    questions.forEach((q, index) => {
        const questionElement = document.querySelectorAll('.quiz-question')[index];
        if (!questionElement) return;
        
        const options = questionElement.querySelectorAll('.quiz-option');
        
        options.forEach((option, optIndex) => {
            if (optIndex === q.correct) {
                option.classList.add('correct');
            } else if (currentQuizAnswers[index] === optIndex && optIndex !== q.correct) {
                option.classList.add('incorrect');
            }
        });
        
        if (currentQuizAnswers[index] === q.correct) {
            correctAnswers++;
        }
    });
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    let scoreClass = 'needs-improvement';
    let message = 'Keep studying! You will get there.';
    
    if (percentage >= 80) {
        scoreClass = 'excellent';
        message = 'Excellent work! You are ready to move on.';
    } else if (percentage >= 60) {
        scoreClass = 'good';
        message = 'Good job! Review the missed questions.';
    }
    
    const resultsElement = document.getElementById('quizResults');
    if (resultsElement) {
        resultsElement.innerHTML = `
            <div class="quiz-results">
                <div class="score-display ${scoreClass}">${percentage}%</div>
                <p><strong>${correctAnswers} out of ${questions.length} correct</strong></p>
                <p>${message}</p>
            </div>
        `;
    }
    
    quizSubmitted = true;
}

function resetQuiz() {
    currentQuizAnswers = {};
    quizSubmitted = false;
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    const resultsElement = document.getElementById('quizResults');
    if (resultsElement) {
        resultsElement.innerHTML = '';
    }
}

// Simple game implementation
function initializeGame() {
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) return;
    
    gameContainer.innerHTML = `
        <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px;">
            <h3 style="color: white; margin-bottom: 20px;">🕵️ Storage Detective Game</h3>
            <p style="color: white; margin-bottom: 20px;">Match the scenario with the correct AWS service!</p>
            <div style="background: white; color: #333; padding: 20px; border-radius: 8px; margin: 10px 0;">
                <strong>Scenario:</strong> Store large CSV files for ML training
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 20px 0;">
                <button onclick="checkAnswer('s3')" style="padding: 10px; border: none; border-radius: 5px; background: #ff9500; color: white; cursor: pointer;">Amazon S3</button>
                <button onclick="checkAnswer('ebs')" style="padding: 10px; border: none; border-radius: 5px; background: #4facfe; color: white; cursor: pointer;">Amazon EBS</button>
                <button onclick="checkAnswer('rds')" style="padding: 10px; border: none; border-radius: 5px; background: #fa709a; color: white; cursor: pointer;">Amazon RDS</button>
            </div>
            <div id="gameResult" style="margin-top: 20px; color: white;"></div>
        </div>
    `;
}

function checkAnswer(service) {
    const resultElement = document.getElementById('gameResult');
    if (!resultElement) return;
    
    if (service === 's3') {
        resultElement.innerHTML = '<div style="color: #10b981; font-weight: bold;">🎉 Correct! S3 is perfect for storing large datasets like CSV files.</div>';
    } else {
        resultElement.innerHTML = '<div style="color: #ef4444; font-weight: bold;">❌ Try again! Think about long-term storage for large files.</div>';
    }
}

// Event listeners for mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        if (sidebar && !sidebar.contains(event.target) && mobileMenuToggle && !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('mobile-open');
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove('mobile-open');
    }
});
