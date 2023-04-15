import BaseLandTile from './BaseLandTile';
declare class RuntimeLandTile extends BaseLandTile {
    explored: boolean;
    onDepthChanged: ((newDepth: number) => void)[];
    onTypeChanged: ((setType: number) => void)[];
    onExploredChanged: ((setExplored: boolean) => void)[];
    explore(setExplored: boolean): void;
    anyNeighborExplored(): boolean;
}
export default RuntimeLandTile;
