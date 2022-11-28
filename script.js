window.addEventListener("load", function () {

    // canvas setup

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", e => {
                if (((e.key === 'ArrowUp') || (e.key === 'ArrowDown')) && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key);
                }
                else if (e.key === " ") {
                    this.game.player.shootTop();
                }

            });

            window.addEventListener("keyup", e => {

                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }



            });

        }
    }

    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x + 100;
            this.y = y + 30;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.markedForDeletion = false;
        }

        update() {
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }

        draw(context) {
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

    }

    class Particle {

    }

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.maxSpeed = 2;
            this.projectiles = [];
        }

        update() {
            if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // handle projectiles
            this.projectiles.forEach(projectTile => {
                projectTile.update();
            });
            this.projectiles = this.projectiles.filter(projectTile => !projectTile.markedForDeletion);
        }
        draw(context) {
            context.fillStyle = 'green';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectTile => {
                projectTile.draw(context);
            });

        }

        shootTop() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x, this.y));
                this.game.ammo--;
            }
        }



    }

    class Enemy {

    }

    class Layer {


    }

    class Background {



    }

    class UI {
        constructor(game)
        {
            this.game       =   game;
            this.fontSize   =   25;
            this.fontFamily =   "Helvetica";
            this.color      =   "yellow";
        }

        draw(context)
        {
        // ammo
        context.fillStyle   =   this.color;
            for(let i = 0; i< this.game.ammo;i++)
            {
                context.fillRect(10*i,50,3,20);
            }
        }
    }

    class Game {
        constructor(width, height) {
            this.width  = width;
            this.height = height;
            this.player = new Player(this);
            this.input  = new InputHandler(this);
            this.ui     = new UI(this);
            this.ammo = 6;
            this.maxAmmo = 20;
            this.ammoTimer  =   0;
            this.ammoInterval=  15000;
            this.keys = [];

        }

        update(deltaTime) {
            if(this.ammoTimer>this.ammoInterval)
            {
                if(this.ammo<this.maxAmmo){this.ammo++;}else{lastTime=0;}
                this.ammoTimer=0;
            }
            else
            {
                this.ammoTimer+=deltaTime;
            }
            this.player.update();
        }

        draw(context) {
            this.player.draw(context);
            this.ui.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // animate loop
    lastTime    =   0;
    function animate(timestamp) {
        const deltaTime   =   timestamp   -   lastTime;
        lastTime    =   deltaTime
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime/10);
        game.draw(ctx);
        requestAnimationFrame(animate);

    }
    animate(0);

});