/**
 * SageMaker Knowledge Quiz Component
 * Comprehensive assessment of SageMaker Data Wrangler and Feature Store knowledge
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-04
 */

class SageMakerKnowledgeQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = new Map();
        this.score = 0;
        this.quizCompleted = false;
        this.initialized = false;
    }

    async init() {
        try {
            console.log('🟢 Initializing SageMaker Knowledge Quiz...');
            this.setupQuestions();
            await this.render();
            this.setupEventListeners();
            this.initialized = true;
            console.log('✅ SageMaker Knowledge Quiz initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize SageMaker Knowledge Quiz:', error);
            throw error;
        }
    }

    setupQuestions() {
        this.questions = [
            {
                id: 'q1',
                category: 'Data Wrangler Basics',
                question: 'What is the primary purpose of SageMaker Data Wrangler?',
                options: [
                    'Real-time feature serving for ML models',
                    'Visual data preparation and exploration without coding',
                    'Model training and hyperparameter tuning',
                    'Data storage and backup management'
                ],
                correctAnswer: 1,
                explanation: 'SageMaker Data Wrangler is designed for visual data preparation and exploration, allowing users to clean, transform, and analyze data without writing code.'
            },
            {
                id: 'q2',
                category: 'Feature Store Basics',
                question: 'Which of the following best describes SageMaker Feature Store?',
                options: [
                    'A visual data preparation tool',
                    'A model deployment service',
                    'A centralized repository for ML features with versioning and serving capabilities',
                    'A data visualization dashboard'
                ],
                correctAnswer: 2,
                explanation: 'SageMaker Feature Store is a centralized repository that manages ML features with versioning, lineage tracking, and both online and offline serving capabilities.'
            },
            {
                id: 'q3',
                category: 'Data Wrangler Features',
                question: 'How many built-in transformations does SageMaker Data Wrangler provide?',
                options: [
                    'Over 100',
                    'Over 200',
                    'Over 300',
                    'Over 500'
                ],
                correctAnswer: 2,
                explanation: 'SageMaker Data Wrangler provides over 300 built-in transformations for data preparation tasks, covering everything from basic cleaning to advanced feature engineering.'
            },
            {
                id: 'q4',
                category: 'Feature Store Architecture',
                question: 'What are the two storage types in SageMaker Feature Store?',
                options: [
                    'Primary and Secondary stores',
                    'Online and Offline stores',
                    'Training and Inference stores',
                    'Batch and Stream stores'
                ],
                correctAnswer: 1,
                explanation: 'SageMaker Feature Store has Online stores (for real-time, low-latency serving) and Offline stores (for batch processing and training).'
            },
            {
                id: 'q5',
                category: 'Use Case Selection',
                question: 'For a real-time fraud detection system requiring sub-100ms feature retrieval, which tool should you use?',
                options: [
                    'SageMaker Data Wrangler only',
                    'SageMaker Feature Store only',
                    'Both Data Wrangler and Feature Store',
                    'Neither - use a different service'
                ],
                correctAnswer: 1,
                explanation: 'SageMaker Feature Store\'s online store is specifically designed for real-time, low-latency feature serving, making it perfect for fraud detection systems.'
            },
            {
                id: 'q6',
                category: 'Data Wrangler Capabilities',
                question: 'Which of these is NOT a capability of SageMaker Data Wrangler?',
                options: [
                    'Bias detection in datasets',
                    'Visual data quality insights',
                    'Real-time feature serving to production models',
                    'Export to SageMaker Processing jobs'
                ],
                correctAnswer: 2,
                explanation: 'Data Wrangler is designed for data preparation and exploration, not for real-time feature serving. That\'s the role of Feature Store.'
            },
            {
                id: 'q7',
                category: 'Team Collaboration',
                question: 'If multiple data science teams need to share customer features across projects, what\'s the best approach?',
                options: [
                    'Each team creates their own features in Data Wrangler',
                    'Use Feature Store to create a centralized feature repository',
                    'Share Data Wrangler flows via email',
                    'Store features in individual S3 buckets'
                ],
                correctAnswer: 1,
                explanation: 'Feature Store provides centralized feature management with discovery, sharing, and governance capabilities, making it ideal for team collaboration.'
            },
            {
                id: 'q8',
                category: 'Integration Workflow',
                question: 'What\'s the recommended workflow for using Data Wrangler and Feature Store together?',
                options: [
                    'Use Feature Store first, then Data Wrangler',
                    'Use them separately for different projects',
                    'Use Data Wrangler for preparation, then store results in Feature Store',
                    'They cannot be used together'
                ],
                correctAnswer: 2,
                explanation: 'The optimal workflow is to use Data Wrangler for data preparation and feature engineering, then store the processed features in Feature Store for serving.'
            },
            {
                id: 'q9',
                category: 'Feature Store Advanced',
                question: 'What does "time-travel" capability in Feature Store allow you to do?',
                options: [
                    'Schedule features to be created in the future',
                    'Access historical versions of features for model retraining',
                    'Predict future feature values',
                    'Automatically update features over time'
                ],
                correctAnswer: 1,
                explanation: 'Time-travel capability allows you to query historical versions of features, ensuring reproducible model training and enabling point-in-time feature retrieval.'
            },
            {
                id: 'q10',
                category: 'Best Practices',
                question: 'When would you choose Data Wrangler over Feature Store?',
                options: [
                    'For production model serving',
                    'For team feature sharing',
                    'For quick data exploration and one-time analysis',
                    'For real-time inference'
                ],
                correctAnswer: 2,
                explanation: 'Data Wrangler is ideal for quick data exploration, one-time analysis, and prototyping where you need visual tools and don\'t require long-term feature management.'
            }
        ];

        console.log(`🟢 Setup ${this.questions.length} quiz questions`);
    }

    async render() {
        const container = document.getElementById('sagemakerQuizContainer');
        if (!container) {
            throw new Error('SageMaker Quiz container not found');
        }

        const html = `
            <div class="sagemaker-quiz-wrapper">
                <div class="quiz-header">
                    <h3><i class="fas fa-graduation-cap" aria-hidden="true"></i> SageMaker Knowledge Quiz</h3>
                    <p>Test your understanding of SageMaker Data Wrangler and Feature Store</p>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">Question 1 of ${this.questions.length}</span>
                    </div>
                </div>

                <div class="quiz-content">
                    <div class="question-container">
                        ${this.renderQuestion(0)}
                    </div>
                </div>

                <div class="quiz-navigation">
                    <button class="btn btn-secondary" onclick="window.sagemakerQuiz.previousQuestion()" disabled>
                        <i class="fas fa-chevron-left" aria-hidden="true"></i>
                        Previous
                    </button>
                    <button class="btn btn-primary" onclick="window.sagemakerQuiz.nextQuestion()">
                        Next
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="quiz-results" id="quizResults" style="display: none;">
                    <!-- Results will be inserted here -->
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    renderQuestion(index) {
        const question = this.questions[index];
        const userAnswer = this.userAnswers.get(question.id);

        return `
            <div class="question-card">
                <div class="question-header">
                    <div class="question-category">${question.category}</div>
                    <div class="question-number">Question ${index + 1}</div>
                </div>
                <div class="question-text">
                    <h4>${question.question}</h4>
                </div>
                <div class="question-options">
                    ${question.options.map((option, optionIndex) => `
                        <div class="option-item ${userAnswer === optionIndex ? 'selected' : ''}" 
                             onclick="window.sagemakerQuiz.selectAnswer(${optionIndex})">
                            <div class="option-radio">
                                <input type="radio" 
                                       name="question-${question.id}" 
                                       value="${optionIndex}"
                                       ${userAnswer === optionIndex ? 'checked' : ''}>
                            </div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Store reference for global access
        window.sagemakerQuiz = this;
    }

    selectAnswer(optionIndex) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.userAnswers.set(currentQuestion.id, optionIndex);

        // Update visual selection
        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });

        // Update radio button
        const radioButton = document.querySelector(`input[value="${optionIndex}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }

        console.log(`🟢 Selected answer ${optionIndex} for question ${currentQuestion.id}`);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.updateQuestion();
        } else {
            this.completeQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateQuestion();
        }
    }

    updateQuestion() {
        const questionContainer = document.querySelector('.question-container');
        questionContainer.innerHTML = this.renderQuestion(this.currentQuestionIndex);

        // Update progress
        this.updateProgress();

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }
    }

    updateNavigationButtons() {
        const prevButton = document.querySelector('.quiz-navigation .btn-secondary');
        const nextButton = document.querySelector('.quiz-navigation .btn-primary');

        if (prevButton) {
            prevButton.disabled = this.currentQuestionIndex === 0;
        }

        if (nextButton) {
            const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
            nextButton.innerHTML = isLastQuestion ? 
                'Complete Quiz <i class="fas fa-check" aria-hidden="true"></i>' : 
                'Next <i class="fas fa-chevron-right" aria-hidden="true"></i>';
        }
    }

    completeQuiz() {
        this.quizCompleted = true;
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        let correctAnswers = 0;
        
        this.questions.forEach(question => {
            const userAnswer = this.userAnswers.get(question.id);
            if (userAnswer === question.correctAnswer) {
                correctAnswers++;
            }
        });
        
        this.score = correctAnswers;
        console.log(`🟢 Quiz completed with score: ${this.score}/${this.questions.length}`);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const resultsContainer = document.getElementById('quizResults');
        
        // Hide quiz content and navigation
        document.querySelector('.quiz-content').style.display = 'none';
        document.querySelector('.quiz-navigation').style.display = 'none';
        
        // Generate performance by category
        const categoryPerformance = this.getCategoryPerformance();
        
        const resultsHTML = `
            <div class="results-summary">
                <div class="score-display">
                    <div class="score-circle ${this.getScoreClass(percentage)}">
                        <div class="score-number">${percentage}%</div>
                        <div class="score-label">${this.score}/${this.questions.length} Correct</div>
                    </div>
                </div>
                
                <div class="performance-message">
                    <h4>${this.getPerformanceMessage(percentage)}</h4>
                    <p>${this.getPerformanceDescription(percentage)}</p>
                </div>
            </div>

            <div class="category-breakdown">
                <h5><i class="fas fa-chart-bar" aria-hidden="true"></i> Performance by Category</h5>
                <div class="category-grid">
                    ${categoryPerformance.map(cat => `
                        <div class="category-item">
                            <div class="category-name">${cat.name}</div>
                            <div class="category-score ${this.getScoreClass(cat.percentage)}">
                                ${cat.correct}/${cat.total} (${cat.percentage}%)
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="detailed-results">
                <h5><i class="fas fa-list" aria-hidden="true"></i> Detailed Results</h5>
                <div class="results-list">
                    ${this.questions.map((question, index) => {
                        const userAnswer = this.userAnswers.get(question.id);
                        const isCorrect = userAnswer === question.correctAnswer;
                        return `
                            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="result-header">
                                    <div class="result-number">Q${index + 1}</div>
                                    <div class="result-status">
                                        <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="result-content">
                                    <div class="result-question">${question.question}</div>
                                    <div class="result-answers">
                                        <div class="user-answer">
                                            <strong>Your answer:</strong> ${question.options[userAnswer] || 'Not answered'}
                                        </div>
                                        ${!isCorrect ? `
                                            <div class="correct-answer">
                                                <strong>Correct answer:</strong> ${question.options[question.correctAnswer]}
                                            </div>
                                        ` : ''}
                                        <div class="explanation">
                                            <strong>Explanation:</strong> ${question.explanation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="quiz-actions">
                <button class="btn btn-primary" onclick="window.sagemakerQuiz.retakeQuiz()">
                    <i class="fas fa-refresh" aria-hidden="true"></i>
                    Retake Quiz
                </button>
                <button class="btn btn-secondary" onclick="topic3Controller.nextPage()">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    Continue to Summary
                </button>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.style.display = 'block';
    }

    getCategoryPerformance() {
        const categories = {};
        
        this.questions.forEach(question => {
            if (!categories[question.category]) {
                categories[question.category] = { correct: 0, total: 0 };
            }
            
            categories[question.category].total++;
            
            const userAnswer = this.userAnswers.get(question.id);
            if (userAnswer === question.correctAnswer) {
                categories[question.category].correct++;
            }
        });
        
        return Object.entries(categories).map(([name, stats]) => ({
            name,
            correct: stats.correct,
            total: stats.total,
            percentage: Math.round((stats.correct / stats.total) * 100)
        }));
    }

    getScoreClass(percentage) {
        if (percentage >= 90) return 'excellent';
        if (percentage >= 80) return 'good';
        if (percentage >= 70) return 'fair';
        return 'needs-improvement';
    }

    getPerformanceMessage(percentage) {
        if (percentage >= 90) return '🎉 Excellent Work!';
        if (percentage >= 80) return '👍 Good Job!';
        if (percentage >= 70) return '👌 Not Bad!';
        return '📚 Keep Learning!';
    }

    getPerformanceDescription(percentage) {
        if (percentage >= 90) {
            return 'You have mastered SageMaker ingestion tools! You understand when and how to use Data Wrangler and Feature Store effectively.';
        } else if (percentage >= 80) {
            return 'You have a solid understanding of SageMaker ingestion tools. Review the areas where you missed questions to strengthen your knowledge.';
        } else if (percentage >= 70) {
            return 'You have a basic understanding but could benefit from reviewing the key concepts and use cases for both tools.';
        } else {
            return 'Consider reviewing the lesson content and retaking the quiz. Focus on understanding the core differences between Data Wrangler and Feature Store.';
        }
    }

    retakeQuiz() {
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.userAnswers.clear();
        this.score = 0;
        this.quizCompleted = false;
        
        // Show quiz content and navigation
        document.querySelector('.quiz-content').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'flex';
        document.getElementById('quizResults').style.display = 'none';
        
        // Reset to first question
        this.updateQuestion();
        
        console.log('🟢 Quiz reset for retake');
    }
}

// Export for global access
window.SageMakerKnowledgeQuiz = SageMakerKnowledgeQuiz;
