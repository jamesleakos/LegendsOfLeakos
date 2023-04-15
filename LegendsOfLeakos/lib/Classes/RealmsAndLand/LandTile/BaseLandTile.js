"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLandTile = /** @class */ (function () {
    function BaseLandTile() {
        // TODO - add player info
        // public playerInfo: PlayerInfo | null = null;
        this.neighbors = [];
    }
    // I don't think we need these in the base
    // public onDepthChanged: ((newDepth: number) => void)[] = [];
    // public onTypeChanged: ((setType: number) => void)[] = [];
    // public onExploredChanged: ((setExplored: boolean) => void)[] = [];
    // changing depth and type
    BaseLandTile.prototype.setDepth = function (newDepth) {
        if (newDepth !== this.depth) {
            this.depth = newDepth;
            // this.onDepthChanged.forEach((callback) => callback(newDepth));
        }
    };
    BaseLandTile.prototype.changeType = function (setType) {
        if (this.landType !== setType) {
            this.landType = setType;
            // this.onTypeChanged.forEach((callback) => callback(setType));
        }
    };
    // neighbors
    BaseLandTile.prototype.findNeighbors = function (landTiles) {
        var _this = this;
        var directions = [
            { dx: 0, dy: 1, dz: -1 },
            { dx: 0, dy: -1, dz: 1 },
            { dx: 1, dy: 0, dz: -1 },
            { dx: -1, dy: 0, dz: 1 },
            { dx: -1, dy: 1, dz: 0 },
            { dx: 1, dy: -1, dz: 0 },
        ];
        this.neighbors = directions
            .map(function (_a) {
            var dx = _a.dx, dy = _a.dy, dz = _a.dz;
            return landTiles.find(function (tile) {
                return tile.x === _this.x + dx &&
                    tile.y === _this.y + dy &&
                    tile.z === _this.z + dz;
            });
        })
            .filter(function (tile) { return tile !== undefined; });
    };
    BaseLandTile.prototype.getNeighborNumber = function (neighbor) {
        var _this = this;
        var directions = [
            { dx: 1, dy: 0, dz: -1 },
            { dx: 1, dy: -1, dz: 0 },
            { dx: 0, dy: -1, dz: 1 },
            { dx: -1, dy: 0, dz: 1 },
            { dx: -1, dy: 1, dz: 0 },
            { dx: 0, dy: 1, dz: -1 },
        ];
        if (neighbor < 1 || neighbor > 6)
            return null;
        var _a = directions[neighbor - 1], dx = _a.dx, dy = _a.dy, dz = _a.dz;
        return (this.neighbors.find(function (tile) {
            return tile.x === _this.x + dx &&
                tile.y === _this.y + dy &&
                tile.z === _this.z + dz;
        }) || null);
    };
    // static
    BaseLandTile.assignNeighbors = function (landTiles) {
        landTiles.forEach(function (landTile) {
            landTile.findNeighbors(landTiles);
        });
    };
    BaseLandTile.assignDepth = function (landTiles) {
        landTiles.forEach(function (landTile) {
            landTile.depth = 2;
            for (var _i = 0, _a = landTile.neighbors; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (neighbor.landType !== landTile.landType) {
                    landTile.setDepth(1);
                    break;
                }
            }
        });
        var stillSearching = true;
        var depth = 1;
        while (stillSearching) {
            depth = depth + 1;
            if (depth > 20) {
                console.log('hit break');
                break;
            }
            stillSearching = false;
            landTiles.forEach(function (landTile) {
                if (landTile.depth === depth) {
                    var increase_1 = true;
                    landTile.neighbors.forEach(function (neighbor) {
                        if (neighbor.depth < depth) {
                            increase_1 = false;
                        }
                    });
                    if (increase_1) {
                        landTile.setDepth(depth + 1);
                        stillSearching = true;
                    }
                }
            });
        }
    };
    BaseLandTile.assignCoords = function (landTiles, realmLayout) {
        var tileCounter = 0;
        for (var row = 0; row < realmLayout.length; row++) {
            landTiles[tileCounter].z = row - Math.floor(realmLayout.length / 2);
            landTiles[tileCounter].x = Math.floor(-0.5 * landTiles[tileCounter].z - (0.5 * realmLayout[row] - 0.5));
            landTiles[tileCounter].y = -(landTiles[tileCounter].x + landTiles[tileCounter].z);
            var tempX = landTiles[tileCounter].x;
            var tempY = landTiles[tileCounter].y;
            var tempZ = landTiles[tileCounter].z;
            tileCounter = tileCounter + 1;
            for (var col = 1; col < realmLayout[row]; col++) {
                landTiles[tileCounter].x = tempX + col;
                landTiles[tileCounter].y = tempY - col;
                landTiles[tileCounter].z = tempZ;
                tileCounter = tileCounter + 1;
            }
        }
    };
    return BaseLandTile;
}());
exports.default = BaseLandTile;
