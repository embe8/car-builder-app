class Trim {
    constructor(trimId, trimName, modelId, startingPrice) {
      this.id = trimId;                     // maps to trim_id
      this.name = trimName;                 // maps to trim_name
      this.modelId = modelId;               // maps to model_id (foreign key)
      this.startingPrice = startingPrice;   // maps to starting_price
      //this.engine = engine;                 // engine specs
      //this.transmission = transmission;     // transmission type
      //this.description = description;       // trim description
      this.trimPackages = [];               // array of TrimPackage objects
    }
  
    // Add a package to this trim
    addTrimPackage(trimPackage) {
      this.trimPackages.push(trimPackage);
    }
  
    // Calculate total price including all packages
    calculateTotalPrice() {
      let total = this.startingPrice;
      this.trimPackages.forEach(trimPackage => {
        total += trimPackage.cost;
      });
      return total;
    }
  
    // Get packages added to this trim
    getPackages() {
      return this.trimPackages.map(tp => tp.package);
    }
  
    getDisplayName() {
      return this.name;
    }
  
    getTrimInfo() {
      return {
        id: this.id,
        name: this.name,
        modelId: this.modelId,
        startingPrice: this.startingPrice,
        totalPrice: this.calculateTotalPrice(),
        //engine: this.engine,
        //transmission: this.transmission,
        //description: this.description, need to add this later
        packages: this.getPackages(),
        packageCount: this.trimPackages.length
      };
    }
  }
  
  export default Trim;