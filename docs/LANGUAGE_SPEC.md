# Language Specification

## Overview
This document defines the specification for the FHIR Shorthand (FSH) language supported by the Prism.js plugin.

FHIR Shorthand is a domain-specific language designed for creating and maintaining FHIR (Fast Healthcare Interoperability Resources) implementation guides. FSH enables concise definition of profiles, extensions, value sets, code systems, and other FHIR conformance resources.

> **Version**: FSH v3.0.0
> **FHIR Version**: R4 (4.0.1) and R5 (5.0.0)
> **Plugin Version**: 0.1.0

## Language Features

### Comments
The language supports two types of comments:

1. **Single-line comments**: Begin with `//` and continue to the end of the line
   ```fsh
   // This is a single-line comment
   * status = #active  // Comment at end of line
   ```

2. **Multi-line comments**: Enclosed between `/*` and `*/`
   ```fsh
   /* This is a
      multi-line comment */
   ```

### String Literals
FSH supports string literals in the following contexts:

- **Double-quoted strings**: `"text"`
  - Used for display names, descriptions, and text values
  - Example: `* code = SCT#123456 "Hypertension"`

- **Multi-line strings**: Triple-quoted strings `"""text"""`
  - Used for long descriptions
  - Example:
    ```fsh
    Description: """
    This is a multi-line
    description text
    """
    ```

- **Escape sequences**: Standard escape sequences are supported (`\"`, `\\`, `\n`, `\t`)

### Numeric Literals
- **Integers**: `42`, `0`, `-15`
- **Decimals**: `3.14`, `0.5`, `-2.7`
- **Scientific notation**: Not commonly used in FSH

### Keywords

#### Definition Keywords
Reserved words that define FHIR artifacts:
- `Profile:` - Defines a profile
- `Extension:` - Defines an extension
- `Instance:` - Defines an instance
- `ValueSet:` - Defines a value set
- `CodeSystem:` - Defines a code system
- `RuleSet:` - Defines a reusable set of rules
- `Invariant:` - Defines an invariant
- `Mapping:` - Defines a mapping
- `Logical:` - Defines a logical model
- `Resource:` - Defines a resource

#### Metadata Keywords
Keywords for artifact metadata:
- `Id:` - Artifact identifier
- `Parent:` - Parent resource/profile
- `Title:` - Human-readable title
- `Description:` - Detailed description
- `Usage:` - Usage context (#example, #definition)
- `Source:` - Source reference
- `Target:` - Target reference
- `Severity:` - Severity level (#error, #warning)
- `XPath:` - XPath expression
- `Expression:` - FHIRPath expression
- `Context:` - Context for extensions
- `Alias:` - Define aliases

#### Action Keywords
Keywords for rules and constraints:
- `contains` - Slice definition
- `only` - Type constraint
- `obeys` - Invariant application
- `and` - Logical AND
- `or` - Logical OR
- `includes` - Include codes
- `excludes` - Exclude codes
- `from` - Binding source
- `named` - Named slice
- `insert` - Insert RuleSet
- `codes` - Code inclusion
- `where` - Filter condition
- `valueset` - ValueSet reference
- `system` - System reference

### Operators

#### Assignment Operator
- Assignment: `=`
  ```fsh
  * status = #active
  * value[x] = 42
  ```

#### Path Operators
- Dot notation: `.`
  ```fsh
  * patient.name.family
  ```
- Array/slice notation: `[...]`
  ```fsh
  * extension[timing]
  * value[x]
  ```

#### Cardinality Operators
- Range: `..`
  ```fsh
  * identifier 1..1
  * name 0..*
  ```

### Special Symbols

#### Flags and Modifiers
- `MS` - Must Support flag
- `SU` - Summary flag
- `?!` - Modifier extension flag
- `D` - Draft status
- `TU` - Trial Use
- `N` - Normative
- `^` - Metadata/slice indicator

#### Code Reference Symbols
- `#` - Code literal prefix
  ```fsh
  * status = #active
  * code = SCT#123456
  ```
- `$` - Alias prefix
  ```fsh
  Alias: $sct = http://snomed.info/sct
  * code from $sct
  ```

#### Rule Indicator
- `*` - Rule prefix
  ```fsh
  * identifier 1..1 MS
  * status = #final
  ```

## Token Precedence

When multiple patterns could match the same text, the following precedence order is applied:

1. Comments (single-line and multi-line)
2. Alias definitions
3. Definition keywords (Profile:, Extension:, etc.)
4. Metadata keywords (Id:, Parent:, etc.)
5. String literals (including multi-line)
6. Code references (#code, SYSTEM#code)
7. Cardinalities (0..1, 1..*, etc.)
8. Flags and modifiers (MS, SU, ?!, etc.)
9. Action keywords (contains, only, from, etc.)
10. Binding strengths (required, extensible, preferred, example)
11. URLs
12. Paths (with dots and brackets)
13. Numbers
14. Operators
15. Identifiers

## Special Constructs

### Aliases
Aliases provide shorthand references for URIs:
```fsh
Alias: $sct = http://snomed.info/sct
Alias: $loinc = http://loinc.org
```

### RuleSets
Reusable sets of rules:
```fsh
RuleSet: CommonRules
* status MS
* identifier 1..*

// Usage:
* insert CommonRules
```

### Slicing
Define slices within elements:
```fsh
* extension contains
    timing 0..1 MS and
    reason 0..*
```

### Binding Syntax
Terminology bindings with strength:
```fsh
* code from MyValueSet (required)
* category from http://example.org/ValueSet/categories (extensible)
```

### Code System References
```fsh
* code = SCT#123456 "Display Text"
* code = http://loinc.org#1234-5
* code = $loinc#1234-5
```

### Inline Instances
```fsh
* contained[0] = ExamplePatient
Instance: ExamplePatient
InstanceOf: Patient
Usage: #inline
```

## Edge Cases

### Nested Comments
Multi-line comments cannot be nested:
```fsh
/* Valid comment /* This part is text, not a nested comment */ still in comment */
```

### String Escapes
Escape sequences in strings:
```fsh
* text = "Line 1\nLine 2"
* quote = "She said \"Hello\""
```

### Reserved Words as Properties
FSH keywords can appear as part of paths:
```fsh
* component.code  // 'code' here is a property, not a keyword
```

### Special Characters in Identifiers
```fsh
* extension[us-core-race]
* value[x]
```

### URLs in Values
```fsh
* system = "http://example.org/system"
* reference = Reference(Patient/123)
```

## Performance Considerations

1. **Regex Optimization**: All patterns are optimized to avoid catastrophic backtracking
   - Path patterns use possessive quantifiers where possible
   - Cardinality patterns are anchored to word boundaries

2. **Greedy Matching**: String and comment patterns use greedy matching for efficiency
   - Multi-line strings are matched with `[\s\S]*?` for minimal backtracking

3. **Token Order**: More specific patterns precede general ones
   - `SCT#123456` matched before `#123456`
   - Definition keywords checked before general identifiers

4. **Lazy Quantifiers**: Used in multi-line constructs to improve performance

5. **Anchoring**: Line-start anchors (`^`) used for definition keywords to reduce false matches

## Compatibility

### FSH Versions
- FSH 1.x: Basic support
- FSH 2.x: Full support including RuleSets
- FSH 3.x: Complete support with all features

### FHIR Versions
- FHIR R4 (4.0.1): Full support
- FHIR R4B (4.3.0): Full support
- FHIR R5 (5.0.0): Full support

### PrismJS Versions
- PrismJS 1.x: Compatible with 1.15+
- PrismJS 2.x: Planned support

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Examples

### Complete Example

```fsh
// ===============================================
// Enhanced Patient Profile with Extensions
// ===============================================

Alias: $sct = http://snomed.info/sct
Alias: $loinc = http://loinc.org

Profile: EnhancedPatient
Parent: Patient
Id: enhanced-patient
Title: "Enhanced Patient Profile"
Description: """
This profile defines additional constraints and
extensions for patient resources in our system.
"""

// Metadata
* ^status = #active
* ^version = "1.0.0"
* ^date = "2024-01-15"

// Must have at least one identifier
* identifier 1..* MS
* identifier.system 1..1
* identifier.value 1..1
* identifier.type from http://hl7.org/fhir/ValueSet/identifier-type (required)

// Name constraints
* name 1..* MS
* name.family 1..1
* name.given 1..*

// Birth date is required
* birthDate 1..1 MS

// Gender from a specific value set
* gender from http://hl7.org/fhir/ValueSet/administrative-gender (required)

// Extension for birth place
* extension contains BirthPlace named birthPlace 0..1 MS
* extension[birthPlace].valueAddress.city 1..1
* extension[birthPlace].valueAddress.country 1..1

// Slicing example for addresses
* address ^slicing.discriminator.type = #pattern
* address ^slicing.discriminator.path = "use"
* address ^slicing.rules = #open
* address contains
    home 0..1 MS and
    work 0..*
* address[home].use = #home
* address[home].line 1..*
* address[work].use = #work

// Invariant example
* obeys patient-name-check

Invariant: patient-name-check
Description: "Patient must have either a given or family name"
Expression: "name.given.exists() or name.family.exists()"
Severity: #error

// Extension Definition
Extension: BirthPlace
Id: birthplace-extension
Title: "Birth Place"
Description: "The location where the patient was born"
Context: Patient

* value[x] only Address
* valueAddress.city 1..1 MS
* valueAddress.country from http://hl7.org/fhir/ValueSet/iso3166-1-2 (required)

// ValueSet Definition
ValueSet: PatientIdTypes
Id: patient-id-types
Title: "Patient Identifier Types"
Description: "Types of identifiers used for patients"

* include codes from system http://terminology.hl7.org/CodeSystem/v2-0203
* include $sct#123456 "Custom ID Type"
* exclude http://terminology.hl7.org/CodeSystem/v2-0203#TEMP

// Instance Example
Instance: ExamplePatient
InstanceOf: EnhancedPatient
Usage: #example
Title: "Example Patient"
Description: "An example of the enhanced patient profile"

* identifier[0].system = "http://example.org/mrn"
* identifier[0].value = "123456"
* identifier[0].type = http://terminology.hl7.org/CodeSystem/v2-0203#MR

* name[0].use = #official
* name[0].family = "Smith"
* name[0].given[0] = "John"
* name[0].given[1] = "David"

* birthDate = "1980-05-15"
* gender = #male

* address[home].use = #home
* address[home].line[0] = "123 Main Street"
* address[home].city = "Boston"
* address[home].state = "MA"
* address[home].postalCode = "02101"
* address[home].country = "USA"

* extension[birthPlace].valueAddress.city = "New York"
* extension[birthPlace].valueAddress.country = "USA"

// RuleSet Example
RuleSet: StandardCoding
* coding 1..* MS
* coding.system 1..1
* coding.code 1..1
* text MS

CodeSystem: CustomCodes
Id: custom-codes
Title: "Custom Code System"
Description: "Organization-specific codes"

* #001 "Custom Code 1" "Description of custom code 1"
* #002 "Custom Code 2" "Description of custom code 2"
  * #002a "Subcode 2a" "Description of subcode 2a"
  * #002b "Subcode 2b" "Description of subcode 2b"
```

## Future Extensions

### Planned Features
1. **Import statements**: Support for importing external FSH files
2. **Parameterized RuleSets**: RuleSets with parameters
3. **Conditional rules**: If-then-else constructs
4. **Macro support**: Preprocessor-like macros
5. **Inline validation**: FHIRPath validation expressions

### Syntax Evolution
- Support for FHIR R6 when released
- Enhanced slicing syntax
- Improved code system hierarchies
- Extended metadata annotations

### Tool Integration
- Enhanced IDE support markers
- Debugging symbols
- Source maps for generated FHIR resources

## References

1. [FHIR Shorthand Specification](https://build.fhir.org/ig/HL7/fhir-shorthand/)
2. [FSH School - Official Tutorial](https://fshschool.org/)
3. [SUSHI - FSH Compiler](https://github.com/FHIR/sushi)
4. [GoFSH - FHIR to FSH Converter](https://github.com/FHIR/GoFSH)
5. [HL7 FHIR Specification](https://www.hl7.org/fhir/)
6. [PrismJS Documentation](https://prismjs.com/docs/)
7. [FSH Language Grammar](https://github.com/FHIR/sushi/blob/master/antlr/src/main/antlr4/FSH.g4)