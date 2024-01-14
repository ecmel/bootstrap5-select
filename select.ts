/*
 * Copyright (c) 1986-2023 Ecmel Ercan (https://ecmel.dev/)
 * Licensed under the MIT License
 */

import { Dropdown } from "bootstrap";

export class Select {
  private static map = new WeakMap<Element, Select>();

  static getInstance(el: Element) {
    return this.map.get(el);
  }

  static getOrCreateInstance(el: Element) {
    let instance = this.map.get(el);

    if (!instance) {
      instance = new Select(el);
      this.map.set(el, instance);
    }

    return instance;
  }

  declare readonly value: string;
  private element: HTMLElement;
  private input: HTMLInputElement;
  private select: HTMLSelectElement;
  private menu: HTMLElement;
  private list: HTMLDataListElement;
  private dropdown: Dropdown;
  private mutable = false;
  private count = 0;

  constructor(element: Element) {
    this.element = element as HTMLElement;
    this.input = this.element.querySelector("input");
    this.select = this.element.querySelector("select");
    this.menu = this.element.querySelector(".dropdown-menu");
    this.dropdown = Dropdown.getOrCreateInstance(this.input);

    this.input.autocomplete = "off";

    this.mutable =
      this.element.dataset.mutable === "" ||
      this.element.dataset.mutable === "true";

    const list = this.element.dataset.list;

    if (list) {
      this.list = document.getElementById(list) as HTMLDataListElement;
    }

    Object.defineProperty(this.element, "value", { get: this.getValue });

    this.input.addEventListener("keydown", this.onKeyDown);
    this.input.addEventListener("input", this.debounce(this.onInput));
    this.input.addEventListener("focusin", this.onFocusIn);
    this.input.addEventListener("focusout", this.onFocusOut);
    this.input.addEventListener("show.bs.dropdown", this.onShowBsDropdown);
    this.input.addEventListener("shown.bs.dropdown", this.onShownBsDropdown);
    this.element.addEventListener("click", this.onClick);

    Select.map.set(this.element, this);

    this.update();
  }

  update() {
    this.element
      .querySelectorAll(".option")
      .forEach((el) => this.removeTag(el));

    for (const option of this.select.selectedOptions) {
      this.addTag(option.label, option.value);
    }
  }

  private addTag(label: string, value = "") {
    const tag = document.createElement("span");

    tag.classList.add("option");

    tag.innerText = label;
    tag.dataset.label = label;
    tag.dataset.value = value || label;

    this.count++;
    this.element.insertBefore(tag, this.input);
  }

  private removeTag(tag: Element) {
    this.count--;
    tag.remove();
  }

  private resetInput() {
    this.input.value = "";
    this.menu.replaceChildren();
  }

  private dispatchChanged() {
    this.element.dispatchEvent(new CustomEvent("changed.bs5.select"));
    this.element.dispatchEvent(new CustomEvent("input"));
  }

  private normalize(value: string) {
    return value
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  private setSelected(value: string, selected = true) {
    let option = Array.from(this.select.options).find(
      (option) => option.value === value
    );

    if (!option && this.list) {
      const found = Array.from(this.list.options).find(
        (option) => option.value === value
      );

      option = found.cloneNode(true) as HTMLOptionElement;

      this.select.options.add(option);
    }

    option.selected = selected;
  }

  private addItem() {
    const active = this.getActive();

    if (active) {
      const label = active.dataset.label;
      const value = active.dataset.value;

      this.addTag(label, value);
      this.setSelected(value);
    } else if (this.mutable) {
      const value = this.input.value;

      const found = Array.from(this.select.options).find(
        (option) => option.value.trim() === value.trim()
      );

      if (found) {
        if (!found.selected) {
          this.addTag(value);
          this.setSelected(value);
        }
      } else {
        const option = document.createElement("option");

        option.value = value;
        option.label = value;

        this.select.options.add(option);

        this.addTag(value);
        this.setSelected(value);
      }
    }

    this.dispatchChanged();
    this.resetInput();

    this.dropdown.hide();
  }

  private removeItem() {
    const tag = this.input.previousElementSibling as HTMLElement;

    if (tag) {
      this.removeTag(tag);
      this.setSelected(tag.dataset.value, false);
      this.dispatchChanged();
    }
  }

  private nextItem(backward = false) {
    const active = this.getActive();

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
      ? this.menu.lastElementChild
      : this.menu.firstElementChild;

    if (next) {
      next.classList.add("active");
      next.scrollIntoView({ block: "nearest" });
    }
  }

  private getActive(): HTMLElement {
    return this.menu.querySelector(".active");
  }

  private debounce(cb: Function, delay = 250) {
    let timeout: any;

    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  }

  private getValue = () => {
    return this.count === 0 ? "" : this.count.toString();
  };

  private onClick = () => {
    this.input.focus();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        if (this.input.value.length !== 0) {
          event.preventDefault();
          this.addItem();
        }
        break;

      case "Backspace":
        if (this.input.value.length === 0) {
          this.removeItem();
        }
        break;

      case "ArrowDown":
        this.nextItem();
        break;

      case "ArrowUp":
        this.nextItem(true);
        break;
    }
  };

  private onFocusIn = () => {
    this.element.classList.add("focus");
  };

  private onFocusOut = () => {
    this.element.classList.remove("focus");
  };

  private onInput = (event: Event) => {
    const items = [];
    const value = this.normalize(this.input.value);
    const options = this.list ? this.list.options : this.select.options;

    if (value.length > 0) {
      for (const option of options) {
        if (!option.selected) {
          const label = this.normalize(option.label);

          if (label.includes(value)) {
            const item = document.createElement("button");

            item.type = "button";
            item.innerText = option.label;
            item.dataset.value = option.value;
            item.dataset.label = option.label;
            item.classList.add("dropdown-item");
            item.addEventListener("click", this.onItemClick);

            items.push(item);
          }
        }
      }
    }

    if (items.length === 0) {
      this.dropdown.hide();
      this.menu.replaceChildren();
    } else {
      items.sort((a, b) => a.dataset.label.localeCompare(b.dataset.label));
      this.menu.replaceChildren(...items);
      this.dropdown.show();
    }
  };

  private onShowBsDropdown = (event: Event) => {
    if (this.menu.children.length === 0) {
      event.preventDefault();
    }
  };

  private onShownBsDropdown = (event: Event) => {
    this.menu.scroll(0, 0);
  };

  private onItemClick = (event: Event) => {
    const button = event.target as HTMLElement;

    const label = button.dataset.label;
    const value = button.dataset.value;

    this.setSelected(value);
    this.addTag(label, value);
    this.resetInput();
    this.dispatchChanged();
  };
}
