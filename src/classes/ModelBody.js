class ModelBody{
    constructor(bodyId, bodyName){
    this.id = bodyId;
    this.name = bodyName;
    }

    getDisplayInfo(){
        return `${this.name}`;
    }

    getPackageInfo(){
        return {
            id: this.bodyId,
            name: this.bodyName,
        };
    }
}

export default ModelBody;