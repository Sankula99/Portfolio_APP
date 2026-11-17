Please modify the layout to fix the dynamic width issue on the left column and add a retro Git contributions graph to fill the empty space at the bottom.

### 1. Fix Layout Instability (Lock Ranger Panel Width)
- In `src/screens/DesktopScreen.tsx` (and relevant CSS files), change the left column (`RangerPanel`) from a dynamic or auto-adjusting width to a stable, fixed width (e.g., a locked `width`, `min-width`, or `flex-basis` like `320px` or `350px`).
- Ensure that clicking between different navigation items (like `experience/`, `education/`, or `projects/`) does not cause the layout to shift, jitter, or push the center panels (`nvim`, `btop`) horizontally.

### 2. Implement a Retro Git Contribution Graph
- Beneath the file list/experience text in the left column, utilize the empty vertical space by creating a self-contained, terminal-themed Git contribution grid component.
- **Design Guidelines:**
  - Create a mini grid of small squares (e.g., 4 or 5 rows by 20+ columns, or a standard 7-row layout scaled down tightly).
  - Use a dark, retro terminal color palette for the squares to match the site's aesthetic (e.g., deep background grays/blacks for 'no commits', transitioning through subtle shades of theme-compliant greens or blues for 'active commits').
  - Add a small text legend beneath the grid, matching the monospace theme: `Less [ ▢ ▢ ▢ ▢ ] More`.
- Ensure the component is lightweight, responsive to the newly fixed column width, and styled purely with CSS/inline styles to match the terminal look perfectly.

Please let me know which layout files and panel components you update!