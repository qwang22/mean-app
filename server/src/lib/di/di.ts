const awilix = require('awilix');

function initDI({ serverSettings }, mediator) {
  mediator.once('init', () => {
    const container = awilix.createContainer();

    container.register({
      serverSettings: awilix.asValue(serverSettings)
    });

    mediator.emit('di.ready', container);
  });
}

export default { initDI };