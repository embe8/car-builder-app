// Performance monitoring utility
class PerformanceMonitor {
    constructor() {
      this.metrics = [];
    }
  
    // Measure query performance
    async measureQuery(queryName, queryFunction) {
      const startTime = performance.now();
      const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      
      try {
        const result = await queryFunction();
        const endTime = performance.now();
        const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        const metric = {
          queryName,
          executionTime: endTime - startTime,
          memoryUsed: endMemory - startMemory,
          timestamp: new Date().toISOString(),
          success: true
        };
        
        this.metrics.push(metric);
        // console.log(` ${queryName}: ${metric.executionTime.toFixed(2)}ms`);
        
        return result;
      } catch (error) {
        const endTime = performance.now();
        const metric = {
          queryName,
          executionTime: endTime - startTime,
          timestamp: new Date().toISOString(),
          success: false,
          error: error.message
        };
        
        this.metrics.push(metric);
        console.error(`Error${queryName}: ${metric.executionTime.toFixed(2)}ms - ${error.message}`);
        throw error;
      }
    }
  
    // Get performance summary
    getSummary() {
      const successful = this.metrics.filter(m => m.success);
      const failed = this.metrics.filter(m => !m.success);
      
      return {
        totalQueries: this.metrics.length,
        successful: successful.length,
        failed: failed.length,
        averageTime: successful.reduce((sum, m) => sum + m.executionTime, 0) / successful.length,
        minTime: Math.min(...successful.map(m => m.executionTime)),
        maxTime: Math.max(...successful.map(m => m.executionTime)),
        totalTime: successful.reduce((sum, m) => sum + m.executionTime, 0)
      };
    }
  
    // Clear metrics
    clear() {
      this.metrics = [];
    }
  }
  
  export default PerformanceMonitor;