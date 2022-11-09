// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
// = 为泛型参数设置默认值 
// 1. K extends keyof T 不成立时，赋值默认值 keyof T 给第二泛型参数
// 2. 先计算出一个只存在 readonly 字段的对象
// 3. 再通过内置工具类型 Omit，计算出不包含 K 的对象
// 4. 再使用 & 计算出两个类型的交叉类型()
type MyReadonly2<T, K extends keyof T = keyof T> = {
  +readonly [P in K]: T[P]
} & Omit<T, K>

