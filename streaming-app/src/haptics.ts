// Feedback tátil (Vibration API) ao tocar em botões e links. Um único
// listener delegado no documento cobre todos eles, em vez de instrumentar
// cada componente. Sem suporte no iOS Safari e em navegadores desktop —
// navigator.vibrate vira no-op nesses casos, então é seguro chamar sempre.
const TAP_DURATION_MS = 10;

export function initTouchHaptics() {
  window.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType !== "touch") return;
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("button:not(:disabled), a[href]")) return;
      navigator.vibrate?.(TAP_DURATION_MS);
    },
    { passive: true },
  );
}
