/**
 * UI Controller Module
 * Handles general UI interactions, modals, tooltips, and visual feedback
 * 
 * @module UIController
 * @requires AppState, Utils, DOMUtils
 */

'use strict';

/**
 * UI Controller
 * Manages general user interface interactions and visual feedback
 */
const UIController = {
    // DOM element references
    elements: {
        modal: null,
        modalContent: null,
        body: null
    },
    
    // UI state
    state: {
        initialized: false,
        modalOpen: false,
        tooltipTimeout: null
    },
    
    /**
     * Initialize the UI controller
     */
    init() {
        try {
            Utils.log('Initializing UIController...');
            
            this.initializeElements();
            this.setupEventListeners();
            this.initializeTooltips();
            
            this.state.initialized = true;
            Utils.log('UIController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize UIController:', error);
        }
    },
    
    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.elements = {
            modal: DOMUtils.getElementById('comingSoonModal'),
            modalContent: DOMUtils.querySelector('.modal-content'),
            body: document.body
        };
    },
    
    /**
     * Setup event listeners for UI elements
     */
    setupEventListeners() {
        // Modal close on background click
        if (this.elements.modal) {
            DOMUtils.addEventListener(this.elements.modal, 'click', (e) => {
                if (e.target === this.elements.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Escape key to close modal
        DOMUtils.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.state.modalOpen) {
                this.closeModal();
            }
        });
    },
    
    /**
     * Initialize tooltip system
     */
    initializeTooltips() {
        // Find all elements with tooltip data attribute
        const tooltipElements = DOMUtils.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            this.setupTooltip(element);
        });
        
        Utils.log(`Initialized ${tooltipElements.length} tooltips`);
    },
    
    /**
     * Setup tooltip for a specific element
     * @param {HTMLElement} element - Element to add tooltip to
     */
    setupTooltip(element) {
        if (!element) return;
        
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        // Mouse enter - show tooltip
        DOMUtils.addEventListener(element, 'mouseenter', () => {
            this.showTooltip(element, tooltipText);
        });
        
        // Mouse leave - hide tooltip
        DOMUtils.addEventListener(element, 'mouseleave', () => {
            this.hideTooltip();
        });
        
        // Focus - show tooltip (accessibility)
        DOMUtils.addEventListener(element, 'focus', () => {
            this.showTooltip(element, tooltipText);
        });
        
        // Blur - hide tooltip (accessibility)
        DOMUtils.addEventListener(element, 'blur', () => {
            this.hideTooltip();
        });
    },
    
    /**
     * Show tooltip
     * @param {HTMLElement} element - Element to show tooltip for
     * @param {string} text - Tooltip text
     */
    showTooltip(element, text) {
        // Don't show tooltips on mobile or if sidebar is collapsed
        if (Utils.isMobile() || !AppState.getState('sidebarExpanded')) {
            return;
        }
        
        // Clear any existing timeout
        if (this.state.tooltipTimeout) {
            clearTimeout(this.state.tooltipTimeout);
        }
        
        // Delay tooltip appearance
        this.state.tooltipTimeout = setTimeout(() => {
            this.createTooltip(element, text);
        }, AppConfig.ui.tooltipDelay);
    },
    
    /**
     * Create and position tooltip
     * @param {HTMLElement} element - Element to show tooltip for
     * @param {string} text - Tooltip text
     */
    createTooltip(element, text) {
        // Remove any existing tooltip
        this.removeTooltip();
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = text;
        tooltip.setAttribute('role', 'tooltip');
        
        // Add to DOM
        document.body.appendChild(tooltip);
        
        // Position tooltip
        this.positionTooltip(tooltip, element);
        
        // Show tooltip with animation
        requestAnimationFrame(() => {
            DOMUtils.toggleClass(tooltip, 'visible', true);
        });
    },
    
    /**
     * Position tooltip relative to element
     * @param {HTMLElement} tooltip - Tooltip element
     * @param {HTMLElement} element - Target element
     */
    positionTooltip(tooltip, element) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Calculate position
        let top = elementRect.top - tooltipRect.height - 10;
        let left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
        
        // Adjust if tooltip goes off screen
        if (top < 10) {
            top = elementRect.bottom + 10;
            DOMUtils.toggleClass(tooltip, 'bottom', true);
        }
        
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        // Apply position
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    },
    
    /**
     * Hide tooltip
     */
    hideTooltip() {
        // Clear timeout
        if (this.state.tooltipTimeout) {
            clearTimeout(this.state.tooltipTimeout);
            this.state.tooltipTimeout = null;
        }
        
        // Remove tooltip
        this.removeTooltip();
    },
    
    /**
     * Remove tooltip from DOM
     */
    removeTooltip() {
        const existingTooltip = DOMUtils.querySelector('.tooltip-popup');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    },
    
    /**
     * Show "Coming Soon" modal
     */
    showComingSoon() {
        this.showModal({
            title: 'Coming Soon!',
            icon: 'fas fa-rocket',
            content: `
                <p>This section is under development and will be available soon. 
                We're building this course one task at a time to ensure the best learning experience!</p>
                <div class="modal-icon">
                    <i class="fas fa-tools" aria-hidden="true"></i>
                </div>
            `
        });
    },
    
    /**
     * Show modal with custom content
     * @param {Object} options - Modal options
     * @param {string} options.title - Modal title
     * @param {string} options.icon - Icon class
     * @param {string} options.content - Modal content HTML
     */
    showModal(options = {}) {
        if (!this.elements.modal) {
            Utils.log('Modal element not found');
            return;
        }
        
        // Update modal content if provided
        if (options.title || options.content) {
            this.updateModalContent(options);
        }
        
        // Show modal
        this.state.modalOpen = true;
        DOMUtils.toggleClass(this.elements.modal, 'active', true);
        DOMUtils.toggleClass(this.elements.body, 'modal-open', true);
        
        // Set focus to modal for accessibility
        if (this.elements.modalContent) {
            this.elements.modalContent.focus();
        }
        
        // Update ARIA attributes
        this.elements.modal.setAttribute('aria-hidden', 'false');
        
        Utils.log('Modal opened');
    },
    
    /**
     * Update modal content
     * @param {Object} options - Content options
     */
    updateModalContent(options) {
        const modalHeader = DOMUtils.querySelector('.modal-header h3', this.elements.modal);
        const modalBody = DOMUtils.querySelector('.modal-body', this.elements.modal);
        
        if (options.title && modalHeader) {
            const iconHTML = options.icon ? `<i class="${options.icon}" aria-hidden="true"></i> ` : '';
            modalHeader.innerHTML = iconHTML + Utils.sanitizeHTML(options.title);
        }
        
        if (options.content && modalBody) {
            modalBody.innerHTML = options.content;
        }
    },
    
    /**
     * Close modal
     */
    closeModal() {
        if (!this.state.modalOpen) return;
        
        this.state.modalOpen = false;
        DOMUtils.toggleClass(this.elements.modal, 'active', false);
        DOMUtils.toggleClass(this.elements.body, 'modal-open', false);
        
        // Update ARIA attributes
        if (this.elements.modal) {
            this.elements.modal.setAttribute('aria-hidden', 'true');
        }
        
        Utils.log('Modal closed');
    },
    
    /**
     * Show loading indicator
     * @param {HTMLElement} container - Container to show loading in
     * @param {string} message - Loading message
     */
    showLoading(container, message = 'Loading...') {
        if (!container) return;
        
        const loadingHTML = `
            <div class="loading-indicator">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                </div>
                <p class="loading-message">${Utils.sanitizeHTML(message)}</p>
            </div>
        `;
        
        DOMUtils.setContent(container, loadingHTML, true);
        DOMUtils.toggleClass(container, 'loading', true);
    },
    
    /**
     * Hide loading indicator
     * @param {HTMLElement} container - Container to hide loading from
     */
    hideLoading(container) {
        if (!container) return;
        
        DOMUtils.toggleClass(container, 'loading', false);
        
        // Remove loading indicator
        const loadingIndicator = DOMUtils.querySelector('.loading-indicator', container);
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    },
    
    /**
     * Show success message
     * @param {string} message - Success message
     * @param {number} duration - Duration to show message (ms)
     */
    showSuccessMessage(message, duration = 3000) {
        this.showNotification(message, 'success', duration);
    },
    
    /**
     * Show error message
     * @param {string} message - Error message
     * @param {number} duration - Duration to show message (ms)
     */
    showErrorMessage(message, duration = 5000) {
        this.showNotification(message, 'error', duration);
    },
    
    /**
     * Show info message
     * @param {string} message - Info message
     * @param {number} duration - Duration to show message (ms)
     */
    showInfoMessage(message, duration = 3000) {
        this.showNotification(message, 'info', duration);
    },
    
    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     * @param {number} duration - Duration to show notification (ms)
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        
        // Set content
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${iconMap[type]}" aria-hidden="true"></i>
                <span class="notification-message">${Utils.sanitizeHTML(message)}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        requestAnimationFrame(() => {
            DOMUtils.toggleClass(notification, 'visible', true);
        });
        
        // Auto-remove after duration
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
        
        Utils.log(`Notification shown: ${type} - ${message}`);
    },
    
    /**
     * Remove notification
     * @param {HTMLElement} notification - Notification element to remove
     */
    removeNotification(notification) {
        if (!notification || !notification.parentElement) return;
        
        DOMUtils.toggleClass(notification, 'visible', false);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    },
    
    /**
     * Animate element entrance
     * @param {HTMLElement} element - Element to animate
     * @param {string} animation - Animation type
     */
    animateIn(element, animation = 'fadeIn') {
        if (!element) return;
        
        DOMUtils.toggleClass(element, 'animate-in', true);
        DOMUtils.toggleClass(element, animation, true);
        
        // Clean up animation classes after completion
        setTimeout(() => {
            DOMUtils.toggleClass(element, 'animate-in', false);
            DOMUtils.toggleClass(element, animation, false);
        }, AppConfig.ui.animationDuration);
    },
    
    /**
     * Animate element exit
     * @param {HTMLElement} element - Element to animate
     * @param {string} animation - Animation type
     * @param {Function} callback - Callback after animation
     */
    animateOut(element, animation = 'fadeOut', callback = null) {
        if (!element) return;
        
        DOMUtils.toggleClass(element, 'animate-out', true);
        DOMUtils.toggleClass(element, animation, true);
        
        setTimeout(() => {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, AppConfig.ui.animationDuration);
    },
    
    /**
     * Update breadcrumb navigation
     * @param {string} breadcrumbText - New breadcrumb text
     */
    updateBreadcrumb(breadcrumbText) {
        const breadcrumbElement = DOMUtils.getElementById('breadcrumbText');
        if (breadcrumbElement) {
            DOMUtils.setContent(breadcrumbElement, breadcrumbText);
            Utils.log(`Breadcrumb updated: ${breadcrumbText}`);
        }
    },
    
    /**
     * Scroll to element smoothly
     * @param {HTMLElement} element - Element to scroll to
     * @param {Object} options - Scroll options
     */
    scrollToElement(element, options = {}) {
        if (!element) return;
        
        const defaultOptions = {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        };
        
        element.scrollIntoView({ ...defaultOptions, ...options });
    },
    
    /**
     * Get current UI state
     * @returns {Object} Current UI state
     */
    getState() {
        return {
            initialized: this.state.initialized,
            modalOpen: this.state.modalOpen
        };
    },
    
    /**
     * Reset UI to initial state
     */
    reset() {
        Utils.log('Resetting UI state...');
        
        // Close modal
        this.closeModal();
        
        // Hide tooltips
        this.hideTooltip();
        
        // Remove notifications
        const notifications = DOMUtils.querySelectorAll('.notification');
        notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }
};

// Make UIController available globally
window.UIController = UIController;
