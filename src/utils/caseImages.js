// Finds optional screenshots dropped into src/assets/case-studies/<slug>/.
// Files are matched by name: cover, hero, step-1 … step-4.
// If a folder or file doesn't exist the helper returns null and the
// components fall back to their designed stand-ins.
const modules = import.meta.glob(
  "../assets/case-studies/*/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" }
);

export function caseImage(slug, name) {
  const key = Object.keys(modules).find((k) =>
    new RegExp(`/case-studies/${slug}/${name}\\.[a-z0-9]+$`, "i").test(k)
  );
  return key ? modules[key] : null;
}
