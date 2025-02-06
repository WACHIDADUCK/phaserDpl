import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Bugfender } from '@bugfender/sdk';

Bugfender.init({
    appKey: 'K85j5R946CHuoSEbDUGJ1VvBejF4BOUP', //
    overrideConsoleMethods: false,
    // printToConsole: true, // hace que la llamada a bugfender.log va a parecer por consola
    // registerErrorHandler: true, // 
    logBrowserEvents: false, // todos los eventos 
    // logUIEvents: true, //
    // version: '',
    // build: '',
});




//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig


//Logs de inicio de sesión/carga de la aplicación.
Bugfender.info('Inicio de sesion');

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};



export default new Phaser.Game(config);
