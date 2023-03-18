var bootstrap5 = (function (exports, bootstrap) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var _Select_instances, _Select_element, _Select_input, _Select_select, _Select_menu, _Select_dropdown, _Select_mutable, _Select_count, _Select_setSelected, _Select_addTag, _Select_removeTag, _Select_resetInput, _Select_dispatchInput, _Select_normalize, _Select_addItem, _Select_removeItem, _Select_nextItem, _Select_getActive, _Select_debounce, _Select_getValue, _Select_onClick, _Select_onKeyDown, _Select_onFocusIn, _Select_onFocusOut, _Select_onInput, _Select_onShowBsDropdown, _Select_onShownBsDropdown, _Select_onItemClick;
    class Select {
        constructor(element) {
            _Select_instances.add(this);
            _Select_element.set(this, void 0);
            _Select_input.set(this, void 0);
            _Select_select.set(this, void 0);
            _Select_menu.set(this, void 0);
            _Select_dropdown.set(this, void 0);
            _Select_mutable.set(this, false);
            _Select_count.set(this, 0);
            _Select_getValue.set(this, () => {
                return __classPrivateFieldGet(this, _Select_count, "f") === 0 ? "" : __classPrivateFieldGet(this, _Select_count, "f").toString();
            });
            _Select_onClick.set(this, () => {
                __classPrivateFieldGet(this, _Select_input, "f").focus();
            });
            _Select_onKeyDown.set(this, (event) => {
                switch (event.key) {
                    case "Enter":
                        if (__classPrivateFieldGet(this, _Select_input, "f").value.length !== 0) {
                            event.preventDefault();
                            __classPrivateFieldGet(this, _Select_instances, "m", _Select_addItem).call(this);
                        }
                        break;
                    case "Backspace":
                        if (__classPrivateFieldGet(this, _Select_input, "f").value.length === 0) {
                            __classPrivateFieldGet(this, _Select_instances, "m", _Select_removeItem).call(this);
                        }
                        break;
                    case "ArrowDown":
                        __classPrivateFieldGet(this, _Select_instances, "m", _Select_nextItem).call(this);
                        break;
                    case "ArrowUp":
                        __classPrivateFieldGet(this, _Select_instances, "m", _Select_nextItem).call(this, true);
                        break;
                }
            });
            _Select_onFocusIn.set(this, () => {
                __classPrivateFieldGet(this, _Select_element, "f").classList.add("focus");
            });
            _Select_onFocusOut.set(this, () => {
                __classPrivateFieldGet(this, _Select_element, "f").classList.remove("focus");
            });
            _Select_onInput.set(this, () => {
                const items = [];
                const value = __classPrivateFieldGet(this, _Select_instances, "m", _Select_normalize).call(this, __classPrivateFieldGet(this, _Select_input, "f").value);
                if (value.length > 0) {
                    for (const option of __classPrivateFieldGet(this, _Select_select, "f").options) {
                        if (!option.selected) {
                            const label = __classPrivateFieldGet(this, _Select_instances, "m", _Select_normalize).call(this, option.label);
                            if (label.includes(value)) {
                                const item = document.createElement("button");
                                item.type = "button";
                                item.innerText = option.label;
                                item.dataset.value = option.value;
                                item.dataset.label = option.label;
                                item.classList.add("dropdown-item");
                                item.addEventListener("click", __classPrivateFieldGet(this, _Select_onItemClick, "f"));
                                items.push(item);
                            }
                        }
                    }
                }
                if (items.length === 0) {
                    __classPrivateFieldGet(this, _Select_dropdown, "f").hide();
                    __classPrivateFieldGet(this, _Select_menu, "f").replaceChildren();
                }
                else {
                    items.sort((a, b) => a.dataset.label.localeCompare(b.dataset.label));
                    __classPrivateFieldGet(this, _Select_menu, "f").replaceChildren(...items);
                    __classPrivateFieldGet(this, _Select_dropdown, "f").show();
                }
            });
            _Select_onShowBsDropdown.set(this, (event) => {
                if (__classPrivateFieldGet(this, _Select_menu, "f").children.length === 0) {
                    event.preventDefault();
                }
            });
            _Select_onShownBsDropdown.set(this, (event) => {
                __classPrivateFieldGet(this, _Select_menu, "f").scroll(0, 0);
            });
            _Select_onItemClick.set(this, (event) => {
                const button = event.target;
                const label = button.dataset.label;
                const value = button.dataset.value;
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_setSelected).call(this, value);
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_addTag).call(this, label, value);
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_resetInput).call(this);
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_dispatchInput).call(this);
            });
            __classPrivateFieldSet(this, _Select_element, element, "f");
            __classPrivateFieldSet(this, _Select_input, __classPrivateFieldGet(this, _Select_element, "f").querySelector("input"), "f");
            __classPrivateFieldSet(this, _Select_select, __classPrivateFieldGet(this, _Select_element, "f").querySelector("select"), "f");
            __classPrivateFieldSet(this, _Select_menu, __classPrivateFieldGet(this, _Select_element, "f").querySelector(".dropdown-menu"), "f");
            __classPrivateFieldSet(this, _Select_dropdown, bootstrap.Dropdown.getOrCreateInstance(__classPrivateFieldGet(this, _Select_input, "f")), "f");
            __classPrivateFieldGet(this, _Select_input, "f").autocomplete = "off";
            __classPrivateFieldSet(this, _Select_mutable, __classPrivateFieldGet(this, _Select_element, "f").dataset.mutable === "" ||
                __classPrivateFieldGet(this, _Select_element, "f").dataset.mutable === "true", "f");
            for (const option of __classPrivateFieldGet(this, _Select_select, "f").options) {
                if (option.selected) {
                    __classPrivateFieldGet(this, _Select_instances, "m", _Select_addTag).call(this, option.label, option.value);
                }
            }
            Object.defineProperty(__classPrivateFieldGet(this, _Select_element, "f"), "value", { get: __classPrivateFieldGet(this, _Select_getValue, "f") });
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("keydown", __classPrivateFieldGet(this, _Select_onKeyDown, "f"));
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("input", __classPrivateFieldGet(this, _Select_instances, "m", _Select_debounce).call(this, __classPrivateFieldGet(this, _Select_onInput, "f")));
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("focusin", __classPrivateFieldGet(this, _Select_onFocusIn, "f"));
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("focusout", __classPrivateFieldGet(this, _Select_onFocusOut, "f"));
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("show.bs.dropdown", __classPrivateFieldGet(this, _Select_onShowBsDropdown, "f"));
            __classPrivateFieldGet(this, _Select_input, "f").addEventListener("shown.bs.dropdown", __classPrivateFieldGet(this, _Select_onShownBsDropdown, "f"));
            __classPrivateFieldGet(this, _Select_element, "f").addEventListener("click", __classPrivateFieldGet(this, _Select_onClick, "f"));
        }
    }
    _Select_element = new WeakMap(), _Select_input = new WeakMap(), _Select_select = new WeakMap(), _Select_menu = new WeakMap(), _Select_dropdown = new WeakMap(), _Select_mutable = new WeakMap(), _Select_count = new WeakMap(), _Select_getValue = new WeakMap(), _Select_onClick = new WeakMap(), _Select_onKeyDown = new WeakMap(), _Select_onFocusIn = new WeakMap(), _Select_onFocusOut = new WeakMap(), _Select_onInput = new WeakMap(), _Select_onShowBsDropdown = new WeakMap(), _Select_onShownBsDropdown = new WeakMap(), _Select_onItemClick = new WeakMap(), _Select_instances = new WeakSet(), _Select_setSelected = function _Select_setSelected(value, selected = true) {
        const option = Array.from(__classPrivateFieldGet(this, _Select_select, "f").options).find((option) => option.value === value);
        option.selected = selected;
    }, _Select_addTag = function _Select_addTag(label, value = "") {
        var _a;
        const tag = document.createElement("span");
        tag.classList.add("option");
        label = label.trim();
        value = value.trim();
        tag.innerText = label;
        tag.dataset.label = label;
        tag.dataset.value = value || label;
        __classPrivateFieldSet(this, _Select_count, (_a = __classPrivateFieldGet(this, _Select_count, "f"), _a++, _a), "f");
        __classPrivateFieldGet(this, _Select_element, "f").insertBefore(tag, __classPrivateFieldGet(this, _Select_input, "f"));
    }, _Select_removeTag = function _Select_removeTag(tag) {
        var _a;
        __classPrivateFieldSet(this, _Select_count, (_a = __classPrivateFieldGet(this, _Select_count, "f"), _a--, _a), "f");
        tag.remove();
    }, _Select_resetInput = function _Select_resetInput() {
        __classPrivateFieldGet(this, _Select_input, "f").value = "";
        __classPrivateFieldGet(this, _Select_menu, "f").replaceChildren();
    }, _Select_dispatchInput = function _Select_dispatchInput() {
        __classPrivateFieldGet(this, _Select_element, "f").dispatchEvent(new CustomEvent("input"));
    }, _Select_normalize = function _Select_normalize(value) {
        return value
            .trim()
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }, _Select_addItem = function _Select_addItem() {
        const active = __classPrivateFieldGet(this, _Select_instances, "m", _Select_getActive).call(this);
        if (active) {
            const label = active.dataset.label;
            const value = active.dataset.value;
            __classPrivateFieldGet(this, _Select_instances, "m", _Select_addTag).call(this, label, value);
            __classPrivateFieldGet(this, _Select_instances, "m", _Select_setSelected).call(this, value);
        }
        else if (__classPrivateFieldGet(this, _Select_mutable, "f")) {
            const value = __classPrivateFieldGet(this, _Select_input, "f").value;
            const found = Array.from(__classPrivateFieldGet(this, _Select_select, "f").options).find((option) => option.value.trim() === value.trim());
            if (found) {
                if (!found.selected) {
                    __classPrivateFieldGet(this, _Select_instances, "m", _Select_addTag).call(this, value);
                    __classPrivateFieldGet(this, _Select_instances, "m", _Select_setSelected).call(this, value);
                }
            }
            else {
                const option = document.createElement("option");
                option.value = value;
                option.label = value;
                __classPrivateFieldGet(this, _Select_select, "f").options.add(option);
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_addTag).call(this, value);
                __classPrivateFieldGet(this, _Select_instances, "m", _Select_setSelected).call(this, value);
            }
        }
        __classPrivateFieldGet(this, _Select_instances, "m", _Select_dispatchInput).call(this);
        __classPrivateFieldGet(this, _Select_instances, "m", _Select_resetInput).call(this);
        __classPrivateFieldGet(this, _Select_dropdown, "f").hide();
    }, _Select_removeItem = function _Select_removeItem() {
        const tag = __classPrivateFieldGet(this, _Select_input, "f").previousElementSibling;
        if (tag) {
            __classPrivateFieldGet(this, _Select_instances, "m", _Select_removeTag).call(this, tag);
            __classPrivateFieldGet(this, _Select_instances, "m", _Select_setSelected).call(this, tag.dataset.value, false);
            __classPrivateFieldGet(this, _Select_instances, "m", _Select_dispatchInput).call(this);
        }
    }, _Select_nextItem = function _Select_nextItem(backward = false) {
        const active = __classPrivateFieldGet(this, _Select_instances, "m", _Select_getActive).call(this);
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
            ? __classPrivateFieldGet(this, _Select_menu, "f").lastElementChild
            : __classPrivateFieldGet(this, _Select_menu, "f").firstElementChild;
        if (next) {
            next.classList.add("active");
            next.scrollIntoView({ block: "nearest" });
        }
    }, _Select_getActive = function _Select_getActive() {
        return __classPrivateFieldGet(this, _Select_menu, "f").querySelector(".active");
    }, _Select_debounce = function _Select_debounce(cb, delay = 250) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb(...args), delay);
        };
    };

    exports.Select = Select;

    return exports;

})({}, bootstrap);
//# sourceMappingURL=select.js.map
