# Avenir runtime assets

Remotion's `staticFile()` resolves from the project's `public/` directory.
This folder is a placeholder; the actual runtime images live in `public/assets/`.

## Required drop-ins (CINEMATIC register)

| Path                                | Used by         | Spec                                             |
| ----------------------------------- | --------------- | ------------------------------------------------ |
| `public/assets/Tech Aesthetic.jpeg` | `BillboardStage`| BILLBOARD_REMOTION_SPEC §1 ambient image layer.  |
| `public/assets/grain-200.png`       | `GrainOverlay`  | 200×200 monochrome noise tile, opacity 0.035.    |

Both components are scaffolded to read these paths via `staticFile()`. Until
the files land, the surrounding chrome still renders but the ambient image /
grain layer will be blank.
