# Film tools

Used for the Council Chamber film (2026-10-05). Python 3 with `opencv-python`
and `numpy`; `ffmpeg` on PATH. Run each script from a working folder that holds
the renders as `r00.png`, `r01.png`, … (one per PDF page, extracted at native size
with PyMuPDF: largest image on each page).

| Script | What it does |
|---|---|
| `blank-logo-screens.py` | Turns logo screens into switched-off displays. Screen corners, chair line and chair boxes are hand-set per render; writes `c??.png`. |
| `stills-to-film.py out.mp4 <crf>` | Vertical 720×1280 film: eased, sub-pixel pans/zooms with crossfades. Uses `c??.png` when present, else `r??.png`. Edit `shots` to choose renders and pan ranges. Run with crf 20 for the main file and 26 for `-720`. |
| `jitter.py a.mp4 b.mp4 …` | Frame-to-frame shake score (median px/frame²). Site films sit at 0.03–0.11; anything near 0.7 looks shaky. |

Do not go back to ffmpeg `crop=x='…*t'` or `zoompan` for pans: both move in
whole-pixel steps and measured 0.72, which the client saw as shaky.
