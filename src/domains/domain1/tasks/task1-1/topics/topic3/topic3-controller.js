/**
 * MLA Tutorial - Topic 3 Controller (SageMaker Ingestion)
 * Manages multi-page navigation for SageMaker data ingestion lesson
 * 
 * Topic 3: Ingesting Data into SageMaker
 * Covers: SageMaker Data Wrangler, SageMaker Feature Store
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-04
 */

class Topic3Controller {
    constructor() {
        this.currentPageIndex = 0;
        this.pages = [];
        this.lessonData = null;
        this.initialized = false;
    }

    /**
     * Initialize the Topic 3 controller
     */
    async init(lessonData) {
        try {
            console.log('🟢 Topic 3: Initializing SageMaker Ingestion controller...');
            
            this.lessonData = lessonData;
            this.setupPages();
            await this.renderCurrentPage();
            this.setupNavigation();
            
            this.initialized = true;
            console.log('🟢 Topic 3: Controller initialized successfully');
            
        } catch (error) {
            console.error('❌ Topic 3: Failed to initialize controller:', error);
            throw error;
        }
    }

    /**
     * Setup the 6-page structure for Topic 3
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
                id: 'sagemaker-overview',
                title: 'SageMaker Ingestion Overview',
                type: 'content',
                content: this.getSageMakerOverviewContent()
            },
            {
                id: 'interactive-analysis',
                title: 'Interactive SageMaker Analysis',
                type: 'interactive',
                component: 'sagemaker-analysis'
            },
            {
                id: 'ingestion-challenge',
                title: 'SageMaker Ingestion Challenge',
                type: 'interactive',
                component: 'ingestion-puzzle'
            },
            {
                id: 'knowledge-quiz',
                title: 'SageMaker Knowledge Quiz',
                type: 'interactive',
                component: 'sagemaker-quiz'
            },
            {
                id: 'lesson-summary',
                title: 'Lesson Summary',
                type: 'content',
                content: this.getLessonSummaryContent()
            }
        ];

        console.log(`🟢 Topic 3: Setup ${this.pages.length} pages`);
    }

    /**
     * Render the current page
     */
    async renderCurrentPage() {
        const page = this.pages[this.currentPageIndex];
        if (!page) return;

        console.log(`🟢 Topic 3: Rendering page ${this.currentPageIndex + 1}/${this.pages.length}: ${page.title}`);

        this.updatePageHeader(page);
        await this.renderPageContent(page);
        this.updateNavigationButtons();
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
                    <span class="breadcrumb-item clickable-breadcrumb" 
                          onclick="topic3Controller.goToTopicStart()" 
                          title="Click to return to Learning Objectives">Topic 3: SageMaker Ingestion</span>
                    <i class="fas fa-chevron-right breadcrumb-separator"></i>
                    <span class="breadcrumb-current">${page.title}</span>
                </div>
                <div class="page-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentPageIndex + 1) / this.pages.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">Page ${this.currentPageIndex + 1} of ${this.pages.length}</span>
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
            case 'sagemaker-analysis':
                const analysisHTML = `
                    <div class="interactive-container">
                        <div id="sagemakerAnalysisContainer" class="sagemaker-analysis-container">
                            <!-- SageMaker Analysis will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, analysisHTML, true);
                
                // Initialize Interactive SageMaker Analysis
                if (window.InteractiveSageMakerAnalysis) {
                    try {
                        const sagemakerAnalysis = new InteractiveSageMakerAnalysis();
                        await sagemakerAnalysis.init();
                        console.log('🟢 Topic 3: SageMaker Analysis component initialized');
                    } catch (error) {
                        console.error('❌ Topic 3: Failed to initialize SageMaker Analysis:', error);
                    }
                } else {
                    console.warn('⚠️ Topic 3: InteractiveSageMakerAnalysis not available');
                }
                break;

            case 'ingestion-puzzle':
                const puzzleHTML = `
                    <div class="interactive-container">
                        <div id="ingestionPuzzleContainer" class="ingestion-puzzle-container">
                            <!-- Ingestion Puzzle will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, puzzleHTML, true);
                
                // Initialize SageMaker Ingestion Puzzle
                if (window.SageMakerIngestionPuzzle) {
                    try {
                        const ingestionPuzzle = new SageMakerIngestionPuzzle();
                        await ingestionPuzzle.init();
                        console.log('🟢 Topic 3: Ingestion Puzzle component initialized');
                    } catch (error) {
                        console.error('❌ Topic 3: Failed to initialize Ingestion Puzzle:', error);
                    }
                } else {
                    console.warn('⚠️ Topic 3: SageMakerIngestionPuzzle not available');
                }
                break;

            case 'sagemaker-quiz':
                const quizHTML = `
                    <div class="interactive-container">
                        <div id="sagemakerQuizContainer" class="sagemaker-quiz-container">
                            <!-- SageMaker Quiz will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, quizHTML, true);
                
                // Initialize SageMaker Knowledge Quiz
                if (window.SageMakerKnowledgeQuiz) {
                    try {
                        const sagemakerQuiz = new SageMakerKnowledgeQuiz();
                        await sagemakerQuiz.init();
                        console.log('🟢 Topic 3: SageMaker Quiz component initialized');
                    } catch (error) {
                        console.error('❌ Topic 3: Failed to initialize SageMaker Quiz:', error);
                    }
                } else {
                    console.warn('⚠️ Topic 3: SageMakerKnowledgeQuiz not available');
                }
                break;

            default:
                console.warn(`⚠️ Topic 3: Unknown component type: ${page.component}`);
                DOMUtils.setContent(container, '<p>Interactive component not available.</p>', true);
        }
    }

    /**
     * Navigation methods
     */
    async nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
            await this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(`🟢 Topic 3: Navigated to page ${this.currentPageIndex + 1}`);
        }
    }

    async previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            await this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(`🟢 Topic 3: Navigated to page ${this.currentPageIndex + 1}`);
        }
    }

    goToTopicStart() {
        this.currentPageIndex = 0;
        this.renderCurrentPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('🟢 Topic 3: Navigated to topic start (Learning Objectives)');
    }

    async goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.pages.length) {
            this.currentPageIndex = pageIndex;
            await this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    setupNavigation() {
        // Setup navigation event handlers
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        // Topic 3 should always control navigation when it's active
        console.log('🟢 Topic 3: Taking control of navigation buttons');
        
        const prevBtn = DOMUtils.getElementById('prevPageBtn');
        const nextBtn = DOMUtils.getElementById('nextPageBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentPageIndex === 0;
            prevBtn.style.opacity = this.currentPageIndex === 0 ? '0.5' : '1';
            prevBtn.onclick = () => this.previousPage();
        }

        if (nextBtn) {
            const isLastPage = this.currentPageIndex === this.pages.length - 1;
            nextBtn.disabled = isLastPage;
            nextBtn.style.opacity = isLastPage ? '0.5' : '1';
            nextBtn.textContent = isLastPage ? 'Complete Lesson' : 'Next';
            nextBtn.onclick = () => this.nextPage();
        }
        
        console.log(`🟢 Topic 3: Updated navigation buttons - page ${this.currentPageIndex + 1}/${this.pages.length}, isLastPage: ${this.currentPageIndex === this.pages.length - 1}`);
    }

    updateProgressIndicator() {
        // Update any progress indicators
        const progressElements = document.querySelectorAll('.page-progress .progress-fill');
        progressElements.forEach(element => {
            element.style.width = `${((this.currentPageIndex + 1) / this.pages.length) * 100}%`;
        });
    }

    cleanup() {
        this.initialized = false;
        this.currentPageIndex = 0;
        this.pages = [];
        this.lessonData = null;
    }

    /**
     * Content generation methods
     */
    getLearningObjectivesContent() {
        return `
            <div class="learning-objectives-container">
                <div class="objectives-header">
                    <div class="header-icon">
                        <i class="fab fa-aws" aria-hidden="true"></i>
                    </div>
                    <h2>Learning Objectives</h2>
                    <p class="objectives-subtitle">Master SageMaker data ingestion for ML workflows</p>
                </div>

                <div class="objectives-grid">
                    <div class="objective-card">
                        <div class="objective-icon">
                            <i class="fas fa-magic" aria-hidden="true"></i>
                        </div>
                        <h3>SageMaker Data Wrangler</h3>
                        <p>Learn to prepare and transform data visually without writing code</p>
                        <ul>
                            <li>Visual data preparation interface</li>
                            <li>Built-in data quality insights</li>
                            <li>300+ built-in transformations</li>
                        </ul>
                    </div>

                    <div class="objective-card">
                        <div class="objective-icon">
                            <i class="fas fa-database" aria-hidden="true"></i>
                        </div>
                        <h3>SageMaker Feature Store</h3>
                        <p>Understand centralized feature management for ML teams</p>
                        <ul>
                            <li>Centralized feature repository</li>
                            <li>Feature versioning and lineage</li>
                            <li>Real-time and batch feature serving</li>
                        </ul>
                    </div>

                    <div class="objective-card">
                        <div class="objective-icon">
                            <i class="fas fa-project-diagram" aria-hidden="true"></i>
                        </div>
                        <h3>Integration Workflows</h3>
                        <p>Master how Data Wrangler and Feature Store work together</p>
                        <ul>
                            <li>End-to-end data pipelines</li>
                            <li>Feature engineering workflows</li>
                            <li>Production deployment patterns</li>
                        </ul>
                    </div>

                    <div class="objective-card">
                        <div class="objective-icon">
                            <i class="fas fa-hands-helping" aria-hidden="true"></i>
                        </div>
                        <h3>Hands-On Practice</h3>
                        <p>Apply knowledge through interactive exercises and real scenarios</p>
                        <ul>
                            <li>Interactive tool exploration</li>
                            <li>Workflow matching challenges</li>
                            <li>Best practices assessment</li>
                        </ul>
                    </div>
                </div>

                <div class="objectives-summary">
                    <div class="summary-icon">
                        <i class="fas fa-bullseye" aria-hidden="true"></i>
                    </div>
                    <div class="summary-content">
                        <h3>By the end of this lesson, you will:</h3>
                        <p>Confidently choose and implement SageMaker ingestion tools for your ML projects, understanding when to use Data Wrangler vs Feature Store and how they complement each other in production workflows.</p>
                    </div>
                </div>
            </div>
        `;
    }

    getSageMakerOverviewContent() {
        return `
            <div class="sagemaker-overview-container">
                <div class="overview-header">
                    <div class="header-icon">
                        <i class="fab fa-aws" aria-hidden="true"></i>
                    </div>
                    <h2>SageMaker Ingestion Overview</h2>
                    <p class="overview-subtitle">Your toolkit for getting data ready for machine learning</p>
                </div>

                <div class="analogy-section">
                    <div class="analogy-card">
                        <div class="analogy-icon">
                            <i class="fas fa-utensils" aria-hidden="true"></i>
                        </div>
                        <h3>Think of SageMaker Ingestion Like a Professional Kitchen</h3>
                        <p>Just like a restaurant needs different tools to prepare ingredients and manage recipes, SageMaker provides specialized tools to prepare your data and manage features for ML models.</p>
                    </div>
                </div>

                <div class="tools-comparison">
                    <div class="tool-card data-wrangler">
                        <div class="tool-header">
                            <div class="tool-icon">
                                <i class="fas fa-magic" aria-hidden="true"></i>
                            </div>
                            <h3>SageMaker Data Wrangler</h3>
                            <p class="tool-tagline">The Visual Data Prep Chef</p>
                        </div>
                        
                        <div class="tool-analogy">
                            <p><strong>Kitchen Analogy:</strong> Like a prep chef who cleans, cuts, and transforms raw ingredients into ready-to-cook components</p>
                        </div>

                        <div class="tool-details">
                            <div class="detail-section">
                                <h4><i class="fas fa-star" aria-hidden="true"></i> What it does:</h4>
                                <ul>
                                    <li>Visual data preparation without coding</li>
                                    <li>Connects to 40+ data sources</li>
                                    <li>300+ built-in transformations</li>
                                    <li>Automatic data quality insights</li>
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h4><i class="fas fa-lightbulb" aria-hidden="true"></i> Best for:</h4>
                                <ul>
                                    <li>Data scientists who want visual tools</li>
                                    <li>Quick data exploration and cleaning</li>
                                    <li>One-time data preparation tasks</li>
                                    <li>Prototyping data transformations</li>
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h4><i class="fas fa-cogs" aria-hidden="true"></i> Key Features:</h4>
                                <ul>
                                    <li>Drag-and-drop interface</li>
                                    <li>Real-time data preview</li>
                                    <li>Built-in bias detection</li>
                                    <li>Export to SageMaker Pipelines</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="tool-card feature-store">
                        <div class="tool-header">
                            <div class="tool-icon">
                                <i class="fas fa-database" aria-hidden="true"></i>
                            </div>
                            <h3>SageMaker Feature Store</h3>
                            <p class="tool-tagline">The Recipe Management System</p>
                        </div>
                        
                        <div class="tool-analogy">
                            <p><strong>Kitchen Analogy:</strong> Like a master recipe book that stores all your prepared ingredients, tracks versions, and serves them to multiple chefs when needed</p>
                        </div>

                        <div class="tool-details">
                            <div class="detail-section">
                                <h4><i class="fas fa-star" aria-hidden="true"></i> What it does:</h4>
                                <ul>
                                    <li>Centralized feature repository</li>
                                    <li>Feature versioning and lineage</li>
                                    <li>Real-time and batch serving</li>
                                    <li>Feature discovery and sharing</li>
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h4><i class="fas fa-lightbulb" aria-hidden="true"></i> Best for:</h4>
                                <ul>
                                    <li>Production ML workflows</li>
                                    <li>Team collaboration on features</li>
                                    <li>Feature reuse across projects</li>
                                    <li>Consistent feature serving</li>
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h4><i class="fas fa-cogs" aria-hidden="true"></i> Key Features:</h4>
                                <ul>
                                    <li>Online and offline stores</li>
                                    <li>Feature group management</li>
                                    <li>Time-travel capabilities</li>
                                    <li>Built-in monitoring</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="workflow-integration">
                    <div class="integration-header">
                        <h3><i class="fas fa-project-diagram" aria-hidden="true"></i> How They Work Together</h3>
                        <p>Data Wrangler and Feature Store complement each other in a complete ML workflow</p>
                    </div>

                    <div class="workflow-steps">
                        <div class="workflow-step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Prepare with Data Wrangler</h4>
                                <p>Use visual tools to clean, transform, and engineer features from raw data</p>
                            </div>
                        </div>
                        <div class="workflow-arrow">→</div>
                        <div class="workflow-step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Store in Feature Store</h4>
                                <p>Save engineered features to the centralized repository for reuse</p>
                            </div>
                        </div>
                        <div class="workflow-arrow">→</div>
                        <div class="workflow-step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Serve to Models</h4>
                                <p>Provide consistent features to training and inference workflows</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="next-steps">
                    <div class="next-steps-content">
                        <h3><i class="fas fa-arrow-right" aria-hidden="true"></i> Ready to Explore?</h3>
                        <p>In the next sections, you'll get hands-on experience with both tools through interactive exercises and real-world scenarios.</p>
                    </div>
                </div>
            </div>
        `;
    }

    getLessonSummaryContent() {
        return `
            <div class="lesson-summary-container">
                <div class="summary-header">
                    <div class="completion-badge">
                        <div class="badge-icon">
                            <i class="fas fa-trophy" aria-hidden="true"></i>
                        </div>
                        <div class="badge-text">
                            <strong>Congratulations!</strong><br>
                            You've completed Topic 3: SageMaker Ingestion
                        </div>
                    </div>
                </div>

                <div class="key-takeaways">
                    <h3><i class="fas fa-key" aria-hidden="true"></i> Key Takeaways</h3>
                    
                    <div class="takeaway-grid">
                        <div class="takeaway-card">
                            <div class="takeaway-icon">
                                <i class="fas fa-magic" aria-hidden="true"></i>
                            </div>
                            <h4>Data Wrangler Mastery</h4>
                            <ul>
                                <li>Visual data preparation without coding</li>
                                <li>300+ built-in transformations</li>
                                <li>Automatic data quality insights</li>
                                <li>Perfect for exploration and prototyping</li>
                            </ul>
                        </div>

                        <div class="takeaway-card">
                            <div class="takeaway-icon">
                                <i class="fas fa-database" aria-hidden="true"></i>
                            </div>
                            <h4>Feature Store Excellence</h4>
                            <ul>
                                <li>Centralized feature management</li>
                                <li>Version control and lineage tracking</li>
                                <li>Real-time and batch serving</li>
                                <li>Essential for production ML</li>
                            </ul>
                        </div>

                        <div class="takeaway-card">
                            <div class="takeaway-icon">
                                <i class="fas fa-project-diagram" aria-hidden="true"></i>
                            </div>
                            <h4>Integration Workflows</h4>
                            <ul>
                                <li>Data Wrangler → Feature Store pipeline</li>
                                <li>End-to-end data preparation</li>
                                <li>Consistent feature serving</li>
                                <li>Team collaboration patterns</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="decision-framework">
                    <h3><i class="fas fa-compass" aria-hidden="true"></i> Decision Framework</h3>
                    <div class="framework-content">
                        <div class="decision-table">
                            <div class="decision-row header">
                                <div class="decision-cell">Scenario</div>
                                <div class="decision-cell">Use Data Wrangler</div>
                                <div class="decision-cell">Use Feature Store</div>
                            </div>
                            <div class="decision-row">
                                <div class="decision-cell">Quick data exploration</div>
                                <div class="decision-cell">✅ Perfect choice</div>
                                <div class="decision-cell">❌ Overkill</div>
                            </div>
                            <div class="decision-row">
                                <div class="decision-cell">Production ML pipeline</div>
                                <div class="decision-cell">⚠️ For preparation only</div>
                                <div class="decision-cell">✅ Essential</div>
                            </div>
                            <div class="decision-row">
                                <div class="decision-cell">Team feature sharing</div>
                                <div class="decision-cell">❌ Limited sharing</div>
                                <div class="decision-cell">✅ Built for sharing</div>
                            </div>
                            <div class="decision-row">
                                <div class="decision-cell">Real-time inference</div>
                                <div class="decision-cell">❌ Not designed for this</div>
                                <div class="decision-cell">✅ Optimized for this</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="next-steps">
                    <h3><i class="fas fa-rocket" aria-hidden="true"></i> What's Next?</h3>
                    <div class="next-steps-grid">
                        <div class="next-step-card">
                            <div class="step-icon">
                                <i class="fas fa-play" aria-hidden="true"></i>
                            </div>
                            <h4>Try It Yourself</h4>
                            <p>Start with SageMaker Data Wrangler for your next data preparation task</p>
                        </div>
                        <div class="next-step-card">
                            <div class="step-icon">
                                <i class="fas fa-users" aria-hidden="true"></i>
                            </div>
                            <h4>Plan Team Adoption</h4>
                            <p>Consider Feature Store for your production ML workflows</p>
                        </div>
                        <div class="next-step-card">
                            <div class="step-icon">
                                <i class="fas fa-book" aria-hidden="true"></i>
                            </div>
                            <h4>Continue Learning</h4>
                            <p>Explore advanced SageMaker features and integrations</p>
                        </div>
                    </div>
                </div>

                <div class="completion-actions">
                    <button class="btn btn-primary" onclick="topic3Controller.goToTopicStart()">
                        <i class="fas fa-refresh" aria-hidden="true"></i>
                        Review This Topic
                    </button>
                    <button class="btn btn-secondary" onclick="ContentController.loadContent('task11-topic1')">
                        <i class="fas fa-home" aria-hidden="true"></i>
                        Return to Course
                    </button>
                </div>
            </div>
        `;
    }
}

// Export for global access
window.Topic3Controller = Topic3Controller;
window.Topic3PageController = Topic3Controller; // Maintain naming consistency

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Topic3Controller;
}
