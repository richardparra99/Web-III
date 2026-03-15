module.exports = app => {
    require('./persona.routes')(app);
    require("./search.routes")(app);
    require("./tarea.routes")(app);
    require("./auth.routes")(app);
};