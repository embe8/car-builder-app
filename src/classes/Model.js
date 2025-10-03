
class Model {
    constructor(modelId, modelName, manufacturerId, year, bodyId, bodyName) {
      this.id = modelId;           // maps to model_id
      this.name = modelName;       // maps to model_name  
      this.manufacturer = manufacturerId; // maps to manufacturer_id
      this.year = year;            // maps to year
      this.bodyType = bodyId;    // maps to body_id
      this.bodyName = bodyName;
      //this.fuelType = fuelType;    // maps to fuel_type
      this.trims = [];
      this.features = [];
    }

  getBodyName(){
    return `${this.bodyName}`;
}

  

  // Method to set manufacturer name when fetched from manufacturers table
  setManufacturerName(name) {
    this.manufacturerName = name;
  }

  addTrim(trim) {
    this.trims.push(trim);
  }

  addFeature(feature) {
    this.trims.push(feature);
  }

  getDisplayName() {
    return `${this.year} ${this.name}`;
  }

  // Calculate base price as the lowest trim price
  calculateBasePrice() {
    if (this.trims.length === 0) {
      return 0; // No trims available
    }
    
    // Find the minimum price among all trims
    const trimPrices = this.trims.map(trim => trim.startingPrice);
    return Math.min(...trimPrices);
  }

    // Get the cheapest trim
    getCheapestTrim() {
        if (this.trims.length === 0) {
          return null;
        }
        
        return this.trims.reduce((cheapest, current) => {
          return current.startingPrice < cheapest.startingPrice ? current : cheapest;
        });
      }
    
      // Get all available trims sorted by price
      getTrimsByPrice() {
        return [...this.trims].sort((a, b) => a.startingPrice - b.startingPrice);
      }

  getModelInfo() {
    return {
      id: this.id,
      name: this.name,
      manufacturer: this.manufacturerId,
      manufacturerName: this.manufacturerName,
      year: this.year,
      //basePrice: this.calculateBasePrice(),
      bodyType: this.bodyId,
      bodyName: this.bodyName,
      //fuelType: this.fuelType,
      trims: this.trims,
      features: this.features,
      trimCount: this.trims.length,
      featureCount: this.features.length
    };
  }
}

export default Model;