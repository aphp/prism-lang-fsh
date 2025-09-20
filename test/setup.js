/**
 * Jest test setup file
 * Configures the test environment for Prism.js plugin testing
 */

// Setup JSDOM for browser-like environment
if (typeof window === 'undefined') {
  // Create minimal Prism mock if not available
  global.Prism = {
    languages: {},
    tokenize: function (text, grammar) {
      // Simple tokenization mock
      if (!text || !grammar) return [text || ''];

      const tokens = [];
      let remainingText = text;

      // Try to match tokens based on grammar
      for (const tokenName in grammar) {
        const token = grammar[tokenName];
        if (token && token.pattern) {
          const pattern = token.pattern;
          const regex = pattern instanceof RegExp ? pattern : pattern.pattern;

          if (regex) {
            const match = remainingText.match(regex);
            if (match) {
              tokens.push({
                type: tokenName,
                content: match[0]
              });
              remainingText = remainingText.replace(match[0], '');
            }
          }
        }
      }

      // Add remaining text as plain text
      if (remainingText) {
        tokens.push(remainingText);
      }

      return tokens.length ? tokens : [text];
    },
    hooks: {
      add: function () {},
      run: function () {}
    },
    util: {
      encode: function (tokens) {
        return tokens;
      },
      type: function (obj) {
        return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1];
      }
    }
  };
}

// Load actual Prism.js if available
try {
  const Prism = require('prismjs');
  global.Prism = Prism;
} catch (e) {
  // Using mock Prism for testing
}

// Setup console mocks to suppress noise during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn()
};

// Setup performance mock
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => Date.now()
  };
}

// Setup will handle Jest matchers later if needed

// Export test utilities
module.exports = {
  /**
   * Helper to create a test code sample
   */
  createCodeSample: (code) => {
    return code.trim();
  },

  /**
   * Helper to get token types from tokenization result
   */
  getTokenTypes: (tokens) => {
    return tokens
      .filter(t => typeof t === 'object' && t.type)
      .map(t => t.type);
  },

  /**
   * Helper to find token by type
   */
  findTokenByType: (tokens, type) => {
    return tokens.find(t => t && t.type === type);
  },

  /**
   * Helper to count tokens of specific type
   */
  countTokensByType: (tokens, type) => {
    return tokens.filter(t => t && t.type === type).length;
  }
};
