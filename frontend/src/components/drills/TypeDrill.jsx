<div className="font-bold text-sm" data-testid="type-feedback">
              {feedback.ok && !feedback.closeEnough && 'Correct! ✓'}
              {feedback.ok && feedback.closeEnough && (
                <>
                  <div>Almost! ✓</div>
                  <div className="text-base font-black mt-1" style={{ color: '#D97706' }}>
                    → {feedback.target}
                  </div>
                </>
              )}
              {!feedback.ok && (
                <>
                  <div>Answer:</div>
                  <div className="text-base font-black mt-1">{feedback.target}</div>
                </>
              )}
            </div>