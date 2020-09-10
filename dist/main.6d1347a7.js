// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $add = $siteList.find('.addButton');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var i = 0;
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://douban.com',
  text: '豆瓣'
}, {
  logo: 'B',
  url: 'https://bilibili.com',
  text: 'b站'
}];

var render = function render() {
  $siteList.find('li:not(.addButton)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n    <li>\n        <div class=\"site\">\n            <div class='circle'></div>\n            <div class=\"logo\">\n                <div class='circle'>\n                    <img src=\"".concat(node.url, "/favicon.ico\" class='logo2'></img>\n                </div>\n            </div>\n            <div class=\"link\">").concat(node.text, "</div>\n            <div class='amend' title='\u4FEE\u6539'>\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-xiugai\"></use>\n                </svg>\n            </div>\n        </div>\n    </li > ")).insertBefore($add);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.amend', function (e) {
      e.stopPropagation();
      window.i = index;
      $('#diy-webpage').addClass('show');
      render();
      $('#background').addClass('lucency');

      if (!$('#delete').hasClass('del')) {
        $('#delete').addClass('del');
        $('#delete').removeAttr('disabled');
      }
    });
  });
};

render();
$('.addButton').on('click', function () {
  $('#background').addClass('lucency');
  $('#diy-webpage').addClass('show');
});
$('#delete').on('click', function () {
  hashMap.splice(window.i, 1);
  $('.show').removeClass('show');
  $('#background').removeClass('lucency');
  render();
});
$('#cancel').on('click', function () {
  $('.show').removeClass('show');
  $('#delete').removeClass('del');
  $('#background').removeClass('lucency');
});
$('.url').on('input', function () {
  if ($('.url').val() !== '') {
    $('#done').addClass('blue');
  } else {
    $('#done').removeClass('blue');
  }
});
$('#done').on('click', function (e) {
  e.stopPropagation();

  if (!$(this).hasClass('blue')) {
    return;
  }

  $('.done').removeAttr('disabled');

  if ($('#delete').hasClass('del')) {
    var url;

    if ($('.url').val().indexOf('https') !== 0) {
      url = 'https://' + $('.url').val();
    }

    if ($('.url').val() !== '') {
      hashMap[window.i] = {
        logo: url + '/favicon.ico',
        text: $('.name').val(),
        url: url
      };
    } else {
      return;
    }

    render();
    $('.show').removeClass('show');
    $('#background').removeClass('lucency');
  } else {
    var _url;

    if ($('.url').val().indexOf('https') !== 0) {
      _url = 'https://' + $('.url').val();
    }

    if ($('.url').val() !== '') {
      hashMap.push({
        logo: _url + '/favicon.ico',
        text: $('.name').val(),
        url: _url
      });
    } else {
      return;
    }

    render();
    $('.show').removeClass('show');
    $('#background').removeClass('lucency');
  }
});
$('.addButton').on('click', function () {
  $('.dialog-title').text('添加快捷方式');
});
$('.amend').on('click', function () {
  $('.dialog-title').text('修改快捷方式');
});
$('.field-input').on('focus', function () {
  $(this).parent().next().addClass('newStyle');
});
$('.field-input').on('blur', function () {
  $(this).parent().next().removeClass('newStyle');
});
$('.name').on('focus', function () {
  $('#name').addClass('font-color');
});
$('.name').on('blur', function () {
  $('#name').removeClass('font-color');
});
$('.url').on('focus', function () {
  $('#website').addClass('font-color');
});
$('.url').on('blur', function () {
  $('#website').removeClass('font-color');
});
$('.cancel').on('click', function () {
  $(this).addClass('protuberance');
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  window.localStorage.setItem('x', string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6d1347a7.js.map