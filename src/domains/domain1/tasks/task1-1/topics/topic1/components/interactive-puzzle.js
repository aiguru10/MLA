/**
 * Interactive Puzzle Challenge Component
 * Drag and drop AWS storage services to match with use cases
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-01
 */

class InteractivePuzzle {
    constructor() {
        this.containerId = 'puzzleGameContainer';
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.completedMatches = 0;
        this.draggedElement = null;
        this.initialized = false;
        this.gameData = null;
    }

    /**
     * Initialize the Interactive Puzzle
     */
    async init() {
        try {
            Utils.log('Initializing Interactive Puzzle Challenge...');
            
            this.setupGameData();
            this.render();
            this.setupDragAndDrop();
            
            this.initialized = true;
            Utils.log('Interactive Puzzle Challenge initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Interactive Puzzle Challenge:', error);
            throw error;
        }
    }

    /**
     * Setup game data with services and use cases
     */
    setupGameData() {
        this.gameData = {
            services: [
                {
                    id: 's3',
                    name: 'Amazon S3',
                    icon: 'fas fa-cloud',
                    color: '#FF9900',
                    description: 'Object Storage'
                },
                {
                    id: 'ebs',
                    name: 'Amazon EBS',
                    icon: 'fas fa-hdd',
                    color: '#FF4B4B',
                    description: 'Block Storage'
                },
                {
                    id: 'efs',
                    name: 'Amazon EFS',
                    icon: 'fas fa-folder-open',
                    color: '#4CAF50',
                    description: 'File System'
                },
                {
                    id: 'fsx',
                    name: 'Amazon FSx',
                    icon: 'fas fa-tachometer-alt',
                    color: '#9C27B0',
                    description: 'High-Performance FS'
                },
                {
                    id: 'glacier',
                    name: 'Amazon Glacier',
                    icon: 'fas fa-archive',
                    color: '#2196F3',
                    description: 'Archival Storage'
                },
                {
                    id: 'rds',
                    name: 'Amazon RDS',
                    icon: 'fas fa-database',
                    color: '#FF6B35',
                    description: 'Relational Database'
                },
                {
                    id: 'dynamodb',
                    name: 'Amazon DynamoDB',
                    icon: 'fas fa-table',
                    color: '#4A90E2',
                    description: 'NoSQL Database'
                }
            ],
            useCases: [
                {
                    id: 'real-time-inference',
                    title: 'Real-time ML Inference',
                    description: 'Fast storage for real-time model predictions and A/B testing data',
                    correctService: 'dynamodb',
                    category: 'Machine Learning'
                },
                {
                    id: 'high-iops',
                    title: 'High IOPS Database',
                    description: 'Database requiring consistent high-performance storage',
                    correctService: 'ebs',
                    category: 'Database'
                },
                {
                    id: 'model-archive',
                    title: 'Model Archival',
                    description: 'Long-term storage of old ML models and datasets',
                    correctService: 'glacier',
                    category: 'Archival'
                },
                {
                    id: 'ml-training',
                    title: 'Intensive ML Training',
                    description: 'High-throughput storage for compute-intensive ML workloads',
                    correctService: 'fsx',
                    category: 'Machine Learning'
                },
                {
                    id: 'data-lake',
                    title: 'Data Lake for ML',
                    description: 'Store large datasets for machine learning training and analytics',
                    correctService: 's3',
                    category: 'Machine Learning'
                },
                {
                    id: 'ml-metadata',
                    title: 'ML Experiment Tracking',
                    description: 'Store structured ML metadata, experiment results, and model metrics',
                    correctService: 'rds',
                    category: 'Machine Learning'
                },
                {
                    id: 'shared-training',
                    title: 'Shared Training Data',
                    description: 'Multiple ML instances accessing the same dataset simultaneously',
                    correctService: 'efs',
                    category: 'Machine Learning'
                }
            ]
        };

        // Shuffle the use cases to make the puzzle more challenging
        this.gameData.useCases = this.shuffleArray(this.gameData.useCases);
        
        // Also shuffle the services for variety
        this.gameData.services = this.shuffleArray(this.gameData.services);

        this.totalQuestions = this.gameData.useCases.length;
        Utils.log(`Setup puzzle with ${this.gameData.services.length} services and ${this.totalQuestions} use cases (shuffled)`);
    }

    /**
     * Shuffle array using Fisher-Yates algorithm
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Render the puzzle interface
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Puzzle container not found');
            return;
        }

        const html = `
            <div class="puzzle-wrapper">
                <!-- Game Header -->
                <div class="puzzle-header">
                    <div class="puzzle-score">
                        <div class="score-item">
                            <span class="score-label">Score:</span>
                            <span class="score-value" id="puzzleScore">${this.getScorePercentage()}%</span>
                        </div>
                        <div class="score-item">
                            <span class="score-label">Progress:</span>
                            <span class="score-value" id="puzzleProgress">${this.completedMatches}/${this.totalQuestions}</span>
                        </div>
                    </div>
                    <button class="puzzle-reset-btn" id="resetPuzzle">
                        <i class="fas fa-redo"></i>
                        Reset Game
                    </button>
                </div>

                <!-- Game Instructions -->
                <div class="puzzle-instructions">
                    <h3><i class="fas fa-info-circle"></i> How to Play</h3>
                    <p>Drag the AWS storage services from the left panel and drop them onto the matching use cases on the right. Each correct match earns you points!</p>
                </div>

                <!-- Game Area -->
                <div class="puzzle-game-area">
                    <!-- Services Panel -->
                    <div class="services-panel">
                        <h3><i class="fas fa-server"></i> AWS Storage Services</h3>
                        <div class="services-list" id="servicesList">
                            ${this.renderServices()}
                        </div>
                    </div>

                    <!-- Use Cases Panel -->
                    <div class="use-cases-panel">
                        <h3><i class="fas fa-bullseye"></i> Use Cases</h3>
                        <div class="use-cases-list" id="useCasesList">
                            ${this.renderUseCases()}
                        </div>
                    </div>
                </div>

                <!-- Game Results -->
                <div class="puzzle-results" id="puzzleResults" style="display: none;">
                    <div class="results-content">
                        <h3><i class="fas fa-trophy"></i> Congratulations!</h3>
                        <p>You've completed the puzzle challenge!</p>
                        <div class="final-score">
                            <span>Final Score: <strong id="finalScore">${this.getScorePercentage()}%</strong></span>
                        </div>
                        <button class="btn btn-primary" onclick="pageController.nextPage()">
                            Continue to Quiz
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        DOMUtils.setContent(container, html, true);
        
        // Setup reset button
        const resetBtn = DOMUtils.getElementById('resetPuzzle');
        if (resetBtn) {
            DOMUtils.addEventListener(resetBtn, 'click', () => this.resetGame());
        }
    }

    /**
     * Render services list
     */
    renderServices() {
        return this.gameData.services.map(service => `
            <div class="service-item" 
                 draggable="true" 
                 data-service-id="${service.id}"
                 data-service-name="${service.name}">
                <div class="service-icon" style="background: ${service.color}">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-info">
                    <h4>${service.name}</h4>
                    <p>${service.description}</p>
                </div>
                <div class="drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render use cases list
     */
    renderUseCases() {
        return this.gameData.useCases.map(useCase => `
            <div class="use-case-item droppable-area" 
                 data-use-case-id="${useCase.id}"
                 data-correct-service="${useCase.correctService}">
                <div class="use-case-header">
                    <h4>${useCase.title}</h4>
                    <span class="use-case-category">${useCase.category}</span>
                </div>
                <p class="use-case-description">${useCase.description}</p>
                <div class="drop-hint">
                    <i class="fas fa-hand-pointer"></i>
                    <span>Drag AWS service here</span>
                </div>
                <div class="match-result" style="display: none;">
                    <div class="matched-service"></div>
                    <div class="match-status"></div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Setup drag and drop functionality
     */
    setupDragAndDrop() {
        // Setup drag events for services
        const serviceItems = DOMUtils.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            DOMUtils.addEventListener(item, 'dragstart', (e) => this.handleDragStart(e));
            DOMUtils.addEventListener(item, 'dragend', (e) => this.handleDragEnd(e));
        });

        // Setup drop events for use cases
        const useCaseItems = DOMUtils.querySelectorAll('.use-case-item');
        useCaseItems.forEach(item => {
            DOMUtils.addEventListener(item, 'dragover', (e) => this.handleDragOver(e));
            DOMUtils.addEventListener(item, 'drop', (e) => this.handleDrop(e));
            DOMUtils.addEventListener(item, 'dragenter', (e) => this.handleDragEnter(e));
            DOMUtils.addEventListener(item, 'dragleave', (e) => this.handleDragLeave(e));
        });
    }

    /**
     * Handle drag start
     */
    handleDragStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        
        const serviceId = e.target.dataset.serviceId;
        const serviceName = e.target.dataset.serviceName;
        
        e.dataTransfer.setData('text/plain', serviceId);
        e.dataTransfer.setData('application/json', JSON.stringify({
            serviceId: serviceId,
            serviceName: serviceName
        }));
        
        Utils.log(`Started dragging: ${serviceName}`);
    }

    /**
     * Handle drag end
     */
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    /**
     * Handle drag over
     */
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    /**
     * Handle drag enter
     */
    handleDragEnter(e) {
        e.preventDefault();
        if (e.target.closest('.use-case-item')) {
            e.target.closest('.use-case-item').classList.add('drag-over');
        }
    }

    /**
     * Handle drag leave
     */
    handleDragLeave(e) {
        if (e.target.closest('.use-case-item')) {
            e.target.closest('.use-case-item').classList.remove('drag-over');
        }
    }

    /**
     * Handle drop
     */
    handleDrop(e) {
        e.preventDefault();
        
        const useCaseItem = e.target.closest('.use-case-item');
        if (!useCaseItem) return;
        
        useCaseItem.classList.remove('drag-over');
        
        const serviceId = e.dataTransfer.getData('text/plain');
        const correctService = useCaseItem.dataset.correctService;
        const useCaseId = useCaseItem.dataset.useCaseId;
        
        this.processMatch(useCaseItem, serviceId, correctService, useCaseId);
    }

    /**
     * Process the match result
     */
    processMatch(useCaseItem, serviceId, correctService, useCaseId) {
        const isCorrect = serviceId === correctService;
        const service = this.gameData.services.find(s => s.id === serviceId);
        const useCase = this.gameData.useCases.find(uc => uc.id === useCaseId);
        
        // Update UI
        const dropHint = useCaseItem.querySelector('.drop-hint');
        const matchResult = useCaseItem.querySelector('.match-result');
        const matchedService = useCaseItem.querySelector('.matched-service');
        const matchStatus = useCaseItem.querySelector('.match-status');
        
        dropHint.style.display = 'none';
        matchResult.style.display = 'block';
        
        // Show matched service
        matchedService.innerHTML = `
            <div class="matched-service-info">
                <div class="service-icon-small" style="background: ${service.color}">
                    <i class="${service.icon}"></i>
                </div>
                <span>${service.name}</span>
            </div>
        `;
        
        // Show match status
        if (isCorrect) {
            matchStatus.innerHTML = `
                <div class="match-correct">
                    <i class="fas fa-check-circle"></i>
                    <span>Correct!</span>
                </div>
            `;
            useCaseItem.classList.add('correct-match');
            this.correctAnswers++;
            this.completedMatches++;
        } else {
            matchStatus.innerHTML = `
                <div class="match-incorrect">
                    <i class="fas fa-times-circle"></i>
                    <span>Try again! This doesn't match.</span>
                </div>
            `;
            useCaseItem.classList.add('incorrect-match');
            
            // Allow retry after 2 seconds
            setTimeout(() => {
                this.resetMatch(useCaseItem);
            }, 2000);
        }
        
        // Update score display
        this.updateScoreDisplay();
        
        // Check if game is complete
        if (this.completedMatches === this.totalQuestions) {
            this.completeGame();
        }
        
        Utils.log(`Match processed: ${service.name} -> ${useCase.title} (${isCorrect ? 'Correct' : 'Incorrect'})`);
    }

    /**
     * Reset a match for retry
     */
    resetMatch(useCaseItem) {
        const dropHint = useCaseItem.querySelector('.drop-hint');
        const matchResult = useCaseItem.querySelector('.match-result');
        
        dropHint.style.display = 'flex';
        matchResult.style.display = 'none';
        useCaseItem.classList.remove('incorrect-match');
    }

    /**
     * Calculate current score as percentage
     * @returns {number} Percentage score (0-100)
     */
    getScorePercentage() {
        if (this.totalQuestions === 0) return 0;
        return Math.round((this.correctAnswers / this.totalQuestions) * 100);
    }

    /**
     * Update score display
     */
    updateScoreDisplay() {
        const scoreElement = DOMUtils.getElementById('puzzleScore');
        const progressElement = DOMUtils.getElementById('puzzleProgress');
        
        if (scoreElement) scoreElement.textContent = `${this.getScorePercentage()}%`;
        if (progressElement) progressElement.textContent = `${this.completedMatches}/${this.totalQuestions}`;
    }

    /**
     * Complete the game
     */
    completeGame() {
        const resultsElement = DOMUtils.getElementById('puzzleResults');
        const finalScoreElement = DOMUtils.getElementById('finalScore');
        
        if (resultsElement) {
            resultsElement.style.display = 'block';
            UIController.animateIn(resultsElement, 'fadeInUp');
        }
        
        if (finalScoreElement) {
            finalScoreElement.textContent = `${this.getScorePercentage()}%`;
        }
        
        Utils.log(`Game completed! Final score: ${this.correctAnswers}/${this.totalQuestions} (${this.getScorePercentage()}%)`);
    }

    /**
     * Reset the game
     */
    resetGame() {
        this.correctAnswers = 0;
        this.completedMatches = 0;
        this.render();
        this.setupDragAndDrop();
        Utils.log('Game reset');
    }
}

// Export for global access
window.InteractivePuzzle = InteractivePuzzle;
