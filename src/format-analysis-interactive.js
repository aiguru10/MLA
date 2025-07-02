/**
 * Interactive Format Analysis Component
 * Explore data formats with detailed information and comparisons
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-02
 */

class InteractiveFormatAnalysis {
    constructor() {
        this.containerId = 'formatAnalysisContainer';
        this.currentFormatIndex = 0;
        this.formats = [];
        this.initialized = false;
    }

    /**
     * Initialize the Interactive Format Analysis
     */
    async init() {
        try {
            Utils.log('Initializing Interactive Format Analysis...');
            
            this.setupFormats();
            this.render();
            this.setupEventHandlers();
            
            this.initialized = true;
            Utils.log('Interactive Format Analysis initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Interactive Format Analysis:', error);
            throw error;
        }
    }

    /**
     * Setup format data
     */
    setupFormats() {
        this.formats = [
            {
                id: 'csv',
                name: 'CSV',
                fullName: 'Comma-Separated Values',
                icon: '📄',
                color: '#48bb78',
                type: 'Text-based',
                description: 'Simple, human-readable format perfect for tabular data',
                analogy: 'Like a simple spreadsheet - rows and columns separated by commas',
                features: [
                    'Human-readable text format',
                    'Universal compatibility',
                    'Simple structure',
                    'Easy to edit manually',
                    'Widely supported'
                ],
                advantages: [
                    'Extremely simple to understand and use',
                    'Supported by virtually every tool',
                    'Human-readable and editable',
                    'Small file size for simple data',
                    'No special software required'
                ],
                disadvantages: [
                    'No data type information',
                    'Poor compression efficiency',
                    'No schema enforcement',
                    'Struggles with nested data',
                    'Parsing can be slow for large files'
                ],
                useCases: [
                    'Data exchange between systems',
                    'Small to medium datasets',
                    'Spreadsheet-compatible data',
                    'Configuration files',
                    'Simple ML feature sets'
                ],
                mlApplications: [
                    'Feature engineering outputs',
                    'Model prediction results',
                    'Training data for simple models',
                    'Data preprocessing pipelines',
                    'Experiment tracking logs'
                ],
                awsServices: [
                    'S3 - Direct storage and querying',
                    'Athena - SQL queries on CSV files',
                    'Glue - ETL processing',
                    'SageMaker - Training data input',
                    'QuickSight - Direct visualization'
                ],
                performance: {
                    readSpeed: 60,
                    writeSpeed: 70,
                    compression: 20,
                    querySpeed: 40,
                    storageEfficiency: 30
                },
                bestFor: 'Simple tabular data, data exchange, human readability',
                avoidWhen: 'Large datasets, complex nested structures, high-performance analytics'
            },
            {
                id: 'json',
                name: 'JSON',
                fullName: 'JavaScript Object Notation',
                icon: '🔗',
                color: '#4299e1',
                type: 'Text-based',
                description: 'Flexible, hierarchical format ideal for APIs and nested data',
                analogy: 'Like a filing cabinet with folders inside folders - organized but flexible',
                features: [
                    'Hierarchical structure',
                    'Self-describing format',
                    'Human-readable',
                    'Flexible schema',
                    'Native web support'
                ],
                advantages: [
                    'Handles nested and complex data structures',
                    'Self-documenting with key-value pairs',
                    'Native support in web technologies',
                    'Flexible schema evolution',
                    'Human-readable and debuggable'
                ],
                disadvantages: [
                    'Verbose and space-inefficient',
                    'No built-in data types',
                    'Slower parsing than binary formats',
                    'No compression optimization',
                    'Can become unwieldy for large datasets'
                ],
                useCases: [
                    'API responses and requests',
                    'Configuration files',
                    'Document databases',
                    'Web application data',
                    'Nested data structures'
                ],
                mlApplications: [
                    'Model configuration files',
                    'API response data for training',
                    'Experiment metadata storage',
                    'Feature store schemas',
                    'ML pipeline configurations'
                ],
                awsServices: [
                    'DynamoDB - Native JSON support',
                    'S3 - Storage and querying',
                    'Lambda - Event processing',
                    'API Gateway - Request/response format',
                    'Elasticsearch - Document indexing'
                ],
                performance: {
                    readSpeed: 50,
                    writeSpeed: 60,
                    compression: 30,
                    querySpeed: 45,
                    storageEfficiency: 25
                },
                bestFor: 'APIs, nested data, configuration files, document storage',
                avoidWhen: 'Large analytical datasets, high-performance queries, storage optimization'
            },
            {
                id: 'parquet',
                name: 'Parquet',
                fullName: 'Apache Parquet',
                icon: '🗜️',
                color: '#ed8936',
                type: 'Binary',
                description: 'Columnar storage format optimized for analytics and big data',
                analogy: 'Like a highly organized warehouse - everything sorted by type for fast access',
                features: [
                    'Columnar storage layout',
                    'Advanced compression',
                    'Schema evolution support',
                    'Predicate pushdown',
                    'Cross-platform compatibility'
                ],
                advantages: [
                    'Excellent compression ratios',
                    'Fast analytical queries',
                    'Schema evolution support',
                    'Predicate pushdown optimization',
                    'Cross-language compatibility'
                ],
                disadvantages: [
                    'Binary format (not human-readable)',
                    'Requires specialized tools',
                    'Write operations can be slower',
                    'Not suitable for streaming',
                    'Learning curve for optimization'
                ],
                useCases: [
                    'Data lakes and warehouses',
                    'Analytical workloads',
                    'Big data processing',
                    'ETL pipeline outputs',
                    'Long-term data storage'
                ],
                mlApplications: [
                    'Training dataset storage',
                    'Feature store implementation',
                    'Model training pipelines',
                    'Batch inference data',
                    'Data lake analytics'
                ],
                awsServices: [
                    'S3 - Optimized storage',
                    'Athena - Fast querying',
                    'Glue - ETL processing',
                    'EMR - Big data analytics',
                    'Redshift Spectrum - External queries'
                ],
                performance: {
                    readSpeed: 90,
                    writeSpeed: 70,
                    compression: 95,
                    querySpeed: 95,
                    storageEfficiency: 90
                },
                bestFor: 'Analytics, data lakes, big data processing, ML training datasets',
                avoidWhen: 'Real-time streaming, frequent updates, human readability needs'
            },
            {
                id: 'orc',
                name: 'ORC',
                fullName: 'Optimized Row Columnar',
                icon: '📦',
                color: '#9f7aea',
                type: 'Binary',
                description: 'Highly optimized columnar format for Hive and big data ecosystems',
                analogy: 'Like a shipping container - maximum efficiency for large-scale transport',
                features: [
                    'Optimized columnar storage',
                    'Built-in indexing',
                    'Advanced compression',
                    'ACID transaction support',
                    'Hive integration'
                ],
                advantages: [
                    'Superior compression ratios',
                    'Fastest query performance',
                    'Built-in statistics and indexing',
                    'ACID transaction support',
                    'Optimized for Hive ecosystem'
                ],
                disadvantages: [
                    'Primarily Hive/Hadoop ecosystem',
                    'Limited cross-platform support',
                    'Binary format complexity',
                    'Steeper learning curve',
                    'Less universal than Parquet'
                ],
                useCases: [
                    'Hive data warehouses',
                    'Large-scale analytics',
                    'Hadoop ecosystem',
                    'Enterprise data lakes',
                    'High-performance queries'
                ],
                mlApplications: [
                    'Enterprise ML data lakes',
                    'Large-scale feature engineering',
                    'Hadoop-based ML pipelines',
                    'Historical data analysis',
                    'Batch processing workflows'
                ],
                awsServices: [
                    'EMR - Native Hive support',
                    'S3 - Storage with EMR',
                    'Glue - ETL with Hive',
                    'Athena - Limited support',
                    'Redshift - External tables'
                ],
                performance: {
                    readSpeed: 95,
                    writeSpeed: 75,
                    compression: 98,
                    querySpeed: 98,
                    storageEfficiency: 95
                },
                bestFor: 'Hive ecosystems, maximum performance, enterprise data warehouses',
                avoidWhen: 'Non-Hadoop environments, cross-platform compatibility needs'
            }
        ];

        Utils.log(`Setup ${this.formats.length} data formats for analysis`);
    }

    /**
     * Render the format analysis interface
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Format Analysis container not found');
            return;
        }

        const currentFormat = this.formats[this.currentFormatIndex];
        
        const html = `
            <div class="format-analysis-wrapper">
                <!-- Format Navigation -->
                <div class="format-navigation">
                    <h2>🔍 Explore Data Formats</h2>
                    <p class="nav-subtitle">Click on any format to dive deep into its characteristics</p>
                    <div class="format-tabs">
                        ${this.formats.map((format, index) => `
                            <button class="format-tab ${index === this.currentFormatIndex ? 'active' : ''}" 
                                    data-format-index="${index}"
                                    style="border-color: ${format.color}; ${index === this.currentFormatIndex ? `background: ${format.color}; color: white;` : ''}">
                                <div class="tab-icon">${format.icon}</div>
                                <div class="tab-name">${format.name}</div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Format Details -->
                <div class="format-details" style="border-top: 4px solid ${currentFormat.color}">
                    <div class="format-header">
                        <div class="format-title">
                            <div class="format-icon-large">${currentFormat.icon}</div>
                            <div class="format-info">
                                <h3>${currentFormat.name}</h3>
                                <p class="format-full-name">${currentFormat.fullName}</p>
                                <span class="format-type">${currentFormat.type}</span>
                            </div>
                        </div>
                        <div class="format-description">
                            <p>${currentFormat.description}</p>
                            <div class="format-analogy">
                                <strong>💡 Think of it like:</strong> ${currentFormat.analogy}
                            </div>
                        </div>
                    </div>

                    <!-- Format Content Tabs -->
                    <div class="content-tabs">
                        <button class="content-tab active" data-tab="overview">Overview</button>
                        <button class="content-tab" data-tab="performance">Performance</button>
                        <button class="content-tab" data-tab="ml-applications">ML Applications</button>
                        <button class="content-tab" data-tab="aws-integration">AWS Integration</button>
                    </div>

                    <!-- Tab Content -->
                    <div class="tab-content">
                        <div class="tab-panel active" id="overview-panel">
                            ${this.renderOverviewPanel(currentFormat)}
                        </div>
                        <div class="tab-panel" id="performance-panel">
                            ${this.renderPerformancePanel(currentFormat)}
                        </div>
                        <div class="tab-panel" id="ml-applications-panel">
                            ${this.renderMLApplicationsPanel(currentFormat)}
                        </div>
                        <div class="tab-panel" id="aws-integration-panel">
                            ${this.renderAWSIntegrationPanel(currentFormat)}
                        </div>
                    </div>
                </div>

                <!-- Format Comparison -->
                <div class="format-comparison">
                    <h3>📊 Quick Comparison</h3>
                    <div class="comparison-grid">
                        ${this.formats.map(format => `
                            <div class="comparison-card ${format.id === currentFormat.id ? 'highlighted' : ''}" 
                                 style="border-color: ${format.color}">
                                <div class="comparison-header">
                                    <span class="comparison-icon">${format.icon}</span>
                                    <strong>${format.name}</strong>
                                </div>
                                <div class="comparison-metrics">
                                    <div class="metric">
                                        <span class="metric-label">Speed</span>
                                        <div class="metric-bar">
                                            <div class="metric-fill" style="width: ${format.performance.readSpeed}%; background: ${format.color}"></div>
                                        </div>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">Compression</span>
                                        <div class="metric-bar">
                                            <div class="metric-fill" style="width: ${format.performance.compression}%; background: ${format.color}"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="comparison-best-for">
                                    <small>${format.bestFor}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Render overview panel
     */
    renderOverviewPanel(format) {
        return `
            <div class="overview-content">
                <div class="overview-grid">
                    <div class="overview-section">
                        <h4>✨ Key Features</h4>
                        <ul class="feature-list">
                            ${format.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="overview-section">
                        <h4>✅ Advantages</h4>
                        <ul class="advantage-list">
                            ${format.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="overview-section">
                        <h4>❌ Disadvantages</h4>
                        <ul class="disadvantage-list">
                            ${format.disadvantages.map(disadvantage => `<li>${disadvantage}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="overview-section">
                        <h4>🎯 Common Use Cases</h4>
                        <ul class="use-case-list">
                            ${format.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="decision-guidance">
                    <div class="guidance-card best-for">
                        <h4>👍 Best For</h4>
                        <p>${format.bestFor}</p>
                    </div>
                    <div class="guidance-card avoid-when">
                        <h4>👎 Avoid When</h4>
                        <p>${format.avoidWhen}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render performance panel
     */
    renderPerformancePanel(format) {
        return `
            <div class="performance-content">
                <div class="performance-metrics">
                    <h4>📈 Performance Characteristics</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-icon">📖</span>
                                <span class="metric-name">Read Speed</span>
                            </div>
                            <div class="metric-bar-container">
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${format.performance.readSpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="metric-value">${format.performance.readSpeed}%</span>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-icon">✍️</span>
                                <span class="metric-name">Write Speed</span>
                            </div>
                            <div class="metric-bar-container">
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${format.performance.writeSpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="metric-value">${format.performance.writeSpeed}%</span>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-icon">🗜️</span>
                                <span class="metric-name">Compression</span>
                            </div>
                            <div class="metric-bar-container">
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${format.performance.compression}%; background: ${format.color}"></div>
                                </div>
                                <span class="metric-value">${format.performance.compression}%</span>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-icon">🔍</span>
                                <span class="metric-name">Query Speed</span>
                            </div>
                            <div class="metric-bar-container">
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${format.performance.querySpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="metric-value">${format.performance.querySpeed}%</span>
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-header">
                                <span class="metric-icon">💾</span>
                                <span class="metric-name">Storage Efficiency</span>
                            </div>
                            <div class="metric-bar-container">
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${format.performance.storageEfficiency}%; background: ${format.color}"></div>
                                </div>
                                <span class="metric-value">${format.performance.storageEfficiency}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="performance-insights">
                    <h4>💡 Performance Insights</h4>
                    <div class="insights-content">
                        ${this.getPerformanceInsights(format)}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render ML applications panel
     */
    renderMLApplicationsPanel(format) {
        return `
            <div class="ml-applications-content">
                <h4>🤖 Machine Learning Applications</h4>
                <div class="ml-applications-grid">
                    ${format.mlApplications.map(application => `
                        <div class="ml-application-card">
                            <div class="application-icon">🎯</div>
                            <div class="application-text">${application}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="ml-scenarios">
                    <h4>📋 ML Scenario Examples</h4>
                    ${this.getMLScenarios(format)}
                </div>
            </div>
        `;
    }

    /**
     * Render AWS integration panel
     */
    renderAWSIntegrationPanel(format) {
        return `
            <div class="aws-integration-content">
                <h4>☁️ AWS Service Integration</h4>
                <div class="aws-services-grid">
                    ${format.awsServices.map(service => {
                        const [serviceName, description] = service.split(' - ');
                        return `
                            <div class="aws-service-card">
                                <div class="service-header">
                                    <span class="service-icon">⚡</span>
                                    <strong>${serviceName}</strong>
                                </div>
                                <p class="service-description">${description}</p>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="integration-tips">
                    <h4>💡 Integration Tips</h4>
                    ${this.getIntegrationTips(format)}
                </div>
            </div>
        `;
    }

    /**
     * Get performance insights for a format
     */
    getPerformanceInsights(format) {
        const insights = {
            csv: `
                <div class="insight-item">
                    <strong>Read Performance:</strong> Moderate speed due to text parsing overhead. Consider using tools with optimized CSV readers for large files.
                </div>
                <div class="insight-item">
                    <strong>Compression:</strong> Limited compression due to text format. Consider gzip compression for storage and transfer.
                </div>
                <div class="insight-item">
                    <strong>Best Practice:</strong> Use CSV for small to medium datasets where human readability is important.
                </div>
            `,
            json: `
                <div class="insight-item">
                    <strong>Read Performance:</strong> Parsing overhead can be significant for large files. Consider streaming parsers for big datasets.
                </div>
                <div class="insight-item">
                    <strong>Flexibility Trade-off:</strong> Schema flexibility comes at the cost of storage efficiency and parsing speed.
                </div>
                <div class="insight-item">
                    <strong>Best Practice:</strong> Ideal for APIs and configuration files, but consider alternatives for large analytical datasets.
                </div>
            `,
            parquet: `
                <div class="insight-item">
                    <strong>Columnar Advantage:</strong> Excellent for analytical queries that only need specific columns. Skip unnecessary data reads.
                </div>
                <div class="insight-item">
                    <strong>Compression Excellence:</strong> Advanced compression algorithms can reduce file sizes by 75-90% compared to CSV.
                </div>
                <div class="insight-item">
                    <strong>Best Practice:</strong> Perfect for data lakes and ML training datasets. Use partitioning for even better performance.
                </div>
            `,
            orc: `
                <div class="insight-item">
                    <strong>Maximum Efficiency:</strong> Often outperforms Parquet in Hive environments with superior compression and query speed.
                </div>
                <div class="insight-item">
                    <strong>Built-in Optimization:</strong> Automatic indexing and statistics collection improve query performance significantly.
                </div>
                <div class="insight-item">
                    <strong>Best Practice:</strong> Choose ORC for Hive-based data warehouses and when maximum performance is critical.
                </div>
            `
        };
        
        return insights[format.id] || '<div class="insight-item">Performance insights coming soon...</div>';
    }

    /**
     * Get ML scenarios for a format
     */
    getMLScenarios(format) {
        const scenarios = {
            csv: `
                <div class="scenario-card">
                    <h5>🎯 Feature Engineering Pipeline</h5>
                    <p>Export processed features from pandas DataFrame to CSV for model training input. Easy to inspect and validate feature quality.</p>
                </div>
                <div class="scenario-card">
                    <h5>📊 Model Results Export</h5>
                    <p>Save prediction results and model metrics to CSV for business stakeholders to analyze in Excel or other familiar tools.</p>
                </div>
            `,
            json: `
                <div class="scenario-card">
                    <h5>⚙️ Model Configuration</h5>
                    <p>Store hyperparameters, model architecture, and training configurations in JSON for reproducible ML experiments.</p>
                </div>
                <div class="scenario-card">
                    <h5>🔗 API Data Ingestion</h5>
                    <p>Collect training data from REST APIs that return JSON responses, handling nested user behavior and event data.</p>
                </div>
            `,
            parquet: `
                <div class="scenario-card">
                    <h5>🏗️ Data Lake Training Sets</h5>
                    <p>Store large-scale training datasets in S3 data lakes with Parquet for efficient access by SageMaker and EMR clusters.</p>
                </div>
                <div class="scenario-card">
                    <h5>🔄 Feature Store Implementation</h5>
                    <p>Build feature stores with Parquet for fast feature retrieval during model training and batch inference jobs.</p>
                </div>
            `,
            orc: `
                <div class="scenario-card">
                    <h5>🏢 Enterprise ML Pipelines</h5>
                    <p>Process massive datasets in Hive-based data warehouses for enterprise ML models with maximum performance requirements.</p>
                </div>
                <div class="scenario-card">
                    <h5>📈 Historical Analysis</h5>
                    <p>Analyze years of historical data for time series forecasting and trend analysis with optimal query performance.</p>
                </div>
            `
        };
        
        return scenarios[format.id] || '<div class="scenario-card">ML scenarios coming soon...</div>';
    }

    /**
     * Get integration tips for a format
     */
    getIntegrationTips(format) {
        const tips = {
            csv: `
                <div class="tip-item">
                    <strong>S3 + Athena:</strong> Use GZIP compression and proper partitioning for better query performance on large CSV files.
                </div>
                <div class="tip-item">
                    <strong>SageMaker:</strong> CSV is natively supported for training data input. Ensure proper header configuration for feature names.
                </div>
            `,
            json: `
                <div class="tip-item">
                    <strong>DynamoDB:</strong> JSON maps naturally to DynamoDB items. Use nested attributes for complex data structures.
                </div>
                <div class="tip-item">
                    <strong>Lambda:</strong> Perfect for processing JSON events and API Gateway integrations in serverless ML pipelines.
                </div>
            `,
            parquet: `
                <div class="tip-item">
                    <strong>S3 + Athena:</strong> Enable partition projection and use columnar queries for maximum performance benefits.
                </div>
                <div class="tip-item">
                    <strong>Glue ETL:</strong> Use Glue's built-in Parquet support for efficient data transformations and format conversions.
                </div>
            `,
            orc: `
                <div class="tip-item">
                    <strong>EMR + Hive:</strong> ORC is optimized for Hive queries. Use vectorized query execution for best performance.
                </div>
                <div class="tip-item">
                    <strong>Glue Catalog:</strong> Register ORC tables in Glue Catalog for cross-service compatibility and metadata management.
                </div>
            `
        };
        
        return tips[format.id] || '<div class="tip-item">Integration tips coming soon...</div>';
    }

    /**
     * Setup event handlers
     */
    setupEventHandlers() {
        // Format tab navigation
        const formatTabs = document.querySelectorAll('.format-tab');
        formatTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const formatIndex = parseInt(e.currentTarget.dataset.formatIndex);
                this.switchFormat(formatIndex);
            });
        });

        // Content tab navigation
        const contentTabs = document.querySelectorAll('.content-tab');
        contentTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchContentTab(tabName);
            });
        });
    }

    /**
     * Switch to a different format
     */
    switchFormat(formatIndex) {
        if (formatIndex >= 0 && formatIndex < this.formats.length) {
            this.currentFormatIndex = formatIndex;
            this.render();
            this.setupEventHandlers();
        }
    }

    /**
     * Switch content tab
     */
    switchContentTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.content-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tabName}-panel`).classList.add('active');
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
    module.exports = InteractiveFormatAnalysis;
}
