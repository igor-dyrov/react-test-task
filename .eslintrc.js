module.exports = {
	"env": {
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		ecmaFeatures: {
			jsx: true
		}

	},
	"globals": {
		"fetch": false,
		"document": false,
		"window": false,
		"navigator": false,
		"WebSocket": false,
	},
	"plugins": [
		"react"
	],
	"extends": [
		"airbnb",
	],
	"parser": "babel-eslint",
	"rules": {
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"object-shorthand": 0,
		"max-len": 0,
		"no-unused-vars": 0,
		"guard-for-in": 0,
		"new-cap": 0,
		"no-invalid-this": "off",
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": false,
				"MethodDefinition": false,
				"ClassDeclaration": false,
				"ArrowFunctionExpression": false,
				"FunctionExpression": false
			}
		}],
		"react/jsx-tag-spacing": [
			"off"
		],
		"react/jsx-indent": [
			"off"
		],
		"react/prefer-stateless-function": [
			"warn"
		],
		"jsx-a11y/alt-text":[
			"off"
		],
		"react/jsx-one-expression-per-line": [
			"warn"
		],
		"react/forbid-prop-types": [
			"off"
		],
		"jsx-a11y/click-events-have-key-events": [
			"off"
		],
		"jsx-a11y/no-static-element-interactions": [
			"off"
		],
		"react/jsx-indent-props": [
			2, 'tab'
		],
		"arrow-body-style": [
			"off"
		],
		"global-require" : [
			"off"
		],
		"no-prototype-builtins": [
			"off"
		],
		"react/no-unused-state": [
			"warn"
		],
		"indent": [
			"warn",
			"tab"
		],
		"no-case-declarations": [
			"off"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"jsx-quotes": [
			"error",
			"prefer-single"
		],
		"semi": [
			"error",
		],
		"strict": [
			"off"
		],
		"no-param-reassign": [
			"off"
		],
		"import/extensions": [
			"off"
		],
		"arrow-parens": [
			"off"
		],
		"no-plusplus": [
			"off"
		],
		"prefer-destructuring": [
			"off"
		],
		"no-underscore-dangle": [
			"off"
		],
		"no-tabs": [
			"off"
		],
		"class-methods-use-this": [
			"off"
		],
		"no-return-assign": [
			"off"
		],
		"lines-between-class-members": [
			"off"
		],
		"import/no-useless-path-segments": [
			"off"
		],
		"no-useless-escape": [
			"off"
		],
		"no-cond-assign": [
			"off"
		],
		"spaced-comment": [
			"warn"
		],
		"no-trailing-spaces": [
			"off"
		],
		"no-mixed-spaces-and-tabs": [
			"off"
		],
		"no-undef": [
			"off"
		],
		"comma-dangle": [
			"off"
		],
	}
};
