(function () {
    "use strict";

    window.PropertyA = function() {

    };

    _.extend(PropertyA.prototype, {

        onValue: function(listener) {
            if (this.listener === undefined) {
                this.listener = listener;
            } else if (this.listener instanceof Array) {
                this.listener.push(listener);
            } else {
                this.listener = [listener];
            }
        },

        pushValue: function(value) {
            if (this.listener === undefined) {

            } else if (this.listener instanceof Array) {
                for (i = 0; i< this.listener.length; i++) {
                    this.listener[i](value);
                }
            } else {
                this.listener(value);
            }
        }
    });

    window.PropertyB = function() {

    };

    _.extend(PropertyB.prototype, Backbone.Events, {

        onValue: function(listener) {
            this.on("value", listener);
        },

        pushValue: function(value) {
            this.trigger("value", value);
        }
    });

    var values = [];
    var properties = [];
    for(var i = 0; i < 4000; i++) {
        var property = new PropertyA();
        property.onValue(function(value) {
            values.push(value);
        });
        properties.push(property);
    }
    for(i = 0; i < 4000; i++) {
        properties[i].pushValue(i);
    }
    console.log(values);

}());