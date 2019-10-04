module.exports = {
  webpack: function(config, env) {
      //JS Overrides
      config.output.filename = 'static/js/script.js';
    return config;
  },
};
