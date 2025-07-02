/**
 * Interactive Service Analysis Component
 * Allows users to explore AWS storage services with navigation
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-01
 */

class InteractiveServiceAnalysis {
    constructor() {
        this.currentServiceIndex = 0;
        this.services = [];
        this.initialized = false;
        this.containerId = 'serviceAnalysisContainer';
    }

    /**
     * Initialize the Interactive Service Analysis
     */
    async init() {
        try {
            Utils.log('Initializing Interactive Service Analysis...');
            
            this.setupServices();
            this.render();
            this.setupNavigation();
            
            this.initialized = true;
            Utils.log('Interactive Service Analysis initialized successfully');
            
        } catch (error) {
            Utils.error('Failed to initialize Interactive Service Analysis:', error);
            throw error;
        }
    }

    /**
     * Setup AWS storage services data
     */
    setupServices() {
        this.services = [
            {
                id: 's3',
                name: 'Amazon S3',
                fullName: 'Amazon Simple Storage Service',
                icon: 'fas fa-cloud',
                color: '#FF9900',
                description: 'Object storage service that offers industry-leading scalability, data availability, security, and performance.',
                keyFeatures: [
                    'Virtually unlimited storage capacity',
                    '99.999999999% (11 9\'s) durability',
                    'Multiple storage classes for cost optimization',
                    'Built-in security and compliance features',
                    'Easy integration with other AWS services'
                ],
                useCases: [
                    'Data lakes for machine learning',
                    'Backup and archival storage',
                    'Static website hosting',
                    'Content distribution',
                    'Big data analytics'
                ],
                pricing: {
                    model: 'Pay-as-you-use',
                    factors: ['Storage amount', 'Requests', 'Data transfer'],
                    startingPrice: '$0.023 per GB/month'
                },
                mlUseCase: 'Perfect for storing large datasets, training data, model artifacts, and serving as a data lake for ML pipelines.'
            },
            {
                id: 'ebs',
                name: 'Amazon EBS',
                fullName: 'Amazon Elastic Block Store',
                icon: 'fas fa-hdd',
                color: '#FF4B4B',
                description: 'High-performance block storage service designed for use with Amazon EC2 instances.',
                keyFeatures: [
                    'High IOPS performance (up to 64,000 IOPS)',
                    'Multiple volume types for different needs',
                    'Encryption at rest and in transit',
                    'Point-in-time snapshots',
                    'Elastic volume modifications'
                ],
                useCases: [
                    'Database storage',
                    'File systems',
                    'Boot volumes',
                    'High-performance computing',
                    'Enterprise applications'
                ],
                pricing: {
                    model: 'Pay for provisioned storage',
                    factors: ['Volume type', 'Size', 'IOPS', 'Throughput'],
                    startingPrice: '$0.10 per GB/month'
                },
                mlUseCase: 'Ideal for high-performance ML training workloads that require fast, consistent storage performance.'
            },
            {
                id: 'efs',
                name: 'Amazon EFS',
                fullName: 'Amazon Elastic File System',
                icon: 'fas fa-folder-open',
                color: '#4CAF50',
                description: 'Fully managed, elastic NFS file system for use with AWS Cloud services and on-premises resources.',
                keyFeatures: [
                    'Fully managed and elastic',
                    'POSIX-compliant file system',
                    'Concurrent access from multiple instances',
                    'Automatic scaling up and down',
                    'Regional availability and durability'
                ],
                useCases: [
                    'Shared application data',
                    'Content repositories',
                    'Development environments',
                    'Database backups',
                    'Container storage'
                ],
                pricing: {
                    model: 'Pay for storage used',
                    factors: ['Storage amount', 'Throughput mode', 'Access frequency'],
                    startingPrice: '$0.30 per GB/month'
                },
                mlUseCase: 'Great for shared ML datasets that need to be accessed by multiple training instances simultaneously.'
            },
            {
                id: 'fsx',
                name: 'Amazon FSx',
                fullName: 'Amazon FSx for Lustre',
                icon: 'fas fa-tachometer-alt',
                color: '#9C27B0',
                description: 'High-performance file system optimized for fast processing of workloads such as machine learning.',
                keyFeatures: [
                    'Sub-millisecond latencies',
                    'Up to hundreds of GB/s throughput',
                    'Seamless S3 integration',
                    'POSIX-compliant interface',
                    'Optimized for HPC workloads'
                ],
                useCases: [
                    'Machine learning training',
                    'High-performance computing',
                    'Video processing',
                    'Financial modeling',
                    'Genomics analysis'
                ],
                pricing: {
                    model: 'Pay for provisioned capacity',
                    factors: ['Storage capacity', 'Throughput capacity'],
                    startingPrice: '$0.145 per GB/month'
                },
                mlUseCase: 'Optimized for ML training workloads requiring extremely high throughput and low latency access to data.'
            },
            {
                id: 'glacier',
                name: 'Amazon Glacier',
                fullName: 'Amazon S3 Glacier',
                icon: 'fas fa-archive',
                color: '#2196F3',
                description: 'Secure, durable, and extremely low-cost storage service for data archiving and long-term backup.',
                keyFeatures: [
                    'Extremely low cost',
                    'Three retrieval options',
                    'Vault lock for compliance',
                    '99.999999999% durability',
                    'Integrated with S3 lifecycle policies'
                ],
                useCases: [
                    'Data archiving',
                    'Long-term backup',
                    'Compliance and regulatory storage',
                    'Digital preservation',
                    'Disaster recovery'
                ],
                pricing: {
                    model: 'Pay for storage and retrieval',
                    factors: ['Storage amount', 'Retrieval frequency', 'Retrieval speed'],
                    startingPrice: '$0.004 per GB/month'
                },
                mlUseCase: 'Perfect for archiving old training datasets, model versions, and long-term storage of ML artifacts.'
            }
        ];

        Utils.log(`Setup ${this.services.length} AWS storage services for analysis`);
    }

    /**
     * Render the interactive service analysis
     */
    render() {
        const container = DOMUtils.getElementById(this.containerId);
        if (!container) {
            Utils.error('Service Analysis container not found');
            return;
        }

        const service = this.services[this.currentServiceIndex];
        
        const html = `
            <div class="service-analysis-wrapper">
                <!-- Service Navigation Header -->
                <div class="service-nav-header">
                    <button class="service-nav-btn prev-service" id="prevServiceBtn" ${this.currentServiceIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i>
                        Previous Service
                    </button>
                    
                    <div class="service-counter">
                        <span class="current-service">${this.currentServiceIndex + 1}</span>
                        <span class="service-separator">of</span>
                        <span class="total-services">${this.services.length}</span>
                        <div class="service-dots">
                            ${this.services.map((_, index) => 
                                `<div class="service-dot ${index === this.currentServiceIndex ? 'active' : ''}" data-service="${index}"></div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <button class="service-nav-btn next-service" id="nextServiceBtn" ${this.currentServiceIndex === this.services.length - 1 ? 'disabled' : ''}>
                        Next Service
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <!-- Service Details Card -->
                <div class="service-card-detailed">
                    <div class="service-header">
                        <div class="service-icon-large" style="background: ${service.color}">
                            <i class="${service.icon}"></i>
                        </div>
                        <div class="service-title-section">
                            <h2 class="service-name">${service.name}</h2>
                            <p class="service-full-name">${service.fullName}</p>
                        </div>
                    </div>

                    <div class="service-description">
                        <p>${service.description}</p>
                    </div>

                    <div class="service-details-grid">
                        <!-- Key Features -->
                        <div class="detail-section">
                            <h3><i class="fas fa-star"></i> Key Features</h3>
                            <ul class="feature-list">
                                ${service.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                        <!-- Use Cases -->
                        <div class="detail-section">
                            <h3><i class="fas fa-lightbulb"></i> Common Use Cases</h3>
                            <ul class="use-case-list">
                                ${service.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                            </ul>
                        </div>

                        <!-- Pricing -->
                        <div class="detail-section">
                            <h3><i class="fas fa-dollar-sign"></i> Pricing Model</h3>
                            <div class="pricing-info">
                                <p class="pricing-model"><strong>Model:</strong> ${service.pricing.model}</p>
                                <p class="pricing-factors"><strong>Factors:</strong> ${service.pricing.factors.join(', ')}</p>
                                <p class="pricing-start"><strong>Starting at:</strong> ${service.pricing.startingPrice}</p>
                            </div>
                        </div>

                        <!-- ML Use Case -->
                        <div class="detail-section ml-highlight">
                            <h3><i class="fas fa-brain"></i> Machine Learning Use Case</h3>
                            <p class="ml-use-case">${service.mlUseCase}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        DOMUtils.setContent(container, html, true);
        
        // Animate in the content
        UIController.animateIn(container, 'fadeInUp');
    }

    /**
     * Setup navigation event handlers
     */
    setupNavigation() {
        // Previous service button
        const prevBtn = DOMUtils.getElementById('prevServiceBtn');
        if (prevBtn) {
            DOMUtils.addEventListener(prevBtn, 'click', () => this.previousService());
        }

        // Next service button
        const nextBtn = DOMUtils.getElementById('nextServiceBtn');
        if (nextBtn) {
            DOMUtils.addEventListener(nextBtn, 'click', () => this.nextService());
        }

        // Service dots
        const serviceDots = DOMUtils.querySelectorAll('.service-dot');
        serviceDots.forEach((dot, index) => {
            DOMUtils.addEventListener(dot, 'click', () => this.goToService(index));
        });

        // Keyboard navigation
        DOMUtils.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'ArrowLeft' && e.altKey) {
                e.preventDefault();
                this.previousService();
            } else if (e.key === 'ArrowRight' && e.altKey) {
                e.preventDefault();
                this.nextService();
            }
        });
    }

    /**
     * Navigate to previous service
     */
    previousService() {
        if (this.currentServiceIndex > 0) {
            this.currentServiceIndex--;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to previous service: ${this.services[this.currentServiceIndex].name}`);
        }
    }

    /**
     * Navigate to next service
     */
    nextService() {
        if (this.currentServiceIndex < this.services.length - 1) {
            this.currentServiceIndex++;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to next service: ${this.services[this.currentServiceIndex].name}`);
        }
    }

    /**
     * Navigate to specific service
     */
    goToService(serviceIndex) {
        if (serviceIndex >= 0 && serviceIndex < this.services.length) {
            this.currentServiceIndex = serviceIndex;
            this.render();
            this.setupNavigation();
            Utils.log(`Navigated to service: ${this.services[this.currentServiceIndex].name}`);
        }
    }

    /**
     * Get current service data
     */
    getCurrentService() {
        return this.services[this.currentServiceIndex];
    }

    /**
     * Reset to first service
     */
    reset() {
        this.currentServiceIndex = 0;
        if (this.initialized) {
            this.render();
            this.setupNavigation();
        }
    }
}

// Export for global access
window.InteractiveServiceAnalysis = InteractiveServiceAnalysis;
