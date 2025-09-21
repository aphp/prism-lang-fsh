# prism-lang-fsh

A Prism.js language definition plugin for FHIR Shorthand

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Prism.js Compatible](https://img.shields.io/badge/Prism.js-Compatible-purple.svg)](https://prismjs.com)

## 📋 Overview

This project provides a comprehensive language definition plugin for [Prism.js](https://prismjs.com) to enable syntax highlighting for **FHIR Shorthand (FSH)** language. FSH is a domain-specific language for defining FHIR implementation guides, profiles, extensions, and other FHIR conformance resources.

## 🚀 Features

- **Complete FSH v3.0.0 support** - All major language constructs
- **Rich syntax highlighting** - Comments, aliases, definitions, rules, codes, cardinalities, and more
- **Performance optimized** - Regex patterns avoid catastrophic backtracking
- **Comprehensive token types** - 15+ distinct token categories for precise highlighting
- **Multiple themes** - Light, dark, and high-contrast support
- **Browser compatible** - Works with all modern browsers
- **Extensive testing** - 100+ test cases covering edge cases and real-world examples
- **Compatible with Prism.js 1.15+**

## 📁 Project Structure

```
prism-lang-fsh/
├── src/
│   ├── prism-lang-fsh.js         # Main language definition
│   └── prism-lang-fsh.css        # Optional FSH styling
├── test/
│   ├── fixtures/                 # Test code samples
│   ├── prism-lang-fsh.test.js    # Unit tests
│   └── visual.html               # Visual testing page
├── examples/
│   └── demo.html                 # Usage examples
├── dist/                         # Built/minified files
│   ├── prism-lang-fsh.min.js
│   └── prism-lang-fsh.min.css
├── docs/
│   └── LANGUAGE_SPEC.md         # Language specification
├── .github/
│   ├── workflows/               # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md              # Contribution guidelines
├── CLAUDE.md                    # Claude Code assistant guide
├── LICENSE                      # MIT License
├── package.json
├── .gitignore
├── .eslintrc.json
└── README.md                    # This file
```

## 🔧 Installation

### Using npm

```bash
npm install prism-lang-fsh
```

### Using CDN

```html
<!-- Include Prism.js core -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js"></script>

<!-- Include the language definition -->
<script src="https://cdn.jsdelivr.net/npm/prism-lang-fsh@0.1.0/prism-lang-fsh.min.js"></script>
```

### Manual Installation

1. Download the plugin files from the `dist/` directory
2. Include them in your HTML after Prism.js core

## 📖 Usage

### Basic Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Include Prism CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/themes/prism-min.css"
      rel="stylesheet"
    />
    <!-- Include FSH theme (optional) -->
    <link
      href="https://cdn.jsdelivr.net/npm/prism-lang-fsh@0.1.0/prism-lang-fsh.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <pre><code class="language-fsh">
// FHIR Shorthand Profile Example
Profile: MyPatientProfile
Parent: Patient
Id: my-patient
Title: "My Patient Profile"
Description: "A custom patient profile with additional constraints"

* identifier 1..* MS
* name 1..* MS
* birthDate 1..1 MS
* gender from http://hl7.org/fhir/ValueSet/administrative-gender (required)
</code></pre>

    <!-- Include Prism core -->
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js"></script>
    <!-- Include FSH language definition -->
    <script src="https://cdn.jsdelivr.net/npm/prism-lang-fsh@0.1.0/prism-lang-fsh.min.js"></script>

    <script>
      // Highlight all code blocks
      Prism.highlightAll();
    </script>
  </body>
</html>
```

### Advanced Usage

```javascript
// Programmatic highlighting
const fshCode = `
Alias: $sct = http://snomed.info/sct

Profile: ObservationProfile
Parent: Observation
* code from $sct (required)
* value[x] only Quantity
`;

const html = Prism.highlight(fshCode, Prism.languages.fsh, 'fsh');
document.getElementById('output').innerHTML = html;
```

### Supported Token Types

The plugin recognizes and highlights these FSH language elements:

- **Comments**: `// single-line` and `/* multi-line */`
- **Aliases**: `Alias: $name = url`
- **Definitions**: `Profile:`, `Extension:`, `Instance:`, `ValueSet:`, etc.
- **Metadata**: `Id:`, `Parent:`, `Title:`, `Description:`, etc.
- **Rules**: `* element 1..* MS`
- **Codes**: `#active`, `SCT#123456`, `$alias#code`
- **Cardinalities**: `0..1`, `1..*`, `0..5`
- **Flags**: `MS`, `SU`, `?!`, `D`, `TU`, `N`
- **Actions**: `contains`, `only`, `from`, `obeys`, `insert`
- **Bindings**: `(required)`, `(extensible)`, `(preferred)`, `(example)`
- **URLs**: `http://example.org/ValueSet/test`
- **Strings**: `"text"` and `"""multi-line"""`

## 🧪 Development

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- Git

### Setup

1. Clone the repository:

```bash
git clone https://github.com/aphp/prism-lang-fsh.git
cd prism-lang-fsh
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development mode with watch
- `npm run build` - Build production files
- `npm test` - Run comprehensive test suite
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run test:visual` - Open visual test page with FSH examples

### Testing

Run the comprehensive test suite:

```bash
npm test
```

For visual testing and manual verification:

```bash
# Open the visual test page
npm run test:visual

# Or directly open in browser
open test/visual.html
```

The test suite includes:

- **Unit tests** for all token types
- **Integration tests** with real FSH files
- **Performance tests** for large files
- **Edge case testing**
- **Real-world FSH examples**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Submitting pull requests
- Reporting issues

## 🐛 Issues

Found a bug or have a feature request? Please check [existing issues](https://github.com/aphp/prism-lang-fsh/issues) first, then [open a new issue](https://github.com/aphp/prism-lang-fsh/issues/new/choose) if needed.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Prism.js](https://prismjs.com) team for the excellent syntax highlighter
- Contributors and maintainers
- FHIR Shorthand community

## 📚 Resources

### FHIR Shorthand

- [FHIR Shorthand Official Specification](https://build.fhir.org/ig/HL7/fhir-shorthand/)
- [FSH School - Interactive Tutorial](https://fshschool.org/)
- [SUSHI - FSH Compiler](https://github.com/FHIR/sushi)
- [GoFSH - FHIR to FSH Converter](https://github.com/FHIR/GoFSH)
- [FSH Language Grammar](https://github.com/FHIR/sushi/blob/master/antlr/src/main/antlr4/FSH.g4)

### Prism.js

- [Prism.js Documentation](https://prismjs.com/docs/)
- [Creating a Prism.js Language Definition](https://prismjs.com/extending.html#language-definitions)
- [Language Definition Examples](https://github.com/PrismJS/prism/tree/master/components)

### FHIR

- [HL7 FHIR Specification](https://www.hl7.org/fhir/)
- [FHIR Implementation Guides](https://www.hl7.org/fhir/implementationguide.html)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/prism-lang-fsh)
- [GitHub Repository](https://github.com/aphp/prism-lang-fsh)
- [Issue Tracker](https://github.com/aphp/prism-lang-fsh/issues)
- [Discussions](https://github.com/aphp/prism-lang-fsh/discussions)

---

**Status**: ✅ Production Ready - Full FSH v3.0.0 support with comprehensive testing

### Token Coverage

This plugin provides comprehensive syntax highlighting for all major FSH language constructs:

| Feature       | Support | Examples                                   |
| ------------- | ------- | ------------------------------------------ |
| Comments      | ✅ Full | `// comment`, `/* block */`                |
| Aliases       | ✅ Full | `Alias: $sct = http://snomed.info/sct`     |
| Definitions   | ✅ Full | `Profile:`, `Extension:`, `ValueSet:`      |
| Metadata      | ✅ Full | `Id:`, `Parent:`, `Title:`, `Description:` |
| Rules         | ✅ Full | `* element 1..* MS`                        |
| Codes         | ✅ Full | `#active`, `SCT#123456`, `$sct#code`       |
| Cardinalities | ✅ Full | `0..1`, `1..*`, `0..5`                     |
| Flags         | ✅ Full | `MS`, `SU`, `?!`, `D`, `TU`, `N`           |
| Actions       | ✅ Full | `contains`, `only`, `from`, `obeys`        |
| Bindings      | ✅ Full | `(required)`, `(extensible)`               |
| URLs          | ✅ Full | `http://example.org/path`                  |
| Strings       | ✅ Full | `"text"`, `"""multi-line"""`               |
| Paths         | ✅ Full | `extension[name].value[x]`                 |
| Caret Rules   | ✅ Full | `* ^status = #active`                      |
