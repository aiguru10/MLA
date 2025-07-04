/**
 * MLA Tutorial - Topic 2 Controller (Data Formats)
 * Manages multi-page navigation for Data Formats lesson
 * 
 * Topic 2: Choosing Appropriate Data Formats
 * Covers: Parquet, JSON, CSV, ORC
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-02
 */

class Topic2Controller {
    constructor() {
        this.currentPageIndex = 0;
        this.pages = [];
        this.lessonData = null;
        this.initialized = false;
    }

    /**
     * Initialize the Topic 2 page controller
     */
    async init(lessonData) {
        try {
            Utils.log('Initializing Topic 2 Page Controller...');
            
            this.lessonData = lessonData;
            this.setupPages();
            this.renderCurrentPage();
            this.setupNavigation();
            
            this.initialized = true;
            Utils.log('Topic 2 Page Controller initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Topic 2 Page Controller:', error);
            throw error;
        }
    }

    /**
     * Setup the page structure for Topic 2
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
                id: 'data-formats-overview',
                title: 'Data Formats Overview',
                type: 'content',
                content: this.getDataFormatsOverviewContent()
            },
            {
                id: 'interactive-format-analysis',
                title: 'Interactive Format Analysis',
                type: 'interactive',
                component: 'format-analysis'
            },
            {
                id: 'format-comparison-game',
                title: 'Format Comparison Challenge',
                type: 'interactive',
                component: 'format-puzzle'
            },
            {
                id: 'format-selection-quiz',
                title: 'Format Selection Quiz',
                type: 'interactive',
                component: 'format-quiz'
            },
            {
                id: 'lesson-summary',
                title: 'Lesson Summary',
                type: 'content',
                content: this.getLessonSummaryContent()
            }
        ];

        Utils.log(`Setup ${this.pages.length} pages for Topic 2 navigation`);
    }

    /**
     * Get learning objectives content
     */
    getLearningObjectivesContent() {
        return `
            <div class="learning-objectives-container">
                <div class="objectives-header">
                    <div class="header-icon">🎯</div>
                    <h2>Learning Objectives</h2>
                    <p class="header-subtitle">What you'll master in this lesson</p>
                </div>

                <div class="objectives-grid">
                    <div class="objective-card primary">
                        <div class="objective-icon">📊</div>
                        <h3>Data Format Fundamentals</h3>
                        <p>Understand the core characteristics, advantages, and limitations of each data format</p>
                        <ul>
                            <li>Structure vs. flexibility trade-offs</li>
                            <li>Performance implications</li>
                            <li>Storage efficiency considerations</li>
                        </ul>
                    </div>

                    <div class="objective-card secondary">
                        <div class="objective-icon">⚡</div>
                        <h3>Performance Optimization</h3>
                        <p>Learn how different formats impact ML pipeline performance</p>
                        <ul>
                            <li>Read/write speed comparisons</li>
                            <li>Compression effectiveness</li>
                            <li>Query performance characteristics</li>
                        </ul>
                    </div>

                    <div class="objective-card tertiary">
                        <div class="objective-icon">🎯</div>
                        <h3>Format Selection Strategy</h3>
                        <p>Master the decision-making process for choosing the right format</p>
                        <ul>
                            <li>Use case analysis</li>
                            <li>Data pipeline requirements</li>
                            <li>Tool compatibility considerations</li>
                        </ul>
                    </div>

                    <div class="objective-card quaternary">
                        <div class="objective-icon">🔧</div>
                        <h3>Practical Implementation</h3>
                        <p>Apply format knowledge to real-world ML scenarios</p>
                        <ul>
                            <li>AWS service integration</li>
                            <li>Best practices and patterns</li>
                            <li>Common pitfalls to avoid</li>
                        </ul>
                    </div>
                </div>

                <div class="objectives-summary">
                    <div class="summary-card">
                        <h3>🚀 By the end of this lesson, you'll be able to:</h3>
                        <div class="summary-checklist">
                            <div class="checklist-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Compare and contrast Parquet, JSON, CSV, and ORC formats</span>
                            </div>
                            <div class="checklist-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Select the optimal format for specific ML use cases</span>
                            </div>
                            <div class="checklist-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Understand performance implications of format choices</span>
                            </div>
                            <div class="checklist-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Implement format best practices in AWS environments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get data formats overview content
     */
    getDataFormatsOverviewContent() {
        return `
            <div class="data-formats-overview">
                <div class="overview-header">
                    <div class="header-icon">📁</div>
                    <h2>Data Formats for Machine Learning</h2>
                    <p class="header-subtitle">Understanding the building blocks of ML data pipelines</p>
                </div>

                <div class="format-intro">
                    <div class="intro-card">
                        <h3>🤔 Why Data Formats Matter</h3>
                        <p>Think of data formats like different types of containers for your lunch:</p>
                        <div class="analogy-grid">
                            <div class="analogy-item">
                                <div class="analogy-icon">🥪</div>
                                <div class="analogy-text">
                                    <strong>CSV = Sandwich Bag</strong><br>
                                    Simple, transparent, but everything gets mixed together
                                </div>
                            </div>
                            <div class="analogy-item">
                                <div class="analogy-icon">🍱</div>
                                <div class="analogy-text">
                                    <strong>JSON = Bento Box</strong><br>
                                    Organized compartments, flexible, but takes up more space
                                </div>
                            </div>
                            <div class="analogy-item">
                                <div class="analogy-icon">🗜️</div>
                                <div class="analogy-text">
                                    <strong>Parquet = Vacuum Sealed</strong><br>
                                    Super compressed, organized, but needs special tools to open
                                </div>
                            </div>
                            <div class="analogy-item">
                                <div class="analogy-icon">📦</div>
                                <div class="analogy-text">
                                    <strong>ORC = Shipping Container</strong><br>
                                    Industrial strength, optimized for big data transport
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="formats-comparison-table">
                    <h3>📊 Format Comparison at a Glance</h3>
                    <div class="comparison-table">
                        <div class="table-header">
                            <div class="header-cell format-name">Format</div>
                            <div class="header-cell">Type</div>
                            <div class="header-cell">Best For</div>
                            <div class="header-cell">Compression</div>
                            <div class="header-cell">Speed</div>
                            <div class="header-cell">Complexity</div>
                        </div>
                        
                        <div class="table-row csv-row">
                            <div class="cell format-name">
                                <div class="format-icon">📄</div>
                                <strong>CSV</strong>
                            </div>
                            <div class="cell">Text-based</div>
                            <div class="cell">Simple data, human-readable</div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 20%"></div>
                                </div>
                                <span>Low</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 60%"></div>
                                </div>
                                <span>Medium</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 30%"></div>
                                </div>
                                <span>Simple</span>
                            </div>
                        </div>

                        <div class="table-row json-row">
                            <div class="cell format-name">
                                <div class="format-icon">🔗</div>
                                <strong>JSON</strong>
                            </div>
                            <div class="cell">Text-based</div>
                            <div class="cell">APIs, nested data</div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 30%"></div>
                                </div>
                                <span>Low</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 50%"></div>
                                </div>
                                <span>Medium</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 60%"></div>
                                </div>
                                <span>Medium</span>
                            </div>
                        </div>

                        <div class="table-row parquet-row">
                            <div class="cell format-name">
                                <div class="format-icon">🗜️</div>
                                <strong>Parquet</strong>
                            </div>
                            <div class="cell">Binary</div>
                            <div class="cell">Analytics, big data</div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 90%"></div>
                                </div>
                                <span>High</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 85%"></div>
                                </div>
                                <span>Fast</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 80%"></div>
                                </div>
                                <span>Complex</span>
                            </div>
                        </div>

                        <div class="table-row orc-row">
                            <div class="cell format-name">
                                <div class="format-icon">📦</div>
                                <strong>ORC</strong>
                            </div>
                            <div class="cell">Binary</div>
                            <div class="cell">Hive, big data</div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 95%"></div>
                                </div>
                                <span>Very High</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 90%"></div>
                                </div>
                                <span>Very Fast</span>
                            </div>
                            <div class="cell">
                                <div class="rating-bar">
                                    <div class="rating-fill" style="width: 85%"></div>
                                </div>
                                <span>Complex</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="key-concepts">
                    <h3>🔑 Key Concepts to Remember</h3>
                    <div class="concepts-grid">
                        <div class="concept-card">
                            <div class="concept-icon">⚡</div>
                            <h4>Performance vs Simplicity</h4>
                            <p>Binary formats (Parquet, ORC) are faster but require special tools. Text formats (CSV, JSON) are simpler but slower for large datasets.</p>
                        </div>
                        <div class="concept-card">
                            <div class="concept-icon">🗜️</div>
                            <h4>Compression Matters</h4>
                            <p>Better compression means lower storage costs and faster network transfers, but may require more CPU for processing.</p>
                        </div>
                        <div class="concept-card">
                            <div class="concept-icon">🎯</div>
                            <h4>Use Case Driven</h4>
                            <p>The "best" format depends on your specific needs: data size, query patterns, tool compatibility, and team expertise.</p>
                        </div>
                        <div class="concept-card">
                            <div class="concept-icon">🔄</div>
                            <h4>Format Conversion</h4>
                            <p>You can convert between formats, but each conversion has costs. Plan your data pipeline format strategy early.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get lesson summary content
     */
    getLessonSummaryContent() {
        return `
            <div class="lesson-summary-container">
                <div class="summary-header">
                    <div class="header-icon">🎓</div>
                    <h2>Lesson Summary</h2>
                    <p class="header-subtitle">Key takeaways from data formats</p>
                </div>

                <div class="summary-content">
                    <div class="key-learnings">
                        <h3>🧠 What You've Learned</h3>
                        <div class="learning-cards">
                            <div class="learning-card">
                                <div class="card-icon">📄</div>
                                <h4>CSV - The Universal Format</h4>
                                <ul>
                                    <li>Simple, human-readable text format</li>
                                    <li>Great for small datasets and data exchange</li>
                                    <li>Limited compression and no schema enforcement</li>
                                    <li>Perfect for: Spreadsheet data, simple ML features</li>
                                </ul>
                            </div>

                            <div class="learning-card">
                                <div class="card-icon">🔗</div>
                                <h4>JSON - The Flexible Format</h4>
                                <ul>
                                    <li>Hierarchical, self-describing structure</li>
                                    <li>Excellent for APIs and nested data</li>
                                    <li>Human-readable but verbose</li>
                                    <li>Perfect for: API responses, configuration files</li>
                                </ul>
                            </div>

                            <div class="learning-card">
                                <div class="card-icon">🗜️</div>
                                <h4>Parquet - The Analytics Powerhouse</h4>
                                <ul>
                                    <li>Columnar storage with excellent compression</li>
                                    <li>Optimized for analytical queries</li>
                                    <li>Schema evolution and predicate pushdown</li>
                                    <li>Perfect for: Data lakes, ML training datasets</li>
                                </ul>
                            </div>

                            <div class="learning-card">
                                <div class="card-icon">📦</div>
                                <h4>ORC - The Big Data Champion</h4>
                                <ul>
                                    <li>Highly optimized columnar format</li>
                                    <li>Superior compression and query performance</li>
                                    <li>Built-in indexing and statistics</li>
                                    <li>Perfect for: Hive, large-scale analytics</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="decision-framework">
                        <h3>🎯 Decision Framework</h3>
                        <div class="framework-flowchart">
                            <div class="decision-node start">
                                <div class="node-content">
                                    <strong>Start Here</strong><br>
                                    What's your primary use case?
                                </div>
                            </div>
                            
                            <div class="decision-branches">
                                <div class="branch">
                                    <div class="branch-label">Small datasets<br>Human readable</div>
                                    <div class="decision-node csv">
                                        <strong>Choose CSV</strong><br>
                                        Simple & universal
                                    </div>
                                </div>
                                
                                <div class="branch">
                                    <div class="branch-label">APIs<br>Nested data</div>
                                    <div class="decision-node json">
                                        <strong>Choose JSON</strong><br>
                                        Flexible structure
                                    </div>
                                </div>
                                
                                <div class="branch">
                                    <div class="branch-label">Analytics<br>ML training</div>
                                    <div class="decision-node parquet">
                                        <strong>Choose Parquet</strong><br>
                                        Performance optimized
                                    </div>
                                </div>
                                
                                <div class="branch">
                                    <div class="branch-label">Hive ecosystem<br>Massive scale</div>
                                    <div class="decision-node orc">
                                        <strong>Choose ORC</strong><br>
                                        Maximum efficiency
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="best-practices">
                        <h3>✅ Best Practices</h3>
                        <div class="practices-grid">
                            <div class="practice-item">
                                <div class="practice-icon">🎯</div>
                                <div class="practice-content">
                                    <h4>Choose Based on Use Case</h4>
                                    <p>Don't default to one format. Consider your specific requirements for performance, compatibility, and ease of use.</p>
                                </div>
                            </div>
                            
                            <div class="practice-item">
                                <div class="practice-icon">🔄</div>
                                <div class="practice-content">
                                    <h4>Plan for Format Evolution</h4>
                                    <p>Design your data pipeline to handle format conversions as your needs change and data volumes grow.</p>
                                </div>
                            </div>
                            
                            <div class="practice-item">
                                <div class="practice-icon">📊</div>
                                <div class="practice-content">
                                    <h4>Test Performance</h4>
                                    <p>Benchmark different formats with your actual data and query patterns before making final decisions.</p>
                                </div>
                            </div>
                            
                            <div class="practice-item">
                                <div class="practice-icon">🛠️</div>
                                <div class="practice-content">
                                    <h4>Consider Tool Compatibility</h4>
                                    <p>Ensure your chosen format works well with your existing tools and AWS services.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="next-steps">
                        <h3>🚀 Next Steps</h3>
                        <div class="next-steps-content">
                            <p>Now that you understand data formats, you're ready to:</p>
                            <ul>
                                <li><strong>Practice format selection</strong> with real-world scenarios</li>
                                <li><strong>Explore AWS services</strong> that work with each format</li>
                                <li><strong>Learn about data transformation</strong> and ETL processes</li>
                                <li><strong>Dive into performance optimization</strong> techniques</li>
                            </ul>
                            
                            <div class="completion-badge">
                                <div class="badge-icon">🏆</div>
                                <div class="badge-text">
                                    <strong>Congratulations!</strong><br>
                                    You've completed Topic 2: Data Formats
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Navigation methods (similar to Topic 1)
    async renderCurrentPage() {
        const page = this.pages[this.currentPageIndex];
        if (!page) return;

        Utils.log(`Rendering Topic 2 page: ${page.title} (${this.currentPageIndex + 1}/${this.pages.length})`);

        this.updatePageHeader(page);
        await this.renderPageContent(page);
        this.updateNavigationButtons();
        this.updateProgressIndicator();
    }

    updatePageHeader(page) {
        const headerContainer = DOMUtils.getElementById('pageHeader');
        if (!headerContainer) return;

        const headerHTML = `
            <div class="page-header">
                <div class="page-breadcrumb">
                    <span class="breadcrumb-item clickable-breadcrumb" 
                          onclick="topic2PageController.goToTopicStart()" 
                          title="Click to return to Learning Objectives">Topic 2: Data Formats</span>
                    <i class="fas fa-chevron-right breadcrumb-separator"></i>
                    <span class="breadcrumb-item">Choosing Appropriate Data Formats</span>
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

    async renderPageContent(page) {
        const contentContainer = DOMUtils.getElementById('pageContent');
        if (!contentContainer) return;

        DOMUtils.setContent(contentContainer, '', false);

        if (page.type === 'content') {
            DOMUtils.setContent(contentContainer, page.content, true);
        } else if (page.type === 'interactive') {
            await this.renderInteractiveComponent(page, contentContainer);
        }

        UIController.animateIn(contentContainer, 'fadeInUp');
    }

    async renderInteractiveComponent(page, container) {
        switch (page.component) {
            case 'format-analysis':
                const analysisHTML = `
                    <div class="interactive-container">
                        <div id="formatAnalysisContainer" class="format-analysis-container">
                            <!-- Format Analysis will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, analysisHTML, true);
                
                // Initialize Interactive Format Analysis
                if (window.InteractiveFormatAnalysis) {
                    try {
                        const formatAnalysis = new InteractiveFormatAnalysis();
                        await formatAnalysis.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Interactive Format Analysis:', error);
                        this.renderFallbackContent(container, 'Interactive Format Analysis', 'This interactive component is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Interactive Format Analysis', 'Explore different data formats with detailed comparisons and real-world examples.');
                }
                break;

            case 'format-puzzle':
                const puzzleHTML = `
                    <div class="interactive-container">
                        <div id="formatPuzzleContainer" class="format-puzzle-container">
                            <!-- Format Puzzle will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, puzzleHTML, true);
                
                // Initialize Format Puzzle Game
                if (window.FormatPuzzleGame) {
                    try {
                        const puzzle = new FormatPuzzleGame();
                        await puzzle.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Format Puzzle Game:', error);
                        this.renderFallbackContent(container, 'Format Comparison Challenge', 'This drag-and-drop challenge is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Format Comparison Challenge', 'Test your knowledge by matching data formats to their ideal use cases.');
                }
                break;

            case 'format-quiz':
                const quizHTML = `
                    <div class="interactive-container">
                        <div id="formatQuizContainer" class="format-quiz-container">
                            <!-- Format Quiz will be loaded here -->
                        </div>
                    </div>
                `;
                DOMUtils.setContent(container, quizHTML, true);
                
                // Initialize Format Selection Quiz
                if (window.FormatSelectionQuiz) {
                    try {
                        const quiz = new FormatSelectionQuiz();
                        await quiz.init();
                    } catch (error) {
                        Utils.error('Failed to initialize Format Selection Quiz:', error);
                        this.renderFallbackContent(container, 'Format Selection Quiz', 'This assessment is being prepared for you.');
                    }
                } else {
                    this.renderFallbackContent(container, 'Format Selection Quiz', 'Test your understanding of when to use each data format.');
                }
                break;

            default:
                this.renderFallbackContent(container, 'Interactive Component', 'This interactive component is not yet available.');
        }
    }

    renderFallbackContent(container, title, description) {
        const fallbackHTML = `
            <div class="fallback-content">
                <div class="fallback-card">
                    <div class="fallback-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <h3>${title}</h3>
                    <p>${description}</p>
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
                    <button class="btn btn-primary" onclick="topic2PageController.nextPage()">
                        Continue to Next Section
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        DOMUtils.setContent(container, fallbackHTML, true);
    }

    // Navigation methods
    nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
            this.renderCurrentPage();
        }
    }

    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.renderCurrentPage();
        }
    }

    goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.pages.length) {
            this.currentPageIndex = pageIndex;
            this.renderCurrentPage();
        }
    }

    goToTopicStart() {
        this.currentPageIndex = 0;
        this.renderCurrentPage();
    }

    setupNavigation() {
        // Setup navigation event handlers
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
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
        
        console.log(`🟠 Topic 2: Updated navigation buttons - page ${this.currentPageIndex + 1}/${this.pages.length}, isLastPage: ${this.currentPageIndex === this.pages.length - 1}`);
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
}

// Export for global access
window.Topic2Controller = Topic2Controller;
window.Topic2PageController = Topic2Controller; // Maintain backward compatibility

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Topic2Controller;
}
