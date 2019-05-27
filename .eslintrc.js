const path = require("path");
const importPath = require("./jsconfig.json").compilerOptions.baseUrl;

const production = (process.env.NODE_ENV || "").includes("production") ? 2 : 0;
const production_warn = production ? 1 : 0;
const production_error_else_warn = production ? 2 : 1;

const style = "warn";
const es6 = false;

module.exports = {
	env: {
		browser: true,
		es6: true,
		commonjs: true,
		node: true,
		jest: true,
	},
	extends: [
		"eslint:recommended",
		//"plugin:react/recommended",
	],
	//parser: "babel-eslint",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 9,
		ecmaFeatures: {
			impliedStrict: true,
			//jsx: true,
		},
	},
	plugins: [
		"import",
		/*"react",
		"react-hooks",*/
	],
	rules: {
		"accessor-pairs": "warn",
		"array-bracket-newline": [style, "consistent"],
		"array-bracket-spacing": "off",
		"array-callback-return": ["warn", { allowImplicit: true }],
		"array-element-newline": "off",
		"arrow-body-style": "off",
		"arrow-parens": "off",
		"arrow-spacing": style,
		"block-scoped-var": "error",
		"block-spacing": style,
		"brace-style": [style, "1tbs"],
		"callback-return": [
			"warn",
			[
				"cb",
				"cb2",
				"error_cb",
				"cb_error",
				"success_cb",
				"cb_success",
				"callback",
				"error_callback",
				"callback_error",
				"success_callback",
				"success_error",
				"done",
			],
		],
		"camelcase": "off",
		"capitalized-comments": "off",
		"class-methods-use-this": "off",
		"comma-dangle": [
			style,
			{
				arrays: "always-multiline",
				objects: "always-multiline",
				imports: "always-multiline",
				exports: "always-multiline",
				functions: es6 ? "always-multiline" : "ignore",
			}
		],
		"comma-spacing": style,
		"comma-style": style,
		"complexity": "off",
		"computed-property-spacing": [style, "never"],
		"consistent-return": "off",
		"consistent-this": "off",
		"constructor-super": "warn",
		"curly": [style, "multi-line"],
		"default-case": "warn",
		"dot-location": [style, "property"],
		"dot-notation": "off", // is "suggestion" -> annoying
		"eol-last": [style, "never"],
		"eqeqeq": "off", // is "suggestion" -> not func eq
		"for-direction": "off",
		"func-call-spacing": style,
		"func-name-matching": "off",
		"func-names": "off",
		"func-style": "off",
		"function-paren-newline": [style, "consistent"],
		"generator-star-spacing": style,
		"getter-return": "error",
		"global-require": "warn",
		"guard-for-in": "off",
		"handle-callback-err": "warn",
		"id-blacklist": "off",
		"id-length": "off",
		"id-match": "off",
		"implicit-arrow-linebreak": [style, "beside"],
		"indent": [style, "tab"],
		"init-declarations": "off",
		"jsx-quotes": [style, "prefer-single"],
		"key-spacing": style,
		"keyword-spacing": style,
		"line-comment-position": "off",
		"linebreak-style": "off",
		"lines-around-comment": "off",
		"lines-between-class-members": [style, "always", { exceptAfterSingleLine: true }],
		"max-classes-per-file": "off",
		"max-depth": "off",
		"max-len": "off",
		"max-lines": "off",
		"max-lines-per-function": "off",
		"max-nested-callbacks": "error",
		"max-params": "off",
		"max-statements": "off",
		"max-statements-per-line": "off",
		"multiline-comment-style": "off",
		"multiline-ternary": "off",
		"new-cap": [
			"warn",
			{
				"newIsCap": true,
				"capIsNew": true,
				"properties": true,
			},
		],
		"new-parens": "warn",
		"newline-per-chained-call": [style, { ignoreChainWithDepth: 3 }],
		"no-alert": production_warn,
		"no-array-constructor": "off",
		"no-async-promise-executor": "error",
		"no-await-in-loop": "off",
		"no-bitwise": "off",
		"no-buffer-constructor": "off",
		"no-caller": "error",
		"no-case-declarations": "warn",
		"no-class-assign": "error",
		"no-compare-neg-zero": "error",
		"no-cond-assign": ["warn", "except-parens"],
		"no-confusing-arrow": "off",
		"no-continue": "off",
		"no-console": production_warn,
		"no-const-assign": "error",
		"no-constant-condition": "off",
		"no-control-regex": "warn",
		"no-delete-var": "off",
		"no-debugger": production,
		"no-div-regex": "off",
		"no-dupe-args": "error",
		"no-dupe-class-members": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "off", // disabled in favor of import/no-duplicates
		"no-else-return": "warn",
		"no-empty": production,
		"no-empty-character-class": "warn",
		"no-empty-function": "off",
		"no-empty-pattern": "warn",
		"no-eq-null": "off",
		"no-eval": production_error_else_warn,
		"no-ex-assign": "warn",
		"no-extend-native": production_error_else_warn,
		"no-extra-boolean-cast": "warn",
		"no-extra-bind": "warn", // is "suggestion" -> not func eq
		"no-extra-label": "warn", // is "suggestion" -> annoying
		"no-extra-parens": [
			"warn",
			"all",
			{
				"conditionalAssign": false,
				"returnAssign": false,
				"nestedBinaryExpressions": false,
				"ignoreJSX": "multi-line",
				"enforceForArrowConditionals": false
			}
		],
		"no-extra-semi": "warn",
		"no-fallthrough": "warn",
		"no-floating-decimal": style,
		"no-func-assign": "error",
		"no-global-assign": "error",
		"no-implicit-coercion": "warn",
		"no-implicit-globals": "error",
		"no-implied-eval": production_error_else_warn,
		"no-inline-comments": "off",
		"no-inner-declarations": "off",
		"no-invalid-regexp": "error",
		"no-invalid-this": "off",
		"no-irregular-whitespace": "warn",
		"no-iterator": "error",
		"no-labels": "off",
		"no-label-var": "error",
		"no-lone-blocks": "warn",
		"no-lonely-if": "warn",
		"no-loop-func": "warn",
		"no-magic-numbers": "off",
		"no-misleading-character-class": "warn",
		"no-mixed-operators": "off",
		"no-mixed-requires": "warn",
		"no-mixed-spaces-and-tabs": "off",
		"no-multi-assign": "off",
		"no-multi-spaces": style,
		"no-multi-str": "off",
		"no-multiple-empty-lines": [style, { max: 2 }],
		"no-negated-condition": "off",
		"no-nested-ternary": "off",
		"no-new": "off",
		"no-new-func": production_error_else_warn,
		"no-new-object": "warn",
		"no-new-require": "error",
		"no-new-symbol": "error",
		"no-new-wrappers": "off",
		"no-obj-calls": "error",
		"no-octal": "warn",
		"no-octal-escape": "error",
		"no-param-reassign": "warn",
		"no-path-concat": production_error_else_warn,
		"no-plusplus": "off",
		"no-process-env": "off",
		"no-process-exit": "off",
		"no-proto": "off",
		"no-prototype-builtins": "off",
		"no-redeclare": "error",
		"no-regex-spaces": "warn",
		"no-restricted-globals": "error",
		"no-restricted-imports": "error",
		"no-restricted-modules": "error",
		"no-restricted-properties": "error",
		"no-restricted-syntax": "error",
		"no-return-assign": "warn",
		"no-return-await": "warn",
		"no-script-url": "warn",
		"no-self-assign": "warn",
		"no-self-compare": "warn",
		"no-sequences": "error",
		"no-shadow": "warn",
		"no-shadow-restricted-names": "error",
		"no-sparse-arrays": "warn",
		"no-sync": "off",
		"no-tabs": "off",
		"no-template-curly-in-string": "warn",
		"no-ternary": "off",
		"no-this-before-super": "warn",
		"no-throw-literal": "off",
		"no-trailing-spaces": style,
		"no-undef-init": "warn",
		"no-undef": "error",
		"no-undefined": "off",
		"no-underscore-dangle": "off",
		"no-unmodified-loop-condition": "warn",
		"no-unneeded-ternary": "warn",
		"no-unreachable": "warn",
		"no-unsafe-finally": "warn",
		"no-unsafe-negation": "warn",
		"no-unused-expressions": "off",
		"no-unused-labels": "warn", // is "suggestion" -> annoying
		"no-unexpected-multiline": "error",
		"no-unused-vars": [
			"warn",
			{
				"ignoreRestSiblings": true,
			},
		],
		"no-use-before-define": [
			"error",
			{
				"functions": false,
			},
		],
		"no-useless-catch": "warn",
		"no-useless-computed-key": "warn",
		"no-useless-constructor": "off",
		"no-useless-call": "warn",
		"no-useless-rename": "warn",
		"no-useless-concat": "off",
		"no-useless-escape": "warn",
		"no-useless-return": "warn",
		"no-var": "off", // is "suggestion" -> dangerous
		"no-void": "error",
		"no-warning-comments": "off",
		"no-whitespace-before-property": style,
		"no-with": "warn",
		"nonblock-statement-body-position": style,
		"object-curly-newline": [
			style,
			{
				multiline: true,
				consistent: true,
				minProperties: 4,
			}
		],
		"object-curly-spacing": [
			style,
			"always"
		],
		"object-property-newline": [style, {allowAllPropertiesOnSameLine: true}],
		"object-shorthand": style,
		"one-var": "off",
		"one-var-declaration-per-line": "off",
		"operator-assignment": "off",
		"operator-linebreak": "off",
		"padded-blocks": "off",
		"padding-line-between-statements": "error",
		"prefer-arrow-callback": "off",
		"prefer-const": "off", // is "suggestion" -> annoying
		"prefer-destructuring": "off",
		"prefer-named-capture-group": "off",
		"prefer-numeric-literals": "off",
		"prefer-object-spread": "off",
		"prefer-promise-reject-errors": "off",
		"prefer-rest-params": "off",
		"prefer-spread": "off",
		"prefer-template": "off",
		"quote-props": [style, "consistent-as-needed"],
		"quotes": ["warn", "single", { "avoidEscape": true }],
		"radix": "off",
		"require-atomic-updates": "warn",
		"require-await": "warn",
		"require-unicode-regexp": "off",
		"require-yield": "warn",
		"rest-spread-spacing": style,
		"semi": [style, "always"],
		"semi-spacing": style,
		"semi-style": style,
		"sort-imports": "off",
		"sort-keys": "off",
		"sort-vars": "off",
		"space-before-blocks": style,
		"space-before-function-paren": [
			style,
			{
				anonymous: "never",
				named: "never",
				asyncArrow: "always",
			}
		],
		"space-in-parens": style,
		"space-infix-ops": style,
		"space-unary-ops": [
			style,
			{
				words: true,
				nonwords: false,
			}
		],
		"spaced-comment": "off",
		"strict": "off",
		"switch-colon-spacing": style,
		"symbol-description": "warn",
		"template-curly-spacing": [style, "always"],
		"template-tag-spacing": style,
		"unicode-bom": ["error", "never"],
		"use-isnan": "error",
		"valid-typeof": "error",
		"vars-on-top": "off",
		"wrap-iife": [style, "inside", { "functionPrototypeMethods": true }],
		"wrap-regex": "off",
		"yield-star-spacing": [style, "before"],
		"yoda": ["warn", "never", { exceptRange: true }],
		"import/no-unresolved": "error",
		"import/named": "error",
		"import/default": "error",
		"import/namespace": "error",
		"import/no-restricted-paths": "off",
		"import/no-absolute-path": "off",
		"import/no-dynamic-require": "error",
		"import/no-internal-modules": "off",
		"import/no-webpack-loader-syntax": "off",
		"import/no-self-import": "error",
		"import/no-cycle": "error",
		"import/no-useless-path-segments": "warn",
		"import/no-relative-parent-imports": "off",
		"import/no-unused-modules": "off",
		"import/export": "error",
		"import/no-named-as-default": "warn",
		"import/no-named-as-default-member": "warn",
		"import/no-deprecated": "off",
		"import/no-extraneous-dependencies": "warn",
		"import/no-mutable-exports": "off",
		"import/no-relative-parent-imports": "off",
		"import/unambiguous": "off",
		"import/no-commonjs": "off",
		"import/no-amd": "off",
		"import/no-nodejs-modules": "off",
		"import/first": "off",
		"import/exports-last": "off",
		"import/no-duplicates": "warn", // to replace no-duplicate-imports
		"import/no-namespace": "off",
		"import/extensions": "off",
		"import/order": "off",
		"import/newline-after-import": style,
		"import/prefer-default-export": "off",
		"import/max-dependencies": "off",
		"import/no-unassigned-import": "off",
		"import/no-named-default": "off",
		"import/no-default-export": "off",
		"import/no-named-export": "off",
		"import/no-anonymous-default-export": "off",
		"import/group-exports": "off",
		"import/dynamic-import-chunkname": "off",
		/*"react/boolean-prop-naming": "off",
		"react/button-has-type": "warn",
		"react/default-props-match-prop-types": "off",
		"react/destructuring-assignment": "off",
		"react/display-name": "off",
		"react/forbid-component-props": "off",
		"react/forbid-dom-props": "off",
		"react/forbid-elements": "off",
		"react/forbid-prop-types": "off",
		"react/forbid-foreign-prop-types": "warn",
		"react/no-access-state-in-setstate": "error",
		"react/no-array-index-key": "off",
		"react/no-children-prop": "error",
		"react/no-danger": production_error_else_warn,
		"react/no-danger-with-children": production_error_else_warn,
		"react/no-deprecated": production_error_else_warn,
		"react/no-did-mount-set-state": "error",
		"react/no-did-update-set-state": "error",
		"react/no-direct-mutation-state": "error",
		"react/no-find-dom-node": production_error_else_warn,
		"react/no-is-mounted": "error",
		"react/no-multi-component": "off",
		"react/no-redundant-should-component-update": "error",
		"react/no-render-return-value": "warn",
		"react/no-set-state": "off",
		"react/no-typos": "warn",
		"react/no-string-refs": production_error_else_warn,
		"react/no-this-in-sfc": "error",
		"react/no-unescaped-entities": [
			"warn",
			{
				forbid: [
					"<", ">",
					'"', "'",
					"[", "]",
					"{", "}",
					",", ".", ";",
					"?", ":",
					"|", "&",
					"||", "&&",
				]
			}
		],
		"react/no-unknown-property": "warn",
		"react/no-unsafe": production_error_else_warn,
		"react/no-unused-state": "warn",
		"react/no-unused-prop-types": "warn",
		"react/no-will-update-set-state": "error",
		"react/prefer-es6-class": "error",
		"react/prefer-read-only-props": "off",
		"react/prefer-stateless-function": "warn",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "error",
		"react/require-default-props": "off",
		"react/require-optimization": "off",
		"react/require-render-return": "error",
		"react/self-closing-comp": "off",
		"react/sort-comp": "off",
		"react/sort-prop-types": "off",
		"react/state-in-constructor": "off",
		"react/style-prop-object": "error",
		"react/void-dom-elements-no-children": "warn",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",*/
	},
	settings: {
		"import/resolver": {
			node: {
				paths: [path.resolve(__dirname, importPath)],
			},
		},
	},
};

/* To get all rules, goto: https://eslint.org/docs/rules/
 * Then: [...document.querySelectorAll('table.rule-list td:nth-child(3) p a')].map(x => x.innerHTML)
 */