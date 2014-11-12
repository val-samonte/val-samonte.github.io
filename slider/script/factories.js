angular.module('sliderDemo',[])

  .factory('entry', function () {
    var _entries = [], _date = new Date().toDateString();
    var Entry = function (type, value, reason) {
      if(!(type instanceof EntryType)) {
        throw new Error('Parameter 1 is not an EntryType instance.');
      }
      if(isNaN(value)) {
        throw new Error('Parameter 2 is not numeric.');
      }
      this.val = value;
      this.reason = reason;
      this.getType = function () {
        return type;
      }
      this.getTypeData = function () {
        return type.getData();
      }
      this.isType = function (targetType) {
        if(typeof targetType != 'undefined') {
          return type === targetType;
        }
        return false;
      }
      this.isPairWith = function (targetEntry) {
        if(!(targetEntry instanceof Entry)) {
          throw new Error('Parameter is invalid. Datatype Entry required.');
        }
        if(typeof targetEntry != 'undefined') {
          var typeData = type.getData(),
            targetTypeData = targetEntry.getTypeData();
          return typeData.phase !== targetTypeData.phase &&
            typeData.group === targetTypeData.group;
        }
        return false;
      }
      this.label = this.getTypeData().label;
    }
    var EntryType = function (label, phase, group) {
      this.getData = function () {
        return { label: label, phase: phase, group: group };
      }
    }
    return {
      create: function (type, value, reason) {
        if(typeof _entries[_date] == 'undefined') {
          _entries[_date] = [];
        }
        var len = _entries[_date].push(new Entry(type, value, reason));
        return _entries[_date][len-1];
      },
      remove: function (entry) {
        for(var i=0; i<_entries[_date].length; i++) {
          if(_entries[_date][i] == entry) {
            return _entries[_date].splice(i,1);
          }
        }
      },
      newType: function (label, phase, group) {
        return new EntryType(label, phase, group);
      },
      setDate: function (date) {
        _date = date+'';
      },
      getDate: function () {
        return _date;
      },
      getEntries: function () {
        return _entries[_date];
      }
    };
  })

  .factory('timeUtility', function () {
    var dayConst = 24*60*60*1000;
    return {
      toValue: function (hours, minutes) {
        var d = new Date(0);
        d.setUTCHours(hours);
        d.setUTCMinutes(minutes);
        return d.getTime() / dayConst;
      },
      toTime: function (value) {
        var d = new Date(dayConst * value);
        return {
          hours: d.getUTCHours(),
          minutes: d.getUTCMinutes()
        };
      },
      minuteToFraction: function (minutes) {
        var d = new Date(dayConst),
          e = new Date(0);
        e.setUTCMinutes(minutes);
        return e.getTime() / d.getTime();
      }
    };
  })
