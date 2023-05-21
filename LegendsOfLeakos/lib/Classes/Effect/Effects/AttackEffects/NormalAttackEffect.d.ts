import AttackBaseEffect from './AttackBaseEffect';
import EffectValue from '../../EffectValue';
import TargetType from '../../../Target/TargetType';
import TargetInfo from '../../../Target/TargetInfo';
import TargetTypeInfo from '../../../Target/TargetTypeInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCard from '../../../Card/RuntimeCard';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
declare class NormalAttackEffect extends AttackBaseEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
    numberOfTargetTypes(): number;
    targetTypeInfoList(): TargetTypeInfo[];
    effectToString(): string;
    constructor(setEffectValues: EffectValue[], setTargetTypes: TargetType[]);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    getAttackedCard(state: GameState, targetInfoList: TargetInfo[]): RuntimeCard;
    applyShieldToAttackedCard(shieldAmount: number): void;
    hitDivineShield(): void;
    SendToBlockingEffect(state: GameState, sourceCard: RuntimeCard, attackedCard: RuntimeCard, blockingCards: RuntimeCard[]): void;
}
export default NormalAttackEffect;
