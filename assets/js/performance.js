/**
 * Performance monitoring and optimization
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.pageLoad = {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                totalTime: navigation.loadEventEnd - navigation.fetchStart
            };
            
            console.log('Page Load Metrics:', this.metrics.pageLoad);
        });
    }

    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                console.log('LCP:', this.metrics.lcp);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    console.log('FID:', this.metrics.fid);
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cls = clsValue;
                console.log('CLS:', this.metrics.cls);
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    new PerformanceMonitor();
}
