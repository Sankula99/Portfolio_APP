const COLS = 26

// Static retro commit pattern — levels 0 (none) through 4 (most)
const GRID: number[][] = [
  [0, 0, 1, 0, 2, 1, 0, 3, 2, 1, 0, 2, 3, 4, 2, 1, 0, 1, 2, 3, 2, 1, 0, 2, 3, 1],
  [1, 0, 2, 1, 0, 3, 2, 1, 0, 4, 3, 2, 1, 0, 2, 3, 4, 2, 1, 0, 3, 2, 1, 0, 2, 3],
  [0, 1, 0, 2, 3, 1, 0, 2, 4, 3, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 1],
  [2, 0, 1, 3, 2, 0, 4, 1, 2, 0, 3, 2, 1, 4, 0, 2, 3, 1, 0, 2, 4, 1, 3, 2, 0, 1],
  [0, 2, 3, 1, 0, 2, 1, 3, 0, 2, 4, 1, 0, 3, 2, 1, 0, 4, 2, 3, 1, 0, 2, 3, 4, 2],
  [1, 3, 0, 2, 4, 1, 0, 2, 3, 1, 0, 3, 2, 1, 4, 0, 2, 3, 1, 0, 2, 4, 3, 1, 0, 2],
  [0, 1, 2, 0, 3, 2, 1, 0, 4, 3, 2, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 0, 4, 1, 3],
]

const LEGEND_LEVELS = [0, 1, 2, 3, 4] as const

export function GitContributionGraph() {
  return (
    <div className="git-contrib" aria-hidden="true">
      <div className="git-contrib-label">git log --graph --oneline</div>
      <div
        className="git-contrib-grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {GRID.flatMap((row, rowIndex) =>
          row.map((level, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={`git-contrib-cell git-contrib-cell--${level}`}
            />
          )),
        )}
      </div>
      <div className="git-contrib-legend">
        <span>Less</span>
        <span className="git-contrib-legend-squares">
          {LEGEND_LEVELS.map((level) => (
            <span key={level} className={`git-contrib-cell git-contrib-cell--${level}`} />
          ))}
        </span>
        <span>More</span>
      </div>
    </div>
  )
}
