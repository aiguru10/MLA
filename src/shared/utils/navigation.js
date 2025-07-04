/**
 * Navigation Controller Module
 * Handles all navigation-related functionality including sidebar, mobile menu, and section toggling
 * 
 * @module NavigationController
 * @requires AppState, Utils, DOMUtils
 */

'use strict';

/**
 * Navigation Controller
 * Manages sidebar navigation, mobile menu, and section/task toggling
 */
const NavigationController = {
    // DOM element references
    elements: {
        sidebar: null,
        mainContent: null,
        sidebarToggle: null,
        mobileMenuToggle: null,
        expandBtn: null
    },
    
    // Navigation state
    state: {
        initialized: false,
        animating: false
    },
    
    /**
     * Initialize the navigation controller
     * Sets up DOM references and event listeners
     */
    init() {
        try {
            Utils.log('Initializing NavigationController...');
            
            this.initializeElements();
            this.setupEventListeners();
            this.setupInitialState();
            
            this.state.initialized = true;
            Utils.log('NavigationController initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize NavigationController:', error);
        }
    },
    
    /**
     * Initialize DOM element references
     * Safely gets references to all required DOM elements
     */
    initializeElements() {
        this.elements = {
            sidebar: DOMUtils.getElementById('sidebar'),
            mainContent: DOMUtils.getElementById('mainContent'),
            sidebarToggle: DOMUtils.getElementById('sidebarToggle'),
            mobileMenuToggle: DOMUtils.getElementById('mobileMenuToggle'),
            expandBtn: DOMUtils.getElementById('expandBtn')
        };
        
        // Validate critical elements
        const criticalElements = ['sidebar', 'mainContent'];
        for (const elementName of criticalElements) {
            if (!this.elements[elementName]) {
                throw new Error(`Critical element not found: ${elementName}`);
            }
        }
    },
    
    /**
     * Setup event listeners for navigation elements
     */
    setupEventListeners() {
        // Sidebar toggle button
        if (this.elements.sidebarToggle) {
            DOMUtils.addEventListener(this.elements.sidebarToggle, 'click', () => {
                this.toggleSidebar();
            });
        }
        
        // Mobile menu toggle
        if (this.elements.mobileMenuToggle) {
            DOMUtils.addEventListener(this.elements.mobileMenuToggle, 'click', () => {
                this.toggleMobileSidebar();
            });
        }
        
        // Expand button (for collapsed sidebar)
        if (this.elements.expandBtn) {
            DOMUtils.addEventListener(this.elements.expandBtn, 'click', () => {
                this.expandSidebar();
            });
        }
        
        // Close mobile menu when clicking outside
        DOMUtils.addEventListener(document, 'click', (e) => {
            this.handleOutsideClick(e);
        });
        
        // Handle window resize
        const resizeHandler = Utils.debounce(() => {
            this.handleResize();
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
    },
    
    /**
     * Setup initial navigation state
     */
    setupInitialState() {
        // Set initial sidebar state based on screen size
        if (Utils.isMobile()) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
        
        // Initialize section states
        this.initializeSectionStates();
    },
    
    /**
     * Initialize section and task states
     * Sets up the initial expanded/collapsed state of navigation sections
     */
    initializeSectionStates() {
        // Expand Domain 1 and Task 1.1 by default
        this.expandSection('domain1');
        this.expandTask('task11');
        
        // Set active link
        this.setActiveLink('task11-topic1');
    },
    
    /**
     * Toggle sidebar visibility
     * Main function for toggling sidebar on desktop
     */
    toggleSidebar() {
        if (this.state.animating) return;
        
        const isExpanded = AppState.getState('sidebarExpanded');
        
        if (isExpanded) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
    },
    
    /**
     * Expand the sidebar
     */
    expandSidebar() {
        if (this.state.animating) return;
        
        this.state.animating = true;
        
        // Update state
        AppState.setState('sidebarExpanded', true);
        
        // Update UI
        DOMUtils.toggleClass(this.elements.sidebar, 'collapsed', false);
        DOMUtils.toggleClass(this.elements.mainContent, 'sidebar-collapsed', false);
        DOMUtils.toggleClass(this.elements.expandBtn, 'visible', false);
        
        // Update toggle button icon
        this.updateToggleIcon(true);
        
        // Reset animation flag after animation completes
        setTimeout(() => {
            this.state.animating = false;
        }, AppConfig.ui.animationDuration);
        
        Utils.log('Sidebar expanded');
    },
    
    /**
     * Collapse the sidebar
     */
    collapseSidebar() {
        if (this.state.animating) return;
        
        this.state.animating = true;
        
        // Update state
        AppState.setState('sidebarExpanded', false);
        
        // Update UI
        DOMUtils.toggleClass(this.elements.sidebar, 'collapsed', true);
        DOMUtils.toggleClass(this.elements.mainContent, 'sidebar-collapsed', true);
        DOMUtils.toggleClass(this.elements.expandBtn, 'visible', true);
        
        // Update toggle button icon
        this.updateToggleIcon(false);
        
        // Reset animation flag after animation completes
        setTimeout(() => {
            this.state.animating = false;
        }, AppConfig.ui.animationDuration);
        
        Utils.log('Sidebar collapsed');
    },
    
    /**
     * Toggle mobile sidebar
     * Special handling for mobile devices
     */
    toggleMobileSidebar() {
        const isMobileMenuOpen = AppState.getState('mobileMenuOpen');
        
        if (isMobileMenuOpen) {
            this.closeMobileSidebar();
        } else {
            this.openMobileSidebar();
        }
    },
    
    /**
     * Open mobile sidebar
     */
    openMobileSidebar() {
        AppState.setState('mobileMenuOpen', true);
        DOMUtils.toggleClass(this.elements.sidebar, 'mobile-open', true);
        DOMUtils.toggleClass(document.body, 'mobile-menu-open', true);
        
        Utils.log('Mobile sidebar opened');
    },
    
    /**
     * Close mobile sidebar
     */
    closeMobileSidebar() {
        AppState.setState('mobileMenuOpen', false);
        DOMUtils.toggleClass(this.elements.sidebar, 'mobile-open', false);
        DOMUtils.toggleClass(document.body, 'mobile-menu-open', false);
        
        Utils.log('Mobile sidebar closed');
    },
    
    /**
     * Toggle navigation section (Domain)
     * @param {string} sectionId - ID of the section to toggle
     */
    toggleSection(sectionId) {
        const sectionContent = DOMUtils.getElementById(sectionId);
        const sectionHeader = DOMUtils.querySelector(`[aria-controls="${sectionId}"]`);
        
        if (!sectionContent || !sectionHeader) {
            Utils.log(`Section not found: ${sectionId}`);
            return;
        }
        
        const isExpanded = sectionHeader.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            this.collapseSection(sectionId);
        } else {
            this.expandSection(sectionId);
        }
    },
    
    /**
     * Expand a navigation section
     * @param {string} sectionId - ID of the section to expand
     */
    expandSection(sectionId) {
        const sectionContent = DOMUtils.getElementById(sectionId);
        const sectionHeader = DOMUtils.querySelector(`[aria-controls="${sectionId}"]`);
        const toggleIcon = sectionHeader?.querySelector('.toggle-icon');
        
        if (!sectionContent || !sectionHeader) return;
        
        // Update ARIA attributes
        sectionHeader.setAttribute('aria-expanded', 'true');
        sectionContent.setAttribute('aria-hidden', 'false');
        
        // Update classes
        DOMUtils.toggleClass(sectionContent, 'expanded', true);
        DOMUtils.toggleClass(toggleIcon, 'rotated', true);
        
        Utils.log(`Section expanded: ${sectionId}`);
    },
    
    /**
     * Collapse a navigation section
     * @param {string} sectionId - ID of the section to collapse
     */
    collapseSection(sectionId) {
        const sectionContent = DOMUtils.getElementById(sectionId);
        const sectionHeader = DOMUtils.querySelector(`[aria-controls="${sectionId}"]`);
        const toggleIcon = sectionHeader?.querySelector('.toggle-icon');
        
        if (!sectionContent || !sectionHeader) return;
        
        // Update ARIA attributes
        sectionHeader.setAttribute('aria-expanded', 'false');
        sectionContent.setAttribute('aria-hidden', 'true');
        
        // Update classes
        DOMUtils.toggleClass(sectionContent, 'expanded', false);
        DOMUtils.toggleClass(toggleIcon, 'rotated', false);
        
        Utils.log(`Section collapsed: ${sectionId}`);
    },
    
    /**
     * Toggle navigation task
     * @param {string} taskId - ID of the task to toggle
     */
    toggleTask(taskId) {
        const taskContent = DOMUtils.getElementById(taskId);
        const taskHeader = DOMUtils.querySelector(`[aria-controls="${taskId}"]`);
        
        if (!taskContent || !taskHeader) {
            Utils.log(`Task not found: ${taskId}`);
            return;
        }
        
        const isExpanded = taskHeader.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            this.collapseTask(taskId);
        } else {
            this.expandTask(taskId);
        }
    },
    
    /**
     * Expand a navigation task
     * @param {string} taskId - ID of the task to expand
     */
    expandTask(taskId) {
        const taskContent = DOMUtils.getElementById(taskId);
        const taskHeader = DOMUtils.querySelector(`[aria-controls="${taskId}"]`);
        const toggleIcon = taskHeader?.querySelector('.toggle-icon');
        
        if (!taskContent || !taskHeader) return;
        
        // Update ARIA attributes
        taskHeader.setAttribute('aria-expanded', 'true');
        taskContent.setAttribute('aria-hidden', 'false');
        
        // Update classes
        DOMUtils.toggleClass(taskContent, 'expanded', true);
        DOMUtils.toggleClass(toggleIcon, 'rotated', true);
        
        Utils.log(`Task expanded: ${taskId}`);
    },
    
    /**
     * Collapse a navigation task
     * @param {string} taskId - ID of the task to collapse
     */
    collapseTask(taskId) {
        const taskContent = DOMUtils.getElementById(taskId);
        const taskHeader = DOMUtils.querySelector(`[aria-controls="${taskId}"]`);
        const toggleIcon = taskHeader?.querySelector('.toggle-icon');
        
        if (!taskContent || !taskHeader) return;
        
        // Update ARIA attributes
        taskHeader.setAttribute('aria-expanded', 'false');
        taskContent.setAttribute('aria-hidden', 'true');
        
        // Update classes
        DOMUtils.toggleClass(taskContent, 'expanded', false);
        DOMUtils.toggleClass(toggleIcon, 'rotated', false);
        
        Utils.log(`Task collapsed: ${taskId}`);
    },
    
    /**
     * Set active navigation link
     * @param {string} linkId - ID of the link to set as active
     */
    setActiveLink(linkId) {
        // Remove active class from all links
        const allLinks = DOMUtils.querySelectorAll('.nav-link');
        allLinks.forEach(link => {
            DOMUtils.toggleClass(link, 'active', false);
        });
        
        // Add active class to current link
        const activeLink = DOMUtils.querySelector(`[onclick*="${linkId}"]`);
        if (activeLink) {
            DOMUtils.toggleClass(activeLink, 'active', true);
        }
        
        Utils.log(`Active link set: ${linkId}`);
    },
    
    /**
     * Update toggle button icon
     * @param {boolean} expanded - Whether sidebar is expanded
     */
    updateToggleIcon(expanded) {
        if (!this.elements.sidebarToggle) return;
        
        const icon = this.elements.sidebarToggle.querySelector('i');
        if (icon) {
            icon.className = expanded ? 'fas fa-times' : 'fas fa-bars';
        }
    },
    
    /**
     * Handle clicks outside the sidebar (mobile)
     * @param {Event} event - Click event
     */
    handleOutsideClick(event) {
        if (!Utils.isMobile() || !AppState.getState('mobileMenuOpen')) return;
        
        // Check if click is outside sidebar
        if (!this.elements.sidebar.contains(event.target) && 
            !this.elements.mobileMenuToggle.contains(event.target)) {
            this.closeMobileSidebar();
        }
    },
    
    /**
     * Handle window resize events
     */
    handleResize() {
        const isMobile = Utils.isMobile();
        
        if (isMobile) {
            // On mobile, always collapse sidebar
            if (AppState.getState('sidebarExpanded')) {
                this.collapseSidebar();
            }
            // Close mobile menu if open
            if (AppState.getState('mobileMenuOpen')) {
                this.closeMobileSidebar();
            }
        } else {
            // On desktop, expand sidebar if it was collapsed due to mobile
            if (!AppState.getState('sidebarExpanded')) {
                this.expandSidebar();
            }
        }
    },
    
    /**
     * Get current navigation state
     * @returns {Object} Current navigation state
     */
    getState() {
        return {
            sidebarExpanded: AppState.getState('sidebarExpanded'),
            mobileMenuOpen: AppState.getState('mobileMenuOpen'),
            initialized: this.state.initialized,
            animating: this.state.animating
        };
    },
    
    /**
     * Reset navigation to initial state
     */
    reset() {
        Utils.log('Resetting navigation state...');
        
        // Close mobile menu
        this.closeMobileSidebar();
        
        // Reset sidebar based on screen size
        if (Utils.isMobile()) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
        
        // Reset section states
        this.initializeSectionStates();
    }
};

// Make NavigationController available globally
window.NavigationController = NavigationController;
