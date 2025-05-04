export class SkillManager {
  // getExp(checkResults: CheckResults) {
  //   const { rand, value, difficulty, result } = checkResults;
  //   const baseExpValue = 10;
  //   const difficulyExpMod = 1;
  //   const expirienceExpMod = 1;
  //   const successExpMod = result ? 1 : 0.1;
  //   const newExp =
  //     baseExpValue * difficulyExpMod * expirienceExpMod * successExpMod;
  //   this.exp += newExp / 100;
  // }

  //
  // async resolve(input: ActionPayload): Promise<ResolveResult> {
  //   const { payload, target } = input;
  //   const sourceActor = input.sourceActor || this.skillManager.character;
  //   if (payload.type !== ACTION_PAYLOAD_TYPE.USE_SKILL)
  //     return { executed: false, payload: input };
  //   const { skill, difficulty, timeMod, options } = payload;
  //   const optionsMod = this.calcOptionsMod(options);

  //   let diffMod = 0;
  //   if (this.isCultureBased()) {
  //     const target = input.target?.getCultures();
  //     const sourceCulture = input.sourceActor?.getCultures();
  //     //сравнить между собой культуры источника и локации (если цели нет или цель локация/объект) или персонажа (если есть персонаж-цель)
  //     if (!!_.intersection(target, sourceCulture).length) {
  //       diffMod = 3;
  //     }
  //   }

  //   const skillCheckResult = this.check(
  //     difficulty + diffMod + timeMod * 1 + optionsMod
  //   );
  //   this.resolver.commonResolve({
  //     result: skillCheckResult,
  //     sourceActor,
  //     target,
  //   });
  //   return {
  //     executed: true,
  //     payload: input,
  //     checkResult: skillCheckResult,
  //     message: `${this.name}: ${skillCheckResult.result}, ${skillCheckResult.value}`,
  //   };
  // }

  //
  // calcOptionsMod(options: useSkillPayload['options']): number {
  //   let result = 0;
  //   if (options?.offHand) result -= 4;
  //   return result;
  // }
}
