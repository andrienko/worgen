(function() {

  var Worgen = function (text) {
    this.commands = this.getCommands(text);
    this.filters = {};
  };

  Worgen.prototype = {
    getCommands: function (text) {

      var commands = {};
      var lines = text.split(/\n+/);
      lines.forEach(function (line) {
        var index = line.indexOf('=') + 1;
        if (index < 0)return;
        commands[line.substring(0, index - 1)] = line.substring(index);
      });

      return commands;
    },

    addFilter: function (name, callback) {
      this.filters[name] = callback;
    },
    process: function (str) {
      return this.runFilters(
        this.subpatterns(
          this.variants(
            str
          )));
    },
    run: function (keyword) {
      if (keyword in this.commands) {
        return this.process(this.commands[keyword]);
      }
      else {
        throw keyword + ' not defined';
      }
    },
    variants: function (str) {
      if (str.indexOf('|') < 0) return str;
      else {
        var options = str.split('|');
        var index = Math.floor(Math.random() * options.length);
        return this.variants(options[index]);
      }
    },
    subpatterns: function (str) {
      var that = this;
      return str.replace(/\[(.+?)\]/g, function (source, subpattern) {
        try {
          return that.run(subpattern);
        } catch (e) {
          return source;
        }
      });
    },
    runFilters: function (str) {
      var that = this;
      var filterRegex = /\[(\w+?)\]\(([^)(]*?)\)/g;
      while (str.match(filterRegex)) {
        str = str.replace(filterRegex, function (source, filter_name, filter_argument) {
          try {
            return that.filters[filter_name].apply(filter_argument, filter_argument.split(/[\s,]+/));
          } catch (e) {
            console.log('Error in filter: ',e);
            return 'ERR';
          }
        });
      }
      return str;
    }
  };

  var glob = this;
  if (typeof exports === 'undefined') {
    glob.Worgen = Worgen;
    Worgen.commonFilters = function(){return glob.worgenFilters || {};};
  } else {
    Worgen.commonFilters = function () {return require('./filters')};
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Worgen;
    }
    exports.Worgen = Worgen;
  }

}).call(this);