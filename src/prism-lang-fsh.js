/*!
 * Prism Language Definition - FHIR Shorthand (FSH)
 * A syntax highlighting plugin for Prism.js for FHIR Shorthand language
 * @version 0.1.0
 * @author AP-HP Development Team
 * @license MIT
 * @see https://build.fhir.org/ig/HL7/fhir-shorthand/
 */

(function (Prism) {
  // Check if Prism is available
  if (typeof Prism === 'undefined') {
    return;
  }

  /**
   * FHIR Shorthand (FSH) Language Definition
   *
   * FSH is a domain-specific language for defining FHIR artifacts.
   * This definition supports FSH v3.0.0 with all major language constructs.
   *
   * Token precedence order (highest to lowest):
   * 1. Comments
   * 2. Aliases
   * 3. Definition keywords
   * 4. Metadata keywords
   * 5. Multi-line strings
   * 6. Code references
   * 7. Cardinalities
   * 8. Flags and modifiers
   * 9. Action keywords
   * 10. Binding strengths
   * 11. URLs
   * 12. Rule paths
   * 13. Regular strings
   * 14. Numbers
   * 15. Operators
   * 16. Identifiers
   */

  Prism.languages.fsh = {
    // URLs (very high priority to avoid conflicts with comments)
    url: {
      pattern: /https?:\/\/[^\s)"\]}]+/,
      alias: 'link'
    },

    // Comments (high priority, but after URLs)
    comment: [
      {
        // Single-line comments
        pattern: /\/\/.*/,
        greedy: true
      },
      {
        // Multi-line comments
        pattern: /\/\*[\s\S]*?\*\//,
        greedy: true
      }
    ],

    // Aliases (high priority to catch before other patterns)
    alias: {
      pattern: /^Alias:\s+\$[\w-]+\s*=\s*.+$/m,
      inside: {
        keyword: /^Alias:/,
        variable: /\$[\w-]+/,
        operator: /=/,
        url: /https?:\/\/[^\s]+/,
        string: /.*$/
      }
    },

    // Definition keywords (very high priority)
    'definition-keyword': {
      pattern:
        /^(Profile|Extension|Instance|ValueSet|CodeSystem|RuleSet|Invariant|Mapping|Logical|Resource):/m,
      alias: 'keyword important'
    },

    // Metadata keywords
    'metadata-keyword': {
      pattern:
        /^(Id|Parent|Title|Description|Usage|Source|Target|Severity|XPath|Expression|Context|InstanceOf):/m,
      alias: 'keyword'
    },

    // Multi-line strings (triple quotes)
    'multiline-string': {
      pattern: /"""[\s\S]*?"""/,
      greedy: true,
      alias: 'string'
    },

    // Code system references and codes
    code: [
      {
        // System#code (without display text): SCT#123456
        pattern: /[A-Z$][\w-]*#[\w-.]+/,
        inside: {
          'code-system': /^[A-Z$][\w-]*/,
          operator: /#/,
          'code-value': /[\w-.]+/
        },
        alias: 'symbol'
      },
      {
        // Simple codes: #active, #final
        pattern: /#[\w-.]+/,
        alias: 'symbol'
      },
      {
        // Alias references: $sct, $loinc
        pattern: /\$[\w-]+/,
        alias: 'variable'
      }
    ],

    // Date/DateTime patterns (must come before regular strings)
    date: {
      pattern: /"[\d]{4}-[\d]{2}-[\d]{2}(T[\d]{2}:[\d]{2}:[\d]{2}(Z|[+-][\d]{2}:[\d]{2})?)?"/,
      alias: 'string'
    },

    // Cardinalities (must come before numbers to match properly)
    cardinality: {
      pattern: /\b\d+\.\.([\d]+|\*)(?!\w)/,
      alias: 'number'
    },

    // Flags and modifiers
    modifier: {
      pattern: /\b(MS|SU|D|TU|N)\b|\?!/,
      alias: 'important'
    },

    // Metadata/caret rules (must come before regular rule paths)
    'caret-rule': {
      pattern: /^\s*\*\s+(?:[a-zA-Z][a-zA-Z0-9.[\]:]*\s+)?\^[a-zA-Z][a-zA-Z0-9.[\]:]*(?=\s|$)/m,
      inside: {
        'rule-indicator': /^\s*\*/,
        caret: /\^/,
        'path-component': /[a-zA-Z][a-zA-Z0-9]*/,
        punctuation: /[[\].:]/
      }
    },

    // FSH rule paths (starting with *) - must come after caret rules
    'rule-path': {
      pattern: /^\s*\*\s+[a-zA-Z][a-zA-Z0-9.[\]:^]*/m,
      inside: {
        'rule-indicator': /^\s*\*/,
        'path-component': /[a-zA-Z][a-zA-Z0-9]*/,
        punctuation: /[[\].:^]/,
        'slice-name': /\[[a-zA-Z][a-zA-Z0-9-]*\]/
      }
    },

    // Action keywords and binding keywords
    'action-keyword': {
      pattern:
        /\b(contains|only|obeys|and|or|includes|excludes|from|named|insert|codes|system|valueset|where)\b/,
      alias: 'keyword'
    },

    // Binding strengths
    'binding-strength': {
      pattern: /\((required|extensible|preferred|example)\)/,
      inside: {
        punctuation: /[()]/,
        keyword: /(required|extensible|preferred|example)/
      }
    },

    // Regular strings
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true
    },

    // Boolean values
    boolean: /\b(true|false)\b/,

    // Numbers (integers and decimals)
    number: /\b\d+(\.\d+)?\b/,

    // Operators
    operator: /[=:]/,

    // Punctuation
    punctuation: /[(){}[\],]/,

    // Identifiers (catch-all for remaining words)
    identifier: /\b[a-zA-Z_]\w*\b/
  };

  // Handle nested contexts
  Prism.languages.fsh['alias'].inside.rest = Prism.languages.fsh;
  Prism.languages.fsh['rule-path'].inside.rest = Prism.languages.fsh;
  Prism.languages.fsh['caret-rule'].inside.rest = Prism.languages.fsh;

  // Language aliases for better compatibility
  Prism.languages.fhirshorthand = Prism.languages.fsh;
  Prism.languages['fhir-shorthand'] = Prism.languages.fsh;
})(typeof global !== 'undefined' ? global.Prism : window.Prism);
