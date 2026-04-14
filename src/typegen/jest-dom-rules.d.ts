/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface JestDomRuleOptions {
  /*
   * prefer toBeChecked over checking attributes
   * @see prefer-checked
   */
  'jest-dom/prefer-checked'?: Linter.RuleEntry<[]>;
  /*
   * Prefer toBeEmpty over checking innerHTML
   * @see prefer-empty
   */
  'jest-dom/prefer-empty'?: Linter.RuleEntry<[]>;
  /*
   * prefer toBeDisabled or toBeEnabled over checking attributes
   * @see prefer-enabled-disabled
   */
  'jest-dom/prefer-enabled-disabled'?: Linter.RuleEntry<[]>;
  /*
   * prefer toHaveFocus over checking document.activeElement
   * @see prefer-focus
   */
  'jest-dom/prefer-focus'?: Linter.RuleEntry<[]>;
  /*
   * Prefer .toBeInTheDocument() for asserting the existence of a DOM node
   * @see prefer-in-document
   */
  'jest-dom/prefer-in-document'?: Linter.RuleEntry<[]>;
  /*
   * prefer toBeRequired over checking properties
   * @see prefer-required
   */
  'jest-dom/prefer-required'?: Linter.RuleEntry<[]>;
  /*
   * prefer toHaveAttribute over checking  getAttribute/hasAttribute 
   * @see prefer-to-have-attribute
   */
  'jest-dom/prefer-to-have-attribute'?: Linter.RuleEntry<[]>;
  /*
   * prefer toHaveClass over checking element className
   * @see prefer-to-have-class
   */
  'jest-dom/prefer-to-have-class'?: Linter.RuleEntry<[]>;
  /*
   * prefer toHaveStyle over checking element style
   * @see prefer-to-have-style
   */
  'jest-dom/prefer-to-have-style'?: Linter.RuleEntry<[]>;
  /*
   * Prefer toHaveTextContent over checking element.textContent
   * @see prefer-to-have-text-content
   */
  'jest-dom/prefer-to-have-text-content'?: Linter.RuleEntry<[]>;
  /*
   * prefer toHaveValue over checking element.value
   * @see prefer-to-have-value
   */
  'jest-dom/prefer-to-have-value'?: Linter.RuleEntry<[]>;
}


