import BaseLandTile from './BaseLandTile';
// import { LandType } from '../../../Enums/LandAndBiome';

class RuntimeLandTile extends BaseLandTile {
  // TODO - add player info
  // public playerInfo: PlayerInfo | null = null;

  // public id: number; // inherited from BaseLandTile
  // public x: number; // inherited from BaseLandTile
  // public y: number; // inherited from BaseLandTile
  // public z: number; // inherited from BaseLandTile
  // public landType: LandType; // inherited from BaseLandTile
  // public depth: number; // inherited from BaseLandTile
  public explored: boolean;
  // public neighbors: RuntimeLandTile[] = []; // inherited from BaseLandTile

  public onDepthChanged: ((newDepth: number) => void)[] = [];
  public onTypeChanged: ((setType: number) => void)[] = [];
  public onExploredChanged: ((setExplored: boolean) => void)[] = [];

  explore(setExplored: boolean): void {
    if (this.explored !== setExplored) {
      this.explored = setExplored;
      this.onExploredChanged.forEach((callback) => callback(setExplored));
    }
  }

  anyNeighborExplored(): boolean {
    return (this.neighbors as RuntimeLandTile[]).some(
      (neighbor) => neighbor.explored
    );
  }
}

export default RuntimeLandTile;
