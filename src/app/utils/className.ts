import clsx from "clsx";

export function cardClass(selected: boolean) {
  return clsx("styles.card", { "styles.selected": selected });
}

export function buttonClass(disabled: boolean) {
  return clsx("styles.button", { "styles.buttonDisabled": disabled });
}
