/**
 * Interactive Format Analysis Component
 * Allows users to explore data formats with navigation similar to Service Analysis
 * 
 * @author MLA Tutorial Team
 * @version 2.0.0
 * @since 2025-07-02
 */

class InteractiveFormatAnalysis {
    constructor() {
        this.currentFormatIndex = 0;
        this.formats = [];
        this.initialized = false;
        this.containerId = 'formatAnalysisContainer';
    }

    /**
     * Initialize the Interactive Format Analysis
     */
    async init() {
        try {
            Utils.log('Initializing Interactive Format Analysis...');
            
            this.setupFormats();
            this.render();
            this.setupNavigation();
            
            this.initialized = true;
            Utils.log('Interactive Format Analysis initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize Interactive Format Analysis:', error);
            throw error;
        }
    }

    /**
     * Setup data formats information
     */
    setupFormats() {
        this.formats = [
            {
                id: 'csv',
                name: 'CSV',
                fullName: 'Comma-Separated Values',
                icon: 'fas fa-table',
                color: '#48bb78',
                description: 'Simple, human-readable format perfect for tabular data with rows and columns.',
                keyFeatures: [
                    'Human-readable text format',
                    'Universal compatibility across tools',
                    'Simple row and column structure',
                    'Easy to edit manually',
                    'Widely supported by all platforms'
                ],
                useCases: [
                    'Data exchange between systems',
                    'Small to medium datasets',
                    'Spreadsheet-compatible data',
                    'Configuration and settings files',
                    'Simple ML feature datasets'
                ],
                pricing: {
                    model: 'Storage-based',
                    factors: ['File size', 'Storage duration', 'Access frequency'],
                    efficiency: 'Low compression, larger file sizes'
                },
                mlUseCase: 'Perfect for simple tabular ML datasets, feature engineering outputs, and model prediction results.',
                performance: {
                    readSpeed: 60,
                    writeSpeed: 70,
                    compression: 20,
                    querySpeed: 40,
                    storageEfficiency: 30
                }
            },
            {
                id: 'json',
                name: 'JSON',
                fullName: 'JavaScript Object Notation',
                icon: 'fas fa-code',
                color: '#4299e1',
                description: 'Flexible, hierarchical format ideal for nested and semi-structured data.',
                keyFeatures: [
                    'Hierarchical data structure support',
                    'Human-readable text format',
                    'Native web and API compatibility',
                    'Flexible schema design',
                    'Supports complex nested objects'
                ],
                useCases: [
                    'API data exchange',
                    'Configuration files',
                    'NoSQL database storage',
                    'Web application data',
                    'Semi-structured ML datasets'
                ],
                pricing: {
                    model: 'Storage and processing-based',
                    factors: ['File size', 'Parsing complexity', 'Query patterns'],
                    efficiency: 'Moderate compression, flexible structure'
                },
                mlUseCase: 'Excellent for complex ML datasets with nested features, model configurations, and API-based ML services.',
                performance: {
                    readSpeed: 50,
                    writeSpeed: 60,
                    compression: 35,
                    querySpeed: 45,
                    storageEfficiency: 40
                }
            },
            {
                id: 'parquet',
                name: 'Parquet',
                fullName: 'Apache Parquet',
                icon: 'fas fa-compress-arrows-alt',
                color: '#ed8936',
                description: 'Columnar storage format optimized for analytics and big data processing.',
                keyFeatures: [
                    'Columnar storage architecture',
                    'Excellent compression ratios',
                    'Schema evolution support',
                    'Predicate pushdown optimization',
                    'Cross-platform compatibility'
                ],
                useCases: [
                    'Big data analytics',
                    'Data warehousing',
                    'ETL pipeline outputs',
                    'Long-term data archival',
                    'Large-scale ML datasets'
                ],
                pricing: {
                    model: 'Highly cost-effective',
                    factors: ['Compressed storage size', 'Query performance gains'],
                    efficiency: 'Excellent compression, reduced storage costs'
                },
                mlUseCase: 'Ideal for large-scale ML training datasets, feature stores, and high-performance analytics workloads.',
                performance: {
                    readSpeed: 90,
                    writeSpeed: 75,
                    compression: 95,
                    querySpeed: 85,
                    storageEfficiency: 90
                }
            },
            {
                id: 'orc',
                name: 'ORC',
                fullName: 'Optimized Row Columnar',
                icon: 'fas fa-layer-group',
                color: '#9f7aea',
                description: 'High-performance columnar format with advanced optimization features.',
                keyFeatures: [
                    'Hybrid row-columnar storage',
                    'Built-in indexing and statistics',
                    'ACID transaction support',
                    'Advanced compression algorithms',
                    'Optimized for Hive and Spark'
                ],
                useCases: [
                    'Enterprise data warehouses',
                    'Hive and Spark analytics',
                    'Transactional data processing',
                    'Complex analytical queries',
                    'Enterprise ML pipelines'
                ],
                pricing: {
                    model: 'Performance-optimized',
                    factors: ['Storage efficiency', 'Query acceleration', 'Processing speed'],
                    efficiency: 'Superior compression and query performance'
                },
                mlUseCase: 'Perfect for enterprise ML environments requiring high performance, ACID compliance, and complex analytics.',
                performance: {
                    readSpeed: 85,
                    writeSpeed: 80,
                    compression: 90,
                    querySpeed: 90,
                    storageEfficiency: 85
                }
            }
        ];
    }

    /**
     * Render the interactive format analysis
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            console.error('Format Analysis container not found');
            return;
        }

        const format = this.formats[this.currentFormatIndex];
        
        const html = `
            <div class="format-analysis-wrapper">
                <!-- Format Navigation Header -->
                <div class="format-nav-header">
                    <button class="format-nav-btn prev-format" id="prevFormatBtn" ${this.currentFormatIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i>
                        Previous Format
                    </button>
                    
                    <div class="format-counter">
                        <span class="current-format">${this.currentFormatIndex + 1}</span>
                        <span class="format-separator">of</span>
                        <span class="total-formats">${this.formats.length}</span>
                        <div class="format-dots">
                            ${this.formats.map((_, index) => 
                                `<div class="format-dot ${index === this.currentFormatIndex ? 'active' : ''}" data-format="${index}"></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <button class="format-nav-btn next-format" id="nextFormatBtn" ${this.currentFormatIndex === this.formats.length - 1 ? 'disabled' : ''}>
                        Next Format
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <!-- Format Details Card -->
                <div class="format-card-detailed">
                    <div class="format-header">
                        <div class="format-icon-large" style="background: ${format.color}">
                            <i class="${format.icon}"></i>
                        </div>
                        <div class="format-title-section">
                            <h2 class="format-name">${format.name}</h2>
                            <p class="format-full-name">${format.fullName}</p>
                        </div>
                    </div>

                    <div class="format-description">
                        <p>${format.description}</p>
                    </div>

                    <div class="format-details-grid">
                        <!-- Key Features -->
                        <div class="detail-section">
                            <h3><i class="fas fa-star"></i> Key Features</h3>
                            <ul class="feature-list">
                                ${format.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                        <!-- Use Cases -->
                        <div class="detail-section">
                            <h3><i class="fas fa-lightbulb"></i> Common Use Cases</h3>
                            <ul class="use-case-list">
                                ${format.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                            </ul>
                        </div>

                        <!-- Storage & Cost -->
                        <div class="detail-section">
                            <h3><i class="fas fa-dollar-sign"></i> Storage & Cost</h3>
                            <div class="pricing-info">
                                <p class="pricing-model"><strong>Model:</strong> ${format.pricing.model}</p>
                                <p class="pricing-factors"><strong>Factors:</strong> ${format.pricing.factors.join(', ')}</p>
                                <p class="pricing-efficiency"><strong>Efficiency:</strong> ${format.pricing.efficiency}</p>
                            </div>
                        </div>

                        <!-- ML Applications -->
                        <div class="detail-section ml-section">
                            <h3><i class="fas fa-brain"></i> ML Applications</h3>
                            <div class="ml-use-case">
                                <p>${format.mlUseCase}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div class="performance-section">
                        <h3><i class="fas fa-tachometer-alt"></i> Performance Metrics</h3>
                        <div class="performance-grid">
                            <div class="performance-metric">
                                <label>Read Speed</label>
                                <div class="performance-bar">
                                    <div class="performance-fill" style="width: ${format.performance.readSpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="performance-value">${format.performance.readSpeed}%</span>
                            </div>
                            <div class="performance-metric">
                                <label>Write Speed</label>
                                <div class="performance-bar">
                                    <div class="performance-fill" style="width: ${format.performance.writeSpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="performance-value">${format.performance.writeSpeed}%</span>
                            </div>
                            <div class="performance-metric">
                                <label>Compression</label>
                                <div class="performance-bar">
                                    <div class="performance-fill" style="width: ${format.performance.compression}%; background: ${format.color}"></div>
                                </div>
                                <span class="performance-value">${format.performance.compression}%</span>
                            </div>
                            <div class="performance-metric">
                                <label>Query Speed</label>
                                <div class="performance-bar">
                                    <div class="performance-fill" style="width: ${format.performance.querySpeed}%; background: ${format.color}"></div>
                                </div>
                                <span class="performance-value">${format.performance.querySpeed}%</span>
                            </div>
                            <div class="performance-metric">
                                <label>Storage Efficiency</label>
                                <div class="performance-bar">
                                    <div class="performance-fill" style="width: ${format.performance.storageEfficiency}%; background: ${format.color}"></div>
                                </div>
                                <span class="performance-value">${format.performance.storageEfficiency}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        DOMUtils.setContent(container, html, true);
    }

    /**
     * Setup navigation event listeners
     */
    setupNavigation() {
        // Previous format button
        const prevBtn = DOMUtils.getElementById('prevFormatBtn');
        if (prevBtn) {
            DOMUtils.addEventListener(prevBtn, 'click', () => {
                this.previousFormat();
            });
        }

        // Next format button
        const nextBtn = DOMUtils.getElementById('nextFormatBtn');
        if (nextBtn) {
            DOMUtils.addEventListener(nextBtn, 'click', () => {
                this.nextFormat();
            });
        }

        // Format dots navigation
        const formatDots = DOMUtils.querySelectorAll('.format-dot');
        formatDots.forEach(dot => {
            DOMUtils.addEventListener(dot, 'click', (e) => {
                const formatIndex = parseInt(e.target.getAttribute('data-format'));
                this.goToFormat(formatIndex);
            });
        });

        // Keyboard navigation
        DOMUtils.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousFormat();
            } else if (e.key === 'ArrowRight') {
                this.nextFormat();
            }
        });
    }

    /**
     * Navigate to previous format
     */
    previousFormat() {
        if (this.currentFormatIndex > 0) {
            this.currentFormatIndex--;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to previous format: ${this.formats[this.currentFormatIndex].name}`);
        }
    }

    /**
     * Navigate to next format
     */
    nextFormat() {
        if (this.currentFormatIndex < this.formats.length - 1) {
            this.currentFormatIndex++;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to next format: ${this.formats[this.currentFormatIndex].name}`);
        }
    }

    /**
     * Navigate to specific format
     * @param {number} formatIndex - Index of format to navigate to
     */
    goToFormat(formatIndex) {
        if (formatIndex >= 0 && formatIndex < this.formats.length) {
            this.currentFormatIndex = formatIndex;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to format: ${this.formats[this.currentFormatIndex].name}`);
        }
    }

    /**
     * Get current format information
     * @returns {Object} Current format data
     */
    getCurrentFormat() {
        return this.formats[this.currentFormatIndex];
    }

    /**
     * Reset to first format
     */
    reset() {
        Utils.log('Resetting format analysis to first format...');
        this.currentFormatIndex = 0;
        if (this.initialized) {
            this.render();
            this.setupNavigation();
        }
    }

    /**
     * Get analysis state
     * @returns {Object} Current state information
     */
    getState() {
        return {
            currentFormatIndex: this.currentFormatIndex,
            totalFormats: this.formats.length,
            currentFormat: this.getCurrentFormat(),
            initialized: this.initialized
        };
    }

    /**
     * Cleanup resources
     */
    destroy() {
        Utils.log('Destroying Interactive Format Analysis...');
        
        // Remove event listeners
        const container = DOMUtils.getElementById(this.containerId);
        if (container) {
            DOMUtils.setContent(container, '');
        }
        
        this.initialized = false;
        this.currentFormatIndex = 0;
    }
}

// Make InteractiveFormatAnalysis available globally
window.InteractiveFormatAnalysis = InteractiveFormatAnalysis;
