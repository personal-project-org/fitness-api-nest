export interface IRule {
  isBroken(): boolean;
  thenThrow(): void;
}

export const checkRule = (iRule: IRule) => {
  if (iRule.isBroken()) {
    iRule.thenThrow();
  }
};
