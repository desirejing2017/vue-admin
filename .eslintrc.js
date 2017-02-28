// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    // 'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-cond-assign": [2, "always"], //if, while等条件中不允许使用“=”
    "no-constant-condition": 2,
    "no-debugger": 2,   // 程序中不能出现debugger
    "no-dupe-args": 2,  // 函数的参数名称不能重复
    "no-dupe-keys": 2,   // 对象的属性名称不能重复
    "no-duplicate-case": 2,  // switch的case不能重复
    "no-func-assign": 2,
    "no-obj-calls": 2,
    "no-regex-spaces": 2,
    "no-sparse-arrays": 2,
    "no-unexpected-multiline": 2,
    "no-unreachable": 2,
    "use-isnan": 2,
    "valid-typeof": 2,
    "eqeqeq": [2, "always"],
    "no-caller": 2,
    "no-eval": 2,
    "no-redeclare": 2,
    "no-undef": 2,
    "no-unused-vars": 1,
    "no-use-before-define": 2,
    "comma-dangle": [1, "never"],
    "no-const-assign": 2,
    "no-dupe-class-members": 2
  }
}
