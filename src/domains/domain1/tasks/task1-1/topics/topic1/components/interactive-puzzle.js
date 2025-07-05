/**
 * Interactive Puzzle Challenge Component - Enhanced Version
 * Drag and drop AWS storage services to match with use cases
 * Enhanced with one-by-one navigation for better user experience
 * 
 * @author MLA Tutorial Team
 * @version 2.0.0
 * @since 2025-07-04
 */

class InteractivePuzzle {
    constructor() {
        this.containerId = 'puzzleGameContainer';
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.completedMatches = 0;
        this.currentUseCaseIndex = 0;
        this.completedUseCases = new Set();
        this.userAnswers = new Map();
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
                    details: 'Requires low-latency access with high throughput for serving ML models in production',
                    correctService: 'dynamodb',
                    category: 'Machine Learning',
                    difficulty: 'Medium',
                    hint: 'Think about which service provides the fastest access for real-time applications.'
                },
                {
                    id: 'high-iops',
                    title: 'High IOPS Database',
                    description: 'Database requiring consistent high-performance storage',
                    details: 'Needs persistent block storage with guaranteed IOPS for database workloads',
                    correctService: 'ebs',
                    category: 'Database',
                    difficulty: 'Easy',
                    hint: 'Consider which storage type provides persistent, high-performance block storage.'
                },
                {
                    id: 'model-archive',
                    title: 'Model Archival',
                    description: 'Long-term storage of old ML models and datasets',
                    details: 'Cost-effective storage for infrequently accessed data with long retention requirements',
                    correctService: 'glacier',
                    category: 'Archival',
                    difficulty: 'Easy',
                    hint: 'Look for the most cost-effective option for long-term storage.'
                },
                {
                    id: 'ml-training',
                    title: 'Intensive ML Training',
                    description: 'High-throughput storage for compute-intensive ML workloads',
                    details: 'Requires high-performance file system for parallel processing and large dataset access',
                    correctService: 'fsx',
                    category: 'Machine Learning',
                    difficulty: 'Hard',
                    hint: 'Consider which service is optimized for high-performance computing workloads.'
                },
                {
                    id: 'data-lake',
                    title: 'Data Lake for ML',
                    description: 'Store large datasets for machine learning training and analytics',
                    details: 'Scalable object storage for diverse data types with analytics integration',
                    correctService: 's3',
                    category: 'Machine Learning',
                    difficulty: 'Easy',
                    hint: 'Think about the most popular service for storing large amounts of unstructured data.'
                },
                {
                    id: 'ml-metadata',
                    title: 'ML Experiment Tracking',
                    description: 'Store structured ML metadata, experiment results, and model metrics',
                    details: 'Relational database for structured data with ACID compliance and complex queries',
                    correctService: 'rds',
                    category: 'Machine Learning',
                    difficulty: 'Medium',
                    hint: 'Consider which service is best for structured data with complex relationships.'
                },
                {
                    id: 'shared-training',
                    title: 'Shared Training Data',
                    description: 'Multiple ML instances accessing the same dataset simultaneously',
                    details: 'Shared file system that can be mounted by multiple EC2 instances concurrently',
                    correctService: 'efs',
                    category: 'Machine Learning',
                    difficulty: 'Medium',
                    hint: 'Think about which service allows multiple instances to share the same file system.'
                }
            ]
        };

        // Shuffle the use cases to make the puzzle more challenging
        this.gameData.useCases = this.shuffleArray([...this.gameData.useCases]);
        this.totalQuestions = this.gameData.useCases.length;
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
                    <h3><i class="fas fa-puzzle-piece" aria-hidden="true"></i> AWS Storage Services Challenge</h3>
                    <p>Match each use case with the most appropriate AWS storage service</p>
                    <div class="puzzle-progress">
                        <div class="progress-info">
                            <span class="use-case-counter">Use Case <span id="currentUseCase">1</span> of ${this.totalQuestions}</span>
                            <span class="score-display">Score: <span id="currentScore">0</span>/${this.totalQuestions} (<span id="scorePercentage">0</span>%)</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>

                <!-- Game Instructions -->
                <div class="puzzle-instructions">
                    <div class="instructions-content">
                        <h4><i class="fas fa-info-circle" aria-hidden="true"></i> How to Play</h4>
                        <ol>
                            <li>Read the use case carefully</li>
                            <li>Drag the appropriate AWS storage service to the drop zone</li>
                            <li>Get instant feedback on your choice</li>
                            <li>Use Previous/Next to navigate between use cases</li>
                        </ol>
                    </div>
                </div>

                <!-- Services Panel (Top) -->
                <div class="services-panel-top">
                    <h4><i class="fas fa-server" aria-hidden="true"></i> AWS Storage Services</h4>
                    <div class="services-container-vertical">
                        ${this.renderServices()}
                    </div>
                </div>

                <!-- Current Use Case Panel -->
                <div class="current-use-case-panel">
                    <div id="currentUseCaseContainer">
                        ${this.renderCurrentUseCase()}
                    </div>
                </div>

                <!-- Navigation -->
                <div class="puzzle-navigation">
                    <button class="btn btn-secondary" id="prevUseCaseBtn" onclick="window.interactivePuzzle.previousUseCase()" disabled>
                        <i class="fas fa-chevron-left" aria-hidden="true"></i>
                        Previous
                    </button>
                    
                    <div class="use-case-indicators">
                        ${this.renderUseCaseIndicators()}
                    </div>
                    
                    <button class="btn btn-secondary" id="nextUseCaseBtn" onclick="window.interactivePuzzle.nextUseCase()">
                        Next
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>

                <!-- Game Actions -->
                <div class="puzzle-actions">
                    <button class="btn btn-outline-secondary" onclick="window.interactivePuzzle.resetGame()">
                        <i class="fas fa-refresh" aria-hidden="true"></i>
                        Reset All
                    </button>
                    <button class="btn btn-info" onclick="window.interactivePuzzle.showHint()">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i>
                        Show Hint
                    </button>
                    <button class="btn btn-success" onclick="window.interactivePuzzle.showResults()" id="showResultsBtn" style="display: none;">
                        <i class="fas fa-trophy" aria-hidden="true"></i>
                        View Results
                    </button>
                </div>

                <!-- Feedback -->
                <div class="puzzle-feedback" id="puzzleFeedback" style="display: none;">
                    <!-- Feedback will be inserted here -->
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.updateNavigationState();
    }

    /**
     * Render services list vertically
     */
    renderServices() {
        return this.gameData.services.map(service => `
            <div class="service-item-vertical" 
                 draggable="true" 
                 data-service-id="${service.id}"
                 style="border-left: 4px solid ${service.color};">
                <div class="service-icon" style="color: ${service.color};">
                    <i class="${service.icon}" aria-hidden="true"></i>
                </div>
                <div class="service-info">
                    <h5>${service.name}</h5>
                    <p>${service.description}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render current use case
     */
    renderCurrentUseCase() {
        const useCase = this.gameData.useCases[this.currentUseCaseIndex];
        const isCompleted = this.completedUseCases.has(useCase.id);
        const userAnswer = this.userAnswers.get(useCase.id);
        const isCorrect = userAnswer === useCase.correctService;

        return `
            <div class="use-case-card ${isCompleted ? (isCorrect ? 'correct' : 'incorrect') : ''}" 
                 data-use-case-id="${useCase.id}">
                <div class="use-case-header">
                    <div class="use-case-title">
                        <h4>${useCase.title}</h4>
                        <div class="use-case-meta">
                            <span class="category-badge">${useCase.category}</span>
                            <span class="difficulty-badge difficulty-${useCase.difficulty.toLowerCase()}">${useCase.difficulty}</span>
                        </div>
                    </div>
                    ${isCompleted ? `
                        <div class="completion-status ${isCorrect ? 'correct' : 'incorrect'}">
                            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}" aria-hidden="true"></i>
                            ${isCorrect ? 'Correct!' : 'Try Again'}
                        </div>
                    ` : ''}
                </div>
                
                <div class="use-case-content">
                    <p class="use-case-description">${useCase.description}</p>
                    <div class="use-case-details">
                        <strong>Details:</strong> ${useCase.details}
                    </div>
                </div>

                <div class="drop-zone ${userAnswer ? 'has-answer' : ''}" 
                     data-use-case-id="${useCase.id}">
                    ${userAnswer ? this.renderDroppedService(userAnswer) : `
                        <div class="drop-placeholder">
                            <i class="fas fa-hand-paper" aria-hidden="true"></i>
                            <p>Drag an AWS storage service here</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    /**
     * Render dropped service
     */
    renderDroppedService(serviceId) {
        const service = this.gameData.services.find(s => s.id === serviceId);
        if (!service) return '';

        return `
            <div class="dropped-service" data-service-id="${serviceId}" style="border-left: 4px solid ${service.color};">
                <div class="service-icon" style="color: ${service.color};">
                    <i class="${service.icon}" aria-hidden="true"></i>
                </div>
                <div class="service-info">
                    <h5>${service.name}</h5>
                    <p>${service.description}</p>
                </div>
                <button class="remove-service" onclick="window.interactivePuzzle.removeService('${this.gameData.useCases[this.currentUseCaseIndex].id}')">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
    }

    /**
     * Render use case indicators
     */
    renderUseCaseIndicators() {
        return this.gameData.useCases.map((useCase, index) => {
            const isCompleted = this.completedUseCases.has(useCase.id);
            const isCurrent = index === this.currentUseCaseIndex;
            const isCorrect = isCompleted && this.userAnswers.get(useCase.id) === useCase.correctService;

            return `
                <div class="use-case-indicator ${isCurrent ? 'current' : ''} ${isCompleted ? (isCorrect ? 'correct' : 'incorrect') : ''}"
                     onclick="window.interactivePuzzle.goToUseCase(${index})"
                     title="Use Case ${index + 1}: ${useCase.title}">
                    ${isCompleted ? `<i class="fas fa-${isCorrect ? 'check' : 'times'}" aria-hidden="true"></i>` : index + 1}
                </div>
            `;
        }).join('');
    }

    // Navigation methods
    nextUseCase() {
        if (this.currentUseCaseIndex < this.gameData.useCases.length - 1) {
            this.currentUseCaseIndex++;
            this.updateCurrentUseCase();
        }
    }

    previousUseCase() {
        if (this.currentUseCaseIndex > 0) {
            this.currentUseCaseIndex--;
            this.updateCurrentUseCase();
        }
    }

    goToUseCase(index) {
        if (index >= 0 && index < this.gameData.useCases.length) {
            this.currentUseCaseIndex = index;
            this.updateCurrentUseCase();
        }
    }

    updateCurrentUseCase() {
        const container = document.getElementById('currentUseCaseContainer');
        if (container) {
            container.innerHTML = this.renderCurrentUseCase();
            this.setupDropZoneListeners();
        }
        this.updateNavigationState();
        this.updateProgress();
        this.updateUseCaseIndicators();
    }

    updateNavigationState() {
        const prevBtn = document.getElementById('prevUseCaseBtn');
        const nextBtn = document.getElementById('nextUseCaseBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentUseCaseIndex === 0;
        }
        
        if (nextBtn) {
            if (this.currentUseCaseIndex === this.gameData.useCases.length - 1) {
                nextBtn.innerHTML = '<i class="fas fa-flag-checkered" aria-hidden="true"></i> Finish';
                nextBtn.onclick = () => this.showResults();
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right" aria-hidden="true"></i>';
                nextBtn.onclick = () => this.nextUseCase();
            }
        }
    }

    updateProgress() {
        const currentUseCaseSpan = document.getElementById('currentUseCase');
        const currentScoreSpan = document.getElementById('currentScore');
        const scorePercentageSpan = document.getElementById('scorePercentage');
        const progressFill = document.getElementById('progressFill');

        if (currentUseCaseSpan) {
            currentUseCaseSpan.textContent = this.currentUseCaseIndex + 1;
        }

        if (currentScoreSpan) {
            currentScoreSpan.textContent = this.correctAnswers;
        }

        if (scorePercentageSpan) {
            const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
            scorePercentageSpan.textContent = percentage;
        }

        if (progressFill) {
            const progressPercentage = ((this.currentUseCaseIndex + 1) / this.totalQuestions) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
    }

    updateUseCaseIndicators() {
        const indicatorsContainer = document.querySelector('.use-case-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = this.renderUseCaseIndicators();
        }
    }

    // Drag and drop functionality
    setupDragAndDrop() {
        this.setupDragListeners();
        this.setupDropZoneListeners();
    }

    setupDragListeners() {
        const serviceItems = document.querySelectorAll('.service-item-vertical');
        serviceItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.serviceId);
                item.classList.add('dragging');
                this.draggedElement = item;
            });

            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
                this.draggedElement = null;
            });
        });
    }

    setupDropZoneListeners() {
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const serviceId = e.dataTransfer.getData('text/plain');
                const useCaseId = zone.dataset.useCaseId;
                
                this.handleDrop(useCaseId, serviceId);
            });
        });
    }

    handleDrop(useCaseId, serviceId) {
        const useCase = this.gameData.useCases.find(uc => uc.id === useCaseId);
        if (!useCase) return;

        // Store the answer
        const previousAnswer = this.userAnswers.get(useCaseId);
        this.userAnswers.set(useCaseId, serviceId);
        
        // Check if correct
        const isCorrect = useCase.correctService === serviceId;
        
        // Update completion status and score
        if (isCorrect && !this.completedUseCases.has(useCaseId)) {
            this.completedUseCases.add(useCaseId);
            this.correctAnswers++;
            this.completedMatches++;
        } else if (!isCorrect && this.completedUseCases.has(useCaseId)) {
            this.completedUseCases.delete(useCaseId);
            this.correctAnswers--;
            this.completedMatches--;
        } else if (previousAnswer && previousAnswer === useCase.correctService && !isCorrect) {
            this.completedUseCases.delete(useCaseId);
            this.correctAnswers--;
        }
        
        // Update the current use case display
        this.updateCurrentUseCase();
        
        // Show feedback
        this.showFeedback(useCaseId, serviceId, isCorrect);
        
        // Check if all use cases are completed
        if (this.completedUseCases.size === this.totalQuestions) {
            document.getElementById('showResultsBtn').style.display = 'inline-block';
        }
    }

    removeService(useCaseId) {
        const wasCorrect = this.completedUseCases.has(useCaseId);
        
        this.userAnswers.delete(useCaseId);
        this.completedUseCases.delete(useCaseId);
        
        if (wasCorrect) {
            this.correctAnswers--;
            this.completedMatches--;
        }
        
        this.updateCurrentUseCase();
        this.hideFeedback();
        
        document.getElementById('showResultsBtn').style.display = 'none';
    }

    showFeedback(useCaseId, serviceId, isCorrect) {
        const useCase = this.gameData.useCases.find(uc => uc.id === useCaseId);
        const service = this.gameData.services.find(s => s.id === serviceId);
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        const feedbackHTML = `
            <div class="feedback-content ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-header">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}" aria-hidden="true"></i>
                    <h4>${isCorrect ? 'Excellent!' : 'Not quite right'}</h4>
                </div>
                <div class="feedback-body">
                    <p><strong>Your choice:</strong> ${service.name}</p>
                    ${isCorrect ? 
                        `<p><strong>Why it's correct:</strong> ${useCase.hint}</p>` :
                        `<p><strong>Hint:</strong> ${useCase.hint}</p>`
                    }
                </div>
            </div>
        `;
        
        feedbackContainer.innerHTML = feedbackHTML;
        feedbackContainer.style.display = 'block';
        
        // Auto-hide feedback after 5 seconds
        setTimeout(() => {
            this.hideFeedback();
        }, 5000);
    }

    hideFeedback() {
        const feedbackContainer = document.getElementById('puzzleFeedback');
        if (feedbackContainer) {
            feedbackContainer.style.display = 'none';
        }
    }

    showHint() {
        const useCase = this.gameData.useCases[this.currentUseCaseIndex];
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        const hintHTML = `
            <div class="feedback-content hint">
                <div class="feedback-header">
                    <i class="fas fa-lightbulb" aria-hidden="true"></i>
                    <h4>Hint for ${useCase.title}</h4>
                </div>
                <div class="feedback-body">
                    <p>${useCase.hint}</p>
                </div>
            </div>
        `;
        
        feedbackContainer.innerHTML = hintHTML;
        feedbackContainer.style.display = 'block';
        
        // Auto-hide hint after 8 seconds
        setTimeout(() => {
            this.hideFeedback();
        }, 8000);
    }

    showResults() {
        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        let performanceLevel = '';
        let performanceColor = '';
        
        if (percentage >= 90) {
            performanceLevel = 'Outstanding!';
            performanceColor = '#28a745';
        } else if (percentage >= 70) {
            performanceLevel = 'Well Done!';
            performanceColor = '#ffc107';
        } else {
            performanceLevel = 'Keep Practicing!';
            performanceColor = '#dc3545';
        }
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        const resultsHTML = `
            <div class="feedback-content results" style="border-left-color: ${performanceColor};">
                <div class="feedback-header">
                    <i class="fas fa-trophy" aria-hidden="true" style="color: ${performanceColor};"></i>
                    <h4>Challenge Complete!</h4>
                </div>
                <div class="feedback-body">
                    <div class="results-summary">
                        <h5 style="color: ${performanceColor};">${performanceLevel}</h5>
                        <p><strong>Final Score:</strong> ${this.correctAnswers}/${this.totalQuestions} (${percentage}%)</p>
                        <p><strong>Use Cases Completed:</strong> ${this.completedUseCases.size}</p>
                    </div>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="window.interactivePuzzle.resetGame()">
                            <i class="fas fa-refresh" aria-hidden="true"></i>
                            Try Again
                        </button>
                        <button class="btn btn-secondary" onclick="window.interactivePuzzle.hideFeedback()">
                            <i class="fas fa-times" aria-hidden="true"></i>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        feedbackContainer.innerHTML = resultsHTML;
        feedbackContainer.style.display = 'block';
    }

    resetGame() {
        this.correctAnswers = 0;
        this.completedMatches = 0;
        this.currentUseCaseIndex = 0;
        this.completedUseCases.clear();
        this.userAnswers.clear();
        
        this.updateCurrentUseCase();
        this.hideFeedback();
        
        document.getElementById('showResultsBtn').style.display = 'none';
    }

    /**
     * Utility method to shuffle array
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
     * Get current score percentage
     */
    getScorePercentage() {
        if (this.totalQuestions === 0) return 0;
        return Math.round((this.correctAnswers / this.totalQuestions) * 100);
    }
}

// Export for global access
window.InteractivePuzzle = InteractivePuzzle;
