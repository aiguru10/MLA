/**
 * SageMaker Ingestion Puzzle Game - Enhanced Version
 * Interactive drag-and-drop challenge for matching scenarios with appropriate SageMaker tools
 * Enhanced with one-by-one scenario navigation for better user experience
 * 
 * @author MLA Tutorial Team
 * @version 2.0.0
 * @since 2025-07-04
 */

class SageMakerIngestionPuzzle {
    constructor() {
        this.scenarios = [];
        this.tools = [];
        this.matches = new Map();
        this.correctMatches = new Map();
        this.score = 0;
        this.totalScenarios = 0;
        this.currentScenarioIndex = 0;
        this.completedScenarios = new Set();
        this.initialized = false;
    }

    async init(container = null) {
        try {
            console.log('🟢 Initializing SageMaker Ingestion Puzzle...');
            this.setupGameData();
            await this.render(container);
            this.setupEventListeners();
            this.initialized = true;
            console.log('✅ SageMaker Ingestion Puzzle initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize SageMaker Ingestion Puzzle:', error);
            throw error;
        }
    }

    setupGameData() {
        // Define scenarios and their correct tool matches
        this.scenarios = [
            {
                id: 'retail-cleanup',
                title: 'E-commerce Data Cleanup',
                description: 'Clean messy customer purchase data with missing values and inconsistent formats',
                details: 'Raw CSV files from multiple online stores with different schemas',
                difficulty: 'Easy',
                correctTool: 'data-wrangler',
                hint: 'This scenario involves data cleaning and preparation - perfect for a visual tool!'
            },
            {
                id: 'realtime-fraud',
                title: 'Real-time Fraud Detection',
                description: 'Serve features to fraud detection model with <100ms latency requirement',
                details: 'Credit card transaction features needed for real-time scoring',
                difficulty: 'Medium',
                correctTool: 'feature-store',
                hint: 'Real-time serving with low latency requirements suggests a centralized feature management system.'
            },
            {
                id: 'team-features',
                title: 'Team Feature Sharing',
                description: 'Multiple ML teams need to share customer segmentation features',
                details: '5 data science teams working on related customer analytics projects',
                difficulty: 'Easy',
                correctTool: 'feature-store',
                hint: 'Multiple teams sharing features suggests a centralized repository approach.'
            },
            {
                id: 'data-exploration',
                title: 'New Dataset Exploration',
                description: 'Quickly understand and profile a new healthcare dataset',
                details: 'Hospital patient records with unknown data quality issues',
                difficulty: 'Easy',
                correctTool: 'data-wrangler',
                hint: 'Exploration and profiling of unknown data quality suggests a visual analysis tool.'
            },
            {
                id: 'feature-engineering',
                title: 'Complex Feature Engineering',
                description: 'Create 50+ derived features from financial time-series data',
                details: 'Stock market data requiring technical indicators and rolling statistics',
                difficulty: 'Medium',
                correctTool: 'data-wrangler',
                hint: 'Complex transformations and feature creation suggests a tool with many built-in functions.'
            },
            {
                id: 'production-pipeline',
                title: 'Production ML Pipeline',
                description: 'Deploy recommendation system with consistent feature serving',
                details: 'Movie recommendation model needs same features for training and inference',
                difficulty: 'Medium',
                correctTool: 'feature-store',
                hint: 'Consistent features between training and inference suggests a managed feature serving system.'
            },
            {
                id: 'bias-detection',
                title: 'Bias Detection Analysis',
                description: 'Analyze hiring data for potential algorithmic bias',
                details: 'HR dataset requiring fairness analysis before model deployment',
                difficulty: 'Hard',
                correctTool: 'data-wrangler',
                hint: 'Bias analysis and fairness checks are built into visual data preparation tools.'
            },
            {
                id: 'feature-versioning',
                title: 'Feature Version Management',
                description: 'Track feature changes across model versions for compliance',
                details: 'Financial model requiring audit trail of feature modifications',
                difficulty: 'Hard',
                correctTool: 'feature-store',
                hint: 'Version tracking and audit trails are key features of managed feature systems.'
            }
        ];

        this.tools = [
            {
                id: 'data-wrangler',
                name: 'SageMaker Data Wrangler',
                icon: 'fas fa-magic',
                color: '#FF6B6B',
                description: 'Visual data preparation with 300+ transformations'
            },
            {
                id: 'feature-store',
                name: 'SageMaker Feature Store',
                icon: 'fas fa-database',
                color: '#4ECDC4',
                description: 'Centralized feature management and serving'
            }
        ];

        this.totalScenarios = this.scenarios.length;
        
        // Set up correct matches
        this.scenarios.forEach(scenario => {
            this.correctMatches.set(scenario.id, scenario.correctTool);
        });
    }

    async render(providedContainer = null) {
        let container = providedContainer;
        
        if (!container) {
            container = document.getElementById('ingestionPuzzleContainer');
        }
        
        if (!container) {
            throw new Error('Ingestion Puzzle container not found');
        }

        const html = `
            <div class="ingestion-puzzle-wrapper">
                <div class="puzzle-header">
                    <h3><i class="fas fa-puzzle-piece" aria-hidden="true"></i> SageMaker Ingestion Challenge</h3>
                    <p>Match each scenario with the most appropriate SageMaker tool</p>
                    <div class="puzzle-progress">
                        <div class="progress-info">
                            <span class="scenario-counter">Scenario <span id="currentScenario">1</span> of ${this.totalScenarios}</span>
                            <span class="score-display">Score: <span id="currentScore">0</span>/${this.totalScenarios} (<span id="scorePercentage">0</span>%)</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>

                <div class="puzzle-instructions">
                    <div class="instructions-content">
                        <h4><i class="fas fa-info-circle" aria-hidden="true"></i> How to Play</h4>
                        <ol>
                            <li>Read the scenario carefully</li>
                            <li>Drag the appropriate SageMaker tool to the drop zone</li>
                            <li>Get instant feedback on your choice</li>
                            <li>Use Previous/Next to navigate between scenarios</li>
                        </ol>
                    </div>
                </div>

                <div class="puzzle-game-area">
                    <div class="tools-panel">
                        <h4><i class="fas fa-toolbox" aria-hidden="true"></i> SageMaker Tools</h4>
                        <div class="tools-container">
                            ${this.renderTools()}
                        </div>
                    </div>

                    <div class="current-scenario-panel">
                        <div id="currentScenarioContainer">
                            ${this.renderCurrentScenario()}
                        </div>
                    </div>
                </div>

                <div class="puzzle-navigation">
                    <button class="btn btn-secondary" id="prevScenarioBtn" onclick="window.sagemakerPuzzle.previousScenario()" disabled>
                        <i class="fas fa-chevron-left" aria-hidden="true"></i>
                        Previous
                    </button>
                    
                    <div class="scenario-indicators">
                        ${this.renderScenarioIndicators()}
                    </div>
                    
                    <button class="btn btn-secondary" id="nextScenarioBtn" onclick="window.sagemakerPuzzle.nextScenario()">
                        Next
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="puzzle-actions">
                    <button class="btn btn-outline-secondary" onclick="window.sagemakerPuzzle.resetPuzzle()">
                        <i class="fas fa-refresh" aria-hidden="true"></i>
                        Reset All
                    </button>
                    <button class="btn btn-info" onclick="window.sagemakerPuzzle.showHint()">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i>
                        Show Hint
                    </button>
                    <button class="btn btn-success" onclick="window.sagemakerPuzzle.showResults()" id="showResultsBtn" style="display: none;">
                        <i class="fas fa-trophy" aria-hidden="true"></i>
                        View Results
                    </button>
                </div>

                <div class="puzzle-feedback" id="puzzleFeedback" style="display: none;">
                    <!-- Feedback will be inserted here -->
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.updateNavigationState();
    }

    renderTools() {
        return this.tools.map(tool => `
            <div class="tool-item" 
                 draggable="true" 
                 data-tool-id="${tool.id}"
                 style="border-left: 4px solid ${tool.color};">
                <div class="tool-icon" style="color: ${tool.color};">
                    <i class="${tool.icon}" aria-hidden="true"></i>
                </div>
                <div class="tool-info">
                    <h5>${tool.name}</h5>
                    <p>${tool.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderCurrentScenario() {
        const scenario = this.scenarios[this.currentScenarioIndex];
        const isCompleted = this.completedScenarios.has(scenario.id);
        const userAnswer = this.matches.get(scenario.id);
        const isCorrect = userAnswer === scenario.correctTool;

        return `
            <div class="scenario-card ${isCompleted ? (isCorrect ? 'correct' : 'incorrect') : ''}" 
                 data-scenario-id="${scenario.id}">
                <div class="scenario-header">
                    <div class="scenario-title">
                        <h4>${scenario.title}</h4>
                        <span class="difficulty-badge difficulty-${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span>
                    </div>
                    ${isCompleted ? `
                        <div class="completion-status ${isCorrect ? 'correct' : 'incorrect'}">
                            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}" aria-hidden="true"></i>
                            ${isCorrect ? 'Correct!' : 'Try Again'}
                        </div>
                    ` : ''}
                </div>
                
                <div class="scenario-content">
                    <p class="scenario-description">${scenario.description}</p>
                    <div class="scenario-details">
                        <strong>Details:</strong> ${scenario.details}
                    </div>
                </div>

                <div class="drop-zone ${userAnswer ? 'has-answer' : ''}" 
                     data-scenario-id="${scenario.id}">
                    ${userAnswer ? this.renderDroppedTool(userAnswer) : `
                        <div class="drop-placeholder">
                            <i class="fas fa-hand-paper" aria-hidden="true"></i>
                            <p>Drag a SageMaker tool here</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    renderDroppedTool(toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        if (!tool) return '';

        return `
            <div class="dropped-tool" data-tool-id="${toolId}" style="border-left: 4px solid ${tool.color};">
                <div class="tool-icon" style="color: ${tool.color};">
                    <i class="${tool.icon}" aria-hidden="true"></i>
                </div>
                <div class="tool-info">
                    <h5>${tool.name}</h5>
                </div>
                <button class="remove-tool" onclick="window.sagemakerPuzzle.removeTool('${this.scenarios[this.currentScenarioIndex].id}')">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
    }

    renderScenarioIndicators() {
        return this.scenarios.map((scenario, index) => {
            const isCompleted = this.completedScenarios.has(scenario.id);
            const isCurrent = index === this.currentScenarioIndex;
            const isCorrect = isCompleted && this.matches.get(scenario.id) === scenario.correctTool;

            return `
                <div class="scenario-indicator ${isCurrent ? 'current' : ''} ${isCompleted ? (isCorrect ? 'correct' : 'incorrect') : ''}"
                     onclick="window.sagemakerPuzzle.goToScenario(${index})"
                     title="Scenario ${index + 1}: ${scenario.title}">
                    ${isCompleted ? `<i class="fas fa-${isCorrect ? 'check' : 'times'}" aria-hidden="true"></i>` : index + 1}
                </div>
            `;
        }).join('');
    }

    // Navigation methods
    nextScenario() {
        if (this.currentScenarioIndex < this.scenarios.length - 1) {
            this.currentScenarioIndex++;
            this.updateCurrentScenario();
        }
    }

    previousScenario() {
        if (this.currentScenarioIndex > 0) {
            this.currentScenarioIndex--;
            this.updateCurrentScenario();
        }
    }

    goToScenario(index) {
        if (index >= 0 && index < this.scenarios.length) {
            this.currentScenarioIndex = index;
            this.updateCurrentScenario();
        }
    }

    updateCurrentScenario() {
        const container = document.getElementById('currentScenarioContainer');
        if (container) {
            container.innerHTML = this.renderCurrentScenario();
            this.setupDropZoneListeners();
        }
        this.updateNavigationState();
        this.updateProgress();
        this.updateScenarioIndicators();
    }

    updateNavigationState() {
        const prevBtn = document.getElementById('prevScenarioBtn');
        const nextBtn = document.getElementById('nextScenarioBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentScenarioIndex === 0;
        }
        
        if (nextBtn) {
            if (this.currentScenarioIndex === this.scenarios.length - 1) {
                nextBtn.innerHTML = '<i class="fas fa-flag-checkered" aria-hidden="true"></i> Finish';
                nextBtn.onclick = () => this.showResults();
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right" aria-hidden="true"></i>';
                nextBtn.onclick = () => this.nextScenario();
            }
        }
    }

    updateProgress() {
        const currentScenarioSpan = document.getElementById('currentScenario');
        const currentScoreSpan = document.getElementById('currentScore');
        const scorePercentageSpan = document.getElementById('scorePercentage');
        const progressFill = document.getElementById('progressFill');

        if (currentScenarioSpan) {
            currentScenarioSpan.textContent = this.currentScenarioIndex + 1;
        }

        if (currentScoreSpan) {
            currentScoreSpan.textContent = this.score;
        }

        if (scorePercentageSpan) {
            const percentage = Math.round((this.score / this.totalScenarios) * 100);
            scorePercentageSpan.textContent = percentage;
        }

        if (progressFill) {
            const progressPercentage = ((this.currentScenarioIndex + 1) / this.totalScenarios) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
    }

    updateScenarioIndicators() {
        const indicatorsContainer = document.querySelector('.scenario-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = this.renderScenarioIndicators();
        }
    }

    // Drag and drop functionality
    setupEventListeners() {
        this.setupDragListeners();
        this.setupDropZoneListeners();
    }

    setupDragListeners() {
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.toolId);
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
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
                
                const toolId = e.dataTransfer.getData('text/plain');
                const scenarioId = zone.dataset.scenarioId;
                
                this.handleDrop(scenarioId, toolId);
            });
        });
    }

    handleDrop(scenarioId, toolId) {
        // Store the match
        this.matches.set(scenarioId, toolId);
        
        // Check if correct
        const isCorrect = this.correctMatches.get(scenarioId) === toolId;
        
        // Update completion status
        if (isCorrect && !this.completedScenarios.has(scenarioId)) {
            this.completedScenarios.add(scenarioId);
            this.score++;
        } else if (!isCorrect && this.completedScenarios.has(scenarioId)) {
            this.completedScenarios.delete(scenarioId);
            this.score--;
        }
        
        // Update the current scenario display
        this.updateCurrentScenario();
        
        // Show feedback
        this.showFeedback(scenarioId, toolId, isCorrect);
        
        // Check if all scenarios are completed
        if (this.completedScenarios.size === this.totalScenarios) {
            document.getElementById('showResultsBtn').style.display = 'inline-block';
        }
    }

    removeTool(scenarioId) {
        const wasCorrect = this.completedScenarios.has(scenarioId);
        
        this.matches.delete(scenarioId);
        this.completedScenarios.delete(scenarioId);
        
        if (wasCorrect) {
            this.score--;
        }
        
        this.updateCurrentScenario();
        this.hideFeedback();
        
        document.getElementById('showResultsBtn').style.display = 'none';
    }

    showFeedback(scenarioId, toolId, isCorrect) {
        const scenario = this.scenarios.find(s => s.id === scenarioId);
        const tool = this.tools.find(t => t.id === toolId);
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        const feedbackHTML = `
            <div class="feedback-content ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-header">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}" aria-hidden="true"></i>
                    <h4>${isCorrect ? 'Correct!' : 'Not quite right'}</h4>
                </div>
                <div class="feedback-body">
                    <p><strong>Your choice:</strong> ${tool.name}</p>
                    ${isCorrect ? 
                        `<p><strong>Explanation:</strong> ${scenario.hint}</p>` :
                        `<p><strong>Hint:</strong> ${scenario.hint}</p>`
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
        const scenario = this.scenarios[this.currentScenarioIndex];
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        const hintHTML = `
            <div class="feedback-content hint">
                <div class="feedback-header">
                    <i class="fas fa-lightbulb" aria-hidden="true"></i>
                    <h4>Hint for ${scenario.title}</h4>
                </div>
                <div class="feedback-body">
                    <p>${scenario.hint}</p>
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
        const percentage = Math.round((this.score / this.totalScenarios) * 100);
        let performanceLevel = '';
        let performanceColor = '';
        
        if (percentage >= 90) {
            performanceLevel = 'Excellent!';
            performanceColor = '#28a745';
        } else if (percentage >= 70) {
            performanceLevel = 'Good Job!';
            performanceColor = '#ffc107';
        } else {
            performanceLevel = 'Keep Learning!';
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
                        <p><strong>Final Score:</strong> ${this.score}/${this.totalScenarios} (${percentage}%)</p>
                        <p><strong>Scenarios Completed:</strong> ${this.completedScenarios.size}</p>
                    </div>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="window.sagemakerPuzzle.resetPuzzle()">
                            <i class="fas fa-refresh" aria-hidden="true"></i>
                            Try Again
                        </button>
                        <button class="btn btn-secondary" onclick="window.sagemakerPuzzle.hideFeedback()">
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

    resetPuzzle() {
        this.matches.clear();
        this.completedScenarios.clear();
        this.score = 0;
        this.currentScenarioIndex = 0;
        
        this.updateCurrentScenario();
        this.hideFeedback();
        
        document.getElementById('showResultsBtn').style.display = 'none';
    }
}

// Export for global access
window.SageMakerIngestionPuzzle = SageMakerIngestionPuzzle;
