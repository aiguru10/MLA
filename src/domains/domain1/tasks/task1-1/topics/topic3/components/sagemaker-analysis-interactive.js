/**
 * Interactive SageMaker Analysis Component
 * Provides hands-on exploration of SageMaker Data Wrangler and Feature Store
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-04
 */

class InteractiveSageMakerAnalysis {
    constructor() {
        this.currentTab = 'overview';
        this.initialized = false;
    }

    async init() {
        try {
            console.log('🟢 Initializing Interactive SageMaker Analysis...');
            await this.render();
            this.setupEventListeners();
            this.initialized = true;
            console.log('✅ Interactive SageMaker Analysis initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Interactive SageMaker Analysis:', error);
            throw error;
        }
    }

    async render() {
        const container = document.getElementById('sagemakerAnalysisContainer');
        if (!container) {
            throw new Error('SageMaker Analysis container not found');
        }

        const html = `
            <div class="sagemaker-analysis-wrapper">
                <div class="analysis-header">
                    <h3><i class="fab fa-aws" aria-hidden="true"></i> Interactive SageMaker Analysis</h3>
                    <p>Explore Data Wrangler and Feature Store through hands-on scenarios</p>
                </div>

                <div class="analysis-tabs">
                    <button class="tab-button active" data-tab="overview">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        Overview
                    </button>
                    <button class="tab-button" data-tab="data-wrangler">
                        <i class="fas fa-magic" aria-hidden="true"></i>
                        Data Wrangler
                    </button>
                    <button class="tab-button" data-tab="feature-store">
                        <i class="fas fa-database" aria-hidden="true"></i>
                        Feature Store
                    </button>
                    <button class="tab-button" data-tab="comparison">
                        <i class="fas fa-balance-scale" aria-hidden="true"></i>
                        Comparison
                    </button>
                </div>

                <div class="analysis-content">
                    <div id="overview-tab" class="tab-content active">
                        ${this.getOverviewContent()}
                    </div>
                    <div id="data-wrangler-tab" class="tab-content">
                        ${this.getDataWranglerContent()}
                    </div>
                    <div id="feature-store-tab" class="tab-content">
                        ${this.getFeatureStoreContent()}
                    </div>
                    <div id="comparison-tab" class="tab-content">
                        ${this.getComparisonContent()}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    setupEventListeners() {
        const tabButtons = document.querySelectorAll('.sagemaker-analysis-wrapper .tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.closest('.tab-button').dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Setup interactive elements
        this.setupInteractiveElements();
    }

    switchTab(tabName) {
        // Update active tab button
        const tabButtons = document.querySelectorAll('.sagemaker-analysis-wrapper .tab-button');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        const tabContents = document.querySelectorAll('.sagemaker-analysis-wrapper .tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
        console.log(`🟢 Switched to ${tabName} tab`);
    }

    setupInteractiveElements() {
        // Setup scenario cards
        const scenarioCards = document.querySelectorAll('.scenario-card');
        scenarioCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });

        // Setup feature comparison toggles
        const comparisonToggles = document.querySelectorAll('.comparison-toggle');
        comparisonToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const feature = e.target.dataset.feature;
                this.toggleFeatureComparison(feature);
            });
        });
    }

    toggleFeatureComparison(feature) {
        const row = document.querySelector(`[data-feature="${feature}"]`);
        if (row) {
            row.classList.toggle('highlighted');
        }
    }

    getOverviewContent() {
        return `
            <div class="overview-content">
                <div class="overview-intro">
                    <h4>🎯 Learning Path</h4>
                    <p>Follow this interactive journey to master SageMaker ingestion tools</p>
                </div>

                <div class="learning-path">
                    <div class="path-step completed">
                        <div class="step-icon">
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </div>
                        <div class="step-content">
                            <h5>Understanding the Basics</h5>
                            <p>You've learned about Data Wrangler and Feature Store fundamentals</p>
                        </div>
                    </div>

                    <div class="path-step current">
                        <div class="step-icon">
                            <i class="fas fa-play" aria-hidden="true"></i>
                        </div>
                        <div class="step-content">
                            <h5>Hands-On Exploration</h5>
                            <p>Explore real scenarios and use cases through interactive tabs</p>
                        </div>
                    </div>

                    <div class="path-step upcoming">
                        <div class="step-icon">
                            <i class="fas fa-puzzle-piece" aria-hidden="true"></i>
                        </div>
                        <div class="step-content">
                            <h5>Practice Challenge</h5>
                            <p>Apply your knowledge in the upcoming ingestion puzzle</p>
                        </div>
                    </div>

                    <div class="path-step upcoming">
                        <div class="step-icon">
                            <i class="fas fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                        <div class="step-content">
                            <h5>Knowledge Assessment</h5>
                            <p>Test your understanding with the final quiz</p>
                        </div>
                    </div>
                </div>

                <div class="exploration-guide">
                    <h4>🧭 Exploration Guide</h4>
                    <div class="guide-cards">
                        <div class="guide-card" onclick="window.sagemakerAnalysis.switchTab('data-wrangler')">
                            <div class="guide-icon">
                                <i class="fas fa-magic" aria-hidden="true"></i>
                            </div>
                            <h5>Start with Data Wrangler</h5>
                            <p>Discover visual data preparation capabilities</p>
                        </div>
                        <div class="guide-card" onclick="window.sagemakerAnalysis.switchTab('feature-store')">
                            <div class="guide-icon">
                                <i class="fas fa-database" aria-hidden="true"></i>
                            </div>
                            <h5>Explore Feature Store</h5>
                            <p>Learn about centralized feature management</p>
                        </div>
                        <div class="guide-card" onclick="window.sagemakerAnalysis.switchTab('comparison')">
                            <div class="guide-icon">
                                <i class="fas fa-balance-scale" aria-hidden="true"></i>
                            </div>
                            <h5>Compare & Decide</h5>
                            <p>Understand when to use each tool</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDataWranglerContent() {
        return `
            <div class="data-wrangler-content">
                <div class="tool-intro">
                    <div class="tool-header">
                        <div class="tool-icon">
                            <i class="fas fa-magic" aria-hidden="true"></i>
                        </div>
                        <h4>SageMaker Data Wrangler Deep Dive</h4>
                        <p>Visual data preparation made simple</p>
                    </div>
                </div>

                <div class="scenarios-section">
                    <h5>📋 Real-World Scenarios</h5>
                    <p>Click each scenario to explore how Data Wrangler solves common data challenges:</p>

                    <div class="scenarios-grid">
                        <div class="scenario-card" data-scenario="retail">
                            <div class="scenario-header">
                                <div class="scenario-icon">
                                    <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                                </div>
                                <h6>E-commerce Data Cleanup</h6>
                                <p>Cleaning messy customer purchase data</p>
                            </div>
                            <div class="scenario-details">
                                <div class="challenge">
                                    <strong>Challenge:</strong> Raw e-commerce data with missing values, inconsistent formats, and outliers
                                </div>
                                <div class="solution">
                                    <strong>Data Wrangler Solution:</strong>
                                    <ul>
                                        <li>Visual missing value detection and imputation</li>
                                        <li>Automatic data type inference and correction</li>
                                        <li>Outlier detection with visual charts</li>
                                        <li>One-click categorical encoding</li>
                                    </ul>
                                </div>
                                <div class="benefit">
                                    <strong>Time Saved:</strong> 80% reduction in data prep time (from 2 days to 4 hours)
                                </div>
                            </div>
                        </div>

                        <div class="scenario-card" data-scenario="finance">
                            <div class="scenario-header">
                                <div class="scenario-icon">
                                    <i class="fas fa-chart-line" aria-hidden="true"></i>
                                </div>
                                <h6>Financial Risk Modeling</h6>
                                <p>Feature engineering for credit scoring</p>
                            </div>
                            <div class="scenario-details">
                                <div class="challenge">
                                    <strong>Challenge:</strong> Complex feature engineering for credit risk assessment
                                </div>
                                <div class="solution">
                                    <strong>Data Wrangler Solution:</strong>
                                    <ul>
                                        <li>300+ built-in transformations for financial ratios</li>
                                        <li>Time-series feature generation</li>
                                        <li>Bias detection for fair lending compliance</li>
                                        <li>Feature importance analysis</li>
                                    </ul>
                                </div>
                                <div class="benefit">
                                    <strong>Compliance Boost:</strong> Built-in bias detection ensures regulatory compliance
                                </div>
                            </div>
                        </div>

                        <div class="scenario-card" data-scenario="healthcare">
                            <div class="scenario-header">
                                <div class="scenario-icon">
                                    <i class="fas fa-heartbeat" aria-hidden="true"></i>
                                </div>
                                <h6>Healthcare Analytics</h6>
                                <p>Patient data standardization</p>
                            </div>
                            <div class="scenario-details">
                                <div class="challenge">
                                    <strong>Challenge:</strong> Standardizing patient data from multiple hospital systems
                                </div>
                                <div class="solution">
                                    <strong>Data Wrangler Solution:</strong>
                                    <ul>
                                        <li>HIPAA-compliant data handling</li>
                                        <li>Medical code standardization (ICD-10, CPT)</li>
                                        <li>Date/time normalization across systems</li>
                                        <li>Data quality scoring and validation</li>
                                    </ul>
                                </div>
                                <div class="benefit">
                                    <strong>Quality Improvement:</strong> 95% data quality score achieved across all sources
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="capabilities-showcase">
                    <h5>🛠️ Key Capabilities</h5>
                    <div class="capabilities-grid">
                        <div class="capability-item">
                            <div class="capability-icon">
                                <i class="fas fa-eye" aria-hidden="true"></i>
                            </div>
                            <h6>Visual Interface</h6>
                            <p>No-code data preparation with drag-and-drop simplicity</p>
                        </div>
                        <div class="capability-item">
                            <div class="capability-icon">
                                <i class="fas fa-plug" aria-hidden="true"></i>
                            </div>
                            <h6>40+ Data Sources</h6>
                            <p>Connect to databases, data lakes, and SaaS applications</p>
                        </div>
                        <div class="capability-item">
                            <div class="capability-icon">
                                <i class="fas fa-cogs" aria-hidden="true"></i>
                            </div>
                            <h6>300+ Transformations</h6>
                            <p>Built-in functions for every data preparation need</p>
                        </div>
                        <div class="capability-item">
                            <div class="capability-icon">
                                <i class="fas fa-shield-alt" aria-hidden="true"></i>
                            </div>
                            <h6>Bias Detection</h6>
                            <p>Automatic identification of potential model bias</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getFeatureStoreContent() {
        return `
            <div class="feature-store-content">
                <div class="tool-intro">
                    <div class="tool-header">
                        <div class="tool-icon">
                            <i class="fas fa-database" aria-hidden="true"></i>
                        </div>
                        <h4>SageMaker Feature Store Deep Dive</h4>
                        <p>Centralized feature management for ML teams</p>
                    </div>
                </div>

                <div class="architecture-section">
                    <h5>🏗️ Architecture Overview</h5>
                    <div class="architecture-diagram">
                        <div class="arch-component">
                            <div class="arch-icon">
                                <i class="fas fa-upload" aria-hidden="true"></i>
                            </div>
                            <h6>Feature Ingestion</h6>
                            <p>Batch & streaming data ingestion from multiple sources</p>
                        </div>
                        <div class="arch-arrow">→</div>
                        <div class="arch-component">
                            <div class="arch-icon">
                                <i class="fas fa-database" aria-hidden="true"></i>
                            </div>
                            <h6>Feature Groups</h6>
                            <p>Organized collections of related features with metadata</p>
                        </div>
                        <div class="arch-arrow">→</div>
                        <div class="arch-component">
                            <div class="arch-icon">
                                <i class="fas fa-server" aria-hidden="true"></i>
                            </div>
                            <h6>Dual Storage</h6>
                            <p>Online store (real-time) + Offline store (batch)</p>
                        </div>
                        <div class="arch-arrow">→</div>
                        <div class="arch-component">
                            <div class="arch-icon">
                                <i class="fas fa-rocket" aria-hidden="true"></i>
                            </div>
                            <h6>Feature Serving</h6>
                            <p>Low-latency serving for training & inference</p>
                        </div>
                    </div>
                </div>

                <div class="use-cases-section">
                    <h5>🎯 Production Use Cases</h5>
                    <div class="use-cases-grid">
                        <div class="use-case-card">
                            <div class="use-case-header">
                                <div class="use-case-icon">
                                    <i class="fas fa-users" aria-hidden="true"></i>
                                </div>
                                <h6>Team Collaboration</h6>
                            </div>
                            <div class="use-case-content">
                                <p><strong>Scenario:</strong> Multiple data science teams working on related ML models</p>
                                <div class="benefits-list">
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Shared feature repository prevents duplication</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Feature discovery through searchable catalog</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Consistent feature definitions across projects</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="use-case-card">
                            <div class="use-case-header">
                                <div class="use-case-icon">
                                    <i class="fas fa-clock" aria-hidden="true"></i>
                                </div>
                                <h6>Real-Time Inference</h6>
                            </div>
                            <div class="use-case-content">
                                <p><strong>Scenario:</strong> Fraud detection system requiring sub-100ms response times</p>
                                <div class="benefits-list">
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Online store provides single-digit millisecond latency</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Automatic feature freshness management</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Built-in monitoring and alerting</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="use-case-card">
                            <div class="use-case-header">
                                <div class="use-case-icon">
                                    <i class="fas fa-history" aria-hidden="true"></i>
                                </div>
                                <h6>Feature Versioning</h6>
                            </div>
                            <div class="use-case-content">
                                <p><strong>Scenario:</strong> Model retraining with historical feature consistency</p>
                                <div class="benefits-list">
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Time-travel queries for historical features</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Feature lineage tracking and governance</span>
                                    </div>
                                    <div class="benefit-item">
                                        <i class="fas fa-check" aria-hidden="true"></i>
                                        <span>Reproducible model training pipelines</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="feature-lifecycle">
                    <h5>🔄 Feature Lifecycle Management</h5>
                    <div class="lifecycle-steps">
                        <div class="lifecycle-step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h6>Create Feature Group</h6>
                                <p>Define schema and metadata for related features</p>
                            </div>
                        </div>
                        <div class="lifecycle-step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h6>Ingest Features</h6>
                                <p>Load features via batch jobs or streaming</p>
                            </div>
                        </div>
                        <div class="lifecycle-step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h6>Discover & Reuse</h6>
                                <p>Search catalog and reuse existing features</p>
                            </div>
                        </div>
                        <div class="lifecycle-step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h6>Serve Features</h6>
                                <p>Provide features to training and inference</p>
                            </div>
                        </div>
                        <div class="lifecycle-step">
                            <div class="step-number">5</div>
                            <div class="step-content">
                                <h6>Monitor & Govern</h6>
                                <p>Track usage, quality, and compliance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getComparisonContent() {
        return `
            <div class="comparison-content">
                <div class="comparison-intro">
                    <h4>⚖️ Data Wrangler vs Feature Store</h4>
                    <p>Understanding when to use each tool for optimal results</p>
                </div>

                <div class="comparison-table-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Aspect</th>
                                <th class="data-wrangler-col">
                                    <i class="fas fa-magic" aria-hidden="true"></i>
                                    Data Wrangler
                                </th>
                                <th class="feature-store-col">
                                    <i class="fas fa-database" aria-hidden="true"></i>
                                    Feature Store
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-feature="purpose" class="comparison-toggle">
                                <td><strong>Primary Purpose</strong></td>
                                <td>Data preparation & exploration</td>
                                <td>Feature management & serving</td>
                            </tr>
                            <tr data-feature="interface" class="comparison-toggle">
                                <td><strong>User Interface</strong></td>
                                <td>Visual, drag-and-drop</td>
                                <td>API-driven, programmatic</td>
                            </tr>
                            <tr data-feature="audience" class="comparison-toggle">
                                <td><strong>Target Audience</strong></td>
                                <td>Data scientists, analysts</td>
                                <td>ML engineers, DevOps teams</td>
                            </tr>
                            <tr data-feature="workflow" class="comparison-toggle">
                                <td><strong>Workflow Stage</strong></td>
                                <td>Early exploration & prototyping</td>
                                <td>Production deployment</td>
                            </tr>
                            <tr data-feature="scalability" class="comparison-toggle">
                                <td><strong>Scalability</strong></td>
                                <td>Medium (single datasets)</td>
                                <td>High (enterprise-wide)</td>
                            </tr>
                            <tr data-feature="collaboration" class="comparison-toggle">
                                <td><strong>Team Collaboration</strong></td>
                                <td>Limited sharing capabilities</td>
                                <td>Built for team collaboration</td>
                            </tr>
                            <tr data-feature="versioning" class="comparison-toggle">
                                <td><strong>Version Control</strong></td>
                                <td>Flow versioning only</td>
                                <td>Full feature versioning</td>
                            </tr>
                            <tr data-feature="serving" class="comparison-toggle">
                                <td><strong>Real-time Serving</strong></td>
                                <td>Not designed for serving</td>
                                <td>Optimized for low-latency serving</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="decision-matrix">
                    <h5>🎯 Decision Matrix</h5>
                    <div class="matrix-grid">
                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>Quick Data Exploration</h6>
                                <div class="recommendation data-wrangler">Use Data Wrangler</div>
                            </div>
                            <div class="scenario-details">
                                <p>When you need to quickly understand and clean a new dataset</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Visual interface accelerates exploration and insight discovery
                                </div>
                            </div>
                        </div>

                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>Production ML Pipeline</h6>
                                <div class="recommendation feature-store">Use Feature Store</div>
                            </div>
                            <div class="scenario-details">
                                <p>When deploying ML models that need consistent, reliable features</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Ensures feature consistency between training and inference
                                </div>
                            </div>
                        </div>

                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>Team Feature Sharing</h6>
                                <div class="recommendation feature-store">Use Feature Store</div>
                            </div>
                            <div class="scenario-details">
                                <p>When multiple teams need to share and reuse features</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Centralized catalog prevents duplication and ensures consistency
                                </div>
                            </div>
                        </div>

                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>One-time Analysis</h6>
                                <div class="recommendation data-wrangler">Use Data Wrangler</div>
                            </div>
                            <div class="scenario-details">
                                <p>When performing ad-hoc analysis or one-time data preparation</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Faster setup and no need for long-term feature management
                                </div>
                            </div>
                        </div>

                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>Real-time Inference</h6>
                                <div class="recommendation feature-store">Use Feature Store</div>
                            </div>
                            <div class="scenario-details">
                                <p>When models need features served in real-time with low latency</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Online store provides millisecond-level feature retrieval
                                </div>
                            </div>
                        </div>

                        <div class="matrix-scenario">
                            <div class="scenario-header">
                                <h6>Combined Workflow</h6>
                                <div class="recommendation both">Use Both Together</div>
                            </div>
                            <div class="scenario-details">
                                <p>When you need end-to-end data preparation and feature management</p>
                                <div class="reasoning">
                                    <strong>Why:</strong> Data Wrangler for prep → Feature Store for serving
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="integration-workflow">
                    <h5>🔗 Integration Workflow</h5>
                    <div class="workflow-diagram">
                        <div class="workflow-step">
                            <div class="step-icon data-wrangler">
                                <i class="fas fa-magic" aria-hidden="true"></i>
                            </div>
                            <h6>1. Prepare with Data Wrangler</h6>
                            <p>Clean, transform, and engineer features visually</p>
                        </div>
                        <div class="workflow-arrow">→</div>
                        <div class="workflow-step">
                            <div class="step-icon export">
                                <i class="fas fa-download" aria-hidden="true"></i>
                            </div>
                            <h6>2. Export Processing Job</h6>
                            <p>Generate SageMaker Processing job from Data Wrangler flow</p>
                        </div>
                        <div class="workflow-arrow">→</div>
                        <div class="workflow-step">
                            <div class="step-icon feature-store">
                                <i class="fas fa-database" aria-hidden="true"></i>
                            </div>
                            <h6>3. Store in Feature Store</h6>
                            <p>Ingest processed features into Feature Store</p>
                        </div>
                        <div class="workflow-arrow">→</div>
                        <div class="workflow-step">
                            <div class="step-icon serving">
                                <i class="fas fa-rocket" aria-hidden="true"></i>
                            </div>
                            <h6>4. Serve to Models</h6>
                            <p>Provide features to training and inference pipelines</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export for global access
window.InteractiveSageMakerAnalysis = InteractiveSageMakerAnalysis;
