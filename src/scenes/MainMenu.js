import { Scene } from 'phaser';

let data= null;
async function obtenerBicicletas() {
    try {
        const response = await fetch('https://api-bici-1.onrender.com/api/bicicletas');
         data = await response.json();
        console.log(data.bicicletas[0]);
    } catch (error) {
        console.error(error);
    }
}
obtenerBicicletas();


export class MainMenu extends Scene
{

    

    constructor ()
    {
        super('MainMenu');
    }


    preload ()
    {   
        this.load.image('bg', 'assets/bg.png');
        this.load.spritesheet('ovni', 'assets/ovni.png', { frameWidth: 595, frameHeight: 250 });
    }

    create ()
    {
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


        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
