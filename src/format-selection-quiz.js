/**
 * Format Selection Quiz Component
 * Knowledge assessment for data formats
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-02
 */

class FormatSelectionQuiz {
    constructor() {
        this.containerId = 'formatQuizContainer';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizCompleted = false;
        this.initialized = false;
        this.questions = [];
    }

    /**
     * Initialize the Format Selection Quiz
     */
    async init() {
        try {
            Utils.log('Initializing Format Selection Quiz...');
            
            this.setupQuestions();
            this.render();
            this.setupEventHandlers();
            
            this.initialized = true;
            Utils.log('Format Selection Quiz initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Format Selection Quiz:', error);
            throw error;
        }
    }

    /**
     * Setup quiz questions
     */
    setupQuestions() {
        this.questions = [
            {
                id: 1,
                question: "Which data format provides the best compression for large analytical datasets?",
                options: [
                    "CSV",
                    "JSON",
                    "Parquet",
                    "XML"
                ],
                correctAnswer: 2,
                explanation: "Parquet uses advanced compression algorithms and columnar storage, achieving compression ratios of 75-90% compared to text formats like CSV. Its columnar layout allows for better compression because similar data types are stored together.",
                category: "Performance"
            },
            {
                id: 2,
                question: "When would you choose JSON over other formats?",
                options: [
                    "For maximum query performance",
                    "For nested, hierarchical data structures",
                    "For the smallest file size",
                    "For compatibility with Excel"
                ],
                correctAnswer: 1,
                explanation: "JSON excels at representing nested, hierarchical data structures with its key-value pair format. It's self-describing and handles complex nested objects naturally, making it ideal for APIs and configuration files.",
                category: "Structure"
            },
            {
                id: 3,
                question: "What is the main advantage of ORC over Parquet?",
                options: [
                    "Better cross-platform compatibility",
                    "Human-readable format",
                    "Superior performance in Hive ecosystems",
                    "Smaller learning curve"
                ],
                correctAnswer: 2,
                explanation: "ORC (Optimized Row Columnar) is specifically optimized for Hive and Hadoop ecosystems, often providing superior compression and query performance compared to Parquet in these environments. It includes built-in indexing and statistics.",
                category: "Ecosystem"
            },
            {
                id: 4,
                question: "Which format is best for data that needs to be human-readable and editable?",
                options: [
                    "Parquet",
                    "ORC",
                    "CSV",
                    "Avro"
                ],
                correctAnswer: 2,
                explanation: "CSV is a plain text format that can be opened and edited in any text editor or spreadsheet application. Unlike binary formats (Parquet, ORC), CSV files are human-readable and don't require specialized tools.",
                category: "Usability"
            },
            {
                id: 5,
                question: "For a machine learning feature store requiring fast columnar access, which format is optimal?",
                options: [
                    "CSV",
                    "JSON",
                    "Parquet",
                    "Plain text"
                ],
                correctAnswer: 2,
                explanation: "Parquet's columnar storage allows efficient access to specific features without reading entire rows. This is crucial for ML feature stores where you often need to retrieve specific columns (features) across many records quickly.",
                category: "ML Applications"
            },
            {
                id: 6,
                question: "What is a key limitation of CSV format?",
                options: [
                    "Cannot store text data",
                    "No data type information",
                    "Only works on Windows",
                    "Requires special software"
                ],
                correctAnswer: 1,
                explanation: "CSV files don't include data type information - everything is stored as text. This means numbers, dates, and booleans must be parsed and converted by applications, which can lead to errors and performance issues.",
                category: "Limitations"
            },
            {
                id: 7,
                question: "Which AWS service has the best native support for Parquet files?",
                options: [
                    "DynamoDB",
                    "RDS",
                    "Athena",
                    "ElastiCache"
                ],
                correctAnswer: 2,
                explanation: "Amazon Athena is specifically designed for querying data in S3 and has excellent native support for Parquet files. It can leverage Parquet's columnar format for fast, cost-effective queries with features like predicate pushdown and partition pruning.",
                category: "AWS Integration"
            },
            {
                id: 8,
                question: "When processing streaming data from IoT devices with varying schemas, which format is most suitable?",
                options: [
                    "CSV",
                    "JSON",
                    "Parquet",
                    "ORC"
                ],
                correctAnswer: 1,
                explanation: "JSON's flexible schema makes it ideal for IoT data where different devices may send different fields or data structures. It can handle varying schemas without requiring predefined table structures, unlike rigid formats like CSV.",
                category: "Use Cases"
            },
            {
                id: 9,
                question: "What makes Parquet particularly efficient for analytical queries?",
                options: [
                    "Row-based storage",
                    "Columnar storage with predicate pushdown",
                    "Human-readable format",
                    "No compression"
                ],
                correctAnswer: 1,
                explanation: "Parquet's columnar storage allows reading only the columns needed for a query, and predicate pushdown enables filtering at the storage level. This combination dramatically reduces I/O and improves query performance for analytical workloads.",
                category: "Performance"
            },
            {
                id: 10,
                question: "For sharing a small dataset with business users who need to analyze it in Excel, which format is best?",
                options: [
                    "Parquet",
                    "ORC",
                    "JSON",
                    "CSV"
                ],
                correctAnswer: 3,
                explanation: "CSV is universally compatible with Excel and other spreadsheet applications. Business users can easily open, view, and analyze CSV files without any technical knowledge or specialized tools, making it the best choice for this scenario.",
                category: "Business Use"
            }
        ];

        Utils.log(`Setup quiz with ${this.questions.length} questions`);
    }

    /**
     * Render the quiz interface
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Format Quiz container not found');
            return;
        }

        if (this.quizCompleted) {
            this.renderResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        const html = `
            <div class="format-quiz-wrapper">
                <!-- Quiz Header -->
                <div class="quiz-header">
                    <div class="quiz-title">
                        <h2>📝 Format Selection Quiz</h2>
                        <p class="quiz-subtitle">Test your knowledge of data format selection</p>
                    </div>
                    <div class="quiz-progress">
                        <div class="progress-info">
                            <span class="question-counter">Question ${this.currentQuestionIndex + 1} of ${this.questions.length}</span>
                            <span class="current-score">Score: ${this.score}/${this.questions.length}</span>
                            <span class="category-tag">${question.category}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${((this.currentQuestionIndex) / this.questions.length) * 100}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Question Content -->
                <div class="question-content">
                    <div class="question-text">
                        <h3>${question.question}</h3>
                    </div>
                    
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <div class="option-item" data-option="${index}">
                                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                                <div class="option-text">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Navigation -->
                <div class="quiz-navigation">
                    <button class="btn btn-secondary" id="prevQuestion" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="btn btn-primary" id="nextQuestion" disabled>
                        ${this.currentQuestionIndex === this.questions.length - 1 ? 'Finish Quiz' : 'Next →'}
                    </button>
                </div>

                <!-- Answer Feedback -->
                <div class="answer-feedback" id="answerFeedback" style="display: none;">
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
     * Setup event handlers
     */
    setupEventHandlers() {
        // Option selection
        const options = document.querySelectorAll('.option-item');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectOption(parseInt(e.currentTarget.dataset.option));
            });
        });

        // Navigation buttons
        const nextBtn = DOMUtils.getElementById('nextQuestion');
        const prevBtn = DOMUtils.getElementById('prevQuestion');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentQuestionIndex === this.questions.length - 1) {
                    this.finishQuiz();
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
     * Handle option selection
     */
    selectOption(optionIndex) {
        // Remove previous selections
        document.querySelectorAll('.option-item').forEach(item => {
            item.classList.remove('selected', 'correct', 'incorrect');
        });

        // Mark selected option
        const selectedOption = document.querySelector(`[data-option="${optionIndex}"]`);
        selectedOption.classList.add('selected');

        // Store answer
        this.answers[this.currentQuestionIndex] = optionIndex;

        // Show feedback
        this.showFeedback(optionIndex);

        // Enable next button
        const nextBtn = DOMUtils.getElementById('nextQuestion');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    /**
     * Show answer feedback
     */
    showFeedback(selectedOption) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedOption === question.correctAnswer;
        
        // Update score
        if (isCorrect) {
            this.score++;
        }

        // Highlight correct/incorrect options
        const selectedElement = document.querySelector(`[data-option="${selectedOption}"]`);
        const correctElement = document.querySelector(`[data-option="${question.correctAnswer}"]`);

        if (isCorrect) {
            selectedElement.classList.add('correct');
        } else {
            selectedElement.classList.add('incorrect');
            correctElement.classList.add('correct');
        }

        // Show feedback
        const feedback = DOMUtils.getElementById('answerFeedback');
        const feedbackIcon = feedback.querySelector('.feedback-icon');
        const feedbackTitle = feedback.querySelector('.feedback-title');
        const feedbackExplanation = feedback.querySelector('.feedback-explanation');

        feedbackIcon.textContent = isCorrect ? '✅' : '💡';
        feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Good Try!';
        feedbackExplanation.textContent = question.explanation;

        feedback.style.display = 'block';
        feedback.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
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
     * Finish the quiz and show results
     */
    finishQuiz() {
        this.quizCompleted = true;
        this.render();
    }

    /**
     * Render quiz results
     */
    renderResults() {
        const container = DOMUtils.getElementById(this.containerId);
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let performanceLevel = '';
        let performanceColor = '';
        let performanceIcon = '';
        
        if (percentage >= 90) {
            performanceLevel = 'Format Expert';
            performanceColor = '#10B981';
            performanceIcon = '🏆';
        } else if (percentage >= 80) {
            performanceLevel = 'Format Specialist';
            performanceColor = '#3B82F6';
            performanceIcon = '🎯';
        } else if (percentage >= 70) {
            performanceLevel = 'Format Learner';
            performanceColor = '#F59E0B';
            performanceIcon = '📚';
        } else {
            performanceLevel = 'Keep Studying';
            performanceColor = '#EF4444';
            performanceIcon = '💪';
        }

        const html = `
            <div class="quiz-results">
                <div class="results-header">
                    <div class="results-icon">${performanceIcon}</div>
                    <h2>Quiz Complete!</h2>
                    <p class="results-subtitle">Data Format Selection Assessment</p>
                </div>

                <div class="score-summary">
                    <div class="score-circle" style="border-color: ${performanceColor}">
                        <div class="score-percentage" style="color: ${performanceColor}">${percentage}%</div>
                        <div class="score-fraction">${this.score}/${this.questions.length}</div>
                    </div>
                    <div class="performance-level" style="color: ${performanceColor}">
                        ${performanceLevel}
                    </div>
                </div>

                <div class="results-breakdown">
                    <h3>Category Breakdown</h3>
                    ${this.getCategoryBreakdown()}
                </div>

                <div class="results-actions">
                    <button class="btn btn-primary" onclick="this.retakeQuiz()">
                        🔄 Retake Quiz
                    </button>
                    <button class="btn btn-success" onclick="topic2PageController.nextPage()">
                        ✅ Continue to Summary
                    </button>
                </div>

                <div class="learning-recommendations">
                    <h3>📚 Learning Recommendations</h3>
                    ${this.getLearningRecommendations(percentage)}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Get category breakdown for results
     */
    getCategoryBreakdown() {
        const categories = {};
        
        this.questions.forEach((question, index) => {
            const category = question.category;
            if (!categories[category]) {
                categories[category] = { correct: 0, total: 0 };
            }
            categories[category].total++;
            if (this.answers[index] === question.correctAnswer) {
                categories[category].correct++;
            }
        });

        return Object.entries(categories).map(([category, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            return `
                <div class="category-stat">
                    <div class="category-name">${category}</div>
                    <div class="category-score">${stats.correct}/${stats.total} (${percentage}%)</div>
                    <div class="category-bar">
                        <div class="category-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Get learning recommendations based on performance
     */
    getLearningRecommendations(percentage) {
        if (percentage >= 90) {
            return `
                <div class="recommendation excellent">
                    <p>🎉 Outstanding! You have mastered data format selection principles.</p>
                    <ul>
                        <li>Consider exploring advanced optimization techniques for each format</li>
                        <li>Learn about format conversion strategies and tools</li>
                        <li>Dive deeper into AWS service integrations for each format</li>
                        <li>Explore emerging formats like Delta Lake and Iceberg</li>
                    </ul>
                </div>
            `;
        } else if (percentage >= 70) {
            return `
                <div class="recommendation good">
                    <p>👍 Good work! You understand the fundamentals. Focus on these areas:</p>
                    <ul>
                        <li>Review performance characteristics of columnar vs row-based formats</li>
                        <li>Study AWS service compatibility with different formats</li>
                        <li>Practice identifying optimal formats for specific use cases</li>
                        <li>Learn more about compression and query optimization</li>
                    </ul>
                </div>
            `;
        } else {
            return `
                <div class="recommendation needs-work">
                    <p>📚 Keep studying! Focus on these key concepts:</p>
                    <ul>
                        <li>CSV: Simple, human-readable, good for small datasets and Excel compatibility</li>
                        <li>JSON: Flexible structure, perfect for APIs and nested data</li>
                        <li>Parquet: Columnar, compressed, ideal for analytics and ML</li>
                        <li>ORC: Maximum performance for Hive/Hadoop ecosystems</li>
                        <li>Review the Interactive Format Analysis section</li>
                        <li>Practice with the Format Comparison Challenge</li>
                    </ul>
                </div>
            `;
        }
    }

    /**
     * Retake the quiz
     */
    retakeQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizCompleted = false;
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
    module.exports = FormatSelectionQuiz;
}
