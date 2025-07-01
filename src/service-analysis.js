/**
 * Service Analysis Controller Module
 * Handles the navigable service analysis with detailed pros/cons for each AWS storage service
 * 
 * @module ServiceAnalysisController
 * @requires AppState, Utils, DOMUtils, UIController
 */

'use strict';

/**
 * Service Analysis Controller
 * Manages the step-by-step analysis of AWS storage services
 */
const ServiceAnalysisController = {
    // Analysis state
    state: {
        initialized: false,
        analysisActive: false,
        currentService: 0,
        totalServices: 6, // 5 services + 1 decision guide
        viewHistory: []
    },
    
    // Service data with comprehensive analysis
    services: [
        {
            id: 's3',
            name: 'Amazon S3',
            subtitle: 'Object Storage',
            description: 'Your digital warehouse for any type of file',
            icon: 'fas fa-archive',
            color: '#ff9500',
            bgGradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
            borderColor: '#ff9500',
            strengths: [
                '🌍 Unlimited Storage: Store as much as you want',
                '💰 Cost-Effective: Pay only for what you use',
                '🔒 99.999999999% Durable: Your data is super safe',
                '📁 Any File Type: Images, videos, documents, datasets',
                '🌐 Global Access: Access from anywhere'
            ],
            limitations: [
                '⏱️ Not Real-Time: Slower than local storage',
                '🚫 Not a File System: Can\'t mount like a drive',
                '💸 Transfer Costs: Charges for moving data',
                '🔄 Eventual Consistency: Updates take time'
            ],
            perfectFor: [
                '📊 ML training datasets',
                '🗄️ Backup and archival',
                '📱 Static websites',
                '🎬 Media storage'
            ],
            avoidFor: [
                '⚡ Real-time databases',
                '💾 Operating system files',
                '🔄 Frequently changing files',
                '📁 File system operations'
            ]
        },
        {
            id: 'ebs',
            name: 'Amazon EBS',
            subtitle: 'Block Storage',
            description: 'High-performance storage for your EC2 instances',
            icon: 'fas fa-hdd',
            color: '#2196f3',
            bgGradient: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
            borderColor: '#2196f3',
            strengths: [
                '⚡ Lightning Fast: High IOPS performance',
                '🎯 Low Latency: Millisecond response',
                '📈 Scalable: Resize without downtime',
                '💾 Persistent: Data survives reboots',
                '📸 Snapshots: Easy backup/restore'
            ],
            limitations: [
                '🔗 Single Attachment: One EC2 at a time',
                '🌍 Zone Locked: Tied to one zone',
                '💰 More Expensive: Higher cost than S3',
                '📏 Size Limits: Maximum volume restrictions'
            ],
            perfectFor: [
                '🤖 ML model training',
                '💾 Database storage',
                '💻 OS drives',
                '🎮 High-performance apps'
            ],
            avoidFor: [
                '👥 Multi-instance sharing',
                '🗄️ Long-term archival',
                '🌐 Cross-region access',
                '📱 Static content'
            ]
        },
        {
            id: 'efs',
            name: 'Amazon EFS',
            subtitle: 'File System',
            description: 'Shared file system for multiple EC2 instances',
            icon: 'fas fa-folder-open',
            color: '#4caf50',
            bgGradient: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
            borderColor: '#4caf50',
            strengths: [
                '👥 Multi-Access: Thousands of EC2s simultaneously',
                '📈 Auto-Scaling: Grows automatically',
                '🌍 Multi-AZ: Cross availability zones',
                '📁 POSIX Compatible: Standard file interface',
                '🔒 Secure: Encryption built-in'
            ],
            limitations: [
                '💰 Expensive: Higher cost per GB than EBS/S3',
                '🐧 Linux Only: No Windows support',
                '⏱️ Higher Latency: Slower than EBS',
                '🔧 Complex Setup: Network config needed'
            ],
            perfectFor: [
                '🤝 Distributed ML training',
                '📊 Shared data processing',
                '🌐 Web server farms',
                '📁 Content repositories'
            ],
            avoidFor: [
                '💰 Cost-sensitive applications',
                '🪟 Windows workloads',
                '⚡ Ultra-low latency needs',
                '🔒 Single-instance apps'
            ]
        },
        {
            id: 'rds',
            name: 'Amazon RDS',
            subtitle: 'SQL Database',
            description: 'Managed relational database service',
            icon: 'fas fa-table',
            color: '#e91e63',
            bgGradient: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
            borderColor: '#e91e63',
            strengths: [
                '🔍 SQL Queries: Complex joins & relationships',
                '🛠️ Fully Managed: AWS handles maintenance',
                '📊 ACID Compliant: Data consistency guaranteed',
                '📈 Read Replicas: Scale performance',
                '🔄 Auto Backups: Point-in-time recovery'
            ],
            limitations: [
                '💰 Expensive: Higher cost than NoSQL',
                '📏 Scaling Limits: Vertical scaling challenges',
                '⏱️ Not Real-Time: Not for millisecond responses',
                '🔧 Rigid Schema: Structure changes complex'
            ],
            perfectFor: [
                '👥 Customer relationship management',
                '💰 Financial transactions',
                '📊 Business intelligence',
                '🛒 E-commerce platforms'
            ],
            avoidFor: [
                '⚡ Real-time gaming data',
                '📱 Simple key-value storage',
                '🌍 Massive scale applications',
                '🔄 Rapidly changing schemas'
            ]
        },
        {
            id: 'dynamodb',
            name: 'Amazon DynamoDB',
            subtitle: 'NoSQL Database',
            description: 'Lightning-fast NoSQL database',
            icon: 'fas fa-sticky-note',
            color: '#9c27b0',
            bgGradient: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
            borderColor: '#9c27b0',
            strengths: [
                '⚡ Ultra-Fast: Single-digit millisecond latency',
                '🌍 Massive Scale: Millions of requests per second',
                '🔄 Auto-Scaling: Scales up/down automatically',
                '🛠️ Serverless: No server management needed',
                '💰 Pay-per-Use: Only pay for consumption'
            ],
            limitations: [
                '🚫 No SQL: Limited query capabilities',
                '🔗 No Joins: Can\'t combine tables easily',
                '📏 Item Size Limit: 400KB max per item',
                '💰 Can Be Expensive: At high throughput'
            ],
            perfectFor: [
                '🎮 Gaming leaderboards',
                '📱 Mobile app backends',
                '🛒 Shopping carts',
                '💬 Chat applications'
            ],
            avoidFor: [
                '🔍 Complex SQL queries',
                '📊 Business intelligence',
                '🔗 Multi-table joins',
                '📁 Large file storage'
            ]
        }
    ],
    
    /**
     * Initialize the service analysis controller
     */
    init() {
        try {
            Utils.log('Initializing ServiceAnalysisController...');
            
            this.resetAnalysisState();
            this.state.initialized = true;
            
            Utils.log('ServiceAnalysisController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize ServiceAnalysisController:', error);
        }
    },
    
    /**
     * Start the service analysis
     */
    start() {
        try {
            Utils.log('Starting service analysis...');
            
            this.resetAnalysisState();
            this.renderAnalysis();
            
            this.state.analysisActive = true;
            
            Utils.log('Service analysis started successfully');
            
        } catch (error) {
            console.error('Failed to start service analysis:', error);
            UIController.showErrorMessage('Failed to start the service analysis. Please try again.');
        }
    },
    
    /**
     * Reset analysis state to initial values
     */
    resetAnalysisState() {
        this.state = {
            ...this.state,
            analysisActive: false,
            currentService: 0,
            viewHistory: []
        };
    },
    
    /**
     * Render the service analysis interface
     */
    renderAnalysis() {
        const container = DOMUtils.getElementById('serviceAnalysisContainer');
        if (!container) {
            throw new Error('Service analysis container not found');
        }
        
        const analysisHTML = this.generateAnalysisHTML();
        DOMUtils.setContent(container, analysisHTML, true);
        
        // Animate analysis entrance
        UIController.animateIn(container, 'slideInUp');
    },
    
    /**
     * Generate the complete analysis HTML
     * @returns {string} Analysis HTML
     */
    generateAnalysisHTML() {
        if (this.state.currentService < this.services.length) {
            return this.renderServiceCard(this.services[this.state.currentService]);
        } else {
            return this.renderDecisionGuide();
        }
    },
    
    /**
     * Render individual service analysis card
     * @param {Object} service - Service data object
     * @returns {string} Service card HTML
     */
    renderServiceCard(service) {
        return `
            <div class="service-analysis-card" style="background: ${service.bgGradient}; border-left: 5px solid ${service.borderColor};">
                <!-- Service Header -->
                <header class="service-header">
                    <div class="service-icon" style="background: linear-gradient(135deg, ${service.color}, ${service.color}dd);">
                        <i class="${service.icon}" aria-hidden="true"></i>
                    </div>
                    <div class="service-info">
                        <h3 style="color: ${service.color};">${service.name} - ${service.subtitle}</h3>
                        <p style="color: #666;">${service.description}</p>
                    </div>
                </header>
                
                <!-- Analysis Content -->
                <div class="analysis-content">
                    <!-- Strengths and Limitations -->
                    <div class="analysis-grid">
                        <div class="analysis-section strengths">
                            <h4><i class="fas fa-thumbs-up" aria-hidden="true"></i> Strengths</h4>
                            <ul>
                                ${service.strengths.map(strength => `<li><strong>${strength}</strong></li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="analysis-section limitations">
                            <h4><i class="fas fa-thumbs-down" aria-hidden="true"></i> Limitations</h4>
                            <ul>
                                ${service.limitations.map(limitation => `<li><strong>${limitation}</strong></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Use Cases -->
                    <div class="use-cases-grid">
                        <div class="use-case-section perfect-for">
                            <h4><i class="fas fa-check-circle" aria-hidden="true"></i> Perfect For</h4>
                            <ul>
                                ${service.perfectFor.map(use => `<li>${use}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="use-case-section avoid-for">
                            <h4><i class="fas fa-times-circle" aria-hidden="true"></i> Avoid For</h4>
                            <ul>
                                ${service.avoidFor.map(avoid => `<li>${avoid}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation Controls -->
                <div class="analysis-navigation">
                    <button class="btn btn-secondary" 
                            onclick="ServiceAnalysisController.previous()" 
                            ${this.state.currentService === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left" aria-hidden="true"></i> Previous
                    </button>
                    
                    <div class="nav-progress">
                        <div class="progress-text">
                            ${this.state.currentService + 1} of ${this.state.totalServices}
                        </div>
                        <div class="progress-indicators">
                            ${this.generateProgressIndicators(service.color)}
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="ServiceAnalysisController.next()">
                        ${this.state.currentService === this.state.totalServices - 1 ? 
                            '<i class="fas fa-flag-checkered" aria-hidden="true"></i> Finish' : 
                            'Next <i class="fas fa-chevron-right" aria-hidden="true"></i>'}
                    </button>
                </div>
            </div>
        `;
    },
    
    /**
     * Render decision guide (final step)
     * @returns {string} Decision guide HTML
     */
    renderDecisionGuide() {
        return `
            <div class="decision-guide">
                <header class="guide-header">
                    <h3><i class="fas fa-compass" aria-hidden="true"></i> Quick Decision Guide</h3>
                    <p>Choose the right AWS storage service for your specific use case</p>
                </header>
                
                <div class="decision-scenarios">
                    ${this.generateDecisionScenarios()}
                </div>
                
                <!-- Navigation Controls -->
                <div class="analysis-navigation">
                    <button class="btn btn-secondary" onclick="ServiceAnalysisController.previous()">
                        <i class="fas fa-chevron-left" aria-hidden="true"></i> Previous
                    </button>
                    
                    <div class="nav-progress">
                        <div class="progress-text">
                            ${this.state.currentService + 1} of ${this.state.totalServices}
                        </div>
                        <div class="progress-indicators">
                            ${this.generateProgressIndicators('#424242')}
                        </div>
                    </div>
                    
                    <button class="btn btn-success" onclick="ServiceAnalysisController.complete()">
                        <i class="fas fa-check" aria-hidden="true"></i> Complete Analysis
                    </button>
                </div>
            </div>
        `;
    },
    
    /**
     * Generate decision scenarios HTML
     * @returns {string} Decision scenarios HTML
     */
    generateDecisionScenarios() {
        const scenarios = [
            {
                title: '🤖 ML Model Training',
                description: 'Need fast storage for intensive training workloads',
                recommendation: 'Amazon EBS',
                reason: 'High IOPS, low latency, perfect for training',
                color: '#1976d2'
            },
            {
                title: '📊 Dataset Storage',
                description: 'Store large training datasets cost-effectively',
                recommendation: 'Amazon S3',
                reason: 'Cost-effective, unlimited, highly durable',
                color: '#f57c00'
            },
            {
                title: '👥 Team Collaboration',
                description: 'Share files across multiple servers',
                recommendation: 'Amazon EFS',
                reason: 'Multi-instance access, auto-scaling',
                color: '#388e3c'
            },
            {
                title: '👤 User Data',
                description: 'Customer profiles with complex relationships',
                recommendation: 'Amazon RDS',
                reason: 'SQL queries, ACID compliance, managed',
                color: '#d32f2f'
            },
            {
                title: '🎮 Real-time Apps',
                description: 'Live scores, chat, gaming applications',
                recommendation: 'DynamoDB',
                reason: 'Ultra-fast, auto-scaling, serverless',
                color: '#7b1fa2'
            },
            {
                title: '🗄️ Data Archival',
                description: 'Long-term backup and compliance storage',
                recommendation: 'Amazon S3',
                reason: 'Durable, cost-effective, multiple storage classes',
                color: '#5d4037'
            }
        ];
        
        return scenarios.map(scenario => `
            <div class="scenario-card">
                <div class="scenario-header">
                    <h4 style="color: ${scenario.color};">${scenario.title}</h4>
                    <p>${scenario.description}</p>
                </div>
                <div class="scenario-recommendation" style="background: ${scenario.color}15; border-left: 4px solid ${scenario.color};">
                    <div class="recommendation-title">
                        <strong style="color: ${scenario.color};">Recommended: ${scenario.recommendation}</strong>
                    </div>
                    <div class="recommendation-reason">
                        ${scenario.reason}
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Generate progress indicators
     * @param {string} activeColor - Color for active indicator
     * @returns {string} Progress indicators HTML
     */
    generateProgressIndicators(activeColor) {
        return Array.from({length: this.state.totalServices}, (_, i) => {
            const isActive = i === this.state.currentService;
            const isCompleted = i < this.state.currentService;
            
            let indicatorClass = 'progress-indicator';
            let indicatorStyle = '';
            
            if (isActive) {
                indicatorClass += ' active';
                indicatorStyle = `background: ${activeColor};`;
            } else if (isCompleted) {
                indicatorClass += ' completed';
                indicatorStyle = 'background: #28a745;';
            }
            
            return `<div class="${indicatorClass}" style="${indicatorStyle}"></div>`;
        }).join('');
    },
    
    /**
     * Move to next service/step
     */
    next() {
        if (this.state.currentService < this.state.totalServices - 1) {
            this.state.viewHistory.push(this.state.currentService);
            this.state.currentService++;
            this.updateAnalysisDisplay();
        }
    },
    
    /**
     * Move to previous service/step
     */
    previous() {
        if (this.state.currentService > 0) {
            this.state.currentService--;
            this.updateAnalysisDisplay();
        }
    },
    
    /**
     * Update the analysis display
     */
    updateAnalysisDisplay() {
        const container = DOMUtils.getElementById('serviceAnalysisContainer');
        if (!container) return;
        
        const analysisHTML = this.generateAnalysisHTML();
        
        // Animate transition
        UIController.animateOut(container, 'slideOutLeft', () => {
            DOMUtils.setContent(container, analysisHTML, true);
            UIController.animateIn(container, 'slideInRight');
        });
    },
    
    /**
     * Complete the analysis
     */
    complete() {
        this.state.analysisActive = false;
        
        const container = DOMUtils.getElementById('serviceAnalysisContainer');
        if (!container) return;
        
        const completionHTML = `
            <div class="analysis-completion">
                <div class="completion-header">
                    <div class="completion-icon">🎉</div>
                    <h3>Service Analysis Complete!</h3>
                    <p>You've learned about all 5 AWS storage services and their use cases!</p>
                </div>
                
                <div class="completion-summary">
                    <h4>What You've Learned:</h4>
                    <ul>
                        <li><strong>Amazon S3</strong> - Object storage for datasets and files</li>
                        <li><strong>Amazon EBS</strong> - High-performance block storage</li>
                        <li><strong>Amazon EFS</strong> - Shared file system</li>
                        <li><strong>Amazon RDS</strong> - Managed SQL databases</li>
                        <li><strong>Amazon DynamoDB</strong> - Fast NoSQL database</li>
                    </ul>
                </div>
                
                <div class="completion-actions">
                    <button class="btn btn-primary" onclick="ServiceAnalysisController.start()">
                        <i class="fas fa-redo" aria-hidden="true"></i> Review Again
                    </button>
                    <button class="btn btn-success" onclick="ServiceAnalysisController.showCheatSheet()">
                        <i class="fas fa-file-alt" aria-hidden="true"></i> Show Cheat Sheet
                    </button>
                </div>
            </div>
        `;
        
        DOMUtils.setContent(container, completionHTML, true);
        UIController.animateIn(container, 'bounceIn');
        
        Utils.log('Service analysis completed');
    },
    
    /**
     * Show service comparison cheat sheet
     */
    showCheatSheet() {
        const cheatSheetHTML = `
            <div class="service-cheat-sheet">
                <h4>AWS Storage Services Quick Reference</h4>
                <div class="cheat-sheet-grid">
                    ${this.services.map(service => `
                        <div class="cheat-item" style="border-left: 4px solid ${service.color};">
                            <div class="cheat-header">
                                <i class="${service.icon}" style="color: ${service.color};" aria-hidden="true"></i>
                                <strong>${service.name}</strong>
                            </div>
                            <div class="cheat-content">
                                <p><strong>Best for:</strong> ${service.perfectFor[0].replace(/^[^a-zA-Z]+/, '')}</p>
                                <p><strong>Key strength:</strong> ${service.strengths[0].replace(/^[^a-zA-Z]+/, '')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        UIController.showModal({
            title: 'AWS Storage Services Cheat Sheet',
            icon: 'fas fa-file-alt',
            content: cheatSheetHTML
        });
    },
    
    /**
     * Jump to specific service
     * @param {number} serviceIndex - Index of service to jump to
     */
    jumpToService(serviceIndex) {
        if (serviceIndex >= 0 && serviceIndex < this.state.totalServices) {
            this.state.currentService = serviceIndex;
            this.updateAnalysisDisplay();
        }
    },
    
    /**
     * Get current analysis state
     * @returns {Object} Current analysis state
     */
    getState() {
        return { ...this.state };
    },
    
    /**
     * Reset analysis to initial state
     */
    reset() {
        Utils.log('Resetting service analysis...');
        
        this.resetAnalysisState();
        this.start();
        
        UIController.showInfoMessage('Analysis reset! Starting from the beginning.');
    }
};

// Make ServiceAnalysisController available globally
window.ServiceAnalysisController = ServiceAnalysisController;
