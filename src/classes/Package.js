class Package{
    constructor(packageId, packageName){
    this.id = packageId;
    this.name = packageName;
    //this.description = description;
    }

    getDisplayInfo(){
        return `${this.name}`;
    }

    getPackageInfo(){
        return {
            id: this.id,
            name: this.name,
            //description: this.description
        };
    }
}

export default Package;