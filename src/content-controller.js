/**
 * Content Controller Module
 * Handles dynamic content loading and management for different course topics
 * 
 * @module ContentController
 * @requires AppState, Utils, DOMUtils, UIController
 */

'use strict';

/**
 * Content Controller
 * Manages dynamic content loading and rendering for course topics
 */
const ContentController = {
    // DOM element references
    elements: {
        contentBody: null,
        breadcrumbText: null
    },
    
    // Content state
    state: {
        initialized: false,
        currentContent: null,
        loading: false
    },
    
    // Content templates and data
    contentData: {
        'task11-topic1': {
            title: 'Extracting Data from AWS Storage',
            subtitle: 'Learn how to gather data from different AWS storage services for your ML projects',
            breadcrumb: 'Domain 1 > Task 1.1 > Topic 1: Extracting Data from AWS Storage',
            type: 'lesson'
        }
    },
    
    /**
     * Initialize the content controller
     */
    init() {
        try {
            Utils.log('Initializing ContentController...');
            
            this.initializeElements();
            this.setupEventListeners();
            
            this.state.initialized = true;
            Utils.log('ContentController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize ContentController:', error);
        }
    },
    
    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.elements = {
            contentBody: DOMUtils.getElementById('contentBody'),
            breadcrumbText: DOMUtils.getElementById('breadcrumbText')
        };
        
        // Validate critical elements
        if (!this.elements.contentBody) {
            throw new Error('Content body element not found');
        }
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for content change requests
        document.addEventListener('contentChangeRequest', (e) => {
            this.loadContent(e.detail.contentId);
        });
    },
    
    /**
     * Load content by ID
     * @param {string} contentId - ID of content to load
     */
    async loadContent(contentId) {
        if (this.state.loading) {
            Utils.log('Content loading already in progress');
            return;
        }
        
        try {
            Utils.log(`Loading content: ${contentId}`);
            
            this.state.loading = true;
            this.state.currentContent = contentId;
            
            // Update app state
            AppState.setState('activeContent', contentId);
            
            // Show loading indicator
            UIController.showLoading(this.elements.contentBody, 'Loading content...');
            
            // Update navigation state
            if (typeof NavigationController !== 'undefined') {
                NavigationController.setActiveLink(contentId);
            }
            
            // Load content based on type
            await this.renderContent(contentId);
            
            // Update breadcrumb
            this.updateBreadcrumb(contentId);
            
            // Close mobile menu if open
            if (Utils.isMobile() && AppState.getState('mobileMenuOpen')) {
                NavigationController.closeMobileSidebar();
            }
            
            Utils.log(`Content loaded successfully: ${contentId}`);
            
        } catch (error) {
            console.error(`Failed to load content: ${contentId}`, error);
            this.showErrorContent(error.message);
        } finally {
            this.state.loading = false;
            UIController.hideLoading(this.elements.contentBody);
        }
    },
    
    /**
     * Render content based on content ID
     * @param {string} contentId - Content ID to render
     */
    async renderContent(contentId) {
        switch (contentId) {
            case 'task11-topic1':
                await this.renderTask11Topic1();
                break;
            default:
                throw new Error(`Unknown content ID: ${contentId}`);
        }
    },
    
    /**
     * Render Task 1.1 Topic 1 content
     */
    async renderTask11Topic1() {
        const content = this.generateTask11Topic1Content();
        DOMUtils.setContent(this.elements.contentBody, content, true);
        
        // Initialize interactive components after content is loaded
        await this.initializeInteractiveComponents();
    },
    
    /**
     * Generate Task 1.1 Topic 1 content HTML
     * @returns {string} HTML content
     */
    generateTask11Topic1Content() {
        return `
            <div class="lesson-container">
                <!-- Lesson Header -->
                <header class="lesson-header">
                    <h1 class="lesson-title">Extracting Data from AWS Storage</h1>
                    <p class="lesson-subtitle">Learn how to gather data from different AWS storage services for your ML projects</p>
                    <div class="hero-image">
                        <i class="fas fa-database" aria-hidden="true"></i>
                    </div>
                </header>
                
                <!-- Learning Objectives -->
                <section class="learning-objectives">
                    <h2><i class="fas fa-bullseye" aria-hidden="true"></i> Learning Objectives</h2>
                    <ul>
                        <li>Understand the 5 main AWS storage services for ML</li>
                        <li>Learn when to use each storage service</li>
                        <li>Practice with interactive exercises</li>
                        <li>Master the pros and cons of each service</li>
                    </ul>
                </section>
                
                <!-- Storage Services Overview -->
                <section class="storage-overview">
                    <h2><i class="fas fa-cloud" aria-hidden="true"></i> AWS Storage Services Overview</h2>
                    <p class="section-intro">
                        Think of AWS storage services like different types of containers for your data. 
                        Each one is designed for specific purposes, just like how you use different containers 
                        in your kitchen for different foods!
                    </p>
                    
                    <div class="storage-grid">
                        ${this.generateStorageServiceCards()}
                    </div>
                </section>
                
                <!-- Interactive Service Analysis -->
                <section class="interactive-section">
                    <header class="section-header">
                        <div class="section-icon">
                            <i class="fas fa-balance-scale" aria-hidden="true"></i>
                        </div>
                        <h2 class="section-title">Interactive Service Analysis</h2>
                    </header>
                    <div class="section-content">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 48px; margin-bottom: 10px;">⚖️</div>
                            <p style="font-size: 18px; color: #666;">Understanding the strengths and limitations of each AWS storage service</p>
                        </div>
                        
                        <div id="serviceAnalysisContainer">
                            <div style="text-align: center; padding: 40px;">
                                <button class="btn btn-primary start-service-analysis" style="font-size: 18px; padding: 15px 30px;">
                                    <i class="fas fa-play" aria-hidden="true"></i> Start Service Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Interactive Puzzle Game -->
                <section class="interactive-section">
                    <header class="section-header">
                        <div class="section-icon">
                            <i class="fas fa-gamepad" aria-hidden="true"></i>
                        </div>
                        <h2 class="section-title">Interactive Puzzle: Drag & Drop Challenge</h2>
                    </header>
                    <div class="section-content">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🧩</div>
                            <p style="font-size: 18px; color: #666;">Match the use cases with the correct AWS storage services</p>
                        </div>
                        
                        <div id="puzzleGameContainer">
                            <div style="text-align: center; padding: 40px;">
                                <button class="btn btn-primary start-puzzle-game" style="font-size: 18px; padding: 15px 30px;">
                                    <i class="fas fa-play" aria-hidden="true"></i> Start Puzzle Game
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Knowledge Check Quiz -->
                <section class="interactive-section">
                    <header class="section-header">
                        <div class="section-icon">
                            <i class="fas fa-clipboard-check" aria-hidden="true"></i>
                        </div>
                        <h2 class="section-title">Knowledge Check Quiz</h2>
                    </header>
                    <div class="section-content">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🧠</div>
                            <p style="font-size: 18px; color: #666;">Test your understanding with our interactive quiz</p>
                        </div>
                        
                        <div id="quizContainer">
                            <div style="text-align: center; padding: 40px;">
                                <button class="btn btn-primary start-quiz" style="font-size: 18px; padding: 15px 30px;">
                                    <i class="fas fa-play" aria-hidden="true"></i> Start Interactive Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Summary and Next Steps -->
                <section class="lesson-summary">
                    <h2><i class="fas fa-flag-checkered" aria-hidden="true"></i> Lesson Summary</h2>
                    <div class="summary-content">
                        <p>Congratulations! You've learned about the 5 main AWS storage services:</p>
                        <ul>
                            <li><strong>Amazon S3</strong> - Object storage for files and datasets</li>
                            <li><strong>Amazon EBS</strong> - High-performance block storage</li>
                            <li><strong>Amazon EFS</strong> - Shared file system</li>
                            <li><strong>Amazon RDS</strong> - Managed SQL databases</li>
                            <li><strong>Amazon DynamoDB</strong> - Fast NoSQL database</li>
                        </ul>
                        
                        <div class="next-steps">
                            <h3>Next Steps</h3>
                            <p>Ready to continue your AWS ML journey? The next topics will cover:</p>
                            <ul>
                                <li>Data formats and preprocessing</li>
                                <li>SageMaker data ingestion</li>
                                <li>Data transformation techniques</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },
    
    /**
     * Generate storage service cards HTML
     * @returns {string} HTML for storage service cards
     */
    generateStorageServiceCards() {
        const services = [
            {
                id: 's3',
                name: 'Amazon S3',
                icon: 'fas fa-archive',
                description: 'Object Storage Warehouse',
                analogy: 'Like a huge digital warehouse where you can store any type of file',
                color: '#ff9500'
            },
            {
                id: 'ebs',
                name: 'Amazon EBS',
                icon: 'fas fa-hdd',
                description: 'High-Speed Block Storage',
                analogy: 'Like a super-fast hard drive attached to your computer',
                color: '#2196f3'
            },
            {
                id: 'efs',
                name: 'Amazon EFS',
                icon: 'fas fa-folder-open',
                description: 'Shared File System',
                analogy: 'Like a shared folder that multiple computers can access',
                color: '#4caf50'
            },
            {
                id: 'rds',
                name: 'Amazon RDS',
                icon: 'fas fa-table',
                description: 'Managed SQL Database',
                analogy: 'Like a smart filing cabinet that organizes data in tables',
                color: '#e91e63'
            },
            {
                id: 'dynamodb',
                name: 'Amazon DynamoDB',
                icon: 'fas fa-sticky-note',
                description: 'Lightning-Fast NoSQL',
                analogy: 'Like super-fast sticky notes that can handle millions of requests',
                color: '#9c27b0'
            }
        ];
        
        return services.map(service => `
            <div class="storage-card" data-service="${service.id}">
                <div class="card-header" style="background: ${service.color};">
                    <i class="${service.icon}" aria-hidden="true"></i>
                </div>
                <div class="card-content">
                    <h3>${service.name}</h3>
                    <p class="card-description">${service.description}</p>
                    <p class="card-analogy">${service.analogy}</p>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Initialize interactive components after content load
     */
    async initializeInteractiveComponents() {
        // Wait a bit for all modules to be loaded
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Initialize service analysis if available
        if (typeof ServiceAnalysisController !== 'undefined') {
            ServiceAnalysisController.init();
        } else {
            Utils.log('ServiceAnalysisController not available');
        }
        
        // Initialize puzzle game if available
        if (typeof PuzzleGameController !== 'undefined') {
            PuzzleGameController.init();
        } else {
            Utils.log('PuzzleGameController not available');
        }
        
        // Initialize quiz if available
        if (typeof QuizController !== 'undefined') {
            QuizController.init();
        } else {
            Utils.log('QuizController not available');
        }
        
        // Add hover effects to storage cards
        this.initializeStorageCards();
        
        // Set up button click handlers with error handling
        this.setupInteractiveButtons();
    },
    
    /**
     * Setup interactive button handlers with error checking
     */
    setupInteractiveButtons() {
        // Service Analysis button
        const serviceAnalysisBtn = DOMUtils.querySelector('.start-service-analysis');
        if (serviceAnalysisBtn) {
            DOMUtils.addEventListener(serviceAnalysisBtn, 'click', () => {
                this.startServiceAnalysis();
            });
        }
        
        // Puzzle Game button
        const puzzleGameBtn = DOMUtils.querySelector('.start-puzzle-game');
        if (puzzleGameBtn) {
            DOMUtils.addEventListener(puzzleGameBtn, 'click', () => {
                this.startPuzzleGame();
            });
        }
        
        // Quiz button
        const quizBtn = DOMUtils.querySelector('.start-quiz');
        if (quizBtn) {
            DOMUtils.addEventListener(quizBtn, 'click', () => {
                this.startQuiz();
            });
        }
    },
    
    /**
     * Start service analysis with error handling
     */
    startServiceAnalysis() {
        try {
            if (typeof ServiceAnalysisController !== 'undefined') {
                ServiceAnalysisController.start();
            } else {
                UIController.showErrorMessage('Service Analysis is not available. Please refresh the page.');
                Utils.log('ServiceAnalysisController not loaded');
            }
        } catch (error) {
            console.error('Error starting service analysis:', error);
            UIController.showErrorMessage('Failed to start Service Analysis. Please try again.');
        }
    },
    
    /**
     * Start puzzle game with error handling
     */
    startPuzzleGame() {
        try {
            if (typeof PuzzleGameController !== 'undefined') {
                PuzzleGameController.start();
            } else {
                UIController.showErrorMessage('Puzzle Game is not available. Please refresh the page.');
                Utils.log('PuzzleGameController not loaded');
            }
        } catch (error) {
            console.error('Error starting puzzle game:', error);
            UIController.showErrorMessage('Failed to start Puzzle Game. Please try again.');
        }
    },
    
    /**
     * Start quiz with error handling
     */
    startQuiz() {
        try {
            if (typeof QuizController !== 'undefined') {
                QuizController.start();
            } else {
                UIController.showErrorMessage('Quiz is not available. Please refresh the page.');
                Utils.log('QuizController not loaded');
            }
        } catch (error) {
            console.error('Error starting quiz:', error);
            UIController.showErrorMessage('Failed to start Quiz. Please try again.');
        }
    },
    
    /**
     * Initialize storage card interactions
     */
    initializeStorageCards() {
        const storageCards = DOMUtils.querySelectorAll('.storage-card');
        
        storageCards.forEach(card => {
            // Add hover effects
            DOMUtils.addEventListener(card, 'mouseenter', () => {
                DOMUtils.toggleClass(card, 'hover', true);
            });
            
            DOMUtils.addEventListener(card, 'mouseleave', () => {
                DOMUtils.toggleClass(card, 'hover', false);
            });
            
            // Add click interaction
            DOMUtils.addEventListener(card, 'click', () => {
                const serviceId = card.getAttribute('data-service');
                this.showServiceDetails(serviceId);
            });
        });
    },
    
    /**
     * Show service details modal
     * @param {string} serviceId - Service ID to show details for
     */
    showServiceDetails(serviceId) {
        // This could open a detailed modal about the service
        Utils.log(`Showing details for service: ${serviceId}`);
        // Implementation would depend on requirements
    },
    
    /**
     * Update breadcrumb navigation
     * @param {string} contentId - Content ID to update breadcrumb for
     */
    updateBreadcrumb(contentId) {
        const contentData = this.contentData[contentId];
        if (contentData && contentData.breadcrumb) {
            UIController.updateBreadcrumb(contentData.breadcrumb);
        }
    },
    
    /**
     * Show error content when loading fails
     * @param {string} errorMessage - Error message to display
     */
    showErrorContent(errorMessage) {
        const errorHTML = `
            <div class="error-content">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                </div>
                <h2>Content Loading Error</h2>
                <p>Sorry, we couldn't load the requested content.</p>
                <p class="error-details">${Utils.sanitizeHTML(errorMessage)}</p>
                <div class="error-actions">
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-refresh" aria-hidden="true"></i> Reload Page
                    </button>
                    <button class="btn btn-secondary" onclick="ContentController.loadContent('task11-topic1')">
                        <i class="fas fa-home" aria-hidden="true"></i> Go to Home
                    </button>
                </div>
            </div>
        `;
        
        DOMUtils.setContent(this.elements.contentBody, errorHTML, true);
    },
    
    /**
     * Get current content state
     * @returns {Object} Current content state
     */
    getState() {
        return {
            initialized: this.state.initialized,
            currentContent: this.state.currentContent,
            loading: this.state.loading
        };
    },

    /**
     * Load Topic 2: Data Formats
     */
    async loadTopic2() {
        try {
            Utils.log('Loading Topic 2: Data Formats...');
            
            // Update navigation state
            NavigationController.setActiveItem('topic2-data-formats');
            
            // Initialize Topic 2 page controller
            if (typeof Topic2PageController !== 'undefined') {
                const topic2Controller = new Topic2PageController();
                await topic2Controller.init({
                    title: 'Choosing Appropriate Data Formats',
                    subtitle: 'Master the selection of optimal data formats for ML projects'
                });
                
                // Store reference for cleanup
                window.topic2PageController = topic2Controller;
                
                Utils.log('Topic 2 loaded successfully');
            } else {
                throw new Error('Topic2PageController not available');
            }
            
        } catch (error) {
            Utils.error('Failed to load Topic 2:', error);
            this.showError('Failed to load Topic 2: Data Formats');
        }
    },
    
    /**
     * Reset content controller
     */
    reset() {
        Utils.log('Resetting content controller...');
        
        this.state.currentContent = null;
        this.state.loading = false;
        
        // Clear content
        if (this.elements.contentBody) {
            DOMUtils.setContent(this.elements.contentBody, '');
        }
    }
};

// Make ContentController available globally
window.ContentController = ContentController;
