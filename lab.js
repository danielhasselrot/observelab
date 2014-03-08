(function () {
    "use strict";

    var createStart = function(index) {
        return {
            number: index,
            name: _.shuffle("abcdefghijk").join(""),
            selected: false,
            scratched: false
        }
    };

    var createRace = function(index) {
        return {
            number: index,
            starts: _.times(15, createStart)
        }
    };

    var createGame = function() {
        return {
            name: "blahaa",
            races: _.times(8, createRace)
        }
    };


    var game = createGame();
    var game2 = createGame();
    var game3 = createGame();

    var observers = [];

    var addObserver = function(obj, path, attribute) {
        var observer = new PathObserver(game, path + attribute);
        observer.open(function(val, old ) {
            console.log(attribute, "change:", val, old);
        });
        observers.push(observer);
        return observer;
    };


    console.time("setup");
    _.each(game.races, function(race) {
        var prefix = "races." + race.number + ".";

        _.each(race.starts, function(start) {
            var startPath = prefix + "starts." + start.number + ".";
            addObserver(game, startPath, "selected");
            addObserver(game, startPath, "scratched");
            addObserver(game, startPath, "1selected");
            addObserver(game, startPath, "1scratched");
            addObserver(game, startPath, "2selected");
            addObserver(game, startPath, "2scratched");
            addObserver(game, startPath, "3selected");
            addObserver(game, startPath, "3scratched");
            addObserver(game, startPath, "4selected");
            addObserver(game, startPath, "4scratched");
            addObserver(game, startPath, "5selected");
            addObserver(game, startPath, "5scratched");
            addObserver(game, startPath, "6selected");
            addObserver(game, startPath, "6scratched");

       });
    });
    console.timeEnd("setup");

    console.time("setup2");
    _.each(game2.races, function(race) {
        var prefix = "races." + race.number + ".";

        var observer = new CompoundObserver();


        _.each(race.starts, function(start) {
            var startPath = prefix + "starts." + start.number + ".";
            addObserver(game, startPath, "selected");
            addObserver(game, startPath, "scratched");
            addObserver(game, startPath, "1selected");
            addObserver(game, startPath, "1scratched");
            addObserver(game, startPath, "2selected");
            addObserver(game, startPath, "2scratched");
            addObserver(game, startPath, "3selected");
            addObserver(game, startPath, "3scratched");

        });
    });
    console.timeEnd("setup2");

    console.time("setup3");
    _.each(game2.races, function(race) {
        var prefix = "races." + race.number + ".";

        var observer = new CompoundObserver();


        _.each(race.starts, function(start) {
            var startPath = prefix + "starts." + start.number + ".";
            addObserver(game, startPath, "selected");
            addObserver(game, startPath, "scratched");
            addObserver(game, startPath, "1selected");
            addObserver(game, startPath, "1scratched");
            addObserver(game, startPath, "2selected");
            addObserver(game, startPath, "2scratched");
            addObserver(game, startPath, "3selected");
            addObserver(game, startPath, "3scratched");

        });
    });
    console.timeEnd("setup3");


    console.log("Game", game);
    game.races[6].starts[4].selected = true;
    game.races[6].starts[9].scratched = true;
    game.name = "Another";

    console.log("Num observers: ", observers.length);
    console.time("checkpoint");
    Platform.performMicrotaskCheckpoint();
    console.timeEnd("checkpoint");
    console.time("cleanup");
    _.each(observers, function(observer) { observer.close()});
    console.timeEnd("cleanup");


    window.game = game;
}());

