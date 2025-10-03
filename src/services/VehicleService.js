import { supabase } from '../supabaseClient.js';
import Model from '../classes/Model.js';
import Trim from '../classes/Trim.js';
import Feature from '../classes/Feature.js';
import Package from '../classes/Package.js';
import TrimPackage from '../classes/TrimPackage.js';
import Automobile from '../classes/Automobile.js';
import AddedPackage from '../classes/AddedPackage.js';
import ModelBody from '../classes/ModelBody.js';

class VehicleService {
  // Fetch manufacturers
  async fetchManufacturers() {
    const { data, error } = await supabase
      .from('manufacturers')
      .select('*');

    if (error) throw error;
    return data;
  }

  // Fetch models with manufacturers
  async fetchModels() {
    const { data, error } = await supabase
      .from('models')
      .select(`
        *,
        manufacturers (manufacturer_name)
      `);

    if (error) throw error;

    return models.map(model => {
      const modelInstance = new Model(
        model.model_id,
        model.model_name,
        model.manufacturer_id,
        model.year,
        model.body_id,
        model.fuel_type
      );

      if (model.manufacturers) {
        modelInstance.setManufacturerName(model.manufacturers.manufacturer_name);
      }

      return modelInstance;
    });
  }

// Fetch the trims that each model has by joining tables
async fetchModelsWithTrims(){
  const { data: models, error: modelsError } = await supabase
  .from('models')
  .select(`
    *,
    manufacturers (manufacturer_name),
    trims (*),
    model_bodies (*)
    `);

    if (modelsError) throw modelsError;

    console.log('Raw models data:', models); // Debug

    const { data: packages, error: packagesError } = await supabase
    .from('packages')
    .select('*');

  if (packagesError) throw packagesError;

  // Fetch trim packages relationships
  const { data: trimPackages, error: trimPackagesError } = await supabase
    .from('trim_packages')
    .select('*');

  if (trimPackagesError) throw trimPackagesError;

  //loop over each element (row from query results) 
  return models.map(model => {
    console.log(`Processing model: ${model.model_name}, trims:`, model.trims); // Debug
    console.log(`Model bodies: ${model.model_bodies.body_name}` )

    //for each element create an instance of Model class
    const modelInstance = new Model(
      // pass the properties of data (db) into the Model constructor
      model.model_id,
      model.model_name,
      model.manufacturer_id,
      model.year,
      model.body_id,
      model.model_bodies.body_name

    //model.fuel_type
    );

    // set manufacturer name if available
    if (model.manufacturers) {
      modelInstance.setManufacturerName(model.manufacturers.manufacturer_name);
    }

    // Add trims to the model
    if (model.trims) {
      model.trims.forEach(trim => {
        // for each trim, new trim object is created and db data is passed
        const trimInstance = new Trim(
          trim.trim_id,
          trim.trim_name,
          trim.model_id,
          trim.starting_price,
          trim.engine,
          trim.transmission,
          trim.description
        );

        // Add packages to this trim
        const trimPackageRelations = trimPackages.filter(tp => tp.trim_id === trim.trim_id);
        trimPackageRelations.forEach(tp => {
          const packageData = packages.find(pkg => pkg.package_id === tp.package_id);
          if (packageData) {
            const packageInstance = new Package(
              packageData.package_id,
              packageData.package_name
            );

            const trimPackageInstance = new TrimPackage(
              tp.trim_id,
              tp.package_id,
              tp.cost
            );
            trimPackageInstance.setPackage(packageInstance);
            trimInstance.addTrimPackage(trimPackageInstance);
          }
        });

        modelInstance.addTrim(trimInstance);
      });
    }
    return modelInstance;
  });
}

  // Fetch models with trims, features, and packages
  async fetchModelsWithTrimsAndFeatures() {
    // Fetch models with manufacturers
    const { data: models, error: modelsError } = await supabase
      .from('models')
      .select(`
        *,
        manufacturers (manufacturer_name),
        model_bodies (*)
      `);

    if (modelsError) throw modelsError;

    // Fetch all trims
    const { data: trims, error: trimsError } = await supabase
      .from('trims')
      .select('*');

    if (trimsError) throw trimsError;

    // Fetch all features
    const { data: features, error: featuresError } = await supabase
      .from('features')
      .select('*');

    if (featuresError) throw featuresError;

    // Fetch all packages
    const { data: packages, error: packagesError } = await supabase
      .from('packages')
      .select('*');

    if (packagesError) throw packagesError;

    // Fetch trim packages relationships
    const { data: trimPackages, error: trimPackagesError } = await supabase
      .from('trim_packages')
      .select('*');

    /*const { data: modelBodies, error: modelBodiesError } = await supabase
    .from('model_bodies')
    .select('*');*/


    if (trimPackagesError) throw trimPackagesError;

    /*const bodyIdToNameMap = {};
    modelBodies.forEach(body => {
      bodyIdToNameMap[body.id] = body.name;
    });*/





    // Create model instances
    const modelInstances = models.map(model => {
      const modelInstance = new Model(
        model.model_id,
        model.model_name,
        model.manufacturer_id,
        model.year,
        model.body_id,
        model.model_bodies.body_name
      );
      //const bodies = modelBodies.filter(body => body.body_id === model.body_id);

      /*bodies.forEach(body => {
        modelInstance.setBodyName(new ModelBody(
          body.body_id,
          body.body_name
        ));
      });
      console.log(bodies);*/


      if (model.manufacturers) {
        modelInstance.setManufacturerName(model.manufacturers.manufacturer_name);
      }

      // Add features to this model
      const modelFeatures = features.filter(feature => feature.model_id === model.model_id);
      modelFeatures.forEach(feature => {
        modelInstance.addFeature(new Feature(
          feature.feature_id,
          feature.feature_name,
          feature.model_id,
          feature.price || 0,
          feature.category
        ));
      });

      
    /*models.forEach(model => {
      const bodyName = bodyIdToNameMap[model.bodyType];
      modelInstance.setBodyName(bodyName);
    });*/

      // Add trims to this model
      const modelTrims = trims.filter(trim => trim.model_id === model.model_id);
      modelTrims.forEach(trim => {
        const trimInstance = new Trim(
          trim.trim_id,
          trim.trim_name,
          trim.model_id,
          trim.starting_price,
          trim.engine,
          trim.transmission,
          trim.description
        );

        // Add packages to this trim
        const trimPackageRelations = trimPackages.filter(tp => tp.trim_id === trim.trim_id);
        trimPackageRelations.forEach(tp => {
          const packageData = packages.find(pkg => pkg.package_id === tp.package_id);
          if (packageData) {
            const packageInstance = new Package(
              packageData.package_id,
              packageData.package_name
            );

            const trimPackageInstance = new TrimPackage(
              tp.trim_id,
              tp.package_id,
              tp.cost
            );
            trimPackageInstance.setPackage(packageInstance);
            trimInstance.addTrimPackage(trimPackageInstance);
          }
        });

        modelInstance.addTrim(trimInstance);
      });

      return modelInstance;
    });

    return modelInstances;
  }

  // Fetch trims for a specific model
  async fetchTrims(modelId = null) {
    const query = supabase
      .from('trims')
      .select(`
        *,
        models (model_name, manufacturers (manufacturer_name)
      `);

    if (modelId) {
      query = query.eq('model_id', modelId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(trim => new Trim(
      trim.trim_id,
      trim.trim_name,
      trim.model_id,
      trim.starting_price,
      trim.engine,
      trim.transmission,
      trim.description
    ));
  }

  // Fetch features for a specific model
// Fetch one model and its features in one query
async fetchModelWithFeatures(modelId) {
  const { data, error } = await supabase
    .from('models')
    .select(`
      *,
      features(*)
    `)
    .eq('model_id', modelId)
    .single(); // because you're only fetching one model

  if (error) throw error;
  return data; // includes model fields + "features" array
}

//Fetch all features
  async fetchFeatures() {
    const { data, error } = await supabase
      .from('features')
      .select('*');

    if (error) throw error;

    return data.map(feature => new Feature(
      feature.feature_id,
      feature.feature_name,
      feature.model_id,
      feature.price || 0,
      feature.category
    ));
  }

  // Fetch packages
  async fetchTrimPackages() {
    const { data, error } = await supabase
      .from('trim_packages')
      .select('*');

    if (error) throw error;

    return data.map(pkg => new TrimPackage(
      pkg.package_id,
      pkg.trim_id,
      pkg.cost,
      pkg.package
    ));
  }

  // Fetch automobiles with packages
  async fetchAutomobilesWithPackages() {
    // Fetch automobiles
    const { data: automobiles, error: automobilesError } = await supabase
      .from('automobiles')
      .select('*');

    if (automobilesError) throw automobilesError;

    // Fetch all packages
    const { data: packages, error: packagesError } = await supabase
      .from('packages')
      .select('*');

    if (packagesError) throw packagesError;

    // Fetch added packages relationships
    const { data: addedPackages, error: addedPackagesError } = await supabase
      .from('added_packages')
      .select('*');

    if (addedPackagesError) throw addedPackagesError;

    // Fetch trims for these automobiles
    const { data: trims, error: trimsError } = await supabase
      .from('trims')
      .select('*');

    if (trimsError) throw trimsError;

    // Create automobile instances
    const automobileInstances = automobiles.map(automobile => {
      const automobileInstance = new Automobile(
        automobile.automobile_id,
        automobile.trim_id,
        automobile.vin,
        automobile.color
      );

      // Set the trim for this automobile
      const automobileTrim = trims.find(trim => trim.trim_id === automobile.trim_id);
      if (automobileTrim) {
        const trimInstance = new Trim(
          automobileTrim.trim_id,
          automobileTrim.trim_name,
          automobileTrim.model_id,
          automobileTrim.starting_price,
          automobileTrim.engine,
          automobileTrim.transmission,
          automobileTrim.description
        );
        automobileInstance.setTrim(trimInstance);
      }

      // Add packages to this automobile
      const automobileAddedPackages = addedPackages.filter(ap => ap.automobile_id === automobile.automobile_id);
      automobileAddedPackages.forEach(ap => {
        const packageData = packages.find(pkg => pkg.package_id === ap.package_id);
        if (packageData) {
          const packageInstance = new Package(
            packageData.package_id,
            packageData.package_name
          );

          const addedPackageInstance = new AddedPackage(
            ap.automobile_id,
            ap.package_id
          );
          addedPackageInstance.setPackage(packageInstance);
          automobileInstance.addPackage(addedPackageInstance);
        }
      });

      return automobileInstance;
    });

    return automobileInstances;
  }

  // Add a package to an automobile
  async addPackageToAutomobile(automobileId, packageId) {
    const { data, error } = await supabase
      .from('added_packages')
      .insert({
        automobile_id: automobileId,
        package_id: packageId
      })
      .select();

    if (error) throw error;
    return data;
  }

  // Remove a package from an automobile
  async removePackageFromAutomobile(automobileId, packageId) {
    const { error } = await supabase
      .from('added_packages')
      .delete()
      .eq('automobile_id', automobileId)
      .eq('package_id', packageId);

    if (error) throw error;
  }

  // Create a new automobile
  async createAutomobile(trimId, vin, color) {
    const { data, error } = await supabase
      .from('automobiles')
      .insert({
        trim_id: trimId,
        vin: vin,
        color: color
      })
      .select();

    if (error) throw error;
    return data;
  }
}

export default VehicleService;