/**
 * Task 1.1 Specific Quiz Component
 * Extracting Data from AWS Storage Services
 * Based on the official Task 1.1 assessment questions
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-02
 */

class Task11Quiz {
    constructor() {
        this.containerId = 'task11QuizContainer';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizCompleted = false;
        this.initialized = false;
        this.questions = [];
    }

    /**
     * Initialize the Task 1.1 Quiz
     */
    async init() {
        try {
            Utils.log('Initializing Task 1.1 Quiz...');
            
            this.setupQuestions();
            this.render();
            this.setupEventHandlers();
            
            this.initialized = true;
            Utils.log('Task 1.1 Quiz initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Task 1.1 Quiz:', error);
            throw error;
        }
    }

    /**
     * Setup Task 1.1 specific quiz questions
     * These questions are directly from the Task 1.1 PDF assessment
     */
    setupQuestions() {
        this.questions = [
            {
                id: 1,
                question: "Which service is best for storing large CSV datasets for training?",
                options: [
                    "Amazon DynamoDB",
                    "Amazon EFS", 
                    "Amazon S3",
                    "Amazon RDS"
                ],
                correctAnswer: 2,
                explanation: "Amazon S3 is the ideal choice for storing large CSV datasets for ML training. It provides virtually unlimited storage capacity, high durability (99.999999999%), and seamless integration with ML services like SageMaker. S3 is specifically designed for object storage and can handle files of any size, making it perfect for training datasets.",
                category: "Storage Selection"
            },
            {
                id: 2,
                question: "You want to speed up large S3 file downloads globally. What should you use?",
                options: [
                    "EFS Performance Mode",
                    "S3 Transfer Acceleration",
                    "CloudFront",
                    "DynamoDB Accelerator"
                ],
                correctAnswer: 1,
                explanation: "S3 Transfer Acceleration uses Amazon CloudFront's globally distributed edge locations to accelerate uploads and downloads to S3. It can speed up transfers by up to 50-500% for large files being accessed from distant geographic locations.",
                category: "Performance Optimization"
            },
            {
                id: 3,
                question: "Which service is best for app-level real-time reads/writes?",
                options: [
                    "S3",
                    "RDS",
                    "EBS", 
                    "DynamoDB"
                ],
                correctAnswer: 3,
                explanation: "Amazon DynamoDB is designed for real-time applications requiring single-digit millisecond latency. It automatically scales to handle millions of requests per second and is perfect for app-level data that needs immediate read/write access, such as user sessions, gaming leaderboards, or IoT data.",
                category: "Real-time Performance"
            },
            {
                id: 4,
                question: "What's a downside of EBS?",
                options: [
                    "Slow performance",
                    "Cannot be shared between EC2 instances",
                    "Only supports JSON",
                    "Expensive for small files"
                ],
                correctAnswer: 1,
                explanation: "Amazon EBS volumes can only be attached to one EC2 instance at a time. This is a key limitation when you need shared storage across multiple instances. For shared access, you would need Amazon EFS (Elastic File System) instead.",
                category: "Storage Limitations"
            },
            {
                id: 5,
                question: "You need SQL queries for structured tabular data. Which service do you choose?",
                options: [
                    "EFS",
                    "S3",
                    "RDS",
                    "DynamoDB"
                ],
                correctAnswer: 2,
                explanation: "Amazon RDS (Relational Database Service) is the managed SQL database service that supports popular engines like MySQL, PostgreSQL, Oracle, and SQL Server. It's perfect for structured tabular data that requires complex queries, joins, and ACID compliance.",
                category: "Database Selection"
            },
            {
                id: 6,
                question: "Which feature allows EBS to guarantee fast input/output?",
                options: [
                    "Transfer Acceleration",
                    "Performance Boost",
                    "Provisioned IOPS",
                    "Fast Read Mode"
                ],
                correctAnswer: 2,
                explanation: "EBS Provisioned IOPS (io1 and io2 volume types) allows you to specify and guarantee a certain level of IOPS performance. You can provision up to 64,000 IOPS per volume, ensuring consistent and predictable performance for I/O-intensive applications.",
                category: "Performance Features"
            },
            {
                id: 7,
                question: "What is a common use for Amazon EFS?",
                options: [
                    "Attach to one EC2 instance",
                    "Share files across many EC2s",
                    "Store secrets",
                    "Run SQL queries"
                ],
                correctAnswer: 1,
                explanation: "Amazon EFS (Elastic File System) is a shared, scalable file system that can be mounted on multiple EC2 instances simultaneously. This makes it ideal for distributed applications, content repositories, web serving, and data analytics where multiple instances need concurrent access to the same files.",
                category: "Shared Storage"
            },
            {
                id: 8,
                question: "What is a limitation of DynamoDB?",
                options: [
                    "Doesn't scale",
                    "Not low-latency",
                    "Doesn't support large binary objects well",
                    "Requires SQL"
                ],
                correctAnswer: 2,
                explanation: "DynamoDB has a 400KB item size limit, making it unsuitable for storing large binary objects like images, videos, or large documents. For large objects, it's better to store them in S3 and keep only the S3 reference/URL in DynamoDB.",
                category: "Service Limitations"
            },
            {
                id: 9,
                question: "You're training a model on EC2 and need fast read/write — which storage?",
                options: [
                    "S3",
                    "DynamoDB",
                    "EBS",
                    "FSx"
                ],
                correctAnswer: 2,
                explanation: "Amazon EBS provides high-performance block storage that's directly attached to EC2 instances. For ML model training, EBS offers the low latency and high IOPS needed for fast read/write operations during training iterations. EBS gp3 and io2 volumes are particularly well-suited for ML workloads.",
                category: "ML Training Storage"
            },
            {
                id: 10,
                question: "What is Amazon S3 best known for?",
                options: [
                    "SQL analytics",
                    "NoSQL caching",
                    "Block storage",
                    "Object storage"
                ],
                correctAnswer: 3,
                explanation: "Amazon S3 is primarily an object storage service. It stores files as objects in buckets and is designed for storing and retrieving any amount of data from anywhere. Unlike block storage (EBS) or file storage (EFS), S3 uses a simple web interface and REST API for access.",
                category: "Storage Types"
            }
        ];

        Utils.log(`Setup Task 1.1 quiz with ${this.questions.length} questions`);
    }

    /**
     * Render the quiz interface
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Task 1.1 Quiz container not found');
            return;
        }

        if (this.quizCompleted) {
            this.renderResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        const html = `
            <div class="task11-quiz-wrapper">
                <!-- Quiz Header -->
                <div class="quiz-header">
                    <div class="quiz-title">
                        <h2>📘 Task 1.1: Extracting Data from Storage</h2>
                        <p class="quiz-subtitle">Test your knowledge of AWS storage services for ML data extraction</p>
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

        feedbackIcon.textContent = isCorrect ? '✅' : '❌';
        feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect';
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
            performanceLevel = 'Excellent';
            performanceColor = '#10B981';
            performanceIcon = '🏆';
        } else if (percentage >= 80) {
            performanceLevel = 'Good';
            performanceColor = '#3B82F6';
            performanceIcon = '👍';
        } else if (percentage >= 70) {
            performanceLevel = 'Fair';
            performanceColor = '#F59E0B';
            performanceIcon = '📚';
        } else {
            performanceLevel = 'Needs Improvement';
            performanceColor = '#EF4444';
            performanceIcon = '📖';
        }

        const html = `
            <div class="quiz-results">
                <div class="results-header">
                    <div class="results-icon">${performanceIcon}</div>
                    <h2>Task 1.1 Quiz Complete!</h2>
                    <p class="results-subtitle">Extracting Data from AWS Storage Services</p>
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
                    <button class="btn btn-secondary" onclick="this.reviewAnswers()">
                        📋 Review Answers
                    </button>
                    <button class="btn btn-success" onclick="pageController.nextPage()">
                        ✅ Continue to Next Topic
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
                    <p>🎉 Outstanding performance! You have a solid understanding of AWS storage services for ML data extraction.</p>
                    <ul>
                        <li>Consider exploring advanced topics like S3 Transfer Acceleration optimization</li>
                        <li>Learn about cross-region replication strategies for ML datasets</li>
                        <li>Explore AWS DataSync for hybrid cloud data movement</li>
                    </ul>
                </div>
            `;
        } else if (percentage >= 70) {
            return `
                <div class="recommendation good">
                    <p>👍 Good job! You understand the basics. Focus on these areas for improvement:</p>
                    <ul>
                        <li>Review the differences between EBS, EFS, and S3 use cases</li>
                        <li>Study DynamoDB limitations and when to use it vs RDS</li>
                        <li>Practice identifying the right storage service for specific ML scenarios</li>
                    </ul>
                </div>
            `;
        } else {
            return `
                <div class="recommendation needs-work">
                    <p>📚 Keep studying! Here are key areas to focus on:</p>
                    <ul>
                        <li>Review the AWS Storage Services Overview section</li>
                        <li>Practice with the Interactive Service Analysis tool</li>
                        <li>Study the pros and cons of each storage service</li>
                        <li>Focus on understanding when to use each service type</li>
                        <li>Review the service comparison table in the learning materials</li>
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
     * Review answers
     */
    reviewAnswers() {
        // Implementation for answer review
        Utils.log('Review answers functionality to be implemented');
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
    module.exports = Task11Quiz;
}
