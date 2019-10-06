module.exports = function override(config) {
  config.optimization.runtimeChunk = false;
  config.output.filename = 'static/js/script.js';
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false
    }
  };
  return config;
};
