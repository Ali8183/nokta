import { Idea, MaturityStage, MATURITY_RULES, IdeaSpec } from '../types';

export function checkMaturityTransition(idea: Idea): MaturityStage | null {
  const currentStageIndex = [
    MaturityStage.DOT,
    MaturityStage.LINE,
    MaturityStage.PARAGRAPH,
    MaturityStage.PAGE
  ].indexOf(idea.maturity);

  if (currentStageIndex === -1 || currentStageIndex === 3) return null;

  const nextRule = MATURITY_RULES.find(r => r.from === idea.maturity);
  if (!nextRule) return null;

  const turnCount = idea.messages.filter(m => m.role === 'user').length;
  const hasMinTurns = turnCount >= nextRule.minTurns;

  const spec = idea.spec || {} as IdeaSpec;
  const hasAllFields = nextRule.requiredFields.every(field => 
    !!spec[field] && spec[field].trim().length > 0
  );

  if (hasMinTurns && hasAllFields) {
    return nextRule.to;
  }

  return null;
}
