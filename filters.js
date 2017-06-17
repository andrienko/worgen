(function () {

  var getFloat = function (num) {
    num = parseFloat(num || 0);
    num = isNaN(num) ? 0 : num;
    return num;
  };

  var getNum = function (num) {
    return Math.floor(getFloat(num));
  };


  var filters = {
    /** Capitalize first letter */
    capitalizeFirst : function(){
      return this.slice(0,1).toUpperCase() + this.slice(1);
    },

    /** Capitalize the argument */
    capitalize : function(){
      return this.toUpperCase();
    },
    /** Repeat string num times */
    repeat : function (string, num) {
      return string.repeat(getNum(num));
    },

    /** Returns num of random symbols from symbols. Typical usage is [rnd](abcdg-k,2)
     * (means 2 symbols from a,b,c,d,g,h,i,j,k set) **/
    randomSymbols : function(symbols,num){

      var regex = /.-./g;
      var pairs = [];
      var chars = symbols
        .replace(regex,function(a){
          pairs.push(a);return '';
        })
        .split('').map(function(a){
          return a.charCodeAt(0);
        });

      pairs.forEach(function(a){
        a = [a.charCodeAt(0), a.charCodeAt(2)].sort(function(a,b){return a-b;});
        a = Array.apply(0,Array(a[1]-a[0]+1)).map(function(b,i) {return i+a[0];});
        chars = chars.concat(a);
      });

      var uniq = [];

      chars.forEach(function(char){
        if(uniq.indexOf(char)===-1){
          uniq.push(char);
        }
      });

      num = getNum(num);
      var word = '';
      while(num--){
        word+= String.fromCharCode(uniq[Math.floor(Math.random()*uniq.length)]);
      }

      return word;
    },

    replaceSymbols: function(search,replaces,where,chance){
      chance=getFloat(chance)||1;
      search = search.split('');
      replaces = replaces.split('');
      search.forEach(function (a,i) {
        where = where.replace(new RegExp(a,'g'), function (r) {
          if(Math.random()<chance)return replaces[i];
          return r;
        });
      });
      return where;
    }


  };

  if (typeof exports === 'undefined') {this.worgenFilters = filters; } else {
    if(typeof module !== 'undefined' && module.exports) { exports = module.exports = filters; }
    exports.worgenFilters = filters;
  }
}).call(this);