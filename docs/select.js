var bootstrap5 = (function (t, e) {
  "use strict";
  function s(t, e, s, i) {
    if ("a" === s && !i)
      throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof e ? t !== e || !i : !e.has(t))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return "m" === s ? i : "a" === s ? i.call(t) : i ? i.value : e.get(t);
  }
  function i(t, e, s, i, a) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !a)
      throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof e ? t !== e || !a : !e.has(t))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return "a" === i ? a.call(t, s) : a ? (a.value = s) : e.set(t, s), s;
  }
  var a,
    n,
    l,
    h,
    o,
    r,
    c,
    f,
    d,
    u,
    m,
    p,
    v,
    w,
    b,
    k,
    E,
    y,
    W,
    M,
    g,
    L,
    C,
    S,
    T,
    q,
    A,
    D;
  return (
    (n = new WeakMap()),
    (l = new WeakMap()),
    (h = new WeakMap()),
    (o = new WeakMap()),
    (r = new WeakMap()),
    (c = new WeakMap()),
    (f = new WeakMap()),
    (M = new WeakMap()),
    (g = new WeakMap()),
    (L = new WeakMap()),
    (C = new WeakMap()),
    (S = new WeakMap()),
    (T = new WeakMap()),
    (q = new WeakMap()),
    (A = new WeakMap()),
    (D = new WeakMap()),
    (a = new WeakSet()),
    (d = function (t, e = "") {
      var a;
      const h = document.createElement("span");
      h.classList.add("option"),
        (t = t.trim()),
        (e = e.trim()),
        (h.innerText = t),
        (h.dataset.label = t),
        (h.dataset.value = e || t),
        i(this, f, ((a = s(this, f, "f")), ++a), "f"),
        s(this, n, "f").insertBefore(h, s(this, l, "f"));
    }),
    (u = function (t) {
      var e;
      i(this, f, ((e = s(this, f, "f")), --e), "f"), t.remove();
    }),
    (m = function () {
      (s(this, l, "f").value = ""), s(this, o, "f").replaceChildren();
    }),
    (p = function () {
      s(this, n, "f").dispatchEvent(new CustomEvent("input"));
    }),
    (v = function (t) {
      return t
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }),
    (w = function (t, e = !0) {
      Array.from(s(this, h, "f").options).find((e) => e.value === t).selected =
        e;
    }),
    (b = function () {
      const t = s(this, a, "m", y).call(this);
      if (t) {
        const e = t.dataset.label,
          i = t.dataset.value;
        s(this, a, "m", d).call(this, e, i), s(this, a, "m", w).call(this, i);
      } else if (s(this, c, "f")) {
        const t = s(this, l, "f").value,
          e = Array.from(s(this, h, "f").options).find(
            (e) => e.value.trim() === t.trim()
          );
        if (e)
          e.selected ||
            (s(this, a, "m", d).call(this, t),
            s(this, a, "m", w).call(this, t));
        else {
          const e = document.createElement("option");
          (e.value = t),
            (e.label = t),
            s(this, h, "f").options.add(e),
            s(this, a, "m", d).call(this, t),
            s(this, a, "m", w).call(this, t);
        }
      }
      s(this, a, "m", p).call(this),
        s(this, a, "m", m).call(this),
        s(this, r, "f").hide();
    }),
    (k = function () {
      const t = s(this, l, "f").previousElementSibling;
      t &&
        (s(this, a, "m", u).call(this, t),
        s(this, a, "m", w).call(this, t.dataset.value, !1),
        s(this, a, "m", p).call(this));
    }),
    (E = function (t = !1) {
      const e = s(this, a, "m", y).call(this);
      if (e) {
        e.classList.remove("active");
        const s = t ? e.previousElementSibling : e.nextElementSibling;
        if (s)
          return (
            s.classList.add("active"),
            void s.scrollIntoView({ block: "nearest" })
          );
      }
      const i = t
        ? s(this, o, "f").lastElementChild
        : s(this, o, "f").firstElementChild;
      i && (i.classList.add("active"), i.scrollIntoView({ block: "nearest" }));
    }),
    (y = function () {
      return s(this, o, "f").querySelector(".active");
    }),
    (W = function (t, e = 250) {
      let s;
      return (...i) => {
        clearTimeout(s), (s = setTimeout(() => t(...i), e));
      };
    }),
    (t.Select = class {
      constructor(t) {
        a.add(this),
          n.set(this, void 0),
          l.set(this, void 0),
          h.set(this, void 0),
          o.set(this, void 0),
          r.set(this, void 0),
          c.set(this, !1),
          f.set(this, 0),
          M.set(this, () =>
            0 === s(this, f, "f") ? "" : s(this, f, "f").toString()
          ),
          g.set(this, () => {
            s(this, l, "f").focus();
          }),
          L.set(this, (t) => {
            switch (t.key) {
              case "Enter":
                0 !== s(this, l, "f").value.length &&
                  (t.preventDefault(), s(this, a, "m", b).call(this));
                break;
              case "Backspace":
                0 === s(this, l, "f").value.length &&
                  s(this, a, "m", k).call(this);
                break;
              case "ArrowDown":
                s(this, a, "m", E).call(this);
                break;
              case "ArrowUp":
                s(this, a, "m", E).call(this, !0);
            }
          }),
          C.set(this, () => {
            s(this, n, "f").classList.add("focus");
          }),
          S.set(this, () => {
            s(this, n, "f").classList.remove("focus");
          }),
          T.set(this, () => {
            const t = [],
              e = s(this, a, "m", v).call(this, s(this, l, "f").value);
            if (e.length > 0)
              for (const i of s(this, h, "f").options)
                if (!i.selected) {
                  if (s(this, a, "m", v).call(this, i.label).includes(e)) {
                    const e = document.createElement("button");
                    (e.type = "button"),
                      (e.innerText = i.label),
                      (e.dataset.value = i.value),
                      (e.dataset.label = i.label),
                      e.classList.add("dropdown-item"),
                      e.addEventListener("click", s(this, D, "f")),
                      t.push(e);
                  }
                }
            0 === t.length
              ? (s(this, r, "f").hide(), s(this, o, "f").replaceChildren())
              : (t.sort((t, e) =>
                  t.dataset.label.localeCompare(e.dataset.label)
                ),
                s(this, o, "f").replaceChildren(...t),
                s(this, r, "f").show());
          }),
          q.set(this, (t) => {
            0 === s(this, o, "f").children.length && t.preventDefault();
          }),
          A.set(this, (t) => {
            s(this, o, "f").scroll(0, 0);
          }),
          D.set(this, (t) => {
            const e = t.target,
              i = e.dataset.label,
              n = e.dataset.value;
            s(this, a, "m", w).call(this, n),
              s(this, a, "m", d).call(this, i, n),
              s(this, a, "m", m).call(this),
              s(this, a, "m", p).call(this);
          }),
          i(this, n, t, "f"),
          i(this, l, s(this, n, "f").querySelector("input"), "f"),
          i(this, h, s(this, n, "f").querySelector("select"), "f"),
          i(this, o, s(this, n, "f").querySelector(".dropdown-menu"), "f"),
          i(this, r, e.Dropdown.getOrCreateInstance(s(this, l, "f")), "f"),
          (s(this, l, "f").autocomplete = "off"),
          i(
            this,
            c,
            "" === s(this, n, "f").dataset.mutable ||
              "true" === s(this, n, "f").dataset.mutable,
            "f"
          ),
          Object.defineProperty(s(this, n, "f"), "value", {
            get: s(this, M, "f"),
          }),
          s(this, l, "f").addEventListener("keydown", s(this, L, "f")),
          s(this, l, "f").addEventListener(
            "input",
            s(this, a, "m", W).call(this, s(this, T, "f"))
          ),
          s(this, l, "f").addEventListener("focusin", s(this, C, "f")),
          s(this, l, "f").addEventListener("focusout", s(this, S, "f")),
          s(this, l, "f").addEventListener("show.bs.dropdown", s(this, q, "f")),
          s(this, l, "f").addEventListener(
            "shown.bs.dropdown",
            s(this, A, "f")
          ),
          s(this, n, "f").addEventListener("click", s(this, g, "f")),
          this.update();
      }
      update() {
        s(this, n, "f")
          .querySelectorAll(".option")
          .forEach((t) => t.remove);
        for (const t of s(this, h, "f").options)
          t.selected && s(this, a, "m", d).call(this, t.label, t.value);
      }
    }),
    t
  );
})({}, bootstrap);
//# sourceMappingURL=select.js.map
