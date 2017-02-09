const path = require('path');
const express = require('express');

module.exports = function (app) {

    const root = app.getValue('projectRoot');

    const npmPath = path.join(root, './node_modules');
    const publicPath = path.join(root, './public');

    app.use(express.static(npmPath));
    app.use(express.static(publicPath));

};
