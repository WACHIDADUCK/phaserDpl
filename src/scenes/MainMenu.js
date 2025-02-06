import { Scene } from 'phaser';
import { Bugfender } from '@bugfender/sdk';


let data = null;


async function obtenerBicicletas() {

    try {
        const response = await fetch('https://api-bici-1.onrender.com/api/bicicletas');
        data = await response.json();
        // console.log(data.bicicletas[0]);


        //Logs del resultado de las llamadas a la API.
        Bugfender.info(`Bugfender: ${data.bicicletas}`);

    } catch (error) {
        console.error(error);
        // Logs de errores y excepciones.
        Bugfender.error(error);
    }
}
await obtenerBicicletas();



async function fetchConError() {

    try {
        const response = await fetch('');
        data = await response.json();

        //Logs del resultado de las llamadas a la API.
        Bugfender.info(`Bugfender: ${data.bicicletas}`);

    } catch (error) {
        // Logs de errores y excepciones.
        Bugfender.error(error);

    }
}


export class MainMenu extends Scene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.spritesheet('ovni', 'assets/ovni.png', { frameWidth: 595, frameHeight: 250 });
    }

    create() {

        // Crear un botón de texto
        const buttonText = this.add.text(512, 550, 'generar error', {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            backgroundColor: '#0000ff', // Fondo del botón
            padding: { x: 20, y: 10 }, // Espaciado interno
        }).setOrigin(0.5).setInteractive(); // Hacer el texto interactivo

        // Cambiar el estilo del botón cuando el cursor está sobre él
        buttonText.on('pointerover', () => {
            buttonText.setStyle({ fill: '#ff0000' }); // Cambiar color del texto
        });

        // Restaurar el estilo del botón cuando el cursor sale
        buttonText.on('pointerout', () => {
            buttonText.setStyle({ fill: '#ffffff' }); // Restaurar color del texto
        });

        // Escuchar el evento de clic en el botón de texto
        buttonText.on('pointerdown', () => {
            try {
                fetchConError().then((response) => {
                    Bugfender.info(response);
                }).catch((error) => {
                    Bugfender.error(error);
                });
            } catch (error) {
                Bugfender.error(error);
            }
            


            // Bugfender.error(variableQueNoExiste);
            Bugfender.info("Se ha hecho click en el botón de texto");
        });




        // this.add.image(512, 384, 'background');
        // this.add.image(512, 300, 'logo');
        this.load.image('bg', 'assets/bg.png');

        // ovni.animation.add('fly', [0, 1, 2, 3], 4, true);

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ovni', { frames: [0, 1, 2, 3] }),
            frameRate: 6,
            repeat: -1
        })
        this.playser = this.add.sprite(512, 384, 'ovni');
        this.playser.play('fly');


        let bicicleta = `id:${data.bicicletas[0].id}, color:${data.bicicletas[0].color}, modelo:${data.bicicletas[0].modelo}`
        this.add.text(512, 460, bicicleta, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        // this.input.once('pointerdown', () => {
        //     //Logs de interacción con elementos del juego.
        //     Bugfender.info("Se ha hecho click");
        //     // this.scene.start('Game');
        // });
    }
}
