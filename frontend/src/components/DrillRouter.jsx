import { languageConfig } from '../config/languageConfig';
import React from 'react';
import FlashcardDrill from './drills/FlashcardDrill';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import ConjugationDrill from './drills/ConjugationDrill';
import GenderDrill from './drills/GenderDrill';
import MatchingDrill from './drills/MatchingDrill';

import SentenceBuilderDrill from './drills/SentenceBuilderDrill';
import FillBlankDrill from './drills/FillBlankDrill';

export default function DrillRouter(props) {
  const { drillId: rawId, drillLength = 10 } = props;

  const warmUp = typeof rawId === 'string' && rawId.startsWith('warmup-');
  const review  = typeof rawId === 'string' && rawId.startsWith('review-');
  const drillId = typeof rawId === 'string'
    ? rawId.replace(/^(warmup-|review-)/, '')
    : rawId;
  const showGenderColors = warmUp && drillId === 'gender' ? false : props.showGenderColors;

  const drillProps = { ...props, drillId, drillLength, warmUp, review, showGenderColors };

  switch (drillId) {
    case 'flashcard':            return <FlashcardDrill {...drillProps} />;
    case 'flashcard-sentence':   return <FlashcardDrill sentence {...drillProps} />;
    case languageConfig.drillDirectionId:                return <ChoiceDrill mode={languageConfig.drillDirectionId} {...drillProps} />;
    case languageConfig.reverseDrillDirectionId:                return <ChoiceDrill mode={languageConfig.reverseDrillDirectionId} {...drillProps} />;
    case 'hear-choose':          return <ChoiceDrill mode="hear-choose" {...drillProps} />;
    case 'hear-choose-en-es':    return <ChoiceDrill mode="hear-choose-en-es" {...drillProps} />;
    case 'type-es-en':           return <TypeDrill mode="type-es-en" {...drillProps} />;
    case 'type-en-es':           return <TypeDrill mode="type-en-es" {...drillProps} />;
    case 'listen-type':          return <TypeDrill mode="listen-type" {...drillProps} />;
    case 'listen-type-sentence':         return <TypeDrill mode="listen-type-sentence" {...drillProps} />;
    case 'listen-type-en-es':            return <TypeDrill mode="listen-type-en-es" {...drillProps} />;
    case 'listen-type-sentence-en-es':   return <TypeDrill mode="listen-type-sentence-en-es" {...drillProps} />;
    case 'conjugation':          return <ConjugationDrill mode="present" {...drillProps} />;
    case 'past-tense':           return <ConjugationDrill mode="past" {...drillProps} />;
    case 'gender':               return <GenderDrill {...drillProps} />;
    case 'matching':             return <MatchingDrill {...drillProps} />;
    case 'sent-build':           return <SentenceBuilderDrill {...drillProps} />;
    case 'fill-blank':           return <FillBlankDrill {...drillProps} />;
    case 'fill-blank-typed':     return <FillBlankDrill mode="typed" {...drillProps} />;
    default: return <div className="p-10 text-center">Drill not found: {drillId}</div>;
  }
}
