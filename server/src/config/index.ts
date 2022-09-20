import settings from './config';
import initDiConfig from '../lib/di';

const initDI = initDiConfig.initDI;
const serverSettings = settings.serverSettings;

const init = initDI.bind(null, {
    serverSettings
});

export default { init };