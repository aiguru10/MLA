/**
 * MLA Tutorial - Interactive Learning Platform
 * Main Application Entry Point
 * 
 * This file initializes the application and coordinates between different modules.
 * It follows the Module Pattern for better organization and maintainability.
 * 
 * @author MLA Tutorial Team
 * @version 2.0.0
 * @since 2025-07-01
 */

'use strict';

// =============================================================================
// APPLICATION CONFIGURATION
// =============================================================================

/**
 * Global application configuration
 * Centralized configuration for easy maintenance
 */
const AppConfig = {
    // Application metadata
    name: 'MLA Tutorial',
    version: '2.0.0',
    
    // Feature flags
    features: {
        debugMode: false, // Disable debug mode now that issues are fixed
        analytics: false,
        serviceWorker: false
    },
    
    // UI configuration
    ui: {
        animationDuration: 300,
        tooltipDelay: 500,
        mobileBreakpoint: 768
    },
    
    // Content configuration
    content: {
        defaultTopic: 'task11-topic1',
        loadingTimeout: 5000
    }
};

// =============================================================================
// APPLICATION STATE MANAGEMENT
// =============================================================================

/**
 * Centralized application state management
 * Provides a single source of truth for application state
 */
const AppState = {
    // Current application state
    current: {
        activeContent: null,
        sidebarExpanded: true,
        mobileMenuOpen: false,
        currentUser: null
    },
    
    // State history for navigation
    history: [],
    
    /**
     * Update application state
     * @param {string} key - State key to update
     * @param {*} value - New value
     */
    setState(key, value) {
        const oldValue = this.current[key];
        this.current[key] = value;
        
        // Log state changes in debug mode
        if (AppConfig.features.debugMode) {
            console.log(`State changed: ${key}`, { from: oldValue, to: value });
        }
        
        // Emit state change event
        this.emitStateChange(key, value, oldValue);
    },
    
    /**
     * Get current state value
     * @param {string} key - State key to retrieve
     * @returns {*} Current state value
     */
    getState(key) {
        return this.current[key];
    },
    
    /**
     * Emit state change event
     * @param {string} key - Changed state key
     * @param {*} newValue - New value
     * @param {*} oldValue - Previous value
     */
    emitStateChange(key, newValue, oldValue) {
        const event = new CustomEvent('stateChange', {
            detail: { key, newValue, oldValue }
        });
        document.dispatchEvent(event);
    }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Utility functions for common operations
 * Provides reusable helper functions across the application
 */
const Utils = {
    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Check if device is mobile
     * @returns {boolean} True if mobile device
     */
    isMobile() {
        return window.innerWidth <= AppConfig.ui.mobileBreakpoint;
    },
    
    /**
     * Sanitize HTML content
     * @param {string} html - HTML string to sanitize
     * @returns {string} Sanitized HTML
     */
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },
    
    /**
     * Generate unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Format date for display
     * @param {Date} date - Date to format
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    /**
     * Log messages with timestamp (debug mode only)
     * @param {string} message - Message to log
     * @param {*} data - Additional data to log
     */
    log(message, data = null) {
        if (AppConfig.features.debugMode) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] ${message}`, data || '');
        }
    }
};

// =============================================================================
// DOM UTILITIES
// =============================================================================

/**
 * DOM manipulation utilities
 * Provides safe and consistent DOM operations
 */
const DOMUtils = {
    /**
     * Safely get element by ID
     * @param {string} id - Element ID
     * @returns {HTMLElement|null} Element or null if not found
     */
    getElementById(id) {
        const element = document.getElementById(id);
        if (!element) {
            Utils.log(`Element not found: ${id}`);
        }
        return element;
    },
    
    /**
     * Safely query selector
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element (optional)
     * @returns {HTMLElement|null} Element or null if not found
     */
    querySelector(selector, parent = document) {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            Utils.log(`Invalid selector: ${selector}`, error);
            return null;
        }
    },
    
    /**
     * Safely query all selectors
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element (optional)
     * @returns {NodeList} NodeList of elements
     */
    querySelectorAll(selector, parent = document) {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            Utils.log(`Invalid selector: ${selector}`, error);
            return [];
        }
    },
    
    /**
     * Add event listener with error handling
     * @param {HTMLElement} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    addEventListener(element, event, handler, options = {}) {
        if (!element || typeof handler !== 'function') {
            Utils.log('Invalid addEventListener parameters');
            return;
        }
        
        element.addEventListener(event, (e) => {
            try {
                handler(e);
            } catch (error) {
                Utils.log(`Error in event handler for ${event}:`, error);
            }
        }, options);
    },
    
    /**
     * Toggle class with animation support
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to toggle
     * @param {boolean} force - Force add/remove
     */
    toggleClass(element, className, force = undefined) {
        if (!element) return;
        
        if (force !== undefined) {
            element.classList.toggle(className, force);
        } else {
            element.classList.toggle(className);
        }
    },
    
    /**
     * Set element content safely
     * @param {HTMLElement} element - Target element
     * @param {string} content - Content to set
     * @param {boolean} isHTML - Whether content is HTML
     */
    setContent(element, content, isHTML = false) {
        if (!element) {
            Utils.log('setContent: element is null');
            return;
        }
        
        Utils.log(`setContent: Setting ${isHTML ? 'HTML' : 'text'} content, length: ${content.length}`);
        
        if (isHTML) {
            element.innerHTML = content;
        } else {
            element.textContent = content;
        }
        
        Utils.log('setContent: Content set successfully');
    }
};

// =============================================================================
// APPLICATION INITIALIZATION
// =============================================================================

/**
 * Application initialization and startup
 * Handles the application bootstrap process
 */
const AppInitializer = {
    /**
     * Initialize the application
     * Main entry point called when DOM is ready
     */
    async init() {
        try {
            Utils.log('Initializing MLA Tutorial application...');
            
            // Initialize core modules in order
            await this.initializeCore();
            await this.initializeUI();
            await this.initializeContent();
            await this.initializeEventListeners();
            
            // Load default content
            await this.loadDefaultContent();
            
            Utils.log('Application initialization complete');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to load the application. Please refresh the page.');
        }
    },
    
    /**
     * Initialize core application components
     */
    async initializeCore() {
        Utils.log('Initializing core components...');
        
        // Initialize navigation controller
        if (typeof NavigationController !== 'undefined') {
            NavigationController.init();
        }
        
        // Initialize UI controller
        if (typeof UIController !== 'undefined') {
            UIController.init();
        }
        
        // Initialize content controller
        if (typeof ContentController !== 'undefined') {
            ContentController.init();
        }
    },
    
    /**
     * Initialize UI components
     */
    async initializeUI() {
        Utils.log('Initializing UI components...');
        
        // Set up responsive behavior
        this.setupResponsiveHandlers();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        // Set initial UI state
        this.setInitialUIState();
    },
    
    /**
     * Initialize content systems
     */
    async initializeContent() {
        Utils.log('Initializing content systems...');
        
        // Initialize interactive components
        if (typeof PuzzleGameController !== 'undefined') {
            PuzzleGameController.init();
        }
        
        if (typeof QuizController !== 'undefined') {
            QuizController.init();
        }
        
        if (typeof ServiceAnalysisController !== 'undefined') {
            ServiceAnalysisController.init();
        }
    },
    
    /**
     * Initialize global event listeners
     */
    async initializeEventListeners() {
        Utils.log('Setting up global event listeners...');
        
        // Window resize handler
        const resizeHandler = Utils.debounce(() => {
            this.handleWindowResize();
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
        
        // State change listener
        document.addEventListener('stateChange', (e) => {
            this.handleStateChange(e.detail);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    },
    
    /**
     * Load default content
     */
    async loadDefaultContent() {
        Utils.log('Loading default content...');
        
        // Wait for all controllers to be loaded
        await this.waitForControllers();
        
        if (typeof ContentController !== 'undefined') {
            ContentController.loadContent(AppConfig.content.defaultTopic);
        }
    },
    
    /**
     * Wait for all controllers to be available
     */
    async waitForControllers() {
        const maxWait = 5000; // 5 seconds max
        const checkInterval = 100; // Check every 100ms
        let waited = 0;
        
        while (waited < maxWait) {
            const controllersReady = [
                'NavigationController',
                'UIController', 
                'ContentController',
                'ServiceAnalysisController',
                'PuzzleGameController',
                'QuizController'
            ].every(controller => typeof window[controller] !== 'undefined');
            
            if (controllersReady) {
                Utils.log('All controllers loaded successfully');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            waited += checkInterval;
        }
        
        Utils.log('Warning: Some controllers may not have loaded properly');
    },
    
    /**
     * Setup responsive behavior handlers
     */
    setupResponsiveHandlers() {
        // Initial responsive state
        this.handleWindowResize();
    },
    
    /**
     * Initialize tooltip system
     */
    initializeTooltips() {
        // Tooltip functionality will be handled by UIController
        Utils.log('Tooltips initialized');
    },
    
    /**
     * Set initial UI state based on device and preferences
     */
    setInitialUIState() {
        // Set sidebar state based on device
        const shouldCollapseSidebar = Utils.isMobile();
        AppState.setState('sidebarExpanded', !shouldCollapseSidebar);
        
        if (shouldCollapseSidebar && typeof NavigationController !== 'undefined') {
            NavigationController.collapseSidebar();
        }
    },
    
    /**
     * Handle window resize events
     */
    handleWindowResize() {
        const isMobile = Utils.isMobile();
        
        // Update mobile state
        AppState.setState('isMobile', isMobile);
        
        // Handle sidebar on mobile
        if (isMobile && AppState.getState('sidebarExpanded')) {
            if (typeof NavigationController !== 'undefined') {
                NavigationController.collapseSidebar();
            }
        }
    },
    
    /**
     * Handle application state changes
     * @param {Object} detail - State change details
     */
    handleStateChange(detail) {
        const { key, newValue } = detail;
        
        // Handle specific state changes
        switch (key) {
            case 'activeContent':
                this.onContentChange(newValue);
                break;
            case 'sidebarExpanded':
                this.onSidebarToggle(newValue);
                break;
        }
    },
    
    /**
     * Handle content changes
     * @param {string} contentId - New content ID
     */
    onContentChange(contentId) {
        Utils.log(`Content changed to: ${contentId}`);
        // Additional content change handling can be added here
    },
    
    /**
     * Handle sidebar toggle
     * @param {boolean} expanded - Whether sidebar is expanded
     */
    onSidebarToggle(expanded) {
        Utils.log(`Sidebar ${expanded ? 'expanded' : 'collapsed'}`);
        // Additional sidebar handling can be added here
    },
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboardNavigation(event) {
        // ESC key closes modals
        if (event.key === 'Escape') {
            if (typeof UIController !== 'undefined') {
                UIController.closeModal();
            }
        }
        
        // Ctrl/Cmd + K opens search (future feature)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            // Future: Open search functionality
        }
    },
    
    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${Utils.sanitizeHTML(message)}</p>
                <button onclick="location.reload()">Reload Page</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }
};

// =============================================================================
// APPLICATION STARTUP
// =============================================================================

/**
 * Start the application when DOM is ready
 * This is the main entry point for the application
 */
document.addEventListener('DOMContentLoaded', () => {
    Utils.log('DOM loaded, starting application...');
    AppInitializer.init();
});

/**
 * Handle page visibility changes
 * Useful for pausing/resuming activities when tab is not visible
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        Utils.log('Page hidden - pausing activities');
        // Pause any running activities
    } else {
        Utils.log('Page visible - resuming activities');
        // Resume activities
    }
});

/**
 * Handle page unload
 * Clean up resources before page unloads
 */
window.addEventListener('beforeunload', () => {
    Utils.log('Page unloading - cleaning up resources');
    // Clean up any resources, save state, etc.
});

// =============================================================================
// GLOBAL ERROR HANDLING
// =============================================================================

/**
 * Global error handler for unhandled JavaScript errors
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    if (AppConfig.features.debugMode) {
        // Show detailed error in debug mode
        console.error('Error details:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    }
});

/**
 * Global handler for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (AppConfig.features.debugMode) {
        console.error('Promise rejection details:', event);
    }
    
    // Prevent the default browser behavior
    event.preventDefault();
});

// =============================================================================
// EXPORT FOR MODULE SYSTEM (if needed)
// =============================================================================

// Make key objects available globally for other modules
window.AppConfig = AppConfig;
window.AppState = AppState;
window.Utils = Utils;
window.DOMUtils = DOMUtils;
