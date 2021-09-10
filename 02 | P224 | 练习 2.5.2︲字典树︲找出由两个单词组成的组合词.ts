/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-07 14:55:37
 * @LastEditTime: 2021-09-07 15:36:36
 * @Description: file content
 */
type CharDictTreeNode = {
  end: boolean
  [k: string]: CharDictTreeNode | boolean
}

class CharDictTree {
  root: CharDictTreeNode = {
    end: false
  }

  constructor(array: string[]) {
    for (const string of array) {
      this.addWord(string)
    }
  }

  addWord(string: string) {
    let node = this.root
    for (const char of string) {
      if (!(char in node)) {
        node[char] = { end: false }
      }
      node = node[char] as CharDictTreeNode
    }
    node.end = true
  }

  find(string: string) {
    let node = this.root
    for (const char of string) {
      if (!(char in node)) {
        return false
      }
      node = node[char] as CharDictTreeNode
    }
    return node.end
  }

  findDoubleWord(string: string) {
    let node = this.root
    for (let i = 0; i < string.length; i++) {
      if (node.end && this.find(string.substring(i))) {
        return true
      }

      const char = string[i]
      if (!(char in node)) {
        return false
      }
      node = node[char] as CharDictTreeNode
    }
    return false
  }
}


const array = ['after', 'thought', 'afterthought','hou']

const tree = new CharDictTree([]);

for (const string of array) {
  if (tree.findDoubleWord(string)) {
    console.log(string)
  }
  tree.addWord(string)
}

// console.log(JSON.stringify(tree, null, 2))