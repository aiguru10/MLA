/**
 * Interactive Quiz Component
 * Knowledge check quiz for AWS storage services
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-01
 */

class InteractiveQuiz {
    constructor() {
        this.containerId = 'quizContainer';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizCompleted = false;
        this.initialized = false;
        this.questions = [];
    }

    /**
     * Initialize the Interactive Quiz
     */
    async init() {
        try {
            Utils.log('Initializing Interactive Quiz...');
            
            this.setupQuestions();
            this.render();
            this.setupEventHandlers();
            
            this.initialized = true;
            Utils.log('Interactive Quiz initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Interactive Quiz:', error);
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
                question: "Which AWS storage service is best suited for creating a data lake for machine learning projects?",
                options: [
                    "Amazon EBS",
                    "Amazon S3",
                    "Amazon EFS",
                    "Amazon FSx"
                ],
                correctAnswer: 1,
                explanation: "Amazon S3 is ideal for data lakes because it offers virtually unlimited storage capacity, high durability (99.999999999%), and seamless integration with ML services like SageMaker."
            },
            {
                id: 2,
                question: "What is the primary advantage of Amazon EBS for database workloads?",
                options: [
                    "Lowest cost storage option",
                    "Automatic data replication across regions",
                    "High IOPS performance and consistent latency",
                    "Built-in data compression"
                ],
                correctAnswer: 2,
                explanation: "Amazon EBS provides high IOPS performance (up to 64,000 IOPS) and consistent low latency, making it perfect for database workloads that require predictable performance."
            },
            {
                id: 3,
                question: "When would you choose Amazon EFS over Amazon EBS?",
                options: [
                    "When you need the lowest possible latency",
                    "When multiple EC2 instances need concurrent access to the same data",
                    "When you want the cheapest storage option",
                    "When you need to store data for archival purposes"
                ],
                correctAnswer: 1,
                explanation: "Amazon EFS is a shared file system that can be mounted on multiple EC2 instances simultaneously, making it ideal for scenarios where multiple instances need concurrent access to the same dataset."
            },
            {
                id: 4,
                question: "Which storage service is specifically optimized for high-performance computing and machine learning training workloads?",
                options: [
                    "Amazon S3",
                    "Amazon Glacier",
                    "Amazon FSx for Lustre",
                    "Amazon EBS"
                ],
                correctAnswer: 2,
                explanation: "Amazon FSx for Lustre is specifically designed for high-performance computing workloads, offering sub-millisecond latencies and hundreds of GB/s throughput, making it perfect for intensive ML training."
            },
            {
                id: 5,
                question: "What is the main use case for Amazon S3 Glacier in machine learning projects?",
                options: [
                    "Real-time data processing",
                    "High-frequency data access",
                    "Long-term archival of old models and datasets",
                    "Shared storage for training clusters"
                ],
                correctAnswer: 2,
                explanation: "Amazon S3 Glacier is designed for long-term archival storage at extremely low costs, making it perfect for storing old ML models, historical datasets, and compliance data that's rarely accessed."
            },
            {
                id: 6,
                question: "Which AWS storage service offers the highest durability rating?",
                options: [
                    "Amazon EBS (99.999% availability)",
                    "Amazon EFS (99.9% availability)",
                    "Amazon S3 (99.999999999% durability)",
                    "Amazon FSx (99.9% availability)"
                ],
                correctAnswer: 2,
                explanation: "Amazon S3 offers 99.999999999% (11 9's) durability, which means if you store 10 million objects, you can expect to lose one object every 10,000 years on average."
            },
            {
                id: 7,
                question: "What makes Amazon FSx for Lustre particularly suitable for machine learning workloads?",
                options: [
                    "It's the cheapest storage option",
                    "It automatically backs up data to S3",
                    "It provides seamless integration with S3 and high throughput",
                    "It offers unlimited storage capacity"
                ],
                correctAnswer: 2,
                explanation: "Amazon FSx for Lustre integrates seamlessly with S3, allowing you to process S3 data at high speeds (hundreds of GB/s throughput) without copying data, which is perfect for ML training pipelines."
            },
            {
                id: 8,
                question: "In terms of cost optimization, which storage service would you choose for infrequently accessed backup data?",
                options: [
                    "Amazon EBS",
                    "Amazon S3 Standard",
                    "Amazon S3 Glacier",
                    "Amazon EFS"
                ],
                correctAnswer: 2,
                explanation: "Amazon S3 Glacier offers the lowest storage costs (starting at $0.004 per GB/month) and is specifically designed for infrequently accessed data, making it ideal for backup and archival use cases."
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
            Utils.error('Quiz container not found');
            return;
        }

        if (this.quizCompleted) {
            this.renderResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        const html = `
            <div class="quiz-wrapper">
                <!-- Quiz Header -->
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <div class="progress-info">
                            <span class="question-counter">Question ${this.currentQuestionIndex + 1} of ${this.questions.length}</span>
                            <span class="current-score">Score: ${this.score}/${this.questions.length}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${((this.currentQuestionIndex) / this.questions.length) * 100}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Question Card -->
                <div class="question-card">
                    <div class="question-header">
                        <h3 class="question-text">${question.question}</h3>
                    </div>

                    <div class="options-container" id="optionsContainer">
                        ${this.renderOptions(question)}
                    </div>

                    <div class="question-actions">
                        <button class="quiz-btn secondary" id="prevQuestionBtn" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                            <i class="fas fa-chevron-left"></i>
                            Previous
                        </button>
                        
                        <div class="question-navigation">
                            ${this.renderQuestionDots()}
                        </div>
                        
                        <button class="quiz-btn primary" id="nextQuestionBtn" disabled>
                            ${this.currentQuestionIndex === this.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Answer Feedback -->
                <div class="answer-feedback" id="answerFeedback" style="display: none;">
                    <div class="feedback-content">
                        <div class="feedback-icon"></div>
                        <div class="feedback-text">
                            <h4 class="feedback-title"></h4>
                            <p class="feedback-explanation"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        DOMUtils.setContent(container, html, true);
    }

    /**
     * Render question options
     */
    renderOptions(question) {
        return question.options.map((option, index) => `
            <div class="option-item" data-option-index="${index}">
                <div class="option-radio">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                </div>
                <div class="option-text">${option}</div>
            </div>
        `).join('');
    }

    /**
     * Render question navigation dots
     */
    renderQuestionDots() {
        return this.questions.map((_, index) => {
            let className = 'question-dot';
            if (index < this.currentQuestionIndex) className += ' completed';
            if (index === this.currentQuestionIndex) className += ' current';
            if (this.answers[index] !== undefined) className += ' answered';
            
            return `<div class="${className}" data-question="${index}"></div>`;
        }).join('');
    }

    /**
     * Setup event handlers
     */
    setupEventHandlers() {
        // Option selection
        const options = DOMUtils.querySelectorAll('.option-item');
        options.forEach(option => {
            DOMUtils.addEventListener(option, 'click', (e) => this.selectOption(e));
        });

        // Navigation buttons
        const prevBtn = DOMUtils.getElementById('prevQuestionBtn');
        const nextBtn = DOMUtils.getElementById('nextQuestionBtn');
        
        if (prevBtn) {
            DOMUtils.addEventListener(prevBtn, 'click', () => this.previousQuestion());
        }
        
        if (nextBtn) {
            DOMUtils.addEventListener(nextBtn, 'click', () => this.nextQuestion());
        }

        // Question dots
        const questionDots = DOMUtils.querySelectorAll('.question-dot');
        questionDots.forEach((dot, index) => {
            DOMUtils.addEventListener(dot, 'click', () => this.goToQuestion(index));
        });

        // Keyboard navigation
        DOMUtils.addEventListener(document, 'keydown', (e) => {
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                if (optionIndex < this.questions[this.currentQuestionIndex].options.length) {
                    this.selectOptionByIndex(optionIndex);
                }
            }
        });
    }

    /**
     * Handle option selection
     */
    selectOption(e) {
        const optionIndex = parseInt(e.currentTarget.dataset.optionIndex);
        this.selectOptionByIndex(optionIndex);
    }

    /**
     * Select option by index
     */
    selectOptionByIndex(optionIndex) {
        // Clear previous selections
        const options = DOMUtils.querySelectorAll('.option-item');
        options.forEach(opt => opt.classList.remove('selected'));

        // Select current option
        const selectedOption = DOMUtils.querySelector(`[data-option-index="${optionIndex}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // Store answer
        this.answers[this.currentQuestionIndex] = optionIndex;

        // Enable next button
        const nextBtn = DOMUtils.getElementById('nextQuestionBtn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }

        // Show feedback
        this.showAnswerFeedback(optionIndex);

        Utils.log(`Selected option ${optionIndex + 1} for question ${this.currentQuestionIndex + 1}`);
    }

    /**
     * Show answer feedback
     */
    showAnswerFeedback(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        const feedbackElement = DOMUtils.getElementById('answerFeedback');
        const feedbackIcon = DOMUtils.querySelector('.feedback-icon');
        const feedbackTitle = DOMUtils.querySelector('.feedback-title');
        const feedbackExplanation = DOMUtils.querySelector('.feedback-explanation');

        if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            feedbackTitle.textContent = 'Correct!';
            feedbackElement.classList.add('correct');
            feedbackElement.classList.remove('incorrect');
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            feedbackTitle.textContent = 'Not quite right';
            feedbackElement.classList.add('incorrect');
            feedbackElement.classList.remove('correct');
        }

        feedbackExplanation.textContent = question.explanation;
        feedbackElement.style.display = 'block';
        
        UIController.animateIn(feedbackElement, 'fadeInUp');
    }

    /**
     * Navigate to previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.render();
            this.setupEventHandlers();
            this.restoreAnswer();
        }
    }

    /**
     * Navigate to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.render();
            this.setupEventHandlers();
            this.restoreAnswer();
        } else {
            this.completeQuiz();
        }
    }

    /**
     * Go to specific question
     */
    goToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.currentQuestionIndex = questionIndex;
            this.render();
            this.setupEventHandlers();
            this.restoreAnswer();
        }
    }

    /**
     * Restore previously selected answer
     */
    restoreAnswer() {
        const savedAnswer = this.answers[this.currentQuestionIndex];
        if (savedAnswer !== undefined) {
            this.selectOptionByIndex(savedAnswer);
        }
    }

    /**
     * Complete the quiz
     */
    completeQuiz() {
        // Calculate final score
        this.score = 0;
        this.answers.forEach((answer, index) => {
            if (answer === this.questions[index].correctAnswer) {
                this.score++;
            }
        });

        this.quizCompleted = true;
        this.renderResults();
        
        Utils.log(`Quiz completed! Final score: ${this.score}/${this.questions.length}`);
    }

    /**
     * Render quiz results
     */
    renderResults() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) return;

        const percentage = Math.round((this.score / this.questions.length) * 100);
        let performanceLevel = '';
        let performanceColor = '';
        let performanceIcon = '';

        if (percentage >= 90) {
            performanceLevel = 'Excellent!';
            performanceColor = '#059669';
            performanceIcon = 'fas fa-trophy';
        } else if (percentage >= 80) {
            performanceLevel = 'Great Job!';
            performanceColor = '#0891b2';
            performanceIcon = 'fas fa-medal';
        } else if (percentage >= 70) {
            performanceLevel = 'Good Work!';
            performanceColor = '#ca8a04';
            performanceIcon = 'fas fa-thumbs-up';
        } else {
            performanceLevel = 'Keep Learning!';
            performanceColor = '#dc2626';
            performanceIcon = 'fas fa-book';
        }

        const html = `
            <div class="quiz-results">
                <div class="results-header">
                    <div class="results-icon" style="color: ${performanceColor}">
                        <i class="${performanceIcon}"></i>
                    </div>
                    <h2>Quiz Complete!</h2>
                    <p class="performance-level" style="color: ${performanceColor}">${performanceLevel}</p>
                </div>

                <div class="score-summary">
                    <div class="score-circle">
                        <div class="score-text">
                            <span class="score-number">${this.score}</span>
                            <span class="score-total">/ ${this.questions.length}</span>
                        </div>
                        <div class="score-percentage">${percentage}%</div>
                    </div>
                </div>

                <div class="results-breakdown">
                    <h3>Question Breakdown</h3>
                    <div class="questions-review">
                        ${this.renderQuestionReview()}
                    </div>
                </div>

                <div class="results-actions">
                    <button class="quiz-btn secondary" onclick="window.location.reload()">
                        <i class="fas fa-redo"></i>
                        Retake Quiz
                    </button>
                    <button class="quiz-btn primary" onclick="pageController.nextPage()">
                        Continue to Summary
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        DOMUtils.setContent(container, html, true);
        UIController.animateIn(container, 'fadeInUp');
    }

    /**
     * Render question review
     */
    renderQuestionReview() {
        return this.questions.map((question, index) => {
            const userAnswer = this.answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return `
                <div class="question-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-header">
                        <span class="question-number">Q${index + 1}</span>
                        <div class="review-status">
                            <i class="fas fa-${isCorrect ? 'check' : 'times'}-circle"></i>
                        </div>
                    </div>
                    <div class="review-content">
                        <p class="review-question">${question.question}</p>
                        <p class="review-answer">
                            <strong>Your answer:</strong> ${question.options[userAnswer]}
                            ${!isCorrect ? `<br><strong>Correct answer:</strong> ${question.options[question.correctAnswer]}` : ''}
                        </p>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Reset quiz
     */
    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizCompleted = false;
        
        if (this.initialized) {
            this.render();
            this.setupEventHandlers();
        }
    }
}

// Export for global access
window.InteractiveQuiz = InteractiveQuiz;
