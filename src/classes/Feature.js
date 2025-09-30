class Feature{
    constructor(featureId, featureName, modelId){
        this.id = featureId;
        this.name = featureName;
        this.modelId = modelId;
    }

    getDisplayInfo(){
        return `${this.name}`;
    }

    getFeatureInfo(){
        return{
            id: this.id,
            name: this.name,
            modelId: this.modelId

        };
    }

}

export default Feature;