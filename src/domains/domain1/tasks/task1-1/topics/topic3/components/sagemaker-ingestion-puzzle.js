/**
 * SageMaker Ingestion Puzzle Game
 * Interactive drag-and-drop challenge for matching scenarios with appropriate SageMaker tools
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
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
        this.initialized = false;
    }

    async init() {
        try {
            console.log('🟢 Initializing SageMaker Ingestion Puzzle...');
            this.setupGameData();
            await this.render();
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
                correctTool: 'data-wrangler'
            },
            {
                id: 'realtime-fraud',
                title: 'Real-time Fraud Detection',
                description: 'Serve features to fraud detection model with <100ms latency requirement',
                details: 'Credit card transaction features needed for real-time scoring',
                difficulty: 'Medium',
                correctTool: 'feature-store'
            },
            {
                id: 'team-features',
                title: 'Team Feature Sharing',
                description: 'Multiple ML teams need to share customer segmentation features',
                details: '5 data science teams working on related customer analytics projects',
                difficulty: 'Easy',
                correctTool: 'feature-store'
            },
            {
                id: 'data-exploration',
                title: 'New Dataset Exploration',
                description: 'Quickly understand and profile a new healthcare dataset',
                details: 'Hospital patient records with unknown data quality issues',
                difficulty: 'Easy',
                correctTool: 'data-wrangler'
            },
            {
                id: 'feature-engineering',
                title: 'Complex Feature Engineering',
                description: 'Create 50+ derived features from financial time-series data',
                details: 'Stock market data requiring technical indicators and rolling statistics',
                difficulty: 'Medium',
                correctTool: 'data-wrangler'
            },
            {
                id: 'production-pipeline',
                title: 'Production ML Pipeline',
                description: 'Deploy recommendation system with consistent feature serving',
                details: 'Movie recommendation model needs same features for training and inference',
                difficulty: 'Medium',
                correctTool: 'feature-store'
            },
            {
                id: 'bias-detection',
                title: 'Bias Detection Analysis',
                description: 'Analyze hiring data for potential algorithmic bias',
                details: 'HR dataset requiring fairness analysis before model deployment',
                difficulty: 'Hard',
                correctTool: 'data-wrangler'
            },
            {
                id: 'feature-versioning',
                title: 'Feature Version Management',
                description: 'Track feature changes across model versions for compliance',
                details: 'Financial model requiring audit trail of feature modifications',
                difficulty: 'Hard',
                correctTool: 'feature-store'
            }
        ];

        this.tools = [
            {
                id: 'data-wrangler',
                name: 'SageMaker Data Wrangler',
                icon: 'fas fa-magic',
                color: '#FF6B6B',
                description: 'Visual data preparation and exploration'
            },
            {
                id: 'feature-store',
                name: 'SageMaker Feature Store',
                icon: 'fas fa-database',
                color: '#4ECDC4',
                description: 'Centralized feature management and serving'
            }
        ];

        // Set up correct matches
        this.scenarios.forEach(scenario => {
            this.correctMatches.set(scenario.id, scenario.correctTool);
        });

        this.totalScenarios = this.scenarios.length;
        console.log(`🟢 Setup ${this.totalScenarios} scenarios for the puzzle`);
    }

    async render() {
        const container = document.getElementById('ingestionPuzzleContainer');
        if (!container) {
            throw new Error('Ingestion Puzzle container not found');
        }

        const html = `
            <div class="ingestion-puzzle-wrapper">
                <div class="puzzle-header">
                    <h3><i class="fas fa-puzzle-piece" aria-hidden="true"></i> SageMaker Ingestion Challenge</h3>
                    <p>Match each scenario with the most appropriate SageMaker tool</p>
                    <div class="puzzle-score">
                        <span class="score-label">Score:</span>
                        <span class="score-value">0/${this.totalScenarios}</span>
                        <span class="score-percentage">(0%)</span>
                    </div>
                </div>

                <div class="puzzle-instructions">
                    <div class="instructions-content">
                        <h4><i class="fas fa-info-circle" aria-hidden="true"></i> How to Play</h4>
                        <ol>
                            <li>Read each scenario carefully</li>
                            <li>Drag the appropriate SageMaker tool to the scenario</li>
                            <li>Get instant feedback on your choice</li>
                            <li>Aim for 100% to master SageMaker ingestion!</li>
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

                    <div class="scenarios-panel">
                        <h4><i class="fas fa-tasks" aria-hidden="true"></i> Scenarios</h4>
                        <div class="scenarios-container">
                            ${this.renderScenarios()}
                        </div>
                    </div>
                </div>

                <div class="puzzle-actions">
                    <button class="btn btn-secondary" onclick="window.sagemakerPuzzle.resetPuzzle()">
                        <i class="fas fa-refresh" aria-hidden="true"></i>
                        Reset Puzzle
                    </button>
                    <button class="btn btn-info" onclick="window.sagemakerPuzzle.showHints()">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i>
                        Show Hints
                    </button>
                    <button class="btn btn-success" onclick="window.sagemakerPuzzle.checkAllAnswers()" disabled>
                        <i class="fas fa-check-circle" aria-hidden="true"></i>
                        Check All Answers
                    </button>
                </div>

                <div class="puzzle-feedback" id="puzzleFeedback" style="display: none;">
                    <!-- Feedback will be inserted here -->
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    renderTools() {
        return this.tools.map(tool => `
            <div class="tool-item" 
                 draggable="true" 
                 data-tool-id="${tool.id}"
                 style="border-left: 4px solid ${tool.color}">
                <div class="tool-icon">
                    <i class="${tool.icon}" aria-hidden="true"></i>
                </div>
                <div class="tool-content">
                    <h5>${tool.name}</h5>
                    <p>${tool.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderScenarios() {
        // Shuffle scenarios for variety
        const shuffledScenarios = [...this.scenarios].sort(() => Math.random() - 0.5);
        
        return shuffledScenarios.map(scenario => `
            <div class="scenario-item" 
                 data-scenario-id="${scenario.id}"
                 ondrop="window.sagemakerPuzzle.handleDrop(event)" 
                 ondragover="window.sagemakerPuzzle.handleDragOver(event)">
                <div class="scenario-header">
                    <div class="scenario-title">
                        <h5>${scenario.title}</h5>
                        <span class="difficulty-badge ${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span>
                    </div>
                    <div class="scenario-status" data-scenario="${scenario.id}">
                        <i class="fas fa-circle" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="scenario-description">
                    <p><strong>Challenge:</strong> ${scenario.description}</p>
                    <p><strong>Details:</strong> ${scenario.details}</p>
                </div>
                <div class="scenario-drop-zone" data-scenario="${scenario.id}">
                    <div class="drop-zone-content">
                        <i class="fas fa-hand-pointer" aria-hidden="true"></i>
                        <span>Drop SageMaker tool here</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Setup drag and drop
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach(tool => {
            tool.addEventListener('dragstart', (e) => this.handleDragStart(e));
        });

        // Store reference for global access
        window.sagemakerPuzzle = this;
    }

    handleDragStart(e) {
        const toolId = e.target.closest('.tool-item').dataset.toolId;
        e.dataTransfer.setData('text/plain', toolId);
        e.dataTransfer.effectAllowed = 'copy';
        
        // Add visual feedback
        e.target.closest('.tool-item').classList.add('dragging');
        console.log(`🟢 Started dragging tool: ${toolId}`);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        
        // Add visual feedback
        const dropZone = e.target.closest('.scenario-item');
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        
        const toolId = e.dataTransfer.getData('text/plain');
        const scenarioItem = e.target.closest('.scenario-item');
        const scenarioId = scenarioItem.dataset.scenarioId;
        
        // Remove visual feedback
        scenarioItem.classList.remove('drag-over');
        document.querySelectorAll('.tool-item').forEach(tool => {
            tool.classList.remove('dragging');
        });
        
        this.makeMatch(scenarioId, toolId);
    }

    makeMatch(scenarioId, toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        const scenario = this.scenarios.find(s => s.id === scenarioId);
        
        if (!tool || !scenario) return;

        // Store the match
        this.matches.set(scenarioId, toolId);
        
        // Update the drop zone
        const dropZone = document.querySelector(`[data-scenario="${scenarioId}"].scenario-drop-zone`);
        const isCorrect = this.correctMatches.get(scenarioId) === toolId;
        
        dropZone.innerHTML = `
            <div class="dropped-tool ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="tool-icon">
                    <i class="${tool.icon}" aria-hidden="true"></i>
                </div>
                <div class="tool-name">${tool.name}</div>
                <div class="match-status">
                    <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}" aria-hidden="true"></i>
                </div>
            </div>
        `;
        
        // Update scenario status
        const statusIcon = document.querySelector(`[data-scenario="${scenarioId}"].scenario-status`);
        statusIcon.innerHTML = `<i class="fas ${isCorrect ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}" aria-hidden="true"></i>`;
        
        // Update score
        this.updateScore();
        
        // Provide immediate feedback
        this.showMatchFeedback(scenarioId, toolId, isCorrect);
        
        console.log(`🟢 Matched ${scenarioId} with ${toolId} - ${isCorrect ? 'Correct' : 'Incorrect'}`);
    }

    showMatchFeedback(scenarioId, toolId, isCorrect) {
        const scenario = this.scenarios.find(s => s.id === scenarioId);
        const tool = this.tools.find(t => t.id === toolId);
        const correctTool = this.tools.find(t => t.id === scenario.correctTool);
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        
        let feedbackHTML = '';
        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-item correct">
                    <div class="feedback-icon">
                        <i class="fas fa-check-circle" aria-hidden="true"></i>
                    </div>
                    <div class="feedback-content">
                        <h5>✅ Correct Match!</h5>
                        <p><strong>${scenario.title}</strong> is best handled by <strong>${tool.name}</strong></p>
                        <p class="feedback-explanation">${this.getExplanation(scenarioId, toolId)}</p>
                    </div>
                </div>
            `;
        } else {
            feedbackHTML = `
                <div class="feedback-item incorrect">
                    <div class="feedback-icon">
                        <i class="fas fa-times-circle" aria-hidden="true"></i>
                    </div>
                    <div class="feedback-content">
                        <h5>❌ Not Quite Right</h5>
                        <p><strong>${scenario.title}</strong> would be better handled by <strong>${correctTool.name}</strong></p>
                        <p class="feedback-explanation">${this.getExplanation(scenarioId, scenario.correctTool)}</p>
                    </div>
                </div>
            `;
        }
        
        feedbackContainer.innerHTML = feedbackHTML;
        feedbackContainer.style.display = 'block';
        
        // Auto-hide feedback after 5 seconds
        setTimeout(() => {
            feedbackContainer.style.display = 'none';
        }, 5000);
    }

    getExplanation(scenarioId, toolId) {
        const explanations = {
            'retail-cleanup': {
                'data-wrangler': 'Data Wrangler excels at visual data cleaning and handling messy datasets with its 300+ built-in transformations.',
                'feature-store': 'Feature Store is designed for serving features, not initial data cleanup tasks.'
            },
            'realtime-fraud': {
                'feature-store': 'Feature Store\'s online store provides the low-latency feature serving required for real-time fraud detection.',
                'data-wrangler': 'Data Wrangler is for data preparation, not real-time feature serving.'
            },
            'team-features': {
                'feature-store': 'Feature Store provides centralized feature management and sharing capabilities across teams.',
                'data-wrangler': 'Data Wrangler is primarily for individual data preparation, not team collaboration.'
            },
            'data-exploration': {
                'data-wrangler': 'Data Wrangler\'s visual interface is perfect for quickly exploring and understanding new datasets.',
                'feature-store': 'Feature Store is for managing known features, not exploring unknown datasets.'
            },
            'feature-engineering': {
                'data-wrangler': 'Data Wrangler provides 300+ transformations perfect for complex feature engineering tasks.',
                'feature-store': 'Feature Store stores features but doesn\'t create them from raw data.'
            },
            'production-pipeline': {
                'feature-store': 'Feature Store ensures consistent features between training and inference in production.',
                'data-wrangler': 'Data Wrangler is for preparation, not production feature serving.'
            },
            'bias-detection': {
                'data-wrangler': 'Data Wrangler includes built-in bias detection capabilities for fairness analysis.',
                'feature-store': 'Feature Store doesn\'t include bias detection tools.'
            },
            'feature-versioning': {
                'feature-store': 'Feature Store provides comprehensive versioning and lineage tracking for compliance.',
                'data-wrangler': 'Data Wrangler has limited versioning capabilities compared to Feature Store.'
            }
        };
        
        return explanations[scenarioId]?.[toolId] || 'Consider the primary purpose and capabilities of each tool.';
    }

    updateScore() {
        const correctMatches = Array.from(this.matches.entries()).filter(([scenarioId, toolId]) => 
            this.correctMatches.get(scenarioId) === toolId
        ).length;
        
        this.score = correctMatches;
        const percentage = Math.round((this.score / this.totalScenarios) * 100);
        
        // Update score display
        const scoreValue = document.querySelector('.score-value');
        const scorePercentage = document.querySelector('.score-percentage');
        
        if (scoreValue) scoreValue.textContent = `${this.score}/${this.totalScenarios}`;
        if (scorePercentage) scorePercentage.textContent = `(${percentage}%)`;
        
        // Enable check all button if all scenarios are matched
        const checkButton = document.querySelector('.puzzle-actions .btn-success');
        if (checkButton) {
            checkButton.disabled = this.matches.size < this.totalScenarios;
        }
        
        // Show completion message if perfect score
        if (this.score === this.totalScenarios) {
            this.showCompletionMessage();
        }
    }

    showCompletionMessage() {
        const feedbackContainer = document.getElementById('puzzleFeedback');
        feedbackContainer.innerHTML = `
            <div class="feedback-item completion">
                <div class="feedback-icon">
                    <i class="fas fa-trophy" aria-hidden="true"></i>
                </div>
                <div class="feedback-content">
                    <h5>🎉 Perfect Score!</h5>
                    <p>Congratulations! You've mastered SageMaker ingestion tool selection.</p>
                    <p>You now understand when to use Data Wrangler vs Feature Store for different scenarios.</p>
                </div>
            </div>
        `;
        feedbackContainer.style.display = 'block';
    }

    resetPuzzle() {
        this.matches.clear();
        this.score = 0;
        
        // Reset all drop zones
        document.querySelectorAll('.scenario-drop-zone').forEach(zone => {
            const scenarioId = zone.dataset.scenario;
            zone.innerHTML = `
                <div class="drop-zone-content">
                    <i class="fas fa-hand-pointer" aria-hidden="true"></i>
                    <span>Drop SageMaker tool here</span>
                </div>
            `;
        });
        
        // Reset all status icons
        document.querySelectorAll('.scenario-status').forEach(status => {
            status.innerHTML = '<i class="fas fa-circle" aria-hidden="true"></i>';
        });
        
        // Update score
        this.updateScore();
        
        // Hide feedback
        document.getElementById('puzzleFeedback').style.display = 'none';
        
        console.log('🟢 Puzzle reset');
    }

    showHints() {
        const hintsHTML = `
            <div class="feedback-item hints">
                <div class="feedback-icon">
                    <i class="fas fa-lightbulb" aria-hidden="true"></i>
                </div>
                <div class="feedback-content">
                    <h5>💡 Helpful Hints</h5>
                    <div class="hints-grid">
                        <div class="hint-item">
                            <strong>Data Wrangler is best for:</strong>
                            <ul>
                                <li>Visual data exploration</li>
                                <li>Data cleaning and preparation</li>
                                <li>Feature engineering</li>
                                <li>Bias detection</li>
                            </ul>
                        </div>
                        <div class="hint-item">
                            <strong>Feature Store is best for:</strong>
                            <ul>
                                <li>Production feature serving</li>
                                <li>Team collaboration</li>
                                <li>Feature versioning</li>
                                <li>Real-time inference</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        feedbackContainer.innerHTML = hintsHTML;
        feedbackContainer.style.display = 'block';
    }

    checkAllAnswers() {
        let summary = `
            <div class="feedback-item summary">
                <div class="feedback-icon">
                    <i class="fas fa-clipboard-check" aria-hidden="true"></i>
                </div>
                <div class="feedback-content">
                    <h5>📊 Answer Summary</h5>
                    <p>Score: ${this.score}/${this.totalScenarios} (${Math.round((this.score / this.totalScenarios) * 100)}%)</p>
                    <div class="answers-breakdown">
        `;
        
        this.scenarios.forEach(scenario => {
            const userChoice = this.matches.get(scenario.id);
            const correctChoice = this.correctMatches.get(scenario.id);
            const isCorrect = userChoice === correctChoice;
            const userTool = this.tools.find(t => t.id === userChoice);
            const correctTool = this.tools.find(t => t.id === correctChoice);
            
            summary += `
                <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="answer-scenario">${scenario.title}</div>
                    <div class="answer-choice">
                        Your choice: ${userTool ? userTool.name : 'None'}
                        ${isCorrect ? '✅' : '❌'}
                    </div>
                    ${!isCorrect ? `<div class="answer-correct">Correct: ${correctTool.name}</div>` : ''}
                </div>
            `;
        });
        
        summary += `
                    </div>
                </div>
            </div>
        `;
        
        const feedbackContainer = document.getElementById('puzzleFeedback');
        feedbackContainer.innerHTML = summary;
        feedbackContainer.style.display = 'block';
    }
}

// Export for global access
window.SageMakerIngestionPuzzle = SageMakerIngestionPuzzle;
