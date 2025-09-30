class AddedPackage {
    constructor(automobileId, packageId) {
      this.automobileId = automobileId;  // maps to automobile_id (foreign key)
      this.packageId = packageId;       // maps to package_id (foreign key)
      this.package = null;              // Package object (set when fetched)
    }
  
    // Set the package object when fetched
    setPackage(packageObj) {
      this.package = packageObj;
    }
  
    // Get cost from the package
    getCost() {
      return this.package ? this.package.price : 0;
    }
  
    getAddedPackageInfo() {
      return {
        automobileId: this.automobileId,
        packageId: this.packageId,
        cost: this.getCost(),
        package: this.package
      };
    }
  }
  
  export default AddedPackage;