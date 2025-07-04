/**
 * Puzzle Game Controller Module
 * Handles the interactive drag & drop puzzle game for AWS storage services
 * 
 * @module PuzzleGameController
 * @requires AppState, Utils, DOMUtils, UIController
 */

'use strict';

/**
 * Puzzle Game Controller
 * Manages the drag & drop puzzle game functionality
 */
const PuzzleGameController = {
    // Game state
    state: {
        initialized: false,
        gameActive: false,
        pieces: [],
        slots: [],
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        usedPieces: new Set(),
        gameComplete: false
    },
    
    // Game configuration
    config: {
        maxAttempts: 3,
        scorePerCorrect: 100,
        scorePenalty: 25
    },
    
    // Game data
    gameData: {
        pieces: [
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
        ],
        
        slots: [
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
        ]
    },
    
    /**
     * Initialize the puzzle game controller
     */
    init() {
        try {
            Utils.log('Initializing PuzzleGameController...');
            
            this.resetGameState();
            this.state.initialized = true;
            
            Utils.log('PuzzleGameController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize PuzzleGameController:', error);
        }
    },
    
    /**
     * Start the puzzle game
     */
    start() {
        try {
            Utils.log('Starting puzzle game...');
            
            this.resetGameState();
            this.renderGame();
            this.initializeDragAndDrop();
            
            this.state.gameActive = true;
            
            Utils.log('Puzzle game started successfully');
            
        } catch (error) {
            console.error('Failed to start puzzle game:', error);
            UIController.showErrorMessage('Failed to start the puzzle game. Please try again.');
        }
    },
    
    /**
     * Reset game state to initial values
     */
    resetGameState() {
        this.state = {
            ...this.state,
            gameActive: false,
            pieces: [...this.gameData.pieces],
            slots: [...this.gameData.slots],
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            usedPieces: new Set(),
            gameComplete: false
        };
    },
    
    /**
     * Render the puzzle game interface
     */
    renderGame() {
        const container = DOMUtils.getElementById('puzzleGameContainer');
        if (!container) {
            throw new Error('Puzzle game container not found');
        }
        
        const gameHTML = this.generateGameHTML();
        DOMUtils.setContent(container, gameHTML, true);
        
        // Animate game entrance
        UIController.animateIn(container, 'slideInUp');
    },
    
    /**
     * Generate the complete game HTML
     * @returns {string} Game HTML
     */
    generateGameHTML() {
        return `
            <div class="puzzle-game">
                <!-- Game Header -->
                <header class="game-header">
                    <h3><i class="fas fa-puzzle-piece" aria-hidden="true"></i> Drag & Drop Challenge</h3>
                    <p>Match each use case with the correct AWS storage service!</p>
                </header>
                
                <!-- Score Board -->
                <div class="score-board">
                    <div class="score-item">
                        <span class="score-label">Score:</span>
                        <span class="score-value" id="gameScore">0</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Correct:</span>
                        <span class="score-value correct" id="correctCount">0</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Wrong:</span>
                        <span class="score-value wrong" id="wrongCount">0</span>
                    </div>
                </div>
                
                <!-- Game Board -->
                <div class="game-board">
                    <!-- Puzzle Pieces (Left Side) -->
                    <div class="puzzle-pieces">
                        <h4><i class="fas fa-hand-pointer" aria-hidden="true"></i> Use Cases (Drag These)</h4>
                        <div class="pieces-container">
                            ${this.generatePiecesHTML()}
                        </div>
                    </div>
                    
                    <!-- Drop Slots (Right Side) -->
                    <div class="drop-slots">
                        <h4><i class="fas fa-bullseye" aria-hidden="true"></i> AWS Services (Drop Here)</h4>
                        <div class="slots-container">
                            ${this.generateSlotsHTML()}
                        </div>
                    </div>
                </div>
                
                <!-- Game Controls -->
                <div class="game-controls">
                    <button class="btn btn-secondary" onclick="PuzzleGameController.reset()">
                        <i class="fas fa-redo" aria-hidden="true"></i> Reset Game
                    </button>
                    <button class="btn btn-info" onclick="PuzzleGameController.showHint()">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i> Show Hint
                    </button>
                </div>
                
                <!-- Game Results (Hidden initially) -->
                <div class="game-results" id="gameResults" style="display: none;">
                    <!-- Results will be populated when game completes -->
                </div>
            </div>
        `;
    },
    
    /**
     * Generate HTML for puzzle pieces
     * @returns {string} Pieces HTML
     */
    generatePiecesHTML() {
        return this.state.pieces.map(piece => `
            <div class="puzzle-piece" 
                 draggable="true" 
                 data-piece-id="${piece.id}"
                 data-correct-slot="${piece.correctSlot}"
                 role="button"
                 tabindex="0"
                 aria-label="Drag ${piece.title} to correct service">
                <div class="piece-emoji">${piece.emoji}</div>
                <div class="piece-content">
                    <h5>${piece.title}</h5>
                    <p>${piece.description}</p>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Generate HTML for drop slots
     * @returns {string} Slots HTML
     */
    generateSlotsHTML() {
        return this.state.slots.map(slot => `
            <div class="drop-slot" 
                 data-slot-id="${slot.id}"
                 role="button"
                 tabindex="0"
                 aria-label="Drop zone for ${slot.name}">
                <div class="slot-header">
                    <i class="${slot.icon}" aria-hidden="true"></i>
                    <h5>${slot.name}</h5>
                </div>
                <p class="slot-description">${slot.description}</p>
                <div class="slot-drop-zone">
                    <span class="drop-hint">Drop here</span>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Initialize drag and drop functionality
     */
    initializeDragAndDrop() {
        this.initializeDraggablePieces();
        this.initializeDropSlots();
    },
    
    /**
     * Initialize draggable pieces
     */
    initializeDraggablePieces() {
        const pieces = DOMUtils.querySelectorAll('.puzzle-piece');
        
        pieces.forEach(piece => {
            // Drag start
            DOMUtils.addEventListener(piece, 'dragstart', (e) => {
                this.handleDragStart(e);
            });
            
            // Drag end
            DOMUtils.addEventListener(piece, 'dragend', (e) => {
                this.handleDragEnd(e);
            });
            
            // Keyboard support
            DOMUtils.addEventListener(piece, 'keydown', (e) => {
                this.handlePieceKeydown(e);
            });
        });
    },
    
    /**
     * Initialize drop slots
     */
    initializeDropSlots() {
        const slots = DOMUtils.querySelectorAll('.drop-slot');
        
        slots.forEach(slot => {
            // Drag over
            DOMUtils.addEventListener(slot, 'dragover', (e) => {
                this.handleDragOver(e);
            });
            
            // Drag enter
            DOMUtils.addEventListener(slot, 'dragenter', (e) => {
                this.handleDragEnter(e);
            });
            
            // Drag leave
            DOMUtils.addEventListener(slot, 'dragleave', (e) => {
                this.handleDragLeave(e);
            });
            
            // Drop
            DOMUtils.addEventListener(slot, 'drop', (e) => {
                this.handleDrop(e);
            });
        });
    },
    
    /**
     * Handle drag start event
     * @param {DragEvent} e - Drag event
     */
    handleDragStart(e) {
        const piece = e.target.closest('.puzzle-piece');
        if (!piece) return;
        
        const pieceId = piece.getAttribute('data-piece-id');
        const correctSlot = piece.getAttribute('data-correct-slot');
        
        // Store drag data
        e.dataTransfer.setData('text/plain', JSON.stringify({
            pieceId,
            correctSlot
        }));
        
        // Visual feedback
        DOMUtils.toggleClass(piece, 'dragging', true);
        
        Utils.log(`Drag started for piece: ${pieceId}`);
    },
    
    /**
     * Handle drag end event
     * @param {DragEvent} e - Drag event
     */
    handleDragEnd(e) {
        const piece = e.target.closest('.puzzle-piece');
        if (!piece) return;
        
        // Remove visual feedback
        DOMUtils.toggleClass(piece, 'dragging', false);
        
        // Remove drag-over effects from all slots
        const slots = DOMUtils.querySelectorAll('.drop-slot');
        slots.forEach(slot => {
            DOMUtils.toggleClass(slot, 'drag-over', false);
        });
    },
    
    /**
     * Handle drag over event
     * @param {DragEvent} e - Drag event
     */
    handleDragOver(e) {
        e.preventDefault(); // Allow drop
    },
    
    /**
     * Handle drag enter event
     * @param {DragEvent} e - Drag event
     */
    handleDragEnter(e) {
        const slot = e.target.closest('.drop-slot');
        if (!slot) return;
        
        DOMUtils.toggleClass(slot, 'drag-over', true);
    },
    
    /**
     * Handle drag leave event
     * @param {DragEvent} e - Drag event
     */
    handleDragLeave(e) {
        const slot = e.target.closest('.drop-slot');
        if (!slot) return;
        
        // Only remove if actually leaving the slot
        if (!slot.contains(e.relatedTarget)) {
            DOMUtils.toggleClass(slot, 'drag-over', false);
        }
    },
    
    /**
     * Handle drop event
     * @param {DragEvent} e - Drag event
     */
    handleDrop(e) {
        e.preventDefault();
        
        const slot = e.target.closest('.drop-slot');
        if (!slot) return;
        
        try {
            // Get drag data
            const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const { pieceId, correctSlot } = dragData;
            const slotId = slot.getAttribute('data-slot-id');
            
            // Check if piece was already used
            if (this.state.usedPieces.has(pieceId)) {
                UIController.showInfoMessage('This piece has already been used!');
                return;
            }
            
            // Process the drop
            this.processDrop(pieceId, correctSlot, slotId, slot);
            
        } catch (error) {
            console.error('Error processing drop:', error);
            UIController.showErrorMessage('Error processing your answer. Please try again.');
        } finally {
            // Clean up visual feedback
            DOMUtils.toggleClass(slot, 'drag-over', false);
        }
    },
    
    /**
     * Process a drop action
     * @param {string} pieceId - ID of dropped piece
     * @param {string} correctSlot - Correct slot for the piece
     * @param {string} slotId - ID of slot where piece was dropped
     * @param {HTMLElement} slotElement - Slot DOM element
     */
    processDrop(pieceId, correctSlot, slotId, slotElement) {
        const isCorrect = correctSlot === slotId;
        
        // Mark piece as used
        this.state.usedPieces.add(pieceId);
        
        // Update score and counters
        if (isCorrect) {
            this.state.correctAnswers++;
            this.state.score += this.config.scorePerCorrect;
            this.showCorrectFeedback(slotElement, pieceId);
        } else {
            this.state.wrongAnswers++;
            this.state.score = Math.max(0, this.state.score - this.config.scorePenalty);
            this.showIncorrectFeedback(slotElement, pieceId, correctSlot);
        }
        
        // Update UI
        this.updateScoreBoard();
        this.hidePiece(pieceId);
        
        // Check if game is complete
        if (this.state.usedPieces.size === this.state.pieces.length) {
            this.completeGame();
        }
        
        Utils.log(`Drop processed: piece ${pieceId} -> slot ${slotId} (${isCorrect ? 'correct' : 'incorrect'})`);
    },
    
    /**
     * Show correct answer feedback
     * @param {HTMLElement} slotElement - Slot element
     * @param {string} pieceId - Piece ID
     */
    showCorrectFeedback(slotElement, pieceId) {
        const piece = this.state.pieces.find(p => p.id.toString() === pieceId);
        
        // Add visual feedback to slot
        DOMUtils.toggleClass(slotElement, 'correct', true);
        
        // Update slot content
        const dropZone = slotElement.querySelector('.slot-drop-zone');
        if (dropZone && piece) {
            dropZone.innerHTML = `
                <div class="dropped-piece correct">
                    <span class="piece-emoji">${piece.emoji}</span>
                    <span class="piece-title">${piece.title}</span>
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                </div>
            `;
        }
        
        // Show success message
        UIController.showSuccessMessage(`Correct! ${piece.title} belongs in ${slotElement.querySelector('h5').textContent}!`);
    },
    
    /**
     * Show incorrect answer feedback
     * @param {HTMLElement} slotElement - Slot element
     * @param {string} pieceId - Piece ID
     * @param {string} correctSlotId - Correct slot ID
     */
    showIncorrectFeedback(slotElement, pieceId, correctSlotId) {
        const piece = this.state.pieces.find(p => p.id.toString() === pieceId);
        const correctSlot = this.state.slots.find(s => s.id === correctSlotId);
        
        // Add visual feedback to slot
        DOMUtils.toggleClass(slotElement, 'incorrect', true);
        
        // Update slot content temporarily
        const dropZone = slotElement.querySelector('.slot-drop-zone');
        if (dropZone && piece) {
            dropZone.innerHTML = `
                <div class="dropped-piece incorrect">
                    <span class="piece-emoji">${piece.emoji}</span>
                    <span class="piece-title">${piece.title}</span>
                    <i class="fas fa-times-circle" aria-hidden="true"></i>
                </div>
            `;
            
            // Reset after delay
            setTimeout(() => {
                dropZone.innerHTML = '<span class="drop-hint">Drop here</span>';
                DOMUtils.toggleClass(slotElement, 'incorrect', false);
            }, 2000);
        }
        
        // Show error message with hint
        const message = correctSlot ? 
            `Incorrect! ${piece.title} should go in ${correctSlot.name}.` :
            `Incorrect! Try again.`;
        
        UIController.showErrorMessage(message);
    },
    
    /**
     * Hide a used piece
     * @param {string} pieceId - ID of piece to hide
     */
    hidePiece(pieceId) {
        const pieceElement = DOMUtils.querySelector(`[data-piece-id="${pieceId}"]`);
        if (pieceElement) {
            UIController.animateOut(pieceElement, 'fadeOut', () => {
                DOMUtils.toggleClass(pieceElement, 'used', true);
                pieceElement.style.display = 'none';
            });
        }
    },
    
    /**
     * Update score board display
     */
    updateScoreBoard() {
        const scoreElement = DOMUtils.getElementById('gameScore');
        const correctElement = DOMUtils.getElementById('correctCount');
        const wrongElement = DOMUtils.getElementById('wrongCount');
        
        if (scoreElement) {
            DOMUtils.setContent(scoreElement, this.state.score.toString());
        }
        
        if (correctElement) {
            DOMUtils.setContent(correctElement, this.state.correctAnswers.toString());
        }
        
        if (wrongElement) {
            DOMUtils.setContent(wrongElement, this.state.wrongAnswers.toString());
        }
    },
    
    /**
     * Complete the game
     */
    completeGame() {
        this.state.gameComplete = true;
        this.state.gameActive = false;
        
        // Calculate final score and grade
        const totalQuestions = this.state.pieces.length;
        const percentage = Math.round((this.state.correctAnswers / totalQuestions) * 100);
        
        // Show completion results
        this.showGameResults(percentage);
        
        Utils.log(`Game completed: ${this.state.correctAnswers}/${totalQuestions} correct (${percentage}%)`);
    },
    
    /**
     * Show game completion results
     * @param {number} percentage - Success percentage
     */
    showGameResults(percentage) {
        const resultsContainer = DOMUtils.getElementById('gameResults');
        if (!resultsContainer) return;
        
        let grade, message, emoji;
        
        if (percentage >= 90) {
            grade = 'Excellent';
            message = 'Outstanding! You\'ve mastered AWS storage services!';
            emoji = '🏆';
        } else if (percentage >= 80) {
            grade = 'Great';
            message = 'Great job! You understand AWS storage well!';
            emoji = '🌟';
        } else if (percentage >= 70) {
            grade = 'Good';
            message = 'Good work! Review the missed items and try again.';
            emoji = '👍';
        } else {
            grade = 'Keep Learning';
            message = 'Keep practicing! Review the lesson and try again.';
            emoji = '📚';
        }
        
        const resultsHTML = `
            <div class="game-completion">
                <div class="completion-header">
                    <div class="completion-emoji">${emoji}</div>
                    <h3>Game Complete!</h3>
                    <div class="completion-grade">${grade}</div>
                </div>
                
                <div class="completion-stats">
                    <div class="stat-item">
                        <span class="stat-label">Final Score:</span>
                        <span class="stat-value">${this.state.score}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Accuracy:</span>
                        <span class="stat-value">${percentage}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Correct:</span>
                        <span class="stat-value correct">${this.state.correctAnswers}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Wrong:</span>
                        <span class="stat-value wrong">${this.state.wrongAnswers}</span>
                    </div>
                </div>
                
                <p class="completion-message">${message}</p>
                
                <div class="completion-actions">
                    <button class="btn btn-primary" onclick="PuzzleGameController.start()">
                        <i class="fas fa-redo" aria-hidden="true"></i> Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="PuzzleGameController.showSolution()">
                        <i class="fas fa-eye" aria-hidden="true"></i> Show Solution
                    </button>
                </div>
            </div>
        `;
        
        DOMUtils.setContent(resultsContainer, resultsHTML, true);
        resultsContainer.style.display = 'block';
        
        // Animate results appearance
        UIController.animateIn(resultsContainer, 'slideInUp');
    },
    
    /**
     * Reset the game
     */
    reset() {
        Utils.log('Resetting puzzle game...');
        
        this.resetGameState();
        this.start();
        
        UIController.showInfoMessage('Game reset! Try again.');
    },
    
    /**
     * Show hint for current pieces
     */
    showHint() {
        const unusedPieces = this.state.pieces.filter(piece => 
            !this.state.usedPieces.has(piece.id.toString())
        );
        
        if (unusedPieces.length === 0) {
            UIController.showInfoMessage('No more pieces to place!');
            return;
        }
        
        const randomPiece = unusedPieces[Math.floor(Math.random() * unusedPieces.length)];
        const correctSlot = this.state.slots.find(slot => slot.id === randomPiece.correctSlot);
        
        if (correctSlot) {
            UIController.showInfoMessage(
                `Hint: "${randomPiece.title}" belongs in ${correctSlot.name}!`
            );
        }
    },
    
    /**
     * Show complete solution
     */
    showSolution() {
        const solutionHTML = this.state.pieces.map(piece => {
            const slot = this.state.slots.find(s => s.id === piece.correctSlot);
            return `
                <div class="solution-item">
                    <span class="solution-piece">${piece.emoji} ${piece.title}</span>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <span class="solution-slot">
                        <i class="${slot.icon}" aria-hidden="true"></i> ${slot.name}
                    </span>
                </div>
            `;
        }).join('');
        
        UIController.showModal({
            title: 'Complete Solution',
            icon: 'fas fa-lightbulb',
            content: `
                <div class="game-solution">
                    <p>Here are all the correct matches:</p>
                    <div class="solution-list">
                        ${solutionHTML}
                    </div>
                </div>
            `
        });
    },
    
    /**
     * Handle keyboard navigation for pieces
     * @param {KeyboardEvent} e - Keyboard event
     */
    handlePieceKeydown(e) {
        // Future: Implement keyboard navigation for accessibility
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Could implement keyboard-based piece selection
        }
    },
    
    /**
     * Get current game state
     * @returns {Object} Current game state
     */
    getState() {
        return { ...this.state };
    }
};

// Make PuzzleGameController available globally
window.PuzzleGameController = PuzzleGameController;
