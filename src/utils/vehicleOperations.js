import { vehicleData } from './vehicleData.js';

// Model operations
export const addTrimToModel = (model, trim) => {
  return {
    // shallow copy of the model object
    ...model,
    // add new trim to existing trims array
    trims: [...model.trims, trim]
  };
};

export const addFeatureToModel = (model, feature) => {
  return {
    ...model,
    // add new feature to existing features array
    features: [...model.features, feature]
  };
};


export const setManufacturerName = (model, name) => {
  return {
    ...model,
    manufacturerName: name
  };
};

// Trim operations
export const addPackageToTrim = (trim, trimPackage) => {
  return {
    // shallow copy of trim object
    ...trim,
    // add new trim package to existing trim package array
    trimPackages: [...trim.trimPackages, trimPackage]
  };
};

// Automobile operations
export const addPackageToAutomobile = (automobile, addedPackage) => {
  return {
    // shallow copy of automobile object
    ...automobile,
    // add new package to existing packages array
    addedPackages: [...automobile.addedPackages, addedPackage]
  };
};

export const setTrimForAutomobile = (automobile, trim) => {
  return {
    // shallow copy of automobile object
    ...automobile,
    // add trim to automobile
    trim: trim
  };
};

// Package operations
export const setPackageForAddedPackage = (addedPackage, packageObj) => {
  return {
    // copy of added package object
    ...addedPackage,
    // set package attribute to the package object
    package: packageObj,
    // if package object has a price, set cost to price, otherwise set to 0
    cost: packageObj?.price || 0
  };
};

export const setPackageForTrimPackage = (trimPackage, packageObj) => {
  return {
    // copy of trim package object
    ...trimPackage,
    // set package attribute of trim package to the package object
    package: packageObj
  };
};