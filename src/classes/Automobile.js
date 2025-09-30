class Automobile {
    constructor(automobileId, trimId, vin, color) {
      this.id = automobileId;        // maps to automobile_id
      this.trimId = trimId;          // maps to trim_id (foreign key)
      this.vin = vin;                // maps to vin
      this.color = color;            // maps to color
      this.addedPackages = [];       // array of AddedPackage objects
      this.trim = null;              // Trim object (set when fetched)
    }
  
    // Add a package to this automobile
    addPackage(addedPackage) {
      this.addedPackages.push(addedPackage);
    }
  
    // Set the trim object when fetched
    setTrim(trim) {
      this.trim = trim;
    }
  
    // Calculate total price including trim and added packages
    calculateTotalPrice() {
      let total = 0;
      
      // Add trim price if available
      if (this.trim) {
        total += this.trim.calculateTotalPrice();
      }
      
      // Add cost of all added packages
      this.addedPackages.forEach(addedPackage => {
        total += addedPackage.cost;
      });
      
      return total;
    }
  
    // Get all packages added to this automobile
    getAddedPackages() {
      return this.addedPackages.map(ap => ap.package);
    }
  
    // Get display name for this automobile
    getDisplayName() {
      const trimName = this.trim ? this.trim.name : 'Unknown Trim';
      return `${trimName} - ${this.color} (VIN: ${this.vin})`;
    }
  
    getAutomobileInfo() {
      return {
        id: this.id,
        trimId: this.trimId,
        vin: this.vin,
        color: this.color,
        trim: this.trim,
        addedPackages: this.addedPackages,
        totalPrice: this.calculateTotalPrice(),
        packageCount: this.addedPackages.length
      };
    }
  }
  
  export default Automobile;