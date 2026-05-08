let animate = (target, keyframes, options = {}) => {
  if (typeof target === "number" && typeof keyframes === "number" && typeof options.onUpdate === "function") {
    options.onUpdate(keyframes);
  }
  return { cancel() {}, stop() {} };
};

let inView = (target, callback) => {
  const elements = typeof target === "string" ? document.querySelectorAll(target) : [target];
  elements.forEach((element) => callback(element));
};

let stagger = () => 0;
let THREE = null;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const bootIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({ strokeWidth: 2, absoluteStrokeWidth: true });
  }
};

const splitText = () => {
  qsa("[data-split]").forEach((element) => {
    const nodes = Array.from(element.childNodes);
    const fragment = document.createDocumentFragment();

    const appendSplitWord = (content) => {
      const outer = document.createElement("span");
      const inner = document.createElement("span");
      outer.className = "split-word";

      if (typeof content === "string") {
        inner.textContent = content;
      } else {
        inner.appendChild(content);
      }

      outer.appendChild(inner);
      fragment.appendChild(outer);
      fragment.appendChild(document.createTextNode(" "));
    };

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .forEach(appendSplitWord);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        appendSplitWord(node.cloneNode(true));
      }
    });

    element.replaceChildren(fragment);
  });
};

const setupHeroEyes = () => {
  const eyes = qsa(".word-eye");
  const title = qs(".premium-title");
  if (!eyes.length || !title) return;

  let ambientTimer = 0;
  const glances = [
    [-0.75, 0.12],
    [0.7, -0.18],
    [0.15, 0.45],
    [-0.25, -0.32],
    [0, 0],
  ];
  let glanceIndex = 0;

  const setLook = (x, y) => {
    eyes.forEach((eye, index) => {
      eye.style.setProperty("--eye-x", `${(x * 0.105 + (index ? 0.012 : -0.012)).toFixed(3)}em`);
      eye.style.setProperty("--eye-y", `${(y * 0.075).toFixed(3)}em`);
    });
  };

  const resumeAmbient = () => {
    if (prefersReducedMotion || ambientTimer) return;
    ambientTimer = window.setInterval(() => {
      glanceIndex = (glanceIndex + 1) % glances.length;
      setLook(glances[glanceIndex][0], glances[glanceIndex][1]);
    }, 1700);
  };

  const pauseAmbient = () => {
    window.clearInterval(ambientTimer);
    ambientTimer = 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      const rect = title.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      pauseAmbient();
      setLook(x, y);
      window.clearTimeout(setupHeroEyes.resumeTimer);
      setupHeroEyes.resumeTimer = window.setTimeout(resumeAmbient, 1100);
    },
    { passive: true }
  );

  if (!prefersReducedMotion) {
    animate(".word-eye", { scale: [1, 1.08, 1] }, { duration: 3.4, delay: stagger(0.1), repeat: Infinity, easing: "ease-in-out" });
    animate(".eye-word", { y: [0, -5, 0] }, { duration: 4.8, repeat: Infinity, easing: "ease-in-out" });
    resumeAmbient();
  }
};

const setupPreloader = () => {
  const preloader = qs(".preloader");
  if (!preloader) return;

  if (prefersReducedMotion) {
    preloader.remove();
    return;
  }

  window.setTimeout(() => {
    animate(preloader, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.75, easing: [0.16, 1, 0.3, 1] });
    window.setTimeout(() => preloader.remove(), 820);
  }, 850);
};

const setupMenu = () => {
  const button = qs("[data-menu-toggle]");
  const menu = qs("#mobileMenu");
  if (!button || !menu) return;

  const closeMenu = () => {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
  });

  qsa("a", menu).forEach((link) => link.addEventListener("click", closeMenu));
};

const setupProgress = () => {
  const progress = qs("#siteProgress");
  if (!progress || prefersReducedMotion) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${Math.min(Math.max(amount, 0), 1).toFixed(4)})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
};

const setupCursor = () => {
  const orb = qs(".cursor-orb");
  if (!orb || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  let frame = 0;
  let visible = false;
  const point = { x: 0, y: 0 };

  window.addEventListener(
    "pointermove",
    (event) => {
      point.x = event.clientX;
      point.y = event.clientY;
      if (!visible) {
        visible = true;
        animate(orb, { opacity: 1 }, { duration: 0.25 });
      }
      if (!frame) {
        frame = requestAnimationFrame(() => {
          orb.style.left = `${point.x}px`;
          orb.style.top = `${point.y}px`;
          frame = 0;
        });
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    visible = false;
    animate(orb, { opacity: 0 }, { duration: 0.25 });
  });
};

const setupHero = () => {
  if (prefersReducedMotion) return;

  animate(
    ".split-word > span",
    { y: ["110%", "0%"], rotate: [5, 0] },
    { duration: 0.95, delay: stagger(0.07, { startDelay: 0.65 }), easing: [0.16, 1, 0.3, 1] }
  );

  animate(
    ".rail",
    { opacity: [0, 1], y: [90, 0], scale: [0.86, 1] },
    { duration: 1.2, delay: stagger(0.13, { startDelay: 0.7 }), easing: [0.16, 1, 0.3, 1] }
  );

  animate(".rail-a", { y: [0, -28, 0], rotate: [-8, -3, -8] }, { duration: 7, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-b", { y: [0, 22, 0], rotate: [5, 1, 5] }, { duration: 8, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-c", { y: [0, -18, 0], rotate: [-3, -8, -3] }, { duration: 6.4, repeat: Infinity, easing: "ease-in-out" });
  animate(".rail-d", { y: [0, 26, 0], rotate: [9, 4, 9] }, { duration: 7.5, repeat: Infinity, easing: "ease-in-out" });
  animate(".hero-orbit", { rotate: 360 }, { duration: 26, repeat: Infinity, easing: "linear" });
  animate(".console-map span", { scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }, { duration: 2, delay: stagger(0.22), repeat: Infinity });
};

const setupAttentionScene = () => {
  const canvas = qs("#attentionScene");
  if (!canvas || !THREE || prefersReducedMotion) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const group = new THREE.Group();
  scene.add(group);

  const red = new THREE.Color(0xf00816);
  const white = new THREE.Color(0xffffff);
  const positions = [];
  const colors = [];

  for (let i = 0; i < 1800; i += 1) {
    const band = i % 2 === 0 ? 1.0 : 0.62;
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.25 + Math.random() * 2.25;
    const x = Math.cos(angle) * radius * 1.55;
    const y = Math.sin(angle) * radius * 0.52 * band;
    const z = (Math.random() - 0.5) * 3.5;
    positions.push(x, y, z);
    const color = Math.random() > 0.72 ? red : white;
    colors.push(color.r, color.g, color.b);
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.026,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });

  const points = new THREE.Points(particleGeometry, particleMaterial);
  group.add(points);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xf00816, transparent: true, opacity: 0.34 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.01, 12, 160), ringMaterial);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.012, 12, 160), ringMaterial.clone());
  ringA.scale.y = 0.32;
  ringB.scale.y = 0.32;
  ringB.material.opacity = 0.5;
  group.add(ringA, ringB);

  const pupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xf00816, transparent: true, opacity: 0.95 })
  );
  pupil.position.set(0.65, 0, 0.15);
  group.add(pupil);

  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);

  let frame = 0;
  const render = () => {
    frame += 0.01;
    group.rotation.y += 0.0035;
    group.rotation.x += (pointer.y * 0.14 - group.rotation.x) * 0.035;
    group.rotation.z += (pointer.x * 0.08 - group.rotation.z) * 0.035;
    points.rotation.z = Math.sin(frame) * 0.06;
    ringA.rotation.z -= 0.004;
    ringB.rotation.z += 0.006;
    pupil.position.x = 0.65 + pointer.x * 0.12;
    pupil.position.y = pointer.y * -0.08;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};

const setupCollisionMotion = () => {
  if (prefersReducedMotion) return;

  animate(".collision-one", { y: [0, -24, 0], rotate: [-7, -2, -7] }, { duration: 7.4, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-two", { y: [0, 18, 0], rotate: [5, 9, 5] }, { duration: 8.2, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-three", { y: [0, -16, 0], rotate: [10, 5, 10] }, { duration: 6.6, repeat: Infinity, easing: "ease-in-out" });
  animate(".collision-red span", { scaleY: [1, 0.34, 1], opacity: [1, 0.58, 1] }, { duration: 1.6, delay: stagger(0.18), repeat: Infinity, easing: "ease-in-out" });
};

const setupDirectorBoard = () => {
  const board = qs("[data-director-board]");
  if (!board) return;

  const panels = qsa("[data-director-panel]", board);
  if (!panels.length) return;

  const activate = (activePanel) => {
    panels.forEach((panel) => {
      const active = panel === activePanel;
      panel.classList.toggle("is-active", active);
      if (!prefersReducedMotion) {
        animate(panel, { opacity: active ? 1 : 0.72 }, { duration: 0.45, easing: [0.16, 1, 0.3, 1] });
        animate(qs(".panel-content", panel), { y: active ? [18, 0] : 0 }, { duration: 0.55, easing: [0.16, 1, 0.3, 1] });
      }
    });
  };

  panels.forEach((panel) => {
    panel.addEventListener("pointerenter", () => activate(panel));
    panel.addEventListener("focusin", () => activate(panel));
    panel.addEventListener("click", () => activate(panel));
    panel.setAttribute("tabindex", "0");
  });

  if (!prefersReducedMotion) {
    animate(".director-backdrop img", { x: ["-2%", "2%", "-2%"] }, { duration: 9, repeat: Infinity, easing: "ease-in-out" });
  }
};

const setupReveals = () => {
  if (prefersReducedMotion) {
    qsa(".reveal").forEach((element) => {
      element.style.opacity = 1;
      element.style.transform = "none";
    });
    return;
  }

  qsa(".reveal").forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(46px)";
  });

  inView(
    ".reveal",
    (element) => {
      animate(element, { opacity: 1, y: [46, 0] }, { duration: 0.82, easing: [0.16, 1, 0.3, 1] });
    },
    { amount: 0.18, margin: "0px 0px -10% 0px" }
  );
};

const setupMarquee = () => {
  const marquee = qs("[data-marquee]");
  if (!marquee || prefersReducedMotion) return;
  animate(marquee, { x: ["0%", "-50%"] }, { duration: 26, repeat: Infinity, easing: "linear" });
};

const setupReel = () => {
  const track = qs("[data-reel-track]");
  if (!track || prefersReducedMotion) return;

  if (!track.dataset.cloned) {
    qsa(".cinema-card", track).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.dataset.cloned = "true";
  }

  requestAnimationFrame(() => {
    animate(track, { x: [0, -(track.scrollWidth / 2)] }, { duration: 38, repeat: Infinity, easing: "linear" });
  });

  animate(".cinema-card img", { scale: [1, 1.12, 1] }, { duration: 10, delay: stagger(0.4), repeat: Infinity, easing: "ease-in-out" });
};

const setupCounters = () => {
  const format = (value, element) => {
    const suffix = element.dataset.suffix || "";
    const prefix = element.dataset.prefix || "";
    return `${prefix}${Math.round(value)}${suffix}`;
  };

  qsa(".stat-number").forEach((element) => {
    const target = Number(element.dataset.value || 0);
    inView(
      element,
      () => {
        if (prefersReducedMotion) {
          element.textContent = format(target, element);
          return;
        }
        animate(0, target, {
          duration: 1.5,
          easing: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            element.textContent = format(latest, element);
          }
        });
      },
      { amount: 0.75 }
    );
  });
};

const setupMagnetic = () => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  qsa(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      animate(element, { x, y }, { type: "spring", stiffness: 420, damping: 28 });
    });
    element.addEventListener("pointerleave", () => {
      animate(element, { x: 0, y: 0 }, { type: "spring", stiffness: 360, damping: 22 });
    });
  });
};

const setupTiltAndDepth = () => {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  qsa(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
  });

  qsa("[data-depth-card]").forEach((card) => {
    const layers = qsa(".depth-layer", card);
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer, index) => {
        const depth = 16 + index * 10;
        animate(layer, { x: x * depth, y: y * depth * -1 }, { type: "spring", stiffness: 160, damping: 24 });
      });
    });
    card.addEventListener("pointerleave", () => {
      layers.forEach((layer) => animate(layer, { x: 0, y: 0 }, { type: "spring", stiffness: 160, damping: 24 }));
    });
  });
};

const setupParallax = () => {
  if (prefersReducedMotion) return;
  const targets = qsa(".machine-card img, .hero-logo-ghost img, .cta-logo img");
  if (!targets.length) return;

  const update = () => {
    targets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      const amount = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      target.style.transform = `translateY(${(amount * -28).toFixed(2)}px) scale(${index === 0 ? 1.06 : 1})`;
    });
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
};

const setupForm = () => {
  const form = qs("#contactForm");
  const note = qs("#formNote");
  if (!form || !note) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = String(new FormData(form).get("email") || "").trim();
    note.textContent = email ? `Signal received. We will map the first route for ${email}.` : "Add your email to open the signal.";
    form.reset();
  });
};

const boot = () => {
  splitText();
  bootIcons();
  setupPreloader();
  setupMenu();
  setupProgress();
  setupCursor();
  setupAttentionScene();
  setupHero();
  setupHeroEyes();
  setupDirectorBoard();
  setupCollisionMotion();
  setupReveals();
  setupMarquee();
  setupReel();
  setupCounters();
  setupMagnetic();
  setupTiltAndDepth();
  setupParallax();
  setupForm();
};

const loadMotion = async () => {
  try {
    const motion = await import("https://esm.sh/framer-motion@12.23.24/dom?bundle");
    THREE = await import("https://esm.sh/three@0.164.1");
    animate = motion.animate;
    inView = motion.inView;
    stagger = motion.stagger;
  } catch (error) {
    console.warn("Framer Motion could not be loaded. Static fallbacks are active.", error);
  }
};

const start = async () => {
  await loadMotion();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
};

start();
