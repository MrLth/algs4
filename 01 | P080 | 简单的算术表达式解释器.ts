/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-28 11:18:24
 * @LastEditTime: 2021-08-28 13:36:44
 * @Description: 「简化了分词步骤，省略了优先级步骤」的简单算术表达式解释器
 */
const opts: string[] = []
const values: number[] = []
let value = ''

function handleClosingParenthesis() {
  const opt = opts.pop()
  const r = values.pop()
  const l = values.pop()

  if (r === undefined || l === undefined) {
    throw new Error("execute error")
  }

  switch (opt) {
    case '+': return r + l;
    case '-': return l - r;
    case '*': return r * l;
    case '/': return l / r;
  }
  throw new Error("unknown operator")
}

function handleOperator(char: string): Handler {
  switch (char) {
    case '(':
    case ' ': break;
    case '+':
    case '-':
    case '*':
    case '/': opts.push(char); break;
    case ')':
      value = ''
      values.push(handleClosingParenthesis()); break;
    default: return handleValue(char)
  }
  return handleOperator
}

function handleValue(char: string): Handler {
  if ('0.123456789'.includes(char)) {
    value += char
    return handleValue
  } else {
    values.push(parseFloat(value))
    value = ""
    return handleOperator(char)
  }
}

interface Handler {
  (char: string): Handler
}

function evaluate(string: string) {
  let func = handleOperator
  for (const char of string) {
    func = func(char)
  }
  console.log(opts, values)
}

evaluate("(1+((2+3)*(4*5.2)))")