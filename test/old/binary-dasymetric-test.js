'use strict';

const Expect = require('expect');
const Path = require('path');
const Aggregate = require('../lib/areal-interpolate');
const FileLoader = require('../lib/fileloader');

const Config = {
  hierarch_abs: { 
    input: Path.resolve(__dirname, 'data/base_data/sourcefeatures.geojson'),
    target: Path.resolve(__dirname, 'data/base_data/targetfeatures_hierarchical.geojson'),
    attr: 'Aggr',
    binary: Path.resolve(__dirname, 'data/base_data/binarymask.geojson'),
    mode: 'binaryDasymetricWeighting'
  },
  
  hierarch_rel: { 
    input: Path.resolve(__dirname, 'data/base_data/sourcefeatures.geojson'),
    target: Path.resolve(__dirname, 'data/base_data/targetfeatures_hierarchical.geojson'),
    attr: 'Aggr_rel',
    binary: Path.resolve(__dirname, 'data/base_data/binarymask.geojson'),
    mode: 'binaryDasymetricWeighting'
  },

  nonHierarch_abs: { 
    input: Path.resolve(__dirname, 'data/base_data/sourcefeatures.geojson'),
    target: Path.resolve(__dirname, 'data/base_data/targetfeatures_nonhierarchical.geojson'),
    attr: 'Aggr',
    binary: Path.resolve(__dirname, 'data/base_data/binarymask.geojson'),
    mode: 'binaryDasymetricWeighting'
  },

  nonHierarch_rel: { 
    input: Path.resolve(__dirname, 'data/base_data/sourcefeatures.geojson'),
    target: Path.resolve(__dirname, 'data/base_data/targetfeatures_nonhierarchical.geojson'),
    attr: 'Aggr_rel',
    binary: Path.resolve(__dirname, 'data/base_data/binarymask.geojson'),
    mode: 'binaryDasymetricWeighting'
  }
}

describe('binary dasymetric weighting [hierarchical, absolute]', () => {

  describe('output data', () => {

    let inputData, outputData;

    beforeEach((cb) => {

      Aggregate(Config.hierarch_abs, (res) => {
        outputData = res;
        FileLoader.readGeoJson([Config.hierarch_abs.target], (err, res) => {
          inputData = res[0];
          cb();
        });
      });

    });

    it('should calculate the ouput values correctly',() => {
      Expect(Math.round(outputData.features[0].properties[Config.hierarch_abs.attr])).toBe(62);
      Expect(Math.round(outputData.features[1].properties[Config.hierarch_abs.attr])).toBe(15);
    });

  });

});

describe('binary dasymetric weighting [hierarchical, relative]', () => {

  describe('output data', () => {

    let inputData, outputData;

    beforeEach((cb) => {

      Aggregate(Config.hierarch_rel, (res) => {
        outputData = res;
        FileLoader.readGeoJson([Config.hierarch_rel.target], (err, res) => {
          inputData = res[0];
          cb();
        });
      });

    });

    it('should calculate the ouput values correctly',() => {
      Expect(outputData.features[0].properties[Config.hierarch_rel.attr]).toBeGreaterThan(30.5).toBeLessThan(30.7);
      Expect(outputData.features[1].properties[Config.hierarch_rel.attr]).toBeGreaterThan(1.4).toBeLessThan(1.6);
    });

  });

});



describe('binary dasymetric weighting [nonhierarchical, absolute]', () => {

  describe('output data', () => {

    let inputData, outputData;

    beforeEach((cb) => {

      Aggregate(Config.nonHierarch_abs, (res) => {
        outputData = res;
        FileLoader.readGeoJson([Config.nonHierarch_abs.target], (err, res) => {
          inputData = res[0];
          cb();
        });
      });

    });

    it('should calculate the ouput values correctly',() => {
      Expect(outputData.features[0].properties[Config.nonHierarch_abs.attr]).toBe(42);
      Expect(outputData.features[1].properties[Config.nonHierarch_abs.attr]).toBeGreaterThan(56).toBeLessThan(57);
    });

  });

});


describe('binary dasymetric weighting [nonhierarchical, relative]', () => {

  describe('output data', () => {

    let inputData, outputData;

    beforeEach((cb) => {

      Aggregate(Config.nonHierarch_rel, (res) => {
        outputData = res;
        FileLoader.readGeoJson([Config.nonHierarch_rel.target], (err, res) => {
          inputData = res[0];
          cb();
        });
      });

    });

    it('should calculate the ouput values correctly',() => {
      Expect(outputData.features[0].properties[Config.nonHierarch_rel.attr]).toBeGreaterThan(25).toBeLessThan(26);
      Expect(outputData.features[1].properties[Config.nonHierarch_rel.attr]).toBeGreaterThan(12).toBeLessThan(13);
    });

  });

});