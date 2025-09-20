<goal>
Create a comprehensive PrismJS plugin for FHIR Shorthand (FSH) syntax highlighting, enabling accurate and elegant code highlighting for FSH language in web browsers.
</goal>
<context>
FHIR Shorthand is a domain-specific language (DSL) designed for creating and maintaining FHIR (Fast Healthcare Interoperability Resources) artifacts. FSH enables concise and readable definition of profiles, extensions, value sets, and other FHIR resources.
</context>
<technical-specification>
### 1. FSH Language Keywords to Implement

You find language specification: docs/LANGUAGE_SPEC.md

### 2. Syntactic Elements to Recognize

You find language specification: docs/LANGUAGE_SPEC.md

### 2. PrismJS Plugin Structure

```javascript
Prism.languages.fsh = {
    // Comments
    'comment': [
        {
            pattern: /\/\/.*/,
            greedy: true
        },
        {
            pattern: /\/\*[\s\S]*?\*\//,
            greedy: true
        }
    ],
    
    // Aliases (must be before URLs)
    'alias': {
        pattern: /^Alias:\s+\$[\w\-]+\s*=\s*.+$/m,
        inside: {
            'keyword': /^Alias:/,
            'variable': /\$[\w\-]+/,
            'operator': /=/,
            'url': /https?:\/\/[^\s]+/
        }
    },
    
    // Definition keywords (high priority)
    'definition-keyword': {
        pattern: /^(Profile|Extension|Instance|ValueSet|CodeSystem|RuleSet|Invariant|Mapping|Logical|Resource):/m,
        alias: 'keyword important'
    },
    
    // Metadata keywords
    'metadata': {
        pattern: /^(Id|Parent|Title|Description|Usage|Source|Target|Severity|XPath|Expression|Context):/m,
        alias: 'keyword'
    },
    
    // Cardinalities
    'cardinality': /\b\d+\.\.([\d]+|\*)\b/,
    
    // Flags and modifiers
    'modifier': /\b(MS|SU|D|TU|N)\b|\?\!/,
    
    // Action keywords
    'keyword': /\b(contains|only|obeys|and|or|includes|excludes|from|named|insert|contentReference|codes|system|valueset)\b/,
    
    // Code systems and codes
    'code': {
        pattern: /(#[a-zA-Z0-9\-_]+|[A-Z]+#[a-zA-Z0-9\-_]+|\$[\w\-]+)/,
        alias: 'symbol'
    },
    
    // Strings (with display text)
    'string': {
        pattern: /"(?:[^"\\]|\\.)*"/,
        greedy: true
    },
    
    // URLs
    'url': {
        pattern: /https?:\/\/[^\s)]+/,
        alias: 'link'
    },
    
    // FSH paths
    'path': {
        pattern: /^\*\s+[a-zA-Z][a-zA-Z0-9.\[\]:^]+/m,
        inside: {
            'operator': /^\*/,
            'property': /[a-zA-Z][a-zA-Z0-9]*/,
            'punctuation': /[\[\].:^]/
        }
    },
    
    // Binding strength
    'binding-strength': {
        pattern: /\((required|extensible|preferred|example)\)/,
        inside: {
            'punctuation': /[()]/,
            'keyword': /required|extensible|preferred|example/
        }
    },
    
    // Booleans
    'boolean': /\b(true|false)\b/,
    
    // Numbers
    'number': /\b\d+(\.\d+)?\b/,
    
    // Date/DateTime
    'date': {
        pattern: /"[\d]{4}-[\d]{2}-[\d]{2}(T[\d]{2}:[\d]{2}:[\d]{2}(Z|[+\-][\d]{2}:[\d]{2}))?"/,
        alias: 'string'
    },
    
    // Operators
    'operator': /[=:]/,
    
    // Punctuation
    'punctuation': /[(){}[\],]/
};

// Aliases for better compatibility
Prism.languages.fhirshorthand = Prism.languages.fsh;
Prism.languages['fhir-shorthand'] = Prism.languages.fsh;
```

### 4. Suggested CSS Classes for Theming

```css
/* FSH Theme for PrismJS */
.token.definition-keyword { 
    color: #d73a49; 
    font-weight: bold; 
}

.token.metadata { 
    color: #6f42c1; 
    font-weight: bold; 
}

.token.modifier { 
    color: #e36209; 
    font-weight: bold; 
}

.token.cardinality { 
    color: #22863a; 
}

.token.path .property { 
    color: #032f62; 
}

.token.code { 
    color: #6f42c1; 
    background: #f6f8fa; 
    padding: 0.1em 0.3em; 
    border-radius: 3px; 
}

.token.binding-strength .keyword {
    color: #d73a49;
    font-style: italic;
}

.token.alias .variable {
    color: #005cc5;
    font-weight: bold;
}
```
</technical-specification>
<instruction>
### Phase 1: Analysis and Preparation
1. Examine the existing `claude.md` file
2. Adapt it to include FSH-specific documentation
3. Analyze FSH examples provided in `/examples/`
4. Identify additional syntactic patterns not documented
5. Review official FSH specification for edge cases

### Phase 2: Plugin Development
1. Use `src/prism-lang-fsh.js` with complete structure
2. Implement recognition for all syntactic elements
3. Handle special cases and token nesting
4. Optimize regex patterns for performance
5. Ensure proper token precedence and greedy matching

### Phase 3: Testing and Validation
1. Create `test/visual.html` with comprehensive demo page
2. Include all identified use cases
3. Test with provided examples
4. Verify correct highlighting of each element
5. Test edge cases and complex nesting scenarios
6. Validate performance with large FSH files

### Phase 4: Documentation
1. Create detailed README.md
2. Document installation and usage
3. Provide CSS customization examples
4. List available tokens and their usage
5. Include troubleshooting section
</instruction>
<recommandation>

## Expected Deliverables

1. **Functional Plugin**: Complete and optimized `prism-lang-fsh.js`
2. **Comprehensive Tests**: HTML demo page with all use cases
3. **Documentation**: Detailed README.md with examples
4. **CSS Theme**: Theme file tailored for FSH
5. **Package Configuration**: package.json with proper metadata
6. **Integration Guide**: Instructions for webpack/rollup integration
7. **Migration Guide**: For users coming from other highlighters

## Development Notes

- Prioritize code readability and maintainability
- Comment complex regex patterns thoroughly
- Design for extensibility for future FSH versions
- Test compatibility with existing PrismJS themes
- Validate against real-world FSH projects
- Consider integration with FSH tooling (SUSHI, GoFSH)
- Implement proper error boundaries for malformed FSH
- Support both minified and development versions

## Testing Checklist

- [ ] All keywords properly highlighted
- [ ] Cardinalities recognized correctly
- [ ] Paths with brackets and slices work
- [ ] Code systems and codes display properly
- [ ] Strings with escape sequences handled
- [ ] Comments don't break other tokens
- [ ] Aliases resolved correctly
- [ ] RuleSet insertions highlighted
- [ ] Binding strengths displayed
- [ ] URLs clickable where appropriate
- [ ] Performance acceptable for large files
- [ ] Works with different PrismJS themes
- [ ] No conflicts with other language plugins
- [ ] Minified version works correctly
- [ ] Documentation examples all work
</recommandation>
<exemple>
</exemple>
<output>
The plugin will be considered complete when it:
1. Correctly highlights all FSH language constructs
2. Performs well on files up to 10,000 lines
3. Integrates seamlessly with existing PrismJS installations
4. Provides clear visual distinction between token types
5. Includes comprehensive documentation and examples
6. Passes all test cases without errors
7. Works across modern browsers (Chrome, Firefox, Safari, Edge)
</output>
