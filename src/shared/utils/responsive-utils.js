/**
 * Responsive Layout Utilities
 * Provides dynamic responsive behavior and layout optimization
 * 
 * @author MLA Tutorial Team
 * @version 1.0.0
 * @since 2025-07-04
 */

class ResponsiveUtils {
    constructor() {
        this.breakpoints = {
            mobile: 767,
            tablet: 1199,
            desktop: 1200,
            wide: 1600
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.init();
    }

    /**
     * Initialize responsive utilities
     */
    init() {
        this.setupResizeListener();
        this.optimizeLayout();
        this.setupIntersectionObserver();
    }

    /**
     * Get current breakpoint
     */
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width <= this.breakpoints.mobile) {
            return 'mobile';
        } else if (width <= this.breakpoints.tablet) {
            return 'tablet';
        } else if (width <= this.breakpoints.wide) {
            return 'desktop';
        } else {
            return 'wide';
        }
    }

    /**
     * Setup resize listener for dynamic layout adjustments
     */
    setupResizeListener() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.optimizeLayout();
                    this.dispatchBreakpointChange(newBreakpoint);
                }
            }, 150);
        });
    }

    /**
     * Optimize layout based on current breakpoint
     */
    optimizeLayout() {
        const body = document.body;
        
        // Remove existing breakpoint classes
        body.classList.remove('mobile-layout', 'tablet-layout', 'desktop-layout', 'wide-layout');
        
        // Add current breakpoint class
        body.classList.add(`${this.currentBreakpoint}-layout`);
        
        // Apply specific optimizations
        switch (this.currentBreakpoint) {
            case 'mobile':
                this.optimizeMobileLayout();
                break;
            case 'tablet':
                this.optimizeTabletLayout();
                break;
            case 'desktop':
                this.optimizeDesktopLayout();
                break;
            case 'wide':
                this.optimizeWideLayout();
                break;
        }
    }

    /**
     * Mobile layout optimizations
     */
    optimizeMobileLayout() {
        // Ensure single column layouts
        const grids = document.querySelectorAll('.content-grid, .tools-comparison, .services-grid');
        grids.forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
        });

        // Optimize interactive components for touch
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-item-vertical, .tool-item');
        interactiveElements.forEach(element => {
            element.style.minHeight = '44px'; // Touch-friendly minimum
        });

        // Stack navigation elements
        const navigations = document.querySelectorAll('.puzzle-navigation, .quiz-navigation');
        navigations.forEach(nav => {
            nav.style.flexDirection = 'column';
        });
    }

    /**
     * Tablet layout optimizations
     */
    optimizeTabletLayout() {
        // Two-column layouts where appropriate
        const toolsComparisons = document.querySelectorAll('.tools-comparison');
        toolsComparisons.forEach(comparison => {
            comparison.style.gridTemplateColumns = '1fr 1fr';
        });

        // Optimize spacing
        const containers = document.querySelectorAll('.lesson-container, .page-content');
        containers.forEach(container => {
            container.style.padding = '1.5rem 2rem';
        });
    }

    /**
     * Desktop layout optimizations
     */
    optimizeDesktopLayout() {
        // Multi-column layouts
        const contentGrids = document.querySelectorAll('.content-grid');
        contentGrids.forEach(grid => {
            if (grid.children.length >= 2) {
                grid.style.gridTemplateColumns = '1fr 1fr';
            }
        });

        // Optimize spacing for larger screens
        const containers = document.querySelectorAll('.lesson-container, .page-content');
        containers.forEach(container => {
            container.style.padding = '2rem 3rem';
        });
    }

    /**
     * Wide screen layout optimizations
     */
    optimizeWideLayout() {
        // Maximum space utilization for very wide screens
        const containers = document.querySelectorAll('.lesson-container, .page-content');
        containers.forEach(container => {
            container.style.padding = '2rem 4rem';
        });

        // Enhanced grid layouts
        const servicesGrids = document.querySelectorAll('.services-grid');
        servicesGrids.forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        });
    }

    /**
     * Setup intersection observer for performance
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-viewport');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe interactive components
            const interactiveComponents = document.querySelectorAll(
                '.puzzle-wrapper, .quiz-container, .interactive-container, .tool-card'
            );
            
            interactiveComponents.forEach(component => {
                observer.observe(component);
            });
        }
    }

    /**
     * Dispatch breakpoint change event
     */
    dispatchBreakpointChange(breakpoint) {
        const event = new CustomEvent('breakpointChange', {
            detail: { breakpoint, utils: this }
        });
        window.dispatchEvent(event);
    }

    /**
     * Optimize specific component layout
     */
    optimizeComponent(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            switch (this.currentBreakpoint) {
                case 'mobile':
                    if (options.mobile) this.applyStyles(element, options.mobile);
                    break;
                case 'tablet':
                    if (options.tablet) this.applyStyles(element, options.tablet);
                    break;
                case 'desktop':
                    if (options.desktop) this.applyStyles(element, options.desktop);
                    break;
                case 'wide':
                    if (options.wide) this.applyStyles(element, options.wide);
                    break;
            }
        });
    }

    /**
     * Apply styles to element
     */
    applyStyles(element, styles) {
        Object.keys(styles).forEach(property => {
            element.style[property] = styles[property];
        });
    }

    /**
     * Check if current breakpoint matches
     */
    isBreakpoint(breakpoint) {
        return this.currentBreakpoint === breakpoint;
    }

    /**
     * Check if screen is mobile
     */
    isMobile() {
        return this.currentBreakpoint === 'mobile';
    }

    /**
     * Check if screen is tablet or larger
     */
    isTabletOrLarger() {
        return ['tablet', 'desktop', 'wide'].includes(this.currentBreakpoint);
    }

    /**
     * Check if screen is desktop or larger
     */
    isDesktopOrLarger() {
        return ['desktop', 'wide'].includes(this.currentBreakpoint);
    }

    /**
     * Get optimal column count for grid
     */
    getOptimalColumns(itemCount, minItemWidth = 300) {
        const availableWidth = window.innerWidth - (this.currentBreakpoint === 'mobile' ? 40 : 120);
        const maxColumns = Math.floor(availableWidth / minItemWidth);
        
        if (this.isMobile()) return 1;
        if (itemCount <= 2) return Math.min(itemCount, 2);
        
        return Math.min(maxColumns, itemCount);
    }

    /**
     * Optimize images for current viewport
     */
    optimizeImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        
        images.forEach(img => {
            const sizes = {
                mobile: img.dataset.mobileSrc,
                tablet: img.dataset.tabletSrc,
                desktop: img.dataset.desktopSrc
            };
            
            const appropriateSize = sizes[this.currentBreakpoint] || sizes.desktop || img.src;
            
            if (img.src !== appropriateSize) {
                img.src = appropriateSize;
            }
        });
    }
}

// Initialize responsive utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ResponsiveUtils = new ResponsiveUtils();
    
    // Make utilities available globally
    window.responsiveUtils = window.ResponsiveUtils;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveUtils;
}
