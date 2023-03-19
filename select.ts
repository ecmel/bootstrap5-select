import { Dropdown } from "bootstrap";

export class Select {
  #element: HTMLElement;
  #input: HTMLInputElement;
  #select: HTMLSelectElement;
  #menu: HTMLElement;
  #dropdown: Dropdown;
  #mutable = false;
  #count = 0;

  constructor(element: Element) {
    this.#element = element as HTMLElement;
    this.#input = this.#element.querySelector("input");
    this.#select = this.#element.querySelector("select");
    this.#menu = this.#element.querySelector(".dropdown-menu");
    this.#dropdown = Dropdown.getOrCreateInstance(this.#input);

    this.#input.autocomplete = "off";

    this.#mutable =
      this.#element.dataset.mutable === "" ||
      this.#element.dataset.mutable === "true";

    for (const option of this.#select.options) {
      if (option.selected) {
        this.#addTag(option.label, option.value);
      }
    }

    Object.defineProperty(this.#element, "value", { get: this.#getValue });

    this.#input.addEventListener("keydown", this.#onKeyDown);
    this.#input.addEventListener("input", this.#debounce(this.#onInput));
    this.#input.addEventListener("focusin", this.#onFocusIn);
    this.#input.addEventListener("focusout", this.#onFocusOut);
    this.#input.addEventListener("show.bs.dropdown", this.#onShowBsDropdown);
    this.#input.addEventListener("shown.bs.dropdown", this.#onShownBsDropdown);

    this.#element.addEventListener("click", this.#onClick);
  }

  #addTag(label: string, value = "") {
    const tag = document.createElement("span");

    tag.classList.add("option");

    label = label.trim();
    value = value.trim();

    tag.innerText = label;
    tag.dataset.label = label;
    tag.dataset.value = value || label;

    this.#count++;
    this.#element.insertBefore(tag, this.#input);
  }

  #removeTag(tag: HTMLElement) {
    this.#count--;
    tag.remove();
  }

  #resetInput() {
    this.#input.value = "";
    this.#menu.replaceChildren();
  }

  #dispatchInput() {
    this.#element.dispatchEvent(new CustomEvent("input"));
  }

  #normalize(value: string) {
    return value
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  #setSelected(value: string, selected = true) {
    const option = Array.from(this.#select.options).find(
      (option) => option.value === value
    );

    option.selected = selected;
  }

  #addItem() {
    const active = this.#getActive();

    if (active) {
      const label = active.dataset.label;
      const value = active.dataset.value;

      this.#addTag(label, value);
      this.#setSelected(value);
    } else if (this.#mutable) {
      const value = this.#input.value;

      const found = Array.from(this.#select.options).find(
        (option) => option.value.trim() === value.trim()
      );

      if (found) {
        if (!found.selected) {
          this.#addTag(value);
          this.#setSelected(value);
        }
      } else {
        const option = document.createElement("option");

        option.value = value;
        option.label = value;

        this.#select.options.add(option);

        this.#addTag(value);
        this.#setSelected(value);
      }
    }

    this.#dispatchInput();
    this.#resetInput();

    this.#dropdown.hide();
  }

  #removeItem() {
    const tag = this.#input.previousElementSibling as HTMLElement;

    if (tag) {
      this.#removeTag(tag);
      this.#setSelected(tag.dataset.value, false);
      this.#dispatchInput();
    }
  }

  #nextItem(backward = false) {
    const active = this.#getActive();

    if (active) {
      active.classList.remove("active");

      const next = backward
        ? active.previousElementSibling
        : active.nextElementSibling;

      if (next) {
        next.classList.add("active");
        next.scrollIntoView({ block: "nearest" });
        return;
      }
    }

    const next = backward
      ? this.#menu.lastElementChild
      : this.#menu.firstElementChild;

    if (next) {
      next.classList.add("active");
      next.scrollIntoView({ block: "nearest" });
    }
  }

  #getActive(): HTMLElement {
    return this.#menu.querySelector(".active");
  }

  #debounce(cb: Function, delay = 250) {
    let timeout: any;

    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  }

  #getValue = () => {
    return this.#count === 0 ? "" : this.#count.toString();
  };

  #onClick = () => {
    this.#input.focus();
  };

  #onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        if (this.#input.value.length !== 0) {
          event.preventDefault();
          this.#addItem();
        }
        break;

      case "Backspace":
        if (this.#input.value.length === 0) {
          this.#removeItem();
        }
        break;

      case "ArrowDown":
        this.#nextItem();
        break;

      case "ArrowUp":
        this.#nextItem(true);
        break;
    }
  };

  #onFocusIn = () => {
    this.#element.classList.add("focus");
  };

  #onFocusOut = () => {
    this.#element.classList.remove("focus");
  };

  #onInput = () => {
    const items = [];
    const value = this.#normalize(this.#input.value);

    if (value.length > 0) {
      for (const option of this.#select.options) {
        if (!option.selected) {
          const label = this.#normalize(option.label);

          if (label.includes(value)) {
            const item = document.createElement("button");

            item.type = "button";
            item.innerText = option.label;
            item.dataset.value = option.value;
            item.dataset.label = option.label;
            item.classList.add("dropdown-item");
            item.addEventListener("click", this.#onItemClick);

            items.push(item);
          }
        }
      }
    }

    if (items.length === 0) {
      this.#dropdown.hide();
      this.#menu.replaceChildren();
    } else {
      items.sort((a, b) => a.dataset.label.localeCompare(b.dataset.label));
      this.#menu.replaceChildren(...items);
      this.#dropdown.show();
    }
  };

  #onShowBsDropdown = (event: Event) => {
    if (this.#menu.children.length === 0) {
      event.preventDefault();
    }
  };

  #onShownBsDropdown = (event: Event) => {
    this.#menu.scroll(0, 0);
  };

  #onItemClick = (event: Event) => {
    const button = event.target as HTMLElement;

    const label = button.dataset.label;
    const value = button.dataset.value;

    this.#setSelected(value);
    this.#addTag(label, value);
    this.#resetInput();
    this.#dispatchInput();
  };
}
