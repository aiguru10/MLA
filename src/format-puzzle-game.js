/**
 * Format Comparison Puzzle Game
 * Interactive drag-and-drop challenge for data formats
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-02
 */

class FormatPuzzleGame {
    constructor() {
        this.containerId = 'formatPuzzleContainer';
        this.currentScore = 0;
        this.totalQuestions = 0;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.gameCompleted = false;
        this.initialized = false;
    }

    /**
     * Initialize the Format Puzzle Game
     */
    async init() {
        try {
            Utils.log('Initializing Format Puzzle Game...');
            
            this.setupQuestions();
            this.render();
            this.setupEventHandlers();
            
            this.initialized = true;
            Utils.log('Format Puzzle Game initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Format Puzzle Game:', error);
            throw error;
        }
    }

    /**
     * Setup puzzle questions
     */
    setupQuestions() {
        const allQuestions = [
            {
                id: 1,
                scenario: "You need to store 10TB of training data for a machine learning model with fast analytical queries",
                correctFormat: "parquet",
                explanation: "Parquet's columnar storage and compression make it ideal for large analytical datasets with fast query performance."
            },
            {
                id: 2,
                scenario: "Your API returns user profile data with nested preferences and settings",
                correctFormat: "json",
                explanation: "JSON naturally handles nested, hierarchical data structures and is perfect for API responses."
            },
            {
                id: 3,
                scenario: "You need to export model predictions for business users to analyze in Excel",
                correctFormat: "csv",
                explanation: "CSV is universally compatible with spreadsheet applications and is human-readable for business users."
            },
            {
                id: 4,
                scenario: "Your Hive-based data warehouse needs maximum compression and query performance",
                correctFormat: "orc",
                explanation: "ORC is specifically optimized for Hive environments with superior compression and built-in indexing."
            },
            {
                id: 5,
                scenario: "You're building a feature store that needs fast columnar access for ML training",
                correctFormat: "parquet",
                explanation: "Parquet's columnar format allows efficient access to specific features without reading entire rows."
            },
            {
                id: 6,
                scenario: "Your web application needs to store user session data with flexible schema",
                correctFormat: "json",
                explanation: "JSON provides schema flexibility perfect for evolving user session data structures."
            },
            {
                id: 7,
                scenario: "You need to share a small dataset with researchers who don't have specialized tools",
                correctFormat: "csv",
                explanation: "CSV is simple, human-readable, and doesn't require specialized software to view or edit."
            },
            {
                id: 8,
                scenario: "Your enterprise data lake processes petabytes of data with Hadoop ecosystem",
                correctFormat: "orc",
                explanation: "ORC provides maximum efficiency for large-scale Hadoop-based data processing."
            },
            {
                id: 9,
                scenario: "You're storing IoT sensor data that arrives as key-value pairs with timestamps",
                correctFormat: "json",
                explanation: "JSON handles the flexible structure of IoT data with varying sensor types and metadata."
            },
            {
                id: 10,
                scenario: "Your data science team needs to quickly prototype with pandas DataFrames",
                correctFormat: "csv",
                explanation: "CSV integrates seamlessly with pandas and is perfect for data science prototyping workflows."
            }
        ];

        // Shuffle questions and select a subset
        this.questions = this.shuffleArray(allQuestions).slice(0, 6);
        this.totalQuestions = this.questions.length;
        
        Utils.log(`Setup ${this.totalQuestions} puzzle questions`);
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
     * Render the puzzle game interface
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Format Puzzle container not found');
            return;
        }

        if (this.gameCompleted) {
            this.renderResults();
            return;
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        const html = `
            <div class="format-puzzle-wrapper">
                <!-- Game Header -->
                <div class="puzzle-header">
                    <div class="header-content">
                        <h2>🧩 Format Selection Challenge</h2>
                        <p class="header-subtitle">Drag the correct data format to match each scenario</p>
                    </div>
                    <div class="game-progress">
                        <div class="progress-info">
                            <span class="question-counter">Question ${this.currentQuestionIndex + 1} of ${this.totalQuestions}</span>
                            <span class="current-score">Score: ${this.currentScore}/${this.totalQuestions}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(this.currentQuestionIndex / this.totalQuestions) * 100}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Puzzle Content -->
                <div class="puzzle-content">
                    <div class="scenario-card">
                        <div class="scenario-header">
                            <div class="scenario-icon">📋</div>
                            <h3>Scenario</h3>
                        </div>
                        <div class="scenario-text">
                            ${currentQuestion.scenario}
                        </div>
                    </div>

                    <div class="puzzle-area">
                        <div class="formats-source">
                            <h4>Available Formats</h4>
                            <div class="format-options">
                                ${this.renderFormatOptions()}
                            </div>
                        </div>

                        <div class="drop-zone-container">
                            <div class="drop-zone" id="dropZone">
                                <div class="drop-zone-content">
                                    <div class="drop-icon">🎯</div>
                                    <div class="drop-text">Drag the best format here</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="puzzle-navigation">
                    <button class="btn btn-secondary" id="prevQuestion" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="btn btn-primary" id="nextQuestion" disabled>
                        ${this.currentQuestionIndex === this.totalQuestions - 1 ? 'Finish Game' : 'Next →'}
                    </button>
                </div>

                <!-- Feedback -->
                <div class="puzzle-feedback" id="puzzleFeedback" style="display: none;">
                    <div class="feedback-content">
                        <div class="feedback-header">
                            <span class="feedback-icon"></span>
                            <span class="feedback-title"></span>
                        </div>
                        <div class="feedback-explanation"></div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render format options
     */
    renderFormatOptions() {
        const formats = [
            { id: 'csv', name: 'CSV', icon: '📄', color: '#48bb78' },
            { id: 'json', name: 'JSON', icon: '🔗', color: '#4299e1' },
            { id: 'parquet', name: 'Parquet', icon: '🗜️', color: '#ed8936' },
            { id: 'orc', name: 'ORC', icon: '📦', color: '#9f7aea' }
        ];

        return formats.map(format => `
            <div class="format-option" 
                 draggable="true" 
                 data-format="${format.id}"
                 style="border-color: ${format.color}">
                <div class="format-icon">${format.icon}</div>
                <div class="format-name">${format.name}</div>
            </div>
        `).join('');
    }

    /**
     * Setup event handlers
     */
    setupEventHandlers() {
        // Drag and drop functionality
        this.setupDragAndDrop();

        // Navigation buttons
        const nextBtn = DOMUtils.getElementById('nextQuestion');
        const prevBtn = DOMUtils.getElementById('prevQuestion');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentQuestionIndex === this.totalQuestions - 1) {
                    this.finishGame();
                } else {
                    this.nextQuestion();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }
    }

    /**
     * Setup drag and drop functionality
     */
    setupDragAndDrop() {
        const formatOptions = document.querySelectorAll('.format-option');
        const dropZone = document.getElementById('dropZone');

        // Format options drag events
        formatOptions.forEach(option => {
            option.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.format);
                e.target.classList.add('dragging');
            });

            option.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        // Drop zone events
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', (e) => {
                if (!dropZone.contains(e.relatedTarget)) {
                    dropZone.classList.remove('drag-over');
                }
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                
                const droppedFormat = e.dataTransfer.getData('text/plain');
                this.handleDrop(droppedFormat);
            });
        }
    }

    /**
     * Handle format drop
     */
    handleDrop(droppedFormat) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = droppedFormat === currentQuestion.correctFormat;
        
        // Update score
        if (isCorrect) {
            this.currentScore++;
        }

        // Update drop zone
        const dropZone = document.getElementById('dropZone');
        const formatInfo = this.getFormatInfo(droppedFormat);
        
        dropZone.innerHTML = `
            <div class="dropped-format ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="dropped-icon">${formatInfo.icon}</div>
                <div class="dropped-name">${formatInfo.name}</div>
                <div class="result-indicator">
                    ${isCorrect ? '✅' : '❌'}
                </div>
            </div>
        `;

        // Show feedback
        this.showFeedback(isCorrect, currentQuestion.explanation);

        // Enable next button
        const nextBtn = DOMUtils.getElementById('nextQuestion');
        if (nextBtn) {
            nextBtn.disabled = false;
        }

        // Disable dragging
        document.querySelectorAll('.format-option').forEach(option => {
            option.draggable = false;
            option.style.opacity = '0.6';
        });
    }

    /**
     * Get format information
     */
    getFormatInfo(formatId) {
        const formats = {
            csv: { name: 'CSV', icon: '📄', color: '#48bb78' },
            json: { name: 'JSON', icon: '🔗', color: '#4299e1' },
            parquet: { name: 'Parquet', icon: '🗜️', color: '#ed8936' },
            orc: { name: 'ORC', icon: '📦', color: '#9f7aea' }
        };
        return formats[formatId] || { name: 'Unknown', icon: '❓', color: '#gray' };
    }

    /**
     * Show feedback
     */
    showFeedback(isCorrect, explanation) {
        const feedback = DOMUtils.getElementById('puzzleFeedback');
        const feedbackIcon = feedback.querySelector('.feedback-icon');
        const feedbackTitle = feedback.querySelector('.feedback-title');
        const feedbackExplanation = feedback.querySelector('.feedback-explanation');

        feedbackIcon.textContent = isCorrect ? '🎉' : '💡';
        feedbackTitle.textContent = isCorrect ? 'Excellent Choice!' : 'Good Try!';
        feedbackExplanation.textContent = explanation;

        feedback.style.display = 'block';
        feedback.className = `puzzle-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.render();
            this.setupEventHandlers();
        }
    }

    /**
     * Move to previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.render();
            this.setupEventHandlers();
        }
    }

    /**
     * Finish the game
     */
    finishGame() {
        this.gameCompleted = true;
        this.render();
    }

    /**
     * Render game results
     */
    renderResults() {
        const container = DOMUtils.getElementById(this.containerId);
        const percentage = Math.round((this.currentScore / this.totalQuestions) * 100);
        
        let performanceLevel = '';
        let performanceColor = '';
        let performanceIcon = '';
        
        if (percentage >= 90) {
            performanceLevel = 'Format Expert';
            performanceColor = '#10B981';
            performanceIcon = '🏆';
        } else if (percentage >= 70) {
            performanceLevel = 'Format Specialist';
            performanceColor = '#3B82F6';
            performanceIcon = '🎯';
        } else if (percentage >= 50) {
            performanceLevel = 'Format Learner';
            performanceColor = '#F59E0B';
            performanceIcon = '📚';
        } else {
            performanceLevel = 'Keep Practicing';
            performanceColor = '#EF4444';
            performanceIcon = '💪';
        }

        const html = `
            <div class="puzzle-results">
                <div class="results-header">
                    <div class="results-icon">${performanceIcon}</div>
                    <h2>Challenge Complete!</h2>
                    <p class="results-subtitle">Format Selection Mastery</p>
                </div>

                <div class="score-summary">
                    <div class="score-circle" style="border-color: ${performanceColor}">
                        <div class="score-percentage" style="color: ${performanceColor}">${percentage}%</div>
                        <div class="score-fraction">${this.currentScore}/${this.totalQuestions}</div>
                    </div>
                    <div class="performance-level" style="color: ${performanceColor}">
                        ${performanceLevel}
                    </div>
                </div>

                <div class="results-actions">
                    <button class="btn btn-primary" onclick="this.restartGame()">
                        🔄 Try Again
                    </button>
                    <button class="btn btn-success" onclick="topic2PageController.nextPage()">
                        ✅ Continue Learning
                    </button>
                </div>

                <div class="learning-tips">
                    <h3>💡 Key Takeaways</h3>
                    ${this.getLearningTips(percentage)}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Get learning tips based on performance
     */
    getLearningTips(percentage) {
        if (percentage >= 80) {
            return `
                <div class="tip-card excellent">
                    <p>🎉 Outstanding! You have a strong grasp of data format selection principles.</p>
                    <ul>
                        <li>You understand when to prioritize performance vs simplicity</li>
                        <li>You can match formats to specific use cases effectively</li>
                        <li>Consider exploring advanced optimization techniques for each format</li>
                    </ul>
                </div>
            `;
        } else if (percentage >= 60) {
            return `
                <div class="tip-card good">
                    <p>👍 Good work! You're developing solid format selection skills.</p>
                    <ul>
                        <li>Review the performance characteristics of each format</li>
                        <li>Focus on understanding columnar vs row-based storage</li>
                        <li>Practice identifying when compression matters most</li>
                    </ul>
                </div>
            `;
        } else {
            return `
                <div class="tip-card needs-work">
                    <p>📚 Keep learning! Here are key concepts to focus on:</p>
                    <ul>
                        <li>CSV: Simple, human-readable, good for small datasets</li>
                        <li>JSON: Flexible structure, perfect for APIs and nested data</li>
                        <li>Parquet: Columnar, compressed, ideal for analytics</li>
                        <li>ORC: Maximum performance for Hive/Hadoop ecosystems</li>
                    </ul>
                </div>
            `;
        }
    }

    /**
     * Restart the game
     */
    restartGame() {
        this.currentScore = 0;
        this.currentQuestionIndex = 0;
        this.gameCompleted = false;
        this.setupQuestions(); // Reshuffle questions
        this.render();
        this.setupEventHandlers();
    }

    /**
     * Cleanup method
     */
    cleanup() {
        const container = DOMUtils.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
        this.initialized = false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormatPuzzleGame;
}
