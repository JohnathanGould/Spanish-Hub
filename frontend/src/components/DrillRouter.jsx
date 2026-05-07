import React from 'react';
import FlashcardDrill from './drills/FlashcardDrill';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import ConjugationDrill from './drills/ConjugationDrill';
import GenderDrill from './drills/GenderDrill';
import MatchingDrill from './drills/MatchingDrill';
import WordSortDrill from './drills/WordSortDrill';
import SentenceBuilderDrill from './drills/SentenceBuilderDrill';
import FillBlankDrill from './drills/FillBlankDrill';

export default function DrillRouter(props) {
  const { drillId } = props;
  switch (drillId) {
    case 'flashcard': return <FlashcardDrill {...props} />;
    case 'es-en': return <ChoiceDrill mode="es-en" {...props} />;
    case 'en-es': return <ChoiceDrill mode="en-es" {...props} />;
    case 'hear-choose': return <ChoiceDrill mode="hear-choose" {...props} />;
    case 'type-es-en': return <TypeDrill mode="type-es-en" {...props} />;
    case 'type-en-es': return <TypeDrill mode="type-en-es" {...props} />;
    case 'listen-type': return <TypeDrill mode="listen-type" {...props} />;
    case 'conjugation': return <ConjugationDrill mode="present" {...props} />;
    case 'past-tense': return <ConjugationDrill mode="past" {...props} />;
    case 'gender': return <GenderDrill {...props} />;
    case 'matching': return <MatchingDrill {...props} />;
    case 'word-sort': return <WordSortDrill mode="es" {...props} />;
    case 'en-word-sort': return <WordSortDrill mode="en" {...props} />;
    case 'sent-build': return <SentenceBuilderDrill {...props} />;
    case 'fill-blank': return <FillBlankDrill {...props} />;
    default: return <div className="p-10 text-center">Drill not found: {drillId}</div>;
  }
}
