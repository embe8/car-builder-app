// Model factory with static methods
export const Model = {
    // Static factory method
    fromSupabase: (data) => ({
      id: data.model_id,
      name: data.model_name,
      manufacturer: data.manufacturer_id,
      year: data.year,
      bodyType: data.body_id,
      bodyName: data.model_bodies?.body_name,
      manufacturerName: data.manufacturers?.manufacturer_name,
      trims: data.trims?.map(trim => Trim.fromSupabase(trim)) || [],
      features: data.features?.map(feature => Feature.fromSupabase(feature)) || []
    }),
  
    // Helper methods
    calculateBasePrice: (model) => {
      if (!model.trims || model.trims.length === 0) return 0;
      const trimPrices = model.trims.map(trim => trim.startingPrice);
      return Math.min(...trimPrices);
    },
  
    getDisplayName: (model) => `${model.year} ${model.name}`,
  
    getCheapestTrim: (model) => {
      if (!model.trims || model.trims.length === 0) return null;
      return model.trims.reduce((cheapest, current) => 
        current.startingPrice < cheapest.startingPrice ? current : cheapest
      );
    }
  };
  
  // Trim factory
  export const Trim = {
    fromSupabase: (data) => ({
      id: data.trim_id,
      name: data.trim_name,
      modelId: data.model_id,
      startingPrice: data.starting_price,
      trimPackages: data.trim_packages?.map(tp => TrimPackage.fromSupabase(tp)) || []
    }),
  
    calculateTotalPrice: (trim) => {
      const basePrice = trim.startingPrice || 0;
      const packagesPrice = trim.trimPackages?.reduce((sum, tp) => sum + (tp.cost || 0), 0) || 0;
      return basePrice + packagesPrice;
    },
  
    getDisplayName: (trim) => trim.name
  };
  
  // Feature factory
  export const Feature = {
    fromSupabase: (data) => ({
      id: data.feature_id,
      name: data.feature_name,
      modelId: data.model_id,
      price: data.price || 0,
      category: data.category
    }),
  
    getDisplayName: (feature) => feature.name
  };
  
  // Package factory
  export const Package = {
    fromSupabase: (data) => ({
      id: data.package_id,
      name: data.package_name,
      price: data.price || 0
    }),
  
    getDisplayName: (pkg) => pkg.name
  };
  
  // TrimPackage factory
  export const TrimPackage = {
    fromSupabase: (data) => ({
      trimId: data.trim_id,
      packageId: data.package_id,
      cost: data.cost,
      package: data.packages ? Package.fromSupabase(data.packages) : null
    })
  };
  
  // Automobile factory
  export const Automobile = {
    fromSupabase: (data) => ({
      id: data.automobile_id,
      trimId: data.trim_id,
      vin: data.vin,
      color: data.color,
      addedPackages: data.added_packages?.map(ap => AddedPackage.fromSupabase(ap)) || [],
      trim: data.trim ? Trim.fromSupabase(data.trim) : null
    }),
  
    calculateTotalPrice: (automobile) => {
      const trimPrice = automobile.trim ? Trim.calculateTotalPrice(automobile.trim) : 0;
      const packagesPrice = automobile.addedPackages?.reduce((sum, pkg) => sum + (pkg.cost || 0), 0) || 0;
      return trimPrice + packagesPrice;
    },
  
    getDisplayName: (automobile) => {
      const trimName = automobile.trim?.name || 'Unknown Trim';
      return `${trimName} - ${automobile.color} (VIN: ${automobile.vin})`;
    }
  };
  
  // AddedPackage factory
  export const AddedPackage = {
    fromSupabase: (data) => ({
      automobileId: data.automobile_id,
      packageId: data.package_id,
      package: data.package ? Package.fromSupabase(data.package) : null,
      cost: data.cost || 0
    })
  };