
"use strict";

const form = document.getElementById("musicForm");
const generateButton = document.getElementById("generate");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");
const copyButton = document.getElementById("copy");
const exportButton = document.getElementById("export");

const results = document.getElementById("results");
const promptOutput = document.getElementById("promptOutput");
const toast = document.getElementById("toast");

const STORAGE_KEY = "ifield-music-lab-project-v1";

let currentPrompt = "";

// Safe field reader
function getValue(id, fallback = "") {
  const element = document.getElementById(id);
  return element ? element.value.trim() : fallback;
}

// Small notification
function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

// Collect project data
function collectProject() {
  return {
    title: getValue("title", "Untitled Track"),
    genre: getValue("genre", "Experimental"),
    mood: getValue("mood", "Atmospheric"),
    bpm: getValue("bpm", "120"),
    vocal: getValue("vocal", "Male + Female Duet"),
    language: getValue("language", "Ukrainian"),
    instruments: getValue("instruments"),
    idea: getValue("idea"),
    lyrics: getValue("lyrics"),
    updatedAt: new Date().toISOString()
  };
}

// Create a detailed music prompt
function buildPrompt(project) {
  const lines = [
    "IFIELD MUSIC LAB — MUSIC DNA",
    "",
    "TRACK: " + project.title,
    "GENRE: " + project.genre,
    "MOOD: " + project.mood,
    "TEMPO: " + project.bpm + " BPM",
    "VOCALS: " + project.vocal,
    "LANGUAGE: " + project.language,
    "INSTRUMENTS: " + (project.instruments || "Choose instruments that fit the concept"),
    "",
    "CREATIVE DIRECTION:",
    project.idea || "Create an original and emotionally engaging musical composition.",
    "",
    "PRODUCTION:",
    "Professional studio-quality sound, detailed arrangement, clear vocal presence,",
    "organic dynamics, rich atmosphere, balanced low end, memorable musical identity.",
    "",
    "ORIGINALITY:",
    "Create an original composition. Avoid generic melodies, predictable arrangements",
    "and imitation of specific existing artists or songs."
  ];

  if (project.lyrics) {
    lines.push(
      "",
      "LYRICS / TEXT:",
      project.lyrics
    );
  }

  lines.push(
    "",
    "CREATOR FIRST:",
    "Respect the creator's original contribution and the applicable model/provider terms.",
    "",
    "Created with iField Music Lab — Your Music. Your Universe."
  );

  return lines.join("\n");
}

// Generate Music DNA
if (generateButton) {
  generateButton.addEventListener("click", () => {
    const project = collectProject();

    if (!project.title) {
      showToast("Add a track title first.");
      document.getElementById("title")?.focus();
      return;
    }

    currentPrompt = buildPrompt(project);

    promptOutput.textContent = currentPrompt;
    results.hidden = false;

    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    showToast("Music DNA created.");
  });
}

// Save project locally on this device/browser
if (saveButton) {
  saveButton.addEventListener("click", () => {
    try {
      const project = collectProject();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(project)
      );

      showToast("Project saved on this device.");
    } catch (error) {
      showToast("Could not save. Check browser storage settings.");
    }
  });
}

// Load saved project
if (loadButton) {
  loadButton.addEventListener("click", () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        showToast("No saved project found.");
        return;
      }

      const project = JSON.parse(saved);

      Object.entries(project).forEach(([key, value]) => {
        const field = document.getElementById(key);

        if (field && typeof value === "string") {
          field.value = value;
        }
      });

      showToast("Project loaded.");
    } catch (error) {
      showToast("Could not load the saved project.");
    }
  });
}

// Copy prompt
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!currentPrompt) {
      showToast("Create Music DNA first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(currentPrompt);
      showToast("Prompt copied.");
    } catch (error) {
      const temporary = document.createElement("textarea");
      temporary.value = currentPrompt;
      document.body.appendChild(temporary);
      temporary.select();

      const copied = document.execCommand("copy");
      temporary.remove();

      showToast(copied ? "Prompt copied." : "Copy failed.");
    }
  });
}

// Export project passport as TXT
if (exportButton) {
  exportButton.addEventListener("click", () => {
    if (!currentPrompt) {
      showToast("Create Music DNA first.");
      return;
    }

    const project = collectProject();

    const file = new Blob(
      [currentPrompt],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    const safeName = project.title
      .replace(/[^\p{L}\p{N}\-_ ]/gu, "")
      .trim()
      .replace(/\s+/g, "-") || "ifield-track";

    link.href = url;
    link.download = safeName + "-ifield-music-passport.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("Music passport exported.");
  });
}

// Hide generated result when the form is reset
if (form) {
  form.addEventListener("reset", () => {
    setTimeout(() => {
      currentPrompt = "";
      results.hidden = true;
      showToast("Form cleared.");
    }, 0);
  });
}

console.log("iField Music Lab initialized.");
