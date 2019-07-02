import Ship from './ship';

export default class Board {
    constructor() {
        this.grid = Array.from(Array(10), () =>
            Array.from(Array(10), () => ({ hit: false, ship: null }))
        );
        this.ships = 7;
    }

    placeShip(x, y, length, horizontal) {
        let positions = [];
        for (let i = 0; i < length; i++) {
            if (horizontal) {
                positions.push([x + i, y]);
            } else {
                positions.push([x, y + i]);
            }
        }
        if (positions.every((pos) => this.isAvailable(pos))) {
            const ship = new Ship(length, { x, y }, horizontal);
            positions.forEach((pos) => this.grid[pos[1]][pos[0]].ship = ship);
        }
    }

    receiveAttack(x, y) {
        let target = this.grid[y][x];
        target.hit = true;
        if (target.ship) {
            target.ship.hit();
            if (target.ship.isSunk()) {
                this.ships -= 1;
            }
        }
    }

    isAvailable(pos) {
        if (pos[0] >= 0 && pos[0] <= 9 && pos[1] >= 0 && pos[1] <= 9) {
            if (pos[0] < 9 && this.grid[pos[1]][pos[0] + 1].ship) {
                return false;
            }
            if (pos[0] > 0 && this.grid[pos[1]][pos[0] - 1].ship) {
                return false;
            }
            if (pos[1] < 9 && this.grid[pos[1] + 1][pos[0]].ship) {
                return false;
            }
            if (pos[1] > 0 && this.grid[pos[1] - 1][pos[0]].ship) {
                return false;
            }
            if (this.grid[pos[1]][pos[0]].ship) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

}
