# ⏳ Time Humanizer - Make Time More Human!

[![npm version](https://img.shields.io/npm/v/time-humanizer)](https://www.npmjs.com/package/time-humanizer)
[![build](https://img.shields.io/github/actions/workflow/status/lordronz/time-humanizer/publish.yml?branch=main)](https://github.com/lordronz/time-humanizer/actions)
[![license](https://img.shields.io/npm/l/time-humanizer)](https://opensource.org/licenses/MIT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/time-humanizer)](https://bundlephobia.com/package/time-humanizer)

> A lightweight utility to humanize time intervals and durations, making them easier to understand for your users. Supports both CommonJS and ESM.

---

## 🚀 Features

- **Human-Readable Time**: Turn durations into easy-to-read strings like `5 minutes ago` or `in 3 days`.
- **Flexible Options**: Customize output formats, thresholds, and more.
- **Multi-Language Support**: Coming Soon!
- **Lightweight**: Minimal dependencies and blazing-fast performance.

---

## 📦 Installation

Install the package via npm or yarn:

```bash
# Using npm
npm install time-humanizer

# Using yarn
yarn add time-humanizer

# Using pnpm
pnpm add time-humanizer

# Using bun
bun add time-humanizer
```

## 📜 License

This project is licensed under the MIT License

## 🙌 Contributing

Contributions are welcome! Please check out our Contributing Guide for more details.

1.	Fork the repo.
2.	Create your feature branch: git checkout -b feature/amazing-feature.
3.	Commit your changes: git commit -m "Add some amazing feature".
4.	Push to the branch: git push origin feature/amazing-feature.
5.	Open a pull request.

## 📖 Usage

Time Humanizer provides a simple API for humanizing time durations:

Example

```ts
import { humanizeDuration } from 'time-humanizer';

// Past durations
console.log(humanizeDuration(-60000)); // Output: "1 minute ago"

// Future durations
console.log(humanizeDuration(3600000)); // Output: "in 1 hour"

// Custom thresholds
console.log(humanizeDuration(900000, { threshold: 15 })); // Output: "15 minutes ago"
```

## ⚙️ API

```ts
humanizeDuration(duration: number, options?: HumanizerOptions): string
```

Parameters:
	•	duration: Time in milliseconds (negative for past, positive for future).
	•	options (optional):
	•	threshold (number): Adjusts precision for output.
	•	locale (string): Language to display (default: en).
	•	format (string): Customize time string format.
