class TrimPackage{
    constructor(trimId, packageId, cost)
    {
        this.id = trimId;
        this.packageId = packageId;
        this.cost = cost;
        this.package = null; //Set when fetched
    }

//set when fetched
setPackage(packageObj){
    this.package = packageObj;
}

getTrimPackageInfo(){
    return{
        trimId: this.trimId,
        packageId: this.packageId,
        cost: this.cost,
        package: this.package
    };
 }
}

export default TrimPackage;