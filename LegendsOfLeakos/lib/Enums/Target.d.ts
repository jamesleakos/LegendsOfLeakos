declare enum TargetTypeEnum {
    TargetCreature = 0,
    TargetOpponentCreature = 1,
    TargetFriendlyCreature = 2,
    TargetRow = 3,
    TargetOpponentRow = 4,
    TargetFriendlyRow = 5,
    OpponentFrontRow = 6,
    OpponentBackRow = 7,
    FriendlyFrontRow = 8,
    FriendlyBackRow = 9
}
declare namespace TargetTypeEnumMethods {
    function broadTargetType(targetTypeEnum: TargetTypeEnum): BroadTargetTypeEnum;
    function canBeTargetable(targetTypeEnum: TargetTypeEnum): boolean;
}
declare enum BroadTargetTypeEnum {
    card = 0,
    zone = 1
}
declare enum TargetableTypeSelectionEnum {
    TargetableOnActivation = 0,
    TargetableOnQueueCall = 1,
    AutoTarget = 2
}
declare namespace TargetableTypeSelectionEnumMethods {
    function playerSelectsTargets(thisEnum: TargetableTypeSelectionEnum): boolean;
}
export { TargetTypeEnum, BroadTargetTypeEnum, TargetableTypeSelectionEnum, TargetTypeEnumMethods, TargetableTypeSelectionEnumMethods, };
