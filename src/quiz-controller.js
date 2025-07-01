/**
 * Quiz Controller Module
 * Handles the interactive navigable quiz system with immediate feedback
 * 
 * @module QuizController
 * @requires AppState, Utils, DOMUtils, UIController
 */

'use strict';

/**
 * Quiz Controller
 * Manages the interactive quiz functionality with navigation and immediate feedback
 */
const QuizController = {
    // Quiz state
    state: {
        initialized: false,
        quizActive: false,
        currentQuestion: 0,
        totalQuestions: 10,
        answers: {},
        score: 0,
        quizComplete: false
    },
    
    // Quiz configuration
    config: {
        passingScore: 70,
        timeLimit: null, // No time limit for now
        allowReview: true,
        showExplanations: true
    },
    
    // Quiz questions data
    questions: [
        {
            id: 1,
            question: "Which service is best for storing large CSV datasets for training?",
            options: ["Amazon DynamoDB", "Amazon EFS", "Amazon S3", "Amazon RDS"],
            correct: 2,
            explanation: "Amazon S3 is perfect for storing large datasets like CSV files because it's cost-effective, scalable, and designed for any file type."
        },
        {
            id: 2,
            question: "Which service is best for app-level real-time reads/writes?",
            options: ["S3", "RDS", "EBS", "DynamoDB"],
            correct: 3,
            explanation: "DynamoDB provides single-digit millisecond latency, making it ideal for real-time applications like gaming and chat apps."
        },
        {
            id: 3,
            question: "What is a downside of EBS?",
            options: ["Slow performance", "Cannot be shared between EC2 instances", "Only supports JSON", "Expensive for small files"],
            correct: 1,
            explanation: "EBS volumes can only be attached to one EC2 instance at a time, unlike EFS which can be shared across multiple instances."
        },
        {
            id: 4,
            question: "You want to speed up large S3 file downloads globally. What should you use?",
            options: ["EFS Performance Mode", "S3 Transfer Acceleration", "CloudFront", "DynamoDB Accelerator"],
            correct: 1,
            explanation: "S3 Transfer Acceleration uses AWS edge locations to speed up uploads and downloads to S3 buckets globally."
        },
        {
            id: 5,
            question: "Which feature allows EBS to guarantee fast input/output operations?",
            options: ["Transfer Acceleration", "Performance Boost", "Provisioned IOPS", "Fast Read Mode"],
            correct: 2,
            explanation: "Provisioned IOPS allows you to specify and guarantee a certain number of input/output operations per second for your EBS volume."
        },
        {
            id: 6,
            question: "What is Amazon EFS best known for?",
            options: ["Attach to one EC2 instance", "Share files across many EC2s", "Store secrets", "Run SQL queries"],
            correct: 1,
            explanation: "EFS (Elastic File System) is designed to be shared across multiple EC2 instances simultaneously, unlike EBS which is single-attach."
        },
        {
            id: 7,
            question: "Which storage service would you choose for structured customer data with complex relationships?",
            options: ["Amazon S3", "Amazon EFS", "Amazon RDS", "Amazon EBS"],
            correct: 2,
            explanation: "RDS (Relational Database Service) is designed for structured data with relationships and supports SQL queries for complex operations."
        },
        {
            id: 8,
            question: "What type of storage is Amazon DynamoDB?",
            options: ["Block storage", "Object storage", "File storage", "NoSQL database"],
            correct: 3,
            explanation: "DynamoDB is a NoSQL database service that provides fast and flexible document and key-value data models."
        },
        {
            id: 9,
            question: "Which service is most cost-effective for storing large amounts of infrequently accessed data?",
            options: ["Amazon EBS", "Amazon DynamoDB", "Amazon S3", "Amazon EFS"],
            correct: 2,
            explanation: "Amazon S3 offers various storage classes including Infrequent Access and Glacier for cost-effective long-term storage."
        },
        {
            id: 10,
            question: "You need to store temporary model checkpoints during ML training on a single EC2 instance. Which service is best?",
            options: ["Amazon S3", "Amazon EBS", "Amazon RDS", "Amazon DynamoDB"],
            correct: 1,
            explanation: "EBS provides high-performance block storage that's perfect for temporary files during intensive ML training on a single EC2 instance."
        }
    ],
    
    /**
     * Initialize the quiz controller
     */
    init() {
        try {
            Utils.log('Initializing QuizController...');
            
            this.resetQuizState();
            this.state.initialized = true;
            
            Utils.log('QuizController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize QuizController:', error);
        }
    },
    
    /**
     * Start the quiz
     */
    start() {
        try {
            Utils.log('Starting quiz...');
            
            this.resetQuizState();
            this.renderQuiz();
            
            this.state.quizActive = true;
            
            Utils.log('Quiz started successfully');
            
        } catch (error) {
            console.error('Failed to start quiz:', error);
            UIController.showErrorMessage('Failed to start the quiz. Please try again.');
        }
    },
    
    /**
     * Reset quiz state to initial values
     */
    resetQuizState() {
        this.state = {
            ...this.state,
            quizActive: false,
            currentQuestion: 0,
            answers: {},
            score: 0,
            quizComplete: false
        };
    },
    
    /**
     * Render the quiz interface
     */
    renderQuiz() {
        const container = DOMUtils.getElementById('quizContainer');
        if (!container) {
            throw new Error('Quiz container not found');
        }
        
        const quizHTML = this.generateQuizHTML();
        DOMUtils.setContent(container, quizHTML, true);
        
        // Animate quiz entrance
        UIController.animateIn(container, 'slideInUp');
    },
    
    /**
     * Generate the complete quiz HTML
     * @returns {string} Quiz HTML
     */
    generateQuizHTML() {
        return `
            <div class="interactive-quiz">
                <!-- Quiz Header -->
                <header class="quiz-header">
                    <h3><i class="fas fa-brain" aria-hidden="true"></i> Interactive Knowledge Quiz</h3>
                    <p>Test your understanding of AWS storage services with immediate feedback!</p>
                </header>
                
                <!-- Quiz Content Container -->
                <div id="quizContent">
                    ${this.renderCurrentQuestion()}
                </div>
            </div>
        `;
    },
    
    /**
     * Render the current question
     * @returns {string} Current question HTML
     */
    renderCurrentQuestion() {
        const question = this.questions[this.state.currentQuestion];
        const hasAnswered = this.state.answers.hasOwnProperty(this.state.currentQuestion);
        const userAnswer = this.state.answers[this.state.currentQuestion];
        
        return `
            <div class="quiz-question-container">
                <!-- Progress Header -->
                <div class="quiz-progress">
                    <div class="progress-info">
                        <span class="question-counter">Question ${this.state.currentQuestion + 1} of ${this.state.totalQuestions}</span>
                        <span class="score-display">Score: ${this.state.score}/${Object.keys(this.state.answers).length}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.state.currentQuestion + 1) / this.state.totalQuestions) * 100}%"></div>
                    </div>
                    <div class="progress-dots">
                        ${this.generateProgressDots()}
                    </div>
                </div>
                
                <!-- Question Content -->
                <div class="question-content">
                    <div class="question-text">
                        <h4>${question.question}</h4>
                    </div>
                    
                    <!-- Answer Options -->
                    <div class="answer-options">
                        ${question.options.map((option, index) => this.generateOptionHTML(option, index, hasAnswered, userAnswer, question.correct)).join('')}
                    </div>
                    
                    <!-- Feedback Section -->
                    ${hasAnswered ? this.generateFeedbackHTML(userAnswer, question) : ''}
                </div>
                
                <!-- Navigation Controls -->
                <div class="quiz-navigation">
                    <button class="btn btn-secondary quiz-prev-btn" 
                            ${this.state.currentQuestion === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left" aria-hidden="true"></i> Previous
                    </button>
                    
                    <div class="nav-info">
                        <span class="current-position">${this.state.currentQuestion + 1} / ${this.state.totalQuestions}</span>
                    </div>
                    
                    <button class="btn btn-primary quiz-next-btn">
                        ${this.state.currentQuestion === this.state.totalQuestions - 1 ? 
                            '<i class="fas fa-flag-checkered" aria-hidden="true"></i> Finish Quiz' : 
                            'Next <i class="fas fa-chevron-right" aria-hidden="true"></i>'}
                    </button>
                </div>
            </div>
        `;
    },
    
    /**
     * Generate HTML for an answer option
     * @param {string} option - Option text
     * @param {number} index - Option index
     * @param {boolean} hasAnswered - Whether question has been answered
     * @param {number} userAnswer - User's selected answer
     * @param {number} correctAnswer - Correct answer index
     * @returns {string} Option HTML
     */
    generateOptionHTML(option, index, hasAnswered, userAnswer, correctAnswer) {
        let optionClass = 'answer-option';
        let iconHTML = '';
        
        if (hasAnswered) {
            if (index === correctAnswer) {
                optionClass += ' correct';
                iconHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i>';
            } else if (index === userAnswer && index !== correctAnswer) {
                optionClass += ' incorrect';
                iconHTML = '<i class="fas fa-times-circle" aria-hidden="true"></i>';
            }
        } else if (userAnswer === index) {
            optionClass += ' selected';
        }
        
        const isDisabled = hasAnswered ? 'disabled' : '';
        const clickHandler = hasAnswered ? '' : `data-option-index="${index}"`;
        
        return `
            <button class="${optionClass} quiz-option" 
                    ${clickHandler} 
                    ${isDisabled}
                    aria-label="Option ${String.fromCharCode(65 + index)}: ${option}">
                <div class="option-content">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                    <span class="option-icon">${iconHTML}</span>
                </div>
            </button>
        `;
    },
    
    /**
     * Generate feedback HTML for answered question
     * @param {number} userAnswer - User's answer index
     * @param {Object} question - Question object
     * @returns {string} Feedback HTML
     */
    generateFeedbackHTML(userAnswer, question) {
        const isCorrect = userAnswer === question.correct;
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
        const feedbackTitle = isCorrect ? 'Correct!' : 'Incorrect';
        
        return `
            <div class="answer-feedback ${feedbackClass}">
                <div class="feedback-header">
                    <i class="${feedbackIcon}" aria-hidden="true"></i>
                    <strong>${feedbackTitle}</strong>
                </div>
                <div class="feedback-explanation">
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;
    },
    
    /**
     * Generate progress dots HTML
     * @returns {string} Progress dots HTML
     */
    generateProgressDots() {
        return Array.from({length: this.state.totalQuestions}, (_, i) => {
            let dotClass = 'progress-dot';
            
            if (this.state.answers.hasOwnProperty(i)) {
                const isCorrect = this.state.answers[i] === this.questions[i].correct;
                dotClass += isCorrect ? ' correct' : ' incorrect';
            } else if (i === this.state.currentQuestion) {
                dotClass += ' current';
            }
            
            return `<div class="${dotClass}" data-question="${i}"></div>`;
        }).join('');
    },
    
    /**
     * Select an answer for the current question
     * @param {number} answerIndex - Index of selected answer
     */
    selectAnswer(answerIndex) {
        Utils.log(`selectAnswer called with index: ${answerIndex}`);
        
        if (this.state.answers.hasOwnProperty(this.state.currentQuestion)) {
            Utils.log('Question already answered');
            return;
        }
        
        const question = this.questions[this.state.currentQuestion];
        Utils.log(`Question: ${question.question}`);
        
        // Store the answer
        this.state.answers[this.state.currentQuestion] = answerIndex;
        Utils.log(`Answer stored: question ${this.state.currentQuestion} = option ${answerIndex}`);
        
        // Update score if correct
        if (answerIndex === question.correct) {
            this.state.score++;
            Utils.log('Answer is correct! Score updated.');
        } else {
            Utils.log('Answer is incorrect.');
        }
        
        // Re-render the current question to show feedback
        this.updateQuestionDisplay();
        
        Utils.log(`Answer selected: question ${this.state.currentQuestion + 1}, option ${answerIndex + 1}`);
    },
    
    /**
     * Move to the next question
     */
    nextQuestion() {
        if (this.state.currentQuestion < this.state.totalQuestions - 1) {
            this.state.currentQuestion++;
            this.updateQuestionDisplay();
            
            // Scroll to top of question
            const container = DOMUtils.getElementById('quizContent');
            if (container) {
                UIController.scrollToElement(container);
            }
        }
    },
    
    /**
     * Move to the previous question
     */
    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.updateQuestionDisplay();
            
            // Scroll to top of question
            const container = DOMUtils.getElementById('quizContent');
            if (container) {
                UIController.scrollToElement(container);
            }
        }
    },
    
    /**
     * Update the question display
     */
    updateQuestionDisplay() {
        const container = DOMUtils.getElementById('quizContent');
        if (!container) return;
        
        const questionHTML = this.renderCurrentQuestion();
        Utils.log('Quiz: Generated question HTML length:', questionHTML.length);
        
        // Direct content update without animation conflicts
        DOMUtils.setContent(container, questionHTML, true);
        this.setupQuestionHandlers();
        
        // Original animated version (commented out to fix blank screen issue)
        /*
        UIController.animateOut(container, 'fadeOut', () => {
            DOMUtils.setContent(container, questionHTML, true);
            UIController.animateIn(container, 'fadeIn');
        });
        */
    },
    
    /**
     * Setup question event handlers
     */
    setupQuestionHandlers() {
        Utils.log('Setting up quiz question handlers...');
        
        // Setup answer option click handlers
        const options = DOMUtils.querySelectorAll('.quiz-option');
        Utils.log(`Found ${options.length} quiz options`);
        
        options.forEach((option, index) => {
            if (!option.disabled) {
                Utils.log(`Setting up handler for option ${index}`);
                DOMUtils.addEventListener(option, 'click', () => {
                    const optionIndex = parseInt(option.getAttribute('data-option-index'));
                    Utils.log(`Option clicked: ${optionIndex}`);
                    if (!isNaN(optionIndex)) {
                        this.selectAnswer(optionIndex);
                    }
                });
            }
        });
        
        // Setup navigation button handlers
        const prevBtn = DOMUtils.querySelector('.quiz-prev-btn');
        if (prevBtn && !prevBtn.disabled) {
            Utils.log('Setting up previous button handler');
            DOMUtils.addEventListener(prevBtn, 'click', () => {
                Utils.log('Previous button clicked');
                this.previousQuestion();
            });
        }
        
        const nextBtn = DOMUtils.querySelector('.quiz-next-btn');
        if (nextBtn) {
            Utils.log('Setting up next button handler');
            DOMUtils.addEventListener(nextBtn, 'click', () => {
                Utils.log('Next button clicked');
                if (this.state.currentQuestion === this.state.totalQuestions - 1) {
                    this.finishQuiz();
                } else {
                    this.nextQuestion();
                }
            });
        }
    },
    
    /**
     * Finish the quiz and show results
     */
    finishQuiz() {
        this.state.quizComplete = true;
        this.state.quizActive = false;
        
        // Calculate final results
        const percentage = Math.round((this.state.score / this.state.totalQuestions) * 100);
        
        // Show results
        this.showQuizResults(percentage);
        
        Utils.log(`Quiz completed: ${this.state.score}/${this.state.totalQuestions} correct (${percentage}%)`);
    },
    
    /**
     * Show quiz completion results
     * @param {number} percentage - Success percentage
     */
    showQuizResults(percentage) {
        const container = DOMUtils.getElementById('quizContent');
        if (!container) return;
        
        let grade, message, emoji, bgColor;
        
        if (percentage >= 90) {
            grade = 'Outstanding';
            message = 'Outstanding! You have mastered AWS storage concepts!';
            emoji = '🏆';
            bgColor = '#d4edda';
        } else if (percentage >= 80) {
            grade = 'Excellent';
            message = 'Excellent work! You really understand AWS storage!';
            emoji = '🌟';
            bgColor = '#d4edda';
        } else if (percentage >= 70) {
            grade = 'Good';
            message = 'Good job! Review the missed questions and you\'ll be ready.';
            emoji = '👍';
            bgColor = '#d1ecf1';
        } else if (percentage >= 60) {
            grade = 'Fair';
            message = 'Not bad! Study the concepts you missed and try again.';
            emoji = '📖';
            bgColor = '#d1ecf1';
        } else {
            grade = 'Needs Review';
            message = 'Keep studying! Review the material and try again.';
            emoji = '📚';
            bgColor = '#f8d7da';
        }
        
        const resultsHTML = `
            <div class="quiz-results" style="background: ${bgColor};">
                <div class="results-header">
                    <div class="results-emoji">${emoji}</div>
                    <h3>Quiz Complete!</h3>
                    <div class="results-grade">${grade}</div>
                </div>
                
                <div class="results-stats">
                    <div class="stat-circle">
                        <div class="stat-percentage">${percentage}%</div>
                        <div class="stat-label">Score</div>
                    </div>
                    <div class="stat-details">
                        <div class="stat-item">
                            <span class="stat-number">${this.state.score}</span>
                            <span class="stat-text">Correct</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.state.totalQuestions - this.state.score}</span>
                            <span class="stat-text">Incorrect</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.state.totalQuestions}</span>
                            <span class="stat-text">Total</span>
                        </div>
                    </div>
                </div>
                
                <div class="results-message">
                    <p>${message}</p>
                </div>
                
                <div class="grade-scale">
                    <h4>Grade Scale:</h4>
                    <div class="scale-items">
                        <span>🏆 90-100%: Outstanding</span>
                        <span>🌟 80-89%: Excellent</span>
                        <span>👍 70-79%: Good</span>
                        <span>📖 60-69%: Fair</span>
                        <span>📚 Below 60%: Needs Review</span>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="QuizController.start()">
                        <i class="fas fa-redo" aria-hidden="true"></i> Retake Quiz
                    </button>
                    <button class="btn btn-secondary" onclick="QuizController.reviewAnswers()">
                        <i class="fas fa-eye" aria-hidden="true"></i> Review Answers
                    </button>
                    <button class="btn btn-info" onclick="QuizController.showSummary()">
                        <i class="fas fa-chart-bar" aria-hidden="true"></i> Show Summary
                    </button>
                </div>
            </div>
        `;
        
        DOMUtils.setContent(container, resultsHTML, true);
        UIController.animateIn(container, 'slideInUp');
    },
    
    /**
     * Review answers by going back to first question
     */
    reviewAnswers() {
        this.state.currentQuestion = 0;
        this.updateQuestionDisplay();
        
        UIController.showInfoMessage('Review mode: Navigate through questions to see explanations.');
    },
    
    /**
     * Show detailed quiz summary
     */
    showSummary() {
        const summaryHTML = this.questions.map((question, index) => {
            const userAnswer = this.state.answers[index];
            const isCorrect = userAnswer === question.correct;
            const statusIcon = isCorrect ? 
                '<i class="fas fa-check-circle correct" aria-hidden="true"></i>' : 
                '<i class="fas fa-times-circle incorrect" aria-hidden="true"></i>';
            
            return `
                <div class="summary-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="summary-header">
                        ${statusIcon}
                        <span class="question-number">Q${index + 1}</span>
                        <span class="question-text">${question.question}</span>
                    </div>
                    <div class="summary-details">
                        <div class="answer-comparison">
                            <div class="user-answer">
                                <strong>Your answer:</strong> ${question.options[userAnswer] || 'Not answered'}
                            </div>
                            <div class="correct-answer">
                                <strong>Correct answer:</strong> ${question.options[question.correct]}
                            </div>
                        </div>
                        <div class="explanation">
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        UIController.showModal({
            title: 'Quiz Summary',
            icon: 'fas fa-chart-bar',
            content: `
                <div class="quiz-summary">
                    <div class="summary-stats">
                        <p><strong>Final Score:</strong> ${this.state.score}/${this.state.totalQuestions} 
                        (${Math.round((this.state.score / this.state.totalQuestions) * 100)}%)</p>
                    </div>
                    <div class="summary-questions">
                        ${summaryHTML}
                    </div>
                </div>
            `
        });
    },
    
    /**
     * Get current quiz state
     * @returns {Object} Current quiz state
     */
    getState() {
        return { ...this.state };
    },
    
    /**
     * Reset quiz to initial state
     */
    reset() {
        Utils.log('Resetting quiz...');
        
        this.resetQuizState();
        this.start();
        
        UIController.showInfoMessage('Quiz reset! Start fresh.');
    }
};

// Make QuizController available globally
window.QuizController = QuizController;
