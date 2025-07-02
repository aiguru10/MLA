/**
 * MLA Tutorial - Page Controller
 * Manages multi-page navigation within lessons
 * 
 * This controller handles the conversion of single-page lessons into
 * multi-page experiences with previous/next navigation.
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-01
 */

class PageController {
    constructor() {
        this.currentPageIndex = 0;
        this.pages = [];
        this.lessonData = null;
        this.initialized = false;
    }

    /**
     * Initialize the page controller with lesson data
     */
    async init(lessonData) {
        try {
            Utils.log('Initializing Page Controller...');
            
            this.lessonData = lessonData;
            this.setupPages();
            this.renderCurrentPage();
            this.setupNavigation();
            
            this.initialized = true;
            Utils.log('Page Controller initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Page Controller:', error);
            throw error;
        }
    }

    /**
     * Setup the page structure for Task 1.1
     */
    setupPages() {
        this.pages = [
            {
                id: 'learning-objectives',
                title: 'Learning Objectives',
                type: 'content',
                content: this.getLearningObjectivesContent()
            },
            {
                id: 'storage-overview',
                title: 'AWS Storage Services Overview',
                type: 'content',
                content: this.getStorageOverviewContent()
            },
            {
                id: 'interactive-analysis',
                title: 'Interactive Service Analysis',
                type: 'interactive',
                component: 'service-analysis'
            },
            {
                id: 'puzzle-game',
                title: 'Interactive Puzzle: Drag & Drop Challenge',
                type: 'interactive',
                component: 'puzzle-game'
            },
            {
                id: 'knowledge-quiz',
                title: 'Knowledge Check Quiz',
                type: 'interactive',
                component: 'quiz'
            },
            {
                id: 'lesson-summary',
                title: 'Lesson Summary',
                type: 'content',
                content: this.getLessonSummaryContent()
            }
        ];

        Utils.log(`Setup ${this.pages.length} pages for navigation`);
    }

    /**
     * Render the current page
     */
    async renderCurrentPage() {
        const page = this.pages[this.currentPageIndex];
        if (!page) return;

        Utils.log(`Rendering page: ${page.title} (${this.currentPageIndex + 1}/${this.pages.length})`);

        // Update page header
        this.updatePageHeader(page);

        // Render page content
        await this.renderPageContent(page);

        // Update navigation buttons
        this.updateNavigationButtons();

        // Update progress indicator
        this.updateProgressIndicator();
    }

    /**
     * Update the page header
     */
    updatePageHeader(page) {
        const headerContainer = DOMUtils.getElementById('pageHeader');
        if (!headerContainer) return;

        const headerHTML = `
            <div class="page-header">
                <div class="page-breadcrumb">
                    <span class="breadcrumb-item">Topic 1: Data Collection</span>
                    <i class="fas fa-chevron-right breadcrumb-separator"></i>
                    <span class="breadcrumb-item">Task 1.1: Extracting Data from AWS Storage</span>
                </div>
                <h1 class="page-title">${page.title}</h1>
                <div class="page-progress">
                    <span class="progress-text">Page ${this.currentPageIndex + 1} of ${this.pages.length}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentPageIndex + 1) / this.pages.length) * 100}%"></div>
                    </div>
                </div>
            </div>
        `;

        DOMUtils.setContent(headerContainer, headerHTML, true);
    }

    /**
     * Render page content based on type
     */
    async renderPageContent(page) {
        const contentContainer = DOMUtils.getElementById('pageContent');
        if (!contentContainer) return;

        // Clear previous content
        DOMUtils.setContent(contentContainer, '', false);

        if (page.type === 'content') {
            // Render static content
            DOMUtils.setContent(contentContainer, page.content, true);
        } else if (page.type === 'interactive') {
            // Render interactive component
            await this.renderInteractiveComponent(page, contentContainer);
        }

        // Animate content in
        UIController.animateIn(contentContainer, 'fadeInUp');
    }

    /**
     * Render interactive components
     */
    async renderInteractiveComponent(page, container) {
        switch (page.component) {
            case 'service-analysis':
                const analysisHTML = `
                    <div class="interactive-container">
                        <div class="interactive-header">
                            <h2>🔍 Interactive Service Analysis</h2>
                            <p>Explore AWS storage services in detail. Use the navigation buttons to move between different services and learn about their features, use cases, and pricing.</p>
                        </div>
                        <div id="serviceAnalysisContainer" class="service-analysis-container">
                            <!-- Service Analysis will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, analysisHTML, true);
                
                // Initialize Interactive Service Analysis
                if (window.InteractiveServiceAnalysis) {
                    try {
                        const serviceAnalysis = new InteractiveServiceAnalysis();
                        await serviceAnalysis.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Interactive Service Analysis:', error);
                        this.renderFallbackContent(container, 'Interactive Service Analysis', 'This interactive component is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Interactive Service Analysis', 'Click through different AWS storage services to explore their features, pricing models, and ideal use cases for machine learning projects.');
                }
                break;

            case 'puzzle-game':
                const puzzleHTML = `
                    <div class="interactive-container">
                        <div class="interactive-header">
                            <h2>🧩 Drag & Drop Challenge</h2>
                            <p>Test your knowledge by matching AWS storage services with their ideal use cases. Drag services from the left panel and drop them onto the correct use cases on the right.</p>
                        </div>
                        <div id="puzzleGameContainer" class="puzzle-game-container">
                            <!-- Puzzle Game will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, puzzleHTML, true);
                
                // Initialize Interactive Puzzle
                if (window.InteractivePuzzle) {
                    try {
                        const puzzle = new InteractivePuzzle();
                        await puzzle.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Interactive Puzzle:', error);
                        this.renderFallbackContent(container, 'Interactive Puzzle', 'This drag-and-drop challenge is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Interactive Puzzle Challenge', 'Drag and drop AWS storage services to match them with their ideal use cases and characteristics.');
                }
                break;

            case 'quiz':
                const quizHTML = `
                    <div class="interactive-container">
                        <div class="interactive-header">
                            <h2>❓ Knowledge Check Quiz</h2>
                            <p>Test your understanding of AWS storage services with 8 comprehensive questions. Each question includes detailed explanations to reinforce your learning.</p>
                        </div>
                        <div id="quizContainer" class="quiz-container">
                            <!-- Quiz will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, quizHTML, true);
                
                // Initialize Interactive Quiz
                if (window.InteractiveQuiz) {
                    try {
                        const quiz = new InteractiveQuiz();
                        await quiz.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Interactive Quiz:', error);
                        this.renderFallbackContent(container, 'Knowledge Quiz', 'This assessment is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Knowledge Check Quiz', 'Answer questions about AWS storage services to test your understanding and reinforce your learning.');
                }
                break;

            default:
                this.renderFallbackContent(container, 'Interactive Component', 'This interactive component is not yet available.');
        }
    }

    /**
     * Render fallback content when interactive components aren't available
     */
    renderFallbackContent(container, title, description) {
        const fallbackHTML = `
            <div class="interactive-container">
                <div class="interactive-header">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
                <div class="fallback-content">
                    <div class="fallback-card">
                        <div class="fallback-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <h3>Interactive Component Loading</h3>
                        <p>This interactive component is being prepared to provide you with hands-on learning experience.</p>
                        <div class="fallback-features">
                            <div class="feature-item">
                                <i class="fas fa-check"></i>
                                <span>Interactive Learning</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-check"></i>
                                <span>Hands-on Practice</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-check"></i>
                                <span>Real-time Feedback</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="pageController.nextPage()">
                            Continue to Next Section
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        DOMUtils.setContent(container, fallbackHTML, true);
    }

    /**
     * Setup navigation event handlers
     */
    setupNavigation() {
        // Previous button
        const prevBtn = DOMUtils.getElementById('prevPageBtn');
        if (prevBtn) {
            DOMUtils.addEventListener(prevBtn, 'click', () => this.previousPage());
        }

        // Next button
        const nextBtn = DOMUtils.getElementById('nextPageBtn');
        if (nextBtn) {
            DOMUtils.addEventListener(nextBtn, 'click', () => this.nextPage());
        }

        // Progress dots
        const progressDots = DOMUtils.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            DOMUtils.addEventListener(dot, 'click', () => this.goToPage(index));
        });

        // Keyboard navigation
        DOMUtils.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'ArrowLeft' && e.ctrlKey) {
                e.preventDefault();
                this.previousPage();
            } else if (e.key === 'ArrowRight' && e.ctrlKey) {
                e.preventDefault();
                this.nextPage();
            }
        });
    }

    /**
     * Navigate to previous page
     */
    async previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            await this.renderCurrentPage();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            Utils.log(`Navigated to previous page: ${this.pages[this.currentPageIndex].title}`);
        }
    }

    /**
     * Navigate to next page
     */
    async nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
            await this.renderCurrentPage();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            Utils.log(`Navigated to next page: ${this.pages[this.currentPageIndex].title}`);
        }
    }

    /**
     * Update navigation buttons state
     */
    updateNavigationButtons() {
        const prevBtn = DOMUtils.getElementById('prevPageBtn');
        const nextBtn = DOMUtils.getElementById('nextPageBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentPageIndex === 0;
            prevBtn.style.opacity = this.currentPageIndex === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            const isLastPage = this.currentPageIndex === this.pages.length - 1;
            nextBtn.disabled = isLastPage;
            nextBtn.style.opacity = isLastPage ? '0.5' : '1';
            nextBtn.textContent = isLastPage ? 'Complete Lesson' : 'Next';
        }
    }

    /**
     * Update progress indicator
     */
    updateProgressIndicator() {
        const progressDots = DOMUtils.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            if (index === this.currentPageIndex) {
                dot.classList.add('current');
                dot.classList.remove('completed');
            } else if (index < this.currentPageIndex) {
                dot.classList.add('completed');
                dot.classList.remove('current');
            } else {
                dot.classList.remove('current', 'completed');
            }
        });
    }

    /**
     * Jump to specific page
     */
    async goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.pages.length) {
            this.currentPageIndex = pageIndex;
            await this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Get Learning Objectives content
     */
    getLearningObjectivesContent() {
        return `
            <div class="content-section">
                <div class="objectives-container">
                    <div class="objectives-intro">
                        <p class="intro-text">By the end of this lesson, you will be able to:</p>
                    </div>
                    
                    <div class="objectives-list">
                        <div class="objective-item">
                            <div class="objective-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <div class="objective-content">
                                <h3>Identify AWS Storage Services</h3>
                                <p>Understand the different AWS storage services and their primary use cases for machine learning projects.</p>
                            </div>
                        </div>
                        
                        <div class="objective-item">
                            <div class="objective-icon">
                                <i class="fas fa-download"></i>
                            </div>
                            <div class="objective-content">
                                <h3>Extract Data Efficiently</h3>
                                <p>Learn best practices for extracting data from various AWS storage services for ML workflows.</p>
                            </div>
                        </div>
                        
                        <div class="objective-item">
                            <div class="objective-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <div class="objective-content">
                                <h3>Choose Appropriate Tools</h3>
                                <p>Select the right AWS tools and services for different data extraction scenarios.</p>
                            </div>
                        </div>
                        
                        <div class="objective-item">
                            <div class="objective-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="objective-content">
                                <h3>Implement Security Best Practices</h3>
                                <p>Apply security measures when accessing and extracting data from AWS storage services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get Storage Overview content
     */
    getStorageOverviewContent() {
        return `
            <div class="content-section">
                <div class="overview-container">
                    <div class="overview-intro">
                        <p class="intro-text">AWS provides several storage services, each optimized for different use cases in machine learning workflows.</p>
                    </div>
                    
                    <div class="storage-services-grid">
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fab fa-aws"></i>
                            </div>
                            <h3>Amazon S3</h3>
                            <p>Object storage service ideal for storing large datasets, model artifacts, and backup data.</p>
                            <div class="service-features">
                                <span class="feature-tag">Scalable</span>
                                <span class="feature-tag">Durable</span>
                                <span class="feature-tag">Cost-effective</span>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <h3>Amazon EBS</h3>
                            <p>Block storage for EC2 instances, perfect for high-performance computing and database workloads.</p>
                            <div class="service-features">
                                <span class="feature-tag">High IOPS</span>
                                <span class="feature-tag">Persistent</span>
                                <span class="feature-tag">Encrypted</span>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fas fa-hdd"></i>
                            </div>
                            <h3>Amazon EFS</h3>
                            <p>Managed file system that can be mounted on multiple EC2 instances simultaneously.</p>
                            <div class="service-features">
                                <span class="feature-tag">Shared</span>
                                <span class="feature-tag">Elastic</span>
                                <span class="feature-tag">POSIX</span>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fas fa-archive"></i>
                            </div>
                            <h3>Amazon Glacier</h3>
                            <p>Long-term archival storage for infrequently accessed data with very low costs.</p>
                            <div class="service-features">
                                <span class="feature-tag">Archive</span>
                                <span class="feature-tag">Low-cost</span>
                                <span class="feature-tag">Secure</span>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">
                                <i class="fas fa-memory"></i>
                            </div>
                            <h3>Amazon FSx</h3>
                            <p>High-performance file systems for compute-intensive workloads like machine learning training.</p>
                            <div class="service-features">
                                <span class="feature-tag">High-performance</span>
                                <span class="feature-tag">Lustre</span>
                                <span class="feature-tag">ML-optimized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get Lesson Summary content
     */
    getLessonSummaryContent() {
        return `
            <div class="content-section">
                <div class="summary-container">
                    <div class="summary-intro">
                        <h2>🎉 Congratulations!</h2>
                        <p class="intro-text">You have successfully completed Task 1.1: Extracting Data from AWS Storage.</p>
                    </div>
                    
                    <div class="summary-achievements">
                        <h3>What You've Learned</h3>
                        <div class="achievement-list">
                            <div class="achievement-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Identified key AWS storage services for ML projects</span>
                            </div>
                            <div class="achievement-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Analyzed service characteristics through interactive exploration</span>
                            </div>
                            <div class="achievement-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Practiced service matching through hands-on puzzle solving</span>
                            </div>
                            <div class="achievement-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Validated knowledge through comprehensive quiz assessment</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-next-steps">
                        <h3>Next Steps</h3>
                        <p>Ready to continue your ML journey? The next task will cover data preprocessing and transformation techniques.</p>
                        
                        <div class="next-actions">
                            <button class="btn btn-primary" onclick="PageController.goToNextTask()">
                                <i class="fas fa-arrow-right"></i>
                                Continue to Task 1.2
                            </button>
                            <button class="btn btn-secondary" onclick="PageController.reviewLesson()">
                                <i class="fas fa-redo"></i>
                                Review This Lesson
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Navigate to next task (placeholder)
     */
    static goToNextTask() {
        Utils.log('Navigating to next task...');
        // This would integrate with the main navigation system
        alert('Next task coming soon!');
    }

    /**
     * Review current lesson
     */
    static reviewLesson() {
        if (window.pageController) {
            window.pageController.currentPageIndex = 0;
            window.pageController.renderCurrentPage();
        }
    }
}

// Export for global access
window.PageController = PageController;
