// Global variables
let currentQuizAnswers = {};
let quizSubmitted = false;

// Side-by-Side Puzzle Game Variables
let puzzleState = {
    pieces: [],
    slots: [],
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    usedPieces: new Set(),
    gameComplete: false
};

// Puzzle Game Data - Kid-Friendly
const puzzlePieces = [
    {
        id: 1,
        emoji: "📊",
        title: "Big Data Files",
        description: "Store huge CSV files with sales data",
        correctSlot: "s3"
    },
    {
        id: 2,
        emoji: "⚡",
        title: "Super Fast Storage",
        description: "Lightning-fast storage for one computer",
        correctSlot: "ebs"
    },
    {
        id: 3,
        emoji: "👥",
        title: "Team Sharing",
        description: "Files shared between multiple computers",
        correctSlot: "efs"
    },
    {
        id: 4,
        emoji: "📋",
        title: "Organized Data",
        description: "Customer info in rows and columns",
        correctSlot: "rds"
    },
    {
        id: 5,
        emoji: "🚀",
        title: "Real-Time Data",
        description: "User clicks that happen instantly",
        correctSlot: "dynamodb"
    }
];

const puzzleSlots = [
    {
        id: "s3",
        name: "Amazon S3",
        icon: "fas fa-archive",
        description: "Object Storage Warehouse"
    },
    {
        id: "ebs",
        name: "Amazon EBS",
        icon: "fas fa-hdd",
        description: "High-Speed Block Storage"
    },
    {
        id: "efs",
        name: "Amazon EFS",
        icon: "fas fa-folder-open",
        description: "Shared File System"
    },
    {
        id: "rds",
        name: "Amazon RDS",
        icon: "fas fa-table",
        description: "Smart SQL Database"
    },
    {
        id: "dynamodb",
        name: "Amazon DynamoDB",
        icon: "fas fa-sticky-note",
        description: "Lightning-Fast NoSQL"
    }
];

// DOM Elements - will be initialized after DOM loads
let sidebar, mainContent, sidebarToggle, mobileMenuToggle, contentBody, breadcrumbText, comingSoonModal, expandBtn;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize DOM elements
    sidebar = document.getElementById('sidebar');
    mainContent = document.getElementById('mainContent');
    sidebarToggle = document.getElementById('sidebarToggle');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    contentBody = document.getElementById('contentBody');
    breadcrumbText = document.getElementById('breadcrumbText');
    comingSoonModal = document.getElementById('comingSoonModal');
    expandBtn = document.getElementById('expandBtn');
    
    console.log('Elements found:', {
        sidebar: !!sidebar,
        mainContent: !!mainContent,
        contentBody: !!contentBody
    });
    
    // Load default content
    loadContent('task11-topic1');
    
    // Expand sections by default
    setTimeout(() => {
        toggleSection('domain1');
        toggleTask('task11');
    }, 100);
    
    // Add event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Modal close on outside click
    window.addEventListener('click', function(event) {
        if (event.target === comingSoonModal) {
            closeModal();
        }
    });
});

// Sidebar functions
function toggleSidebar() {
    console.log('Toggle sidebar called');
    if (!sidebar || !mainContent) return;
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
    if (expandBtn) {
        const icon = expandBtn.querySelector('i');
        if (icon) {
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-chevron-left';
            }
        }
    }
}

function toggleMobileSidebar() {
    console.log('Toggle mobile sidebar called');
    if (!sidebar) return;
    sidebar.classList.toggle('mobile-open');
}

function toggleSection(sectionId) {
    console.log('Toggle section called:', sectionId);
    
    if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
        setTimeout(() => expandSection(sectionId), 300);
    } else {
        expandSection(sectionId);
    }
}

function expandSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.log('Section not found:', sectionId);
        return;
    }
    
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
    console.log('Toggle task called:', taskId);
    
    if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
        setTimeout(() => expandTask(taskId), 300);
    } else {
        expandTask(taskId);
    }
}

function expandTask(taskId) {
    const task = document.getElementById(taskId);
    if (!task) {
        console.log('Task not found:', taskId);
        return;
    }
    
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
    console.log('Load content called:', contentId);
    
    if (!contentBody) {
        console.log('Content body not found');
        return;
    }
    
    // Show loading
    contentBody.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    // Load content after delay
    setTimeout(() => {
        if (contentId === 'task11-topic1') {
            loadTask11Topic1();
        } else {
            showComingSoon();
        }
    }, 300);
}

function loadTask11Topic1() {
    console.log('Loading Task 1.1 Topic 1');
    
    if (!contentBody) return;
    if (breadcrumbText) {
        breadcrumbText.textContent = 'Domain 1 > Task 1.1 > Topic 1: Extracting Data from AWS Storage';
    }
    
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
                    <strong>💡 Key Idea:</strong> Before training your ML model, you need to gather all your data from these different storage places!
                </p>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon pros-cons">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <h2 class="section-title">Comprehensive Service Analysis</h2>
            </div>
            <div class="section-content">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⚖️</div>
                    <p style="font-size: 18px; color: #666;">Understanding the strengths and limitations of each AWS storage service</p>
                </div>
                
                <!-- Service Analysis Navigator -->
                <div id="serviceAnalysisContainer">
                    <div style="text-align: center; padding: 40px;">
                        <button class="puzzle-btn primary" onclick="startServiceAnalysis()" style="font-size: 18px; padding: 15px 30px;">
                            <i class="fas fa-play"></i> Start Service Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">
                <div class="section-icon assessment">
                    <i class="fas fa-gamepad"></i>
                </div>
                <h2 class="section-title">Interactive Puzzle: Drag & Drop Challenge</h2>
            </div>
            <div class="section-content">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🧩</div>
                    <p style="font-size: 18px; color: #666;">Drag puzzle pieces from the left to matching AWS services on the right!</p>
                </div>
                <div class="game-container" id="gameContainer">
                    <div style="text-align: center; padding: 40px;">
                        <button class="puzzle-btn primary" onclick="startNewPuzzleGame()" style="font-size: 18px; padding: 15px 30px;">
                            <i class="fas fa-puzzle-piece"></i> Start Drag & Drop Puzzle
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
                    <p style="font-size: 18px; color: #666;">Test your understanding!</p>
                </div>
                <div class="quiz-container">
                    ${generateQuiz()}
                </div>
            </div>
        </div>
    `;
    
    contentBody.innerHTML = content;
    
    // Mark active link
    const activeLinks = document.querySelectorAll('.nav-link');
    activeLinks.forEach(link => link.classList.remove('active'));
    
    const currentLink = document.querySelector('[onclick*="task11-topic1"]');
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

// Working Side-by-Side Puzzle Game Functions
function startNewPuzzleGame() {
    console.log('Starting NEW working side-by-side puzzle game');
    
    renderNewPuzzleGame();
}

function renderNewPuzzleGame() {
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) return;
    
    gameContainer.innerHTML = `
        <div class="puzzle-header">
            <div class="puzzle-title">🧩 AWS Storage Puzzle Challenge</div>
            <div class="puzzle-instructions">
                <p><strong>🎮 How to Play:</strong> Drag puzzle pieces from the LEFT to matching AWS services on the RIGHT!</p>
                <p><strong>🏆 Scoring:</strong> +1 point for correct matches, -1 point for wrong matches</p>
            </div>
        </div>

        <div class="score-display">
            <div class="score-item">
                <span class="score-number" id="totalScore">0</span>
                <div class="score-label">Total Score</div>
            </div>
            <div class="score-item">
                <span class="score-number positive" id="correctCount">0</span>
                <div class="score-label">✅ Correct</div>
            </div>
            <div class="score-item">
                <span class="score-number negative" id="wrongCount">0</span>
                <div class="score-label">❌ Wrong</div>
            </div>
        </div>

        <div class="game-board">
            <!-- LEFT COLUMN - PUZZLE PIECES -->
            <div class="game-column">
                <h2 class="column-title">🧩 Puzzle Pieces</h2>
                
                <div class="puzzle-piece" draggable="true" data-answer="s3" id="piece-s3">
                    <div class="piece-emoji">📊</div>
                    <div class="piece-info">
                        <h3>Big Data Files</h3>
                        <p>Store huge CSV files with sales data</p>
                    </div>
                </div>

                <div class="puzzle-piece" draggable="true" data-answer="ebs" id="piece-ebs">
                    <div class="piece-emoji">⚡</div>
                    <div class="piece-info">
                        <h3>Super Fast Storage</h3>
                        <p>Lightning-fast storage for one computer</p>
                    </div>
                </div>

                <div class="puzzle-piece" draggable="true" data-answer="efs" id="piece-efs">
                    <div class="piece-emoji">👥</div>
                    <div class="piece-info">
                        <h3>Team Sharing</h3>
                        <p>Files shared between multiple computers</p>
                    </div>
                </div>

                <div class="puzzle-piece" draggable="true" data-answer="rds" id="piece-rds">
                    <div class="piece-emoji">📋</div>
                    <div class="piece-info">
                        <h3>Organized Data</h3>
                        <p>Customer info in rows and columns</p>
                    </div>
                </div>

                <div class="puzzle-piece" draggable="true" data-answer="dynamodb" id="piece-dynamodb">
                    <div class="piece-emoji">🚀</div>
                    <div class="piece-info">
                        <h3>Real-Time Data</h3>
                        <p>User clicks that happen instantly</p>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN - ANSWER SLOTS -->
            <div class="game-column">
                <h2 class="column-title">☁️ AWS Storage Services</h2>
                
                <div class="answer-slot" data-slot="s3" id="slot-s3">
                    <div class="slot-icon s3">
                        <i class="fas fa-archive"></i>
                    </div>
                    <div class="slot-info">
                        <h3>Amazon S3</h3>
                        <p>Object Storage Warehouse</p>
                    </div>
                </div>

                <div class="answer-slot" data-slot="ebs" id="slot-ebs">
                    <div class="slot-icon ebs">
                        <i class="fas fa-hdd"></i>
                    </div>
                    <div class="slot-info">
                        <h3>Amazon EBS</h3>
                        <p>High-Speed Block Storage</p>
                    </div>
                </div>

                <div class="answer-slot" data-slot="efs" id="slot-efs">
                    <div class="slot-icon efs">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <div class="slot-info">
                        <h3>Amazon EFS</h3>
                        <p>Shared File System</p>
                    </div>
                </div>

                <div class="answer-slot" data-slot="rds" id="slot-rds">
                    <div class="slot-icon rds">
                        <i class="fas fa-table"></i>
                    </div>
                    <div class="slot-info">
                        <h3>Amazon RDS</h3>
                        <p>Smart SQL Database</p>
                    </div>
                </div>

                <div class="answer-slot" data-slot="dynamodb" id="slot-dynamodb">
                    <div class="slot-icon dynamodb">
                        <i class="fas fa-sticky-note"></i>
                    </div>
                    <div class="slot-info">
                        <h3>Amazon DynamoDB</h3>
                        <p>Lightning-Fast NoSQL</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="puzzle-feedback" id="puzzleFeedback">
            🎮 <strong>Ready to play?</strong> Drag a puzzle piece from the left to its matching AWS service on the right!
        </div>

        <div class="puzzle-controls">
            <button class="puzzle-btn primary" onclick="resetWorkingPuzzle()">🔄 Reset Game</button>
            <button class="puzzle-btn" onclick="startNewPuzzleGame()">🎲 New Game</button>
        </div>
    `;
    
    // Initialize the working puzzle game
    initializeWorkingPuzzle();
}

// Working puzzle game variables
let puzzleScore = 0;
let puzzleCorrectCount = 0;
let puzzleWrongCount = 0;
let puzzleUsedPieces = new Set();

function initializeWorkingPuzzle() {
    // Reset game state
    puzzleScore = 0;
    puzzleCorrectCount = 0;
    puzzleWrongCount = 0;
    puzzleUsedPieces.clear();
    
    // Add drag and drop event listeners
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.addEventListener('dragstart', handleWorkingDragStart);
        piece.addEventListener('dragend', handleWorkingDragEnd);
    });

    document.querySelectorAll('.answer-slot').forEach(slot => {
        slot.addEventListener('dragover', handleWorkingDragOver);
        slot.addEventListener('dragenter', handleWorkingDragEnter);
        slot.addEventListener('dragleave', handleWorkingDragLeave);
        slot.addEventListener('drop', handleWorkingDrop);
    });
    
    updateWorkingScoreBoard();
}

function handleWorkingDragStart(e) {
    if (e.target.classList.contains('used')) return;
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.answer);
    e.dataTransfer.effectAllowed = 'move';
}

function handleWorkingDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleWorkingDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleWorkingDragEnter(e) {
    e.target.closest('.answer-slot').classList.add('drag-over');
}

function handleWorkingDragLeave(e) {
    e.target.closest('.answer-slot').classList.remove('drag-over');
}

function handleWorkingDrop(e) {
    e.preventDefault();
    const slot = e.target.closest('.answer-slot');
    slot.classList.remove('drag-over');
    
    const pieceAnswer = e.dataTransfer.getData('text/plain');
    const slotId = slot.dataset.slot;
    
    checkWorkingAnswer(pieceAnswer, slotId, slot);
}

function checkWorkingAnswer(pieceAnswer, slotId, slotElement) {
    const feedback = document.getElementById('puzzleFeedback');
    const pieceElement = document.getElementById(`piece-${pieceAnswer}`);
    
    if (pieceAnswer === slotId) {
        // CORRECT!
        puzzleScore += 1;
        puzzleCorrectCount += 1;
        puzzleUsedPieces.add(pieceAnswer);
        
        slotElement.classList.add('correct');
        pieceElement.classList.add('used');
        
        feedback.innerHTML = `
            <div class="feedback-correct">
                🎉 <strong>CORRECT!</strong> +1 point! Score: ${puzzleScore}
            </div>
        `;
        
        if (puzzleUsedPieces.size === 5) {
            setTimeout(() => {
                feedback.innerHTML = `
                    <div class="feedback-correct" style="font-size: 1.3rem;">
                        🏆 <strong>GAME COMPLETE!</strong> Final Score: ${puzzleScore}/5
                        <br>🎉 You matched all AWS storage services correctly!
                    </div>
                `;
            }, 2000);
        }
        
    } else {
        // WRONG!
        puzzleScore -= 1;
        puzzleWrongCount += 1;
        
        slotElement.classList.add('incorrect');
        
        feedback.innerHTML = `
            <div class="feedback-incorrect">
                ❌ <strong>WRONG!</strong> -1 point! Score: ${puzzleScore}
            </div>
        `;
        
        setTimeout(() => {
            slotElement.classList.remove('incorrect');
        }, 1500);
    }
    
    updateWorkingScoreBoard();
}

function updateWorkingScoreBoard() {
    const totalScoreEl = document.getElementById('totalScore');
    const correctCountEl = document.getElementById('correctCount');
    const wrongCountEl = document.getElementById('wrongCount');
    
    if (totalScoreEl) {
        totalScoreEl.textContent = puzzleScore;
        totalScoreEl.className = `score-number ${puzzleScore >= 0 ? 'positive' : 'negative'}`;
    }
    if (correctCountEl) correctCountEl.textContent = puzzleCorrectCount;
    if (wrongCountEl) wrongCountEl.textContent = puzzleWrongCount;
}

function resetWorkingPuzzle() {
    puzzleScore = 0;
    puzzleCorrectCount = 0;
    puzzleWrongCount = 0;
    puzzleUsedPieces.clear();
    
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.classList.remove('used');
    });
    
    document.querySelectorAll('.answer-slot').forEach(slot => {
        slot.classList.remove('correct', 'incorrect');
    });
    
    const feedback = document.getElementById('puzzleFeedback');
    if (feedback) {
        feedback.innerHTML = '🎮 <strong>Ready to play?</strong> Drag a puzzle piece from the left to its matching AWS service on the right!';
    }
    
    updateWorkingScoreBoard();
}

// Modal functions
function showComingSoon() {
    console.log('Show coming soon modal');
    if (comingSoonModal) {
        comingSoonModal.style.display = 'block';
    }
}

function closeModal() {
    console.log('Close modal');
    if (comingSoonModal) {
        comingSoonModal.style.display = 'none';
    }
}

// Quiz functions
// Navigable Quiz System
let quizState = {
    currentQuestion: 0,
    totalQuestions: 10,
    answers: {},
    score: 0,
    questions: [
        {
            question: "Which service is best for storing large CSV datasets for training?",
            options: ["Amazon DynamoDB", "Amazon EFS", "Amazon S3", "Amazon RDS"],
            correct: 2,
            explanation: "Amazon S3 is perfect for storing large datasets like CSV files because it's cost-effective, scalable, and designed for any file type."
        },
        {
            question: "Which service is best for app-level real-time reads/writes?",
            options: ["S3", "RDS", "EBS", "DynamoDB"],
            correct: 3,
            explanation: "DynamoDB provides single-digit millisecond latency, making it ideal for real-time applications like gaming and chat apps."
        },
        {
            question: "What is a downside of EBS?",
            options: ["Slow performance", "Cannot be shared between EC2 instances", "Only supports JSON", "Expensive for small files"],
            correct: 1,
            explanation: "EBS volumes can only be attached to one EC2 instance at a time, unlike EFS which can be shared across multiple instances."
        },
        {
            question: "You want to speed up large S3 file downloads globally. What should you use?",
            options: ["EFS Performance Mode", "S3 Transfer Acceleration", "CloudFront", "DynamoDB Accelerator"],
            correct: 1,
            explanation: "S3 Transfer Acceleration uses AWS edge locations to speed up uploads and downloads to S3 buckets globally."
        },
        {
            question: "Which feature allows EBS to guarantee fast input/output operations?",
            options: ["Transfer Acceleration", "Performance Boost", "Provisioned IOPS", "Fast Read Mode"],
            correct: 2,
            explanation: "Provisioned IOPS allows you to specify and guarantee a certain number of input/output operations per second for your EBS volume."
        },
        {
            question: "What is Amazon EFS best known for?",
            options: ["Attach to one EC2 instance", "Share files across many EC2s", "Store secrets", "Run SQL queries"],
            correct: 1,
            explanation: "EFS (Elastic File System) is designed to be shared across multiple EC2 instances simultaneously, unlike EBS which is single-attach."
        },
        {
            question: "Which storage service would you choose for structured customer data with complex relationships?",
            options: ["Amazon S3", "Amazon EFS", "Amazon RDS", "Amazon EBS"],
            correct: 2,
            explanation: "RDS (Relational Database Service) is designed for structured data with relationships and supports SQL queries for complex operations."
        },
        {
            question: "What type of storage is Amazon DynamoDB?",
            options: ["Block storage", "Object storage", "File storage", "NoSQL database"],
            correct: 3,
            explanation: "DynamoDB is a NoSQL database service that provides fast and flexible document and key-value data models."
        },
        {
            question: "Which service is most cost-effective for storing large amounts of infrequently accessed data?",
            options: ["Amazon EBS", "Amazon DynamoDB", "Amazon S3", "Amazon EFS"],
            correct: 2,
            explanation: "Amazon S3 offers various storage classes including Infrequent Access and Glacier for cost-effective long-term storage."
        },
        {
            question: "You need to store temporary model checkpoints during ML training on a single EC2 instance. Which service is best?",
            options: ["Amazon S3", "Amazon EBS", "Amazon RDS", "Amazon DynamoDB"],
            correct: 1,
            explanation: "EBS provides high-performance block storage that's perfect for temporary files during intensive ML training on a single EC2 instance."
        }
    ]
};

function generateQuiz() {
    return `
        <div id="navigableQuizContainer">
            <div style="text-align: center; padding: 40px;">
                <button class="btn" onclick="startNavigableQuiz()" style="font-size: 18px; padding: 15px 30px;">
                    <i class="fas fa-play"></i> Start Interactive Quiz
                </button>
            </div>
        </div>
    `;
}

function startNavigableQuiz() {
    quizState.currentQuestion = 0;
    quizState.answers = {};
    quizState.score = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('navigableQuizContainer');
    if (!container) return;
    
    const question = quizState.questions[quizState.currentQuestion];
    const hasAnswered = quizState.answers.hasOwnProperty(quizState.currentQuestion);
    const userAnswer = quizState.answers[quizState.currentQuestion];
    
    container.innerHTML = `
        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 15px; padding: 30px; margin: 20px 0;">
            <!-- Question Header -->
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="font-size: 2rem; margin-bottom: 10px;">🧠</div>
                <h3 style="color: #495057; margin-bottom: 10px;">Question ${quizState.currentQuestion + 1} of ${quizState.totalQuestions}</h3>
                <div style="background: #dee2e6; height: 8px; border-radius: 4px; margin: 15px 0;">
                    <div style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; border-radius: 4px; width: ${((quizState.currentQuestion + 1) / quizState.totalQuestions) * 100}%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            
            <!-- Question -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h4 style="color: #212529; font-size: 1.3rem; line-height: 1.5; margin: 0;">${question.question}</h4>
            </div>
            
            <!-- Options -->
            <div style="display: grid; gap: 12px; margin-bottom: 25px;">
                ${question.options.map((option, index) => {
                    let optionClass = 'quiz-option-nav';
                    let optionStyle = 'background: white; border: 2px solid #dee2e6;';
                    
                    if (hasAnswered) {
                        if (index === question.correct) {
                            optionStyle = 'background: #d4edda; border: 2px solid #28a745; color: #155724;';
                        } else if (index === userAnswer && index !== question.correct) {
                            optionStyle = 'background: #f8d7da; border: 2px solid #dc3545; color: #721c24;';
                        }
                    } else if (userAnswer === index) {
                        optionStyle = 'background: #e3f2fd; border: 2px solid #2196f3;';
                    }
                    
                    return `
                        <div class="${optionClass}" 
                             onclick="${hasAnswered ? '' : `selectQuizAnswer(${index})`}"
                             style="${optionStyle} padding: 20px; border-radius: 10px; cursor: ${hasAnswered ? 'default' : 'pointer'}; transition: all 0.3s ease; display: flex; align-items: center; gap: 15px;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: ${hasAnswered && index === question.correct ? '#28a745' : (hasAnswered && index === userAnswer && index !== question.correct ? '#dc3545' : '#6c757d')}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                                ${String.fromCharCode(65 + index)}
                            </div>
                            <span style="flex: 1; font-size: 1.1rem;">${option}</span>
                            ${hasAnswered && index === question.correct ? '<i class="fas fa-check" style="color: #28a745; font-size: 1.2rem;"></i>' : ''}
                            ${hasAnswered && index === userAnswer && index !== question.correct ? '<i class="fas fa-times" style="color: #dc3545; font-size: 1.2rem;"></i>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Feedback -->
            ${hasAnswered ? `
                <div style="background: ${userAnswer === question.correct ? '#d4edda' : '#f8d7da'}; border: 1px solid ${userAnswer === question.correct ? '#c3e6cb' : '#f5c6cb'}; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="fas ${userAnswer === question.correct ? 'fa-check-circle' : 'fa-times-circle'}" style="color: ${userAnswer === question.correct ? '#28a745' : '#dc3545'}; font-size: 1.5rem;"></i>
                        <strong style="color: ${userAnswer === question.correct ? '#155724' : '#721c24'}; font-size: 1.2rem;">
                            ${userAnswer === question.correct ? 'Correct!' : 'Incorrect'}
                        </strong>
                    </div>
                    <p style="color: ${userAnswer === question.correct ? '#155724' : '#721c24'}; margin: 0; line-height: 1.5;">
                        ${question.explanation}
                    </p>
                </div>
            ` : ''}
            
            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px;">
                <button onclick="previousQuestion()" 
                        ${quizState.currentQuestion === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''} 
                        class="btn" style="background: #6c757d;">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                
                <div style="text-align: center;">
                    <div style="font-size: 1rem; color: #6c757d; margin-bottom: 8px;">
                        Score: ${quizState.score}/${Object.keys(quizState.answers).length}
                    </div>
                    <div style="display: flex; gap: 6px; justify-content: center;">
                        ${Array.from({length: quizState.totalQuestions}, (_, i) => {
                            let dotColor = '#dee2e6';
                            if (quizState.answers.hasOwnProperty(i)) {
                                dotColor = quizState.answers[i] === quizState.questions[i].correct ? '#28a745' : '#dc3545';
                            } else if (i === quizState.currentQuestion) {
                                dotColor = '#667eea';
                            }
                            return `<div style="width: 10px; height: 10px; border-radius: 50%; background: ${dotColor};"></div>`;
                        }).join('')}
                    </div>
                </div>
                
                <button onclick="${quizState.currentQuestion === quizState.totalQuestions - 1 ? 'finishQuiz()' : 'nextQuestion()'}" 
                        class="btn" style="background: #667eea;">
                    ${quizState.currentQuestion === quizState.totalQuestions - 1 ? '<i class="fas fa-flag-checkered"></i> Finish' : 'Next <i class="fas fa-chevron-right"></i>'}
                </button>
            </div>
        </div>
    `;
}

function selectQuizAnswer(answerIndex) {
    const question = quizState.questions[quizState.currentQuestion];
    quizState.answers[quizState.currentQuestion] = answerIndex;
    
    // Update score
    if (answerIndex === question.correct) {
        quizState.score++;
    }
    
    // Re-render to show feedback
    renderQuizQuestion();
}

function nextQuestion() {
    if (quizState.currentQuestion < quizState.totalQuestions - 1) {
        quizState.currentQuestion++;
        renderQuizQuestion();
    }
}

function previousQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        renderQuizQuestion();
    }
}

function finishQuiz() {
    const container = document.getElementById('navigableQuizContainer');
    const percentage = Math.round((quizState.score / quizState.totalQuestions) * 100);
    
    let scoreClass = 'needs-improvement';
    let message = 'Keep studying! Review the material and try again.';
    let emoji = '📚';
    let bgColor = '#f8d7da';
    let textColor = '#721c24';
    
    if (percentage >= 90) {
        scoreClass = 'excellent';
        message = 'Outstanding! You have mastered AWS storage concepts!';
        emoji = '🏆';
        bgColor = '#d4edda';
        textColor = '#155724';
    } else if (percentage >= 80) {
        scoreClass = 'excellent';
        message = 'Excellent work! You really understand AWS storage!';
        emoji = '🌟';
        bgColor = '#d4edda';
        textColor = '#155724';
    } else if (percentage >= 70) {
        scoreClass = 'good';
        message = 'Good job! Review the missed questions and you\'ll be ready.';
        emoji = '👍';
        bgColor = '#d1ecf1';
        textColor = '#0c5460';
    } else if (percentage >= 60) {
        scoreClass = 'good';
        message = 'Not bad! Study the concepts you missed and try again.';
        emoji = '📖';
        bgColor = '#d1ecf1';
        textColor = '#0c5460';
    }
    
    container.innerHTML = `
        <div style="background: ${bgColor}; border-radius: 15px; padding: 40px; margin: 20px 0; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
            <h3 style="color: ${textColor}; margin-bottom: 15px; font-size: 2rem;">Quiz Complete!</h3>
            <div style="font-size: 3rem; font-weight: 700; color: ${textColor}; margin: 20px 0;">${percentage}%</div>
            <p style="color: ${textColor}; font-size: 1.2rem; margin-bottom: 20px;">
                <strong>${quizState.score} out of ${quizState.totalQuestions} correct</strong>
            </p>
            <p style="color: ${textColor}; font-size: 1.1rem; margin-bottom: 30px; line-height: 1.5;">
                ${message}
            </p>
            
            <div style="background: rgba(255,255,255,0.3); border-radius: 10px; padding: 20px; margin: 25px 0;">
                <h4 style="color: ${textColor}; margin-bottom: 15px;">Grade Scale:</h4>
                <div style="color: ${textColor}; font-size: 0.95rem; line-height: 1.6;">
                    🏆 90-100%: Outstanding | 🌟 80-89%: Excellent | 👍 70-79%: Good | 📖 60-69%: Fair | 📚 Below 60%: Needs Review
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 25px;">
                <button onclick="startNavigableQuiz()" class="btn" style="background: #667eea; font-size: 1.1rem; padding: 12px 24px;">
                    <i class="fas fa-redo"></i> Retake Quiz
                </button>
                <button onclick="reviewQuizAnswers()" class="btn" style="background: #6c757d; font-size: 1.1rem; padding: 12px 24px;">
                    <i class="fas fa-eye"></i> Review Answers
                </button>
            </div>
        </div>
    `;
}

function reviewQuizAnswers() {
    quizState.currentQuestion = 0;
    renderQuizQuestion();
}

function selectAnswer(questionIndex, optionIndex) {
    console.log('Select answer:', questionIndex, optionIndex);
    
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
    console.log('Submit quiz');
    if (quizSubmitted) return;
    
    const questions = [
        { correct: 2 }, // Amazon S3
        { correct: 3 }, // DynamoDB
        { correct: 1 }, // Cannot be shared between EC2 instances
        { correct: 1 }, // S3 Transfer Acceleration
        { correct: 2 }, // Provisioned IOPS
        { correct: 1 }, // Share files across many EC2s
        { correct: 2 }, // Amazon RDS
        { correct: 3 }, // NoSQL database
        { correct: 2 }, // Amazon S3
        { correct: 1 }  // Amazon EBS
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
    let message = 'Keep studying! Review the material and try again.';
    let emoji = '📚';
    
    if (percentage >= 90) {
        scoreClass = 'excellent';
        message = 'Outstanding! You have mastered AWS storage concepts!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        scoreClass = 'excellent';
        message = 'Excellent work! You really understand AWS storage!';
        emoji = '🌟';
    } else if (percentage >= 70) {
        scoreClass = 'good';
        message = 'Good job! Review the missed questions and you\'ll be ready.';
        emoji = '👍';
    } else if (percentage >= 60) {
        scoreClass = 'good';
        message = 'Not bad! Study the concepts you missed and try again.';
        emoji = '📖';
    }
    
    const resultsElement = document.getElementById('quizResults');
    if (resultsElement) {
        resultsElement.innerHTML = `
            <div class="quiz-results">
                <div class="score-display ${scoreClass}">${emoji} ${percentage}%</div>
                <p><strong>${correctAnswers} out of ${questions.length} correct</strong></p>
                <p>${message}</p>
                <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 0.9rem;">
                    <strong>Grade Scale:</strong><br>
                    🏆 90-100%: Outstanding | 🌟 80-89%: Excellent | 👍 70-79%: Good | 📖 60-69%: Fair | 📚 Below 60%: Needs Review
                </div>
            </div>
        `;
    }
    
    quizSubmitted = true;
}

function resetQuiz() {
    console.log('Reset quiz');
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

// Simple game (keeping the old function for compatibility)
function startGame() {
    startPuzzleGame();
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

// Service Analysis Navigation
let serviceAnalysisState = {
    currentService: 0,
    totalServices: 6, // 5 services + 1 decision guide
    services: [
        {
            id: 's3',
            name: 'Amazon S3',
            subtitle: 'Object Storage',
            description: 'Your digital warehouse for any type of file',
            icon: 'fas fa-archive',
            color: '#ff9500',
            bgGradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
            borderColor: '#ff9500',
            strengths: [
                '🌍 Unlimited Storage: Store as much as you want',
                '💰 Cost-Effective: Pay only for what you use',
                '🔒 99.999999999% Durable: Your data is super safe',
                '📁 Any File Type: Images, videos, documents, datasets',
                '🌐 Global Access: Access from anywhere'
            ],
            limitations: [
                '⏱️ Not Real-Time: Slower than local storage',
                '🚫 Not a File System: Can\'t mount like a drive',
                '💸 Transfer Costs: Charges for moving data',
                '🔄 Eventual Consistency: Updates take time'
            ],
            perfectFor: [
                '📊 ML training datasets',
                '🗄️ Backup and archival',
                '📱 Static websites',
                '🎬 Media storage'
            ],
            avoidFor: [
                '⚡ Real-time databases',
                '💾 Operating system files',
                '🔄 Frequently changing files',
                '📁 File system operations'
            ]
        },
        {
            id: 'ebs',
            name: 'Amazon EBS',
            subtitle: 'Block Storage',
            description: 'High-performance storage for your EC2 instances',
            icon: 'fas fa-hdd',
            color: '#2196f3',
            bgGradient: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
            borderColor: '#2196f3',
            strengths: [
                '⚡ Lightning Fast: High IOPS performance',
                '🎯 Low Latency: Millisecond response',
                '📈 Scalable: Resize without downtime',
                '💾 Persistent: Data survives reboots',
                '📸 Snapshots: Easy backup/restore'
            ],
            limitations: [
                '🔗 Single Attachment: One EC2 at a time',
                '🌍 Zone Locked: Tied to one zone',
                '💰 More Expensive: Higher cost than S3',
                '📏 Size Limits: Maximum volume restrictions'
            ],
            perfectFor: [
                '🤖 ML model training',
                '💾 Database storage',
                '💻 OS drives',
                '🎮 High-performance apps'
            ],
            avoidFor: [
                '👥 Multi-instance sharing',
                '🗄️ Long-term archival',
                '🌐 Cross-region access',
                '📱 Static content'
            ]
        },
        {
            id: 'efs',
            name: 'Amazon EFS',
            subtitle: 'File System',
            description: 'Shared file system for multiple EC2 instances',
            icon: 'fas fa-folder-open',
            color: '#4caf50',
            bgGradient: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
            borderColor: '#4caf50',
            strengths: [
                '👥 Multi-Access: Thousands of EC2s simultaneously',
                '📈 Auto-Scaling: Grows automatically',
                '🌍 Multi-AZ: Cross availability zones',
                '📁 POSIX Compatible: Standard file interface',
                '🔒 Secure: Encryption built-in'
            ],
            limitations: [
                '💰 Expensive: Higher cost per GB than EBS/S3',
                '🐧 Linux Only: No Windows support',
                '⏱️ Higher Latency: Slower than EBS',
                '🔧 Complex Setup: Network config needed'
            ],
            perfectFor: [
                '🤝 Distributed ML training',
                '📊 Shared data processing',
                '🌐 Web server farms',
                '📁 Content repositories'
            ],
            avoidFor: [
                '💰 Cost-sensitive applications',
                '🪟 Windows workloads',
                '⚡ Ultra-low latency needs',
                '🔒 Single-instance apps'
            ]
        },
        {
            id: 'rds',
            name: 'Amazon RDS',
            subtitle: 'SQL Database',
            description: 'Managed relational database service',
            icon: 'fas fa-table',
            color: '#e91e63',
            bgGradient: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
            borderColor: '#e91e63',
            strengths: [
                '🔍 SQL Queries: Complex joins & relationships',
                '🛠️ Fully Managed: AWS handles maintenance',
                '📊 ACID Compliant: Data consistency guaranteed',
                '📈 Read Replicas: Scale performance',
                '🔄 Auto Backups: Point-in-time recovery'
            ],
            limitations: [
                '💰 Expensive: Higher cost than NoSQL',
                '📏 Scaling Limits: Vertical scaling challenges',
                '⏱️ Not Real-Time: Not for millisecond responses',
                '🔧 Rigid Schema: Structure changes complex'
            ],
            perfectFor: [
                '👥 Customer relationship management',
                '💰 Financial transactions',
                '📊 Business intelligence',
                '🛒 E-commerce platforms'
            ],
            avoidFor: [
                '⚡ Real-time gaming data',
                '📱 Simple key-value storage',
                '🌍 Massive scale applications',
                '🔄 Rapidly changing schemas'
            ]
        },
        {
            id: 'dynamodb',
            name: 'Amazon DynamoDB',
            subtitle: 'NoSQL Database',
            description: 'Lightning-fast NoSQL database',
            icon: 'fas fa-sticky-note',
            color: '#9c27b0',
            bgGradient: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
            borderColor: '#9c27b0',
            strengths: [
                '⚡ Ultra-Fast: Single-digit millisecond latency',
                '🌍 Massive Scale: Millions of requests per second',
                '🔄 Auto-Scaling: Scales up/down automatically',
                '🛠️ Serverless: No server management needed',
                '💰 Pay-per-Use: Only pay for consumption'
            ],
            limitations: [
                '🚫 No SQL: Limited query capabilities',
                '🔗 No Joins: Can\'t combine tables easily',
                '📏 Item Size Limit: 400KB max per item',
                '💰 Can Be Expensive: At high throughput'
            ],
            perfectFor: [
                '🎮 Gaming leaderboards',
                '📱 Mobile app backends',
                '🛒 Shopping carts',
                '💬 Chat applications'
            ],
            avoidFor: [
                '🔍 Complex SQL queries',
                '📊 Business intelligence',
                '🔗 Multi-table joins',
                '📁 Large file storage'
            ]
        }
    ]
};

function startServiceAnalysis() {
    serviceAnalysisState.currentService = 0;
    renderServiceAnalysis();
}

function renderServiceAnalysis() {
    const container = document.getElementById('serviceAnalysisContainer');
    if (!container) return;
    
    if (serviceAnalysisState.currentService < serviceAnalysisState.services.length) {
        // Render individual service analysis
        const service = serviceAnalysisState.services[serviceAnalysisState.currentService];
        container.innerHTML = renderServiceCard(service);
    } else {
        // Render decision guide
        container.innerHTML = renderDecisionGuide();
    }
}

function renderServiceCard(service) {
    return `
        <div style="background: ${service.bgGradient}; border-radius: 15px; padding: 25px; border-left: 5px solid ${service.borderColor}; margin: 20px 0;">
            <!-- Service Header -->
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, ${service.color}, ${service.color}dd); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="${service.icon}"></i>
                </div>
                <div>
                    <h3 style="margin: 0; color: ${service.color}; font-size: 1.8rem;">${service.name} - ${service.subtitle}</h3>
                    <p style="margin: 5px 0 0 0; color: #666; font-size: 1.1rem;">${service.description}</p>
                </div>
            </div>
            
            <!-- Pros and Cons -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h4 style="color: #2e7d32; margin-bottom: 15px; font-size: 1.2rem;"><i class="fas fa-thumbs-up"></i> Strengths</h4>
                    <ul style="color: #1b5e20; line-height: 1.8; padding-left: 0; list-style: none;">
                        ${service.strengths.map(strength => `<li style="margin-bottom: 8px; padding-left: 0;"><strong>${strength}</strong></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 style="color: #c62828; margin-bottom: 15px; font-size: 1.2rem;"><i class="fas fa-thumbs-down"></i> Limitations</h4>
                    <ul style="color: #b71c1c; line-height: 1.8; padding-left: 0; list-style: none;">
                        ${service.limitations.map(limitation => `<li style="margin-bottom: 8px; padding-left: 0;"><strong>${limitation}</strong></li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Use Cases -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
                <div style="background: rgba(46, 125, 50, 0.1); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #2e7d32; margin-bottom: 15px; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> Perfect For</h4>
                    <ul style="color: #1b5e20; margin: 0; font-size: 1rem; line-height: 1.6; padding-left: 0; list-style: none;">
                        ${service.perfectFor.map(use => `<li style="margin-bottom: 6px;">${use}</li>`).join('')}
                    </ul>
                </div>
                <div style="background: rgba(198, 40, 40, 0.1); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #c62828; margin-bottom: 15px; font-size: 1.1rem;"><i class="fas fa-times-circle"></i> Avoid For</h4>
                    <ul style="color: #b71c1c; margin: 0; font-size: 1rem; line-height: 1.6; padding-left: 0; list-style: none;">
                        ${service.avoidFor.map(avoid => `<li style="margin-bottom: 6px;">${avoid}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
                <button onclick="previousService()" ${serviceAnalysisState.currentService === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''} class="puzzle-btn">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                
                <div style="text-align: center;">
                    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 5px;">
                        ${serviceAnalysisState.currentService + 1} of ${serviceAnalysisState.totalServices}
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        ${Array.from({length: serviceAnalysisState.totalServices}, (_, i) => 
                            `<div style="width: 12px; height: 12px; border-radius: 50%; background: ${i === serviceAnalysisState.currentService ? service.color : 'rgba(255,255,255,0.3)'};"></div>`
                        ).join('')}
                    </div>
                </div>
                
                <button onclick="nextService()" class="puzzle-btn primary">
                    ${serviceAnalysisState.currentService === serviceAnalysisState.totalServices - 1 ? 'Finish' : 'Next'} <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

function renderDecisionGuide() {
    return `
        <div style="background: linear-gradient(135deg, #f5f5f5, #e0e0e0); border-radius: 15px; padding: 30px; margin: 20px 0; border: 2px solid #9e9e9e;">
            <h3 style="text-align: center; margin-bottom: 25px; font-size: 2rem; color: #424242;">🎯 Quick Decision Guide</h3>
            <p style="text-align: center; margin-bottom: 30px; font-size: 1.1rem; color: #666;">Choose the right AWS storage service for your specific use case</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #1976d2; margin-bottom: 12px; font-size: 1.2rem;">🤖 ML Model Training</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Need fast storage for intensive training workloads</p>
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                        <strong style="color: #1976d2; font-size: 1.1rem;">Recommended: Amazon EBS</strong><br>
                        <small style="color: #0d47a1; line-height: 1.4;">High IOPS, low latency, perfect for training</small>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #f57c00; margin-bottom: 12px; font-size: 1.2rem;">📊 Dataset Storage</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Store large training datasets cost-effectively</p>
                    <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                        <strong style="color: #f57c00; font-size: 1.1rem;">Recommended: Amazon S3</strong><br>
                        <small style="color: #e65100; line-height: 1.4;">Cost-effective, unlimited, highly durable</small>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #388e3c; margin-bottom: 12px; font-size: 1.2rem;">👥 Team Collaboration</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Share files across multiple servers</p>
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                        <strong style="color: #388e3c; font-size: 1.1rem;">Recommended: Amazon EFS</strong><br>
                        <small style="color: #2e7d32; line-height: 1.4;">Multi-instance access, auto-scaling</small>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #d32f2f; margin-bottom: 12px; font-size: 1.2rem;">👤 User Data</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Customer profiles with complex relationships</p>
                    <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                        <strong style="color: #d32f2f; font-size: 1.1rem;">Recommended: Amazon RDS</strong><br>
                        <small style="color: #c62828; line-height: 1.4;">SQL queries, ACID compliance, managed</small>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #7b1fa2; margin-bottom: 12px; font-size: 1.2rem;">🎮 Real-time Apps</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Live scores, chat, gaming applications</p>
                    <div style="background: #f3e5f5; padding: 15px; border-radius: 8px;">
                        <strong style="color: #7b1fa2; font-size: 1.1rem;">Recommended: DynamoDB</strong><br>
                        <small style="color: #4a148c; line-height: 1.4;">Ultra-fast, auto-scaling, serverless</small>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h4 style="color: #5d4037; margin-bottom: 12px; font-size: 1.2rem;">🗄️ Data Archival</h4>
                    <p style="margin-bottom: 15px; color: #666; line-height: 1.5;">Long-term backup and compliance storage</p>
                    <div style="background: #efebe9; padding: 15px; border-radius: 8px;">
                        <strong style="color: #5d4037; font-size: 1.1rem;">Recommended: Amazon S3</strong><br>
                        <small style="color: #3e2723; line-height: 1.4;">Durable, cost-effective, multiple storage classes</small>
                    </div>
                </div>
            </div>
            
            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(0,0,0,0.1);">
                <button onclick="previousService()" class="puzzle-btn">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                
                <div style="text-align: center;">
                    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 5px; color: #424242;">
                        ${serviceAnalysisState.currentService + 1} of ${serviceAnalysisState.totalServices}
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        ${Array.from({length: serviceAnalysisState.totalServices}, (_, i) => 
                            `<div style="width: 12px; height: 12px; border-radius: 50%; background: ${i === serviceAnalysisState.currentService ? '#424242' : 'rgba(0,0,0,0.2)'};"></div>`
                        ).join('')}
                    </div>
                </div>
                
                <button onclick="finishServiceAnalysis()" class="puzzle-btn primary">
                    <i class="fas fa-check"></i> Complete
                </button>
            </div>
        </div>
    `;
}

function nextService() {
    if (serviceAnalysisState.currentService < serviceAnalysisState.totalServices - 1) {
        serviceAnalysisState.currentService++;
        renderServiceAnalysis();
    }
}

function previousService() {
    if (serviceAnalysisState.currentService > 0) {
        serviceAnalysisState.currentService--;
        renderServiceAnalysis();
    }
}

function finishServiceAnalysis() {
    const container = document.getElementById('serviceAnalysisContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #e8f5e8, #c8e6c9); border-radius: 15px; margin: 20px 0;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h3 style="color: #2e7d32; margin-bottom: 15px;">Service Analysis Complete!</h3>
            <p style="color: #1b5e20; font-size: 1.1rem; margin-bottom: 20px;">
                You've learned about all 5 AWS storage services and their use cases!
            </p>
            <button onclick="startServiceAnalysis()" class="puzzle-btn primary">
                <i class="fas fa-redo"></i> Review Again
            </button>
        </div>
    `;
}
function startNewPuzzleGame() {
    console.log('NEW PUZZLE GAME STARTING!');
    
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) {
        console.log('gameContainer not found!');
        return;
    }
    
    gameContainer.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 30px; color: white; min-height: 600px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 15px;">🧩 AWS Storage Puzzle Challenge</h2>
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px);">
                    <p style="margin: 0; font-size: 1.1rem;"><strong>🎮 How to Play:</strong> Drag puzzle pieces from the LEFT to matching AWS services on the RIGHT!</p>
                </div>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 30px; margin: 25px 0; flex-wrap: wrap;">
                <div style="background: rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 15px 25px; text-align: center; min-width: 120px;">
                    <span style="font-size: 2rem; font-weight: 700; display: block; color: #10b981;" id="gameScore">0</span>
                    <div style="font-size: 0.9rem; margin-top: 5px;">Total Score</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 15px 25px; text-align: center; min-width: 120px;">
                    <span style="font-size: 2rem; font-weight: 700; display: block; color: #10b981;" id="correctScore">0</span>
                    <div style="font-size: 0.9rem; margin-top: 5px;">✅ Correct</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 15px 25px; text-align: center; min-width: 120px;">
                    <span style="font-size: 2rem; font-weight: 700; display: block; color: #ef4444;" id="wrongScore">0</span>
                    <div style="font-size: 0.9rem; margin-top: 5px;">❌ Wrong</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0; min-height: 500px;">
                <!-- LEFT COLUMN - PUZZLE PIECES -->
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px;">
                    <h3 style="font-size: 1.5rem; text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid rgba(255, 255, 255, 0.3);">🧩 Puzzle Pieces</h3>
                    
                    <div class="game-puzzle-piece" draggable="true" data-answer="s3" style="background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #333; border-radius: 12px; padding: 20px; margin: 15px 0; cursor: grab; display: flex; align-items: center; gap: 15px; min-height: 80px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                        <div style="font-size: 2.5rem;">📊</div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Big Data Files</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: #666;">Store huge CSV files with sales data</p>
                        </div>
                    </div>
                    
                    <div class="game-puzzle-piece" draggable="true" data-answer="ebs" style="background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #333; border-radius: 12px; padding: 20px; margin: 15px 0; cursor: grab; display: flex; align-items: center; gap: 15px; min-height: 80px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                        <div style="font-size: 2.5rem;">⚡</div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Super Fast Storage</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: #666;">Lightning-fast storage for one computer</p>
                        </div>
                    </div>
                    
                    <div class="game-puzzle-piece" draggable="true" data-answer="efs" style="background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #333; border-radius: 12px; padding: 20px; margin: 15px 0; cursor: grab; display: flex; align-items: center; gap: 15px; min-height: 80px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                        <div style="font-size: 2.5rem;">👥</div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Team Sharing</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: #666;">Files shared between multiple computers</p>
                        </div>
                    </div>
                    
                    <div class="game-puzzle-piece" draggable="true" data-answer="rds" style="background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #333; border-radius: 12px; padding: 20px; margin: 15px 0; cursor: grab; display: flex; align-items: center; gap: 15px; min-height: 80px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                        <div style="font-size: 2.5rem;">📋</div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Organized Data</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: #666;">Customer info in rows and columns</p>
                        </div>
                    </div>
                    
                    <div class="game-puzzle-piece" draggable="true" data-answer="dynamodb" style="background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #333; border-radius: 12px; padding: 20px; margin: 15px 0; cursor: grab; display: flex; align-items: center; gap: 15px; min-height: 80px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                        <div style="font-size: 2.5rem;">🚀</div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.1rem; font-weight: 600;">Real-Time Data</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: #666;">User clicks that happen instantly</p>
                        </div>
                    </div>
                </div>
                
                <!-- RIGHT COLUMN - AWS SERVICES -->
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px;">
                    <h3 style="font-size: 1.5rem; text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid rgba(255, 255, 255, 0.3);">☁️ AWS Storage Services</h3>
                    
                    <div class="game-answer-slot" data-slot="s3" style="border: 3px dashed rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 20px; margin: 15px 0; min-height: 80px; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease; background: rgba(255, 255, 255, 0.05);">
                        <div style="width: 60px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; background: linear-gradient(135deg, #ff9500, #ff6b35); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            <i class="fas fa-archive"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.2rem; font-weight: 600;">Amazon S3</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">Object Storage Warehouse</p>
                        </div>
                    </div>
                    
                    <div class="game-answer-slot" data-slot="ebs" style="border: 3px dashed rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 20px; margin: 15px 0; min-height: 80px; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease; background: rgba(255, 255, 255, 0.05);">
                        <div style="width: 60px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; background: linear-gradient(135deg, #4facfe, #00f2fe); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            <i class="fas fa-hdd"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.2rem; font-weight: 600;">Amazon EBS</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">High-Speed Block Storage</p>
                        </div>
                    </div>
                    
                    <div class="game-answer-slot" data-slot="efs" style="border: 3px dashed rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 20px; margin: 15px 0; min-height: 80px; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease; background: rgba(255, 255, 255, 0.05);">
                        <div style="width: 60px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; background: linear-gradient(135deg, #43e97b, #38f9d7); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.2rem; font-weight: 600;">Amazon EFS</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">Shared File System</p>
                        </div>
                    </div>
                    
                    <div class="game-answer-slot" data-slot="rds" style="border: 3px dashed rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 20px; margin: 15px 0; min-height: 80px; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease; background: rgba(255, 255, 255, 0.05);">
                        <div style="width: 60px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; background: linear-gradient(135deg, #fa709a, #fee140); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            <i class="fas fa-table"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.2rem; font-weight: 600;">Amazon RDS</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">Smart SQL Database</p>
                        </div>
                    </div>
                    
                    <div class="game-answer-slot" data-slot="dynamodb" style="border: 3px dashed rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 20px; margin: 15px 0; min-height: 80px; display: flex; align-items: center; gap: 15px; transition: all 0.3s ease; background: rgba(255, 255, 255, 0.05);">
                        <div style="width: 60px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; background: linear-gradient(135deg, #a8edea, #fed6e3); box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            <i class="fas fa-sticky-note"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; font-size: 1.2rem; font-weight: 600;">Amazon DynamoDB</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">Lightning-Fast NoSQL</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; min-height: 80px; display: flex; align-items: center; justify-content: center;" id="gameFeedback">
                🎮 <strong>Ready to play?</strong> Drag a puzzle piece from the left to its matching AWS service on the right!
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
                <button onclick="startNewPuzzleGame()" style="background: #ff9500; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; margin: 0 10px; transition: all 0.3s ease;">🔄 Reset Game</button>
                <button onclick="startNewPuzzleGame()" style="background: rgba(255, 255, 255, 0.2); color: white; border: 2px solid rgba(255, 255, 255, 0.3); padding: 15px 30px; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; margin: 0 10px;">🎲 New Game</button>
            </div>
        </div>
    `;
    
    // Initialize the game
    initializeNewPuzzleGame();
}

// Game state for the new puzzle
let newGameScore = 0;
let newGameCorrect = 0;
let newGameWrong = 0;
let newGameUsedPieces = new Set();

function initializeNewPuzzleGame() {
    console.log('Initializing new puzzle game...');
    
    // Reset game state
    newGameScore = 0;
    newGameCorrect = 0;
    newGameWrong = 0;
    newGameUsedPieces.clear();
    
    // Add hover effects
    const pieces = document.querySelectorAll('.game-puzzle-piece');
    pieces.forEach(piece => {
        piece.addEventListener('mouseenter', () => {
            if (!piece.classList.contains('used')) {
                piece.style.transform = 'translateY(-3px)';
                piece.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }
        });
        piece.addEventListener('mouseleave', () => {
            if (!piece.classList.contains('used')) {
                piece.style.transform = 'translateY(0)';
                piece.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }
        });
    });
    
    // Add drag and drop functionality
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            if (piece.classList.contains('used')) return;
            console.log('Drag started:', e.target.dataset.answer);
            e.target.style.cursor = 'grabbing';
            e.target.style.transform = 'rotate(5deg) scale(1.05)';
            e.target.style.opacity = '0.8';
            e.dataTransfer.setData('text/plain', e.target.dataset.answer);
        });
        
        piece.addEventListener('dragend', (e) => {
            if (!piece.classList.contains('used')) {
                e.target.style.cursor = 'grab';
                e.target.style.transform = 'translateY(0)';
                e.target.style.opacity = '1';
            }
        });
    });
    
    const slots = document.querySelectorAll('.game-answer-slot');
    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        slot.addEventListener('dragenter', (e) => {
            e.target.closest('.game-answer-slot').style.borderColor = '#ff9500';
            e.target.closest('.game-answer-slot').style.background = 'rgba(255, 149, 0, 0.2)';
            e.target.closest('.game-answer-slot').style.transform = 'scale(1.02)';
        });
        
        slot.addEventListener('dragleave', (e) => {
            e.target.closest('.game-answer-slot').style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.target.closest('.game-answer-slot').style.background = 'rgba(255, 255, 255, 0.05)';
            e.target.closest('.game-answer-slot').style.transform = 'scale(1)';
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const slotElement = e.target.closest('.game-answer-slot');
            const pieceAnswer = e.dataTransfer.getData('text/plain');
            const slotId = slotElement.dataset.slot;
            
            console.log('Dropped:', pieceAnswer, 'on', slotId);
            
            // Reset slot appearance
            slotElement.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            slotElement.style.background = 'rgba(255, 255, 255, 0.05)';
            slotElement.style.transform = 'scale(1)';
            
            checkNewGameAnswer(pieceAnswer, slotId, slotElement);
        });
    });
    
    updateNewGameScore();
    console.log('New puzzle game initialized!');
}

function checkNewGameAnswer(pieceAnswer, slotId, slotElement) {
    const feedback = document.getElementById('gameFeedback');
    const pieceElement = document.querySelector(`[data-answer="${pieceAnswer}"]`);
    
    if (pieceAnswer === slotId) {
        // CORRECT!
        newGameScore += 1;
        newGameCorrect += 1;
        newGameUsedPieces.add(pieceAnswer);
        
        // Visual feedback
        slotElement.style.borderColor = '#10b981';
        slotElement.style.background = 'rgba(16, 185, 129, 0.2)';
        slotElement.style.borderStyle = 'solid';
        
        pieceElement.style.opacity = '0.4';
        pieceElement.style.cursor = 'not-allowed';
        pieceElement.style.filter = 'grayscale(0.5)';
        pieceElement.classList.add('used');
        
        feedback.innerHTML = `
            <div style="color: #10b981; font-weight: 600; font-size: 1.2rem;">
                🎉 <strong>CORRECT!</strong> +1 point! Score: ${newGameScore}
            </div>
        `;
        
        if (newGameUsedPieces.size === 5) {
            setTimeout(() => {
                feedback.innerHTML = `
                    <div style="color: #10b981; font-weight: 600; font-size: 1.3rem;">
                        🏆 <strong>GAME COMPLETE!</strong> Final Score: ${newGameScore}/5
                        <br>🎉 You matched all AWS storage services correctly!
                    </div>
                `;
            }, 2000);
        }
        
    } else {
        // WRONG!
        newGameScore -= 1;
        newGameWrong += 1;
        
        slotElement.style.borderColor = '#ef4444';
        slotElement.style.background = 'rgba(239, 68, 68, 0.2)';
        slotElement.style.animation = 'shake 0.5s ease';
        
        feedback.innerHTML = `
            <div style="color: #ef4444; font-weight: 600; font-size: 1.2rem;">
                ❌ <strong>WRONG!</strong> -1 point! Score: ${newGameScore}
            </div>
        `;
        
        setTimeout(() => {
            slotElement.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            slotElement.style.background = 'rgba(255, 255, 255, 0.05)';
            slotElement.style.animation = '';
        }, 1500);
    }
    
    updateNewGameScore();
}

function updateNewGameScore() {
    const scoreEl = document.getElementById('gameScore');
    const correctEl = document.getElementById('correctScore');
    const wrongEl = document.getElementById('wrongScore');
    
    if (scoreEl) {
        scoreEl.textContent = newGameScore;
        scoreEl.style.color = newGameScore >= 0 ? '#10b981' : '#ef4444';
    }
    if (correctEl) correctEl.textContent = newGameCorrect;
    if (wrongEl) wrongEl.textContent = newGameWrong;
}
