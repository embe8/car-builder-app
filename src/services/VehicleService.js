import { supabase } from '../supabaseClient.js';
import PerformanceMonitor from '../utils/PerformanceMonitor.js';
import { Model, Trim, Feature, Automobile } from '../utils/vehicleData.js'

class VehicleService {
  constructor() {
    this.monitor = new PerformanceMonitor();
  }
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

    return data.map(model => Model.fromSupabase(model));
  }

// Fetch the trims that each model has by joining tables
async fetchModelsWithTrims(){
  const { data: models, error: modelsError } = await supabase
  .from('models')
  .select(`
    *,
    manufacturers (manufacturer_name),
    trims (
      *,
      trim_packages (
        *,
        packages (package_name)
      )
    ),
    model_bodies (*)
    `);

  if (modelsError) throw modelsError;

  //console.log('Raw models data:', models);

  return models.map(model => {
    //console.log(`Processing model: ${model.model_name}, trims:`, model.trims); // Debug
    //console.log(`Model bodies: ${model.model_bodies.body_name}`)
    
    return Model.fromSupabase(model);
  });
}

  // Fetch models with trims, features, and packages
  async fetchModelsWithTrimsAndFeatures() {
    const { data: models, error: modelsError } = await supabase
    .from('models')
    .select(`
      *,
      manufacturers (manufacturer_name),
      trims (
        *,
        trim_packages (
          *,
          packages (package_name)
        )
      ),
      features (*),
      `);

    if (modelsError) throw modelsError;

    //console.log('Raw models data:', models); // Debug

    // Much simpler - just map using the factory method
    return models.map(model => {
      //console.log(`Processing model: ${model.model_name}, trims:`, model.trims); // Debug
      //console.log(`Model features: ${model.features}`)
      
      return Model.fromSupabase(model);
    });
  }

  // AFTER OPTIMIZATION - Single query with joins
  async fetchModelsWithTrimsAndFeaturesOptimized() {
    return this.monitor.measureQuery('fetchModelsWithTrimsAndFeatures_OPTIMIZED', async () => {
      const { data, error } = await supabase
        .from('models')
        .select(`
          *,
          manufacturers (manufacturer_name),
          model_bodies (body_name),
          trims (
            *,
            trim_packages (
              *,
              packages (package_name)
            )
          ),
          features (*)
        `);

      if (error) throw error;
      return data.map(model => Model.fromSupabase(model));
    });
  }

  // Get performance comparison
  getPerformanceComparison() {
    return this.monitor.getSummary();
  }

  // Fetch trims for a specific model
  async fetchTrims(modelId = null) {
    // build query conditionally
    let query = supabase
      .from('trims')
      .select(`...`);

    if (modelId) {
      query = query.eq('model_id', modelId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.map(trim => Trim.fromSupabase(trim));
  }

// Fetch features for a specific model
async fetchModelWithFeatures(modelId) {
  // console.log('Fetching models with features with model id: ', modelId);
  const { data, error } = await supabase
    .from('models')
    .select(`
      *,
      features(*)
    `)
    .eq('model_id', modelId)
    .single(); // fetch only one model

  if (error) throw error;
  return Model.fromSupabase(data);
}

//Fetch all features
  async fetchFeatures() {
    const { data, error } = await supabase
      .from('features')
      .select('*');

    if (error) throw error;

    // map over array
    return data.map(feature => Feature.fromSupabase(feature));
  }


  // Fetch automobiles with packages
  async fetchAutomobilesWithPackages() {
    const { data, error } = await supabase
      .from('automobiles')
      .select(`
        *,
        trims (*),
        added_packages (
          *,
          packages (*)
        )
      `);

    if (error) throw error;
    return data.map(automobile => Automobile.fromSupabase(automobile));
  }

  /* Add a package to an automobile
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
  }*/

  /*Remove a package from an automobile
  async removePackageFromAutomobile(automobileId, packageId) {
    const { error } = await supabase
      .from('added_packages')
      .delete()
      .eq('automobile_id', automobileId)
      .eq('package_id', packageId);

    if (error) throw error;
  }*/

  // Create a new automobile
  /*
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
  }*/
}

export default VehicleService;