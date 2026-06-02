# Lumeir onboarding prototype

Two pages of a Figma-spec-faithful onboarding flow built as static HTML.

## Files

```
welcome_3.html          Entry / welcome screen. CTA navigates to onboarding_2.html.
onboarding_2.html       Single-page onboarding flow with three animated steps.
_assets/
  svg_1.svg             Step 2 illustration: Interview Preparation panel + Stacy James mini-card.
  svg_2.svg             Step 3 illustration: AI Evaluation Summary + Compare Candidates panel.
  screen_1.jpg          Figma reference for step 2 (design source of truth).
  screen_2.jpg          Figma reference for step 3 (design source of truth).
```

## How the multi-step page works

`onboarding_2.html` renders all three step states stacked in the same DOM and toggles which one is "active" via `data-active="true"`. CSS transitions handle a slide + fade between states; the direction (forward vs back) is set on the elements before the active swap so the incoming content enters from the correct side. Arrow keys (← →) also navigate. `prefers-reduced-motion` short-circuits the transitions.

Three pill buttons in the stepper act as the navbar. The pill itself animates between 8px and 40px width when active, with the same easing as the slide.

## Layout

- Fixed 1280×832 Figma canvas, centered both horizontally and vertically in the viewport.
- Background gradient on the outer container: white left, mint right, with the split aligned to the canvas's mint-panel edge (17px left of viewport center). This makes the mint extend edge-to-edge on viewports wider than 1280px.
- Logo anchored at `top: 53; left: 64`. Skip Intro anchored at `bottom: 53; left: 72` so it mirrors the logo from the opposite corner.

## Known issues / open questions

1. **SVG 2 crop.** The step-3 illustration (`svg_2.svg`) renders the AI Evaluation Summary card bleeding off the right edge — this matches the design reference in `screen_2.jpg`, but the user has indicated it still feels cut off. Two ways to address if you want full cards visible:
   - Shrink the rect widths inside `svg_2.svg` so the panels render as complete cards inside the viewBox.
   - Or replace the SVG with re-exported assets where the panels fit the 583×743 viewBox without overflow.

2. **Illustration as raster.** Both `svg_1.svg` and `svg_2.svg` are SVG wrappers around base64 PNGs (~300KB and ~375KB respectively). They don't scale crisply and the text inside isn't editable. If you want consistent fidelity with the live HTML step 1 illustration, rebuild those panels as real HTML.

3. **Font fallback.** Manrope loads from Google Fonts. Until it arrives, the headlines render in Inter, which is wider — the content block is sized to 600px to give both faces room. If you ever switch to a self-hosted font, you can probably tighten that back down.
