问题

### Q1. 在架构组织上 react Hooks 相比 class + HOC 有什么优势？

> 观点： HOC 可以降低对组件的入侵程度，Hooks 需要定义在组件或者自定义 Hooks 内部

实际上是**架构组织和视图方案间的关系**, 之所以有这个问题是因为架构中业务逻辑和 UI 的分离不够彻底

较好的做法：从组件中彻底分离业务逻辑, 业务逻辑与 UI 无关, 它就是一组纯粹简单的 class/function，除了工具包（相当于扩展语
言能力,例如 lodash）之外，几乎不`import` 任何其他东西。这就是所谓的数据模型，**Model**

这时视图(react/vue) 需要做的是：

1. 实例化 model 并和 dom 联动；
2. 维护 dom 数据的缓存(非必要)。 之前是 redux/mobx, 现在是 react-query/swr
3. 处理纯页面状态,例如 loading/theme/弹窗的开启关闭等

**model、UI 和数据持久化分离**

有一个常见的误区是在 react、vue 组件或 redux、mobx 里直接调用 fetch、axios 来存取数据，然后再把数据喂给 model

最好是在 UI 里调用 model 提供的存取函数，然后在 model 的存取函数里调用 fetch/axios

核心: model 层定义接口实现依赖反转

结构

`[ui事件处理函数] --调用--> [Model user.save 方法] <--调用-- [fetch函数]`

> Angular 在五年后等你

六边形架构、洋葱架构、整洁架构的核心套路: Model、UI 和数据持久化分离

在这个架构中，class + HOC 与 react Hooks 没有任何区别，都是在 UI 层实现业务逻辑。理论上来讲，vue composition api 和
react hooks 的可组合能力有一定优势。

## 视图方案, 响应系统与模型风格

react、vue、angular 的功能可以分为：

- UI 部分，对接 dom
- 响应系统，负责实现数据联动

响应原理的不同，造成了两大风格模型 OOP 和 FP

- vue、mobx 这类基于 proxy 的响应方案，核心是“**容器对象引用不变，内部属性状态发生改变**”, 而 OOP 中 class 实例的本质，
  就是一个引用不变的对象，里面有一些可变的状态，还有一些用来改变这些状态的动作

- react 原生的响应方案则相反，要求 “**内部不要变，容器整体引用要变**”。 这天然切合声明式编程、FP 的特质

```ts
private readonly crypto: Crypto
```

crypto 便是上文提到的依赖反转

使用 vue 对接 user model

使用 mobx 对接

```ts
const user = new User('name', 'password', new Crypt())

makeObservable(user, {
  name: observable,
  hashedPassword: observable,
  changePassword: action,
  another_attr: observable.shallow, // 指定更细致的响应层次
  yet_another_attr: computed,
})
```

如果使用 react, 需要 class 的所有属性都应该是 deep readonly 的，所有方法都不能修改属性，而是返回一个 new 出来的新实例

```ts
class User {
  public readonly hashedPassword
  public constructor(public readonly name: string, password: string, private readonly crypt: Crypt) {
    this.hashedPassword = crypt.hash(password)
  }
  public changePassword(password): User {
    return new User(this.name, password, this.crypt)
  }
}

let user = new User('name', 'password', new Crypt())
// 重新给user赋值，react才能检测到变化
user = user.changePassword('new password')
```

写成函数形式,需要所有函数都是纯函数

```ts
type User = Readonly<{ name: string; hashedPassword: string }>

function createUser(name: string, password: string, crypt: Ctrypt): User {
  return { name: name, hashedPassword: crypt.hash(password) }
}

// 返回一个新的User对象
function changeUserPassword(user: User, pasword: string, crypt: Crypt): User {
  return { ...user, hashedPassword: crypt.hash(password) }
}

const crypt = new Crypt()
let user = createUser('name', 'password', crypt)
// 重新给user赋值，react才能检测到变化
user = changeUserPassword(user, 'new password', crypt)
```

react 中这两种方式问题在于，写法不自然所带来额外的心智负担，使用也不方便；风格侵入性较强，后期如果需要切换到 vue 或者
mobx，需要大量重构

使用 immer.js (immutable.js) 将可变的 model 转换成不可变的

```ts
type User = { name: string; hashedPassword: string }

function createUser(name: string, password: string, crypt: Crypt): User {
  return { name: name, hashedPassword: crypt.hash(password) }
}

// 非纯函数，直接修改了user参数的状态
function changeUserPassword(user: User, pasword: string, crypt: Crypt): void {
  user.hashedPassword = crypt.hash(password)
}

const user = createUser('name', 'password', crypt)
// 直接调用的话，会修改user内部属性
changeUserPassword(user, 'new password', crypt)

// 通过immer调用的话，会创建一个新user实例，然后把修改逻辑应用到新user上
import produce from 'immer'
const user1 = produce(user, (draft) => changeUserPassword(draft, 'new password', crypt))
```

四种风格模型

|          | 数据可变                                                                               | 数据不可变                                   |
| :------- | :------------------------------------------------------------------------------------- | :------------------------------------------- |
| class    | 典型 OOP，适合对接 vue、mobx；通过 immer 对接 react 不成熟                             | 非典型 FP，class 外表下所有方法都是纯函数    |
| function | 非典型 OOP，相当于把 class 的方法外置了，适合对接 vue/mobx 也可以通过 immer 对接 react | 典型 FP，适合对接 react，包括 class 和 hooks |

如果只考虑响应方案的对接问题，语法上 class 和 function 不重要，关键在于**数据可变与否**

### Q2, react class 组件是面向对象的吗？

并不是，class 组件不允许修改 `this.state`, 只能通过 `this.setState()` 间接修改属性。 react class 本质上是一种非典型 FP
，只是通过 class 的语法糖，让代码看起来像面向对象

react 原生的响应式方案的核心在于**数据不可变**, 天生对 FP 模型友好。

在使用 mobx 代替 react 原生响应系统, react 就只剩下一个 UI dom 对接的功能了,这时就变成了 非典型的 OOP


## 抽象层级

当了解不同抽象层级需要考虑的问题后，任何宽泛的、状态相关问题都能转化成具体的、多抽象层级问题。

从不同抽象层级出发思考，就能更全面的回答问题

- `UI = f(state)`
- Immutable/Mutable
- 组件封装
- OOP/FP
- 状态管理: Redux/Mobx ReactQuery/SWR/

## UI = f(state)

几乎所有主流前端框架的实现原理，都在践行 `UI = f(state)`, 可以翻译为 **UI 是对状态的映射**

它表示每一种 state 都有唯一与之对应的 UI 表现。反过来，UI 表现的不同正是因为 state 的不同导致的

这应该是「前端状态」会出现的最低抽象层级了。我们以 react 和 vue 为例，在实现「UI 是对状态的映射」过程中, 两者的方向不同

- React 不关注状态如何变化

每当调用更新状态的方法（比如 this.setState，或者 useState dispatch...），就会对整个应用进行 diff, 在所以在 React 中，传
递给「更新状态的方法」是个「不可变的数据」。

- Vue 关注状态如何变化

每当更新状态时，都会对「与状态关联的组件」进行 diff。在 Vue 中，是直接改变状态的值, 状态是一个「可变的数据」。

底层实现的区别在单独使用框架时不会有很大区别，但是会影响上层库的实现(状态管理库)

## 组件

前端开发普遍采用「组件」作为**「状态与 UI 的松散耦合单元」**。

如果从更低一层抽象（前端框架的实现原理）出发，就能发现 —— 组件是为了解决框架实现原理中**「UI 到状态的映射」的途径**

从软件工程的角度出发，有两个方向可以探索：

- OOP
- FP

## OOP / FP

OOP 的特点包括：**继承、多态、封装**

「封装」这一特点使得「面向对象编程」很自然成为组件的首选实现方式，毕竟组件的本质就是「将状态与 UI 封装在一起的松散耦合单
元」

React ClassComponent 和 Vue OptionsAPI 都是类似的实现。但是在考虑复用性时, 不仅要考虑「逻辑的复用，还要考虑「UI 的复用」
。react 和 vue 都避免继承，也用不到多态

框架们根据自身特点，在「类面向对象编程」的组件实现上，拓展了复用性：

- React 通过 HOC、renderProps
- Vue2 通过 mixin

经过长期实践，开发者们逐渐发现 —— 「类面向对象编程的组件实现」中「封装」带来的好处不足以抵消「复用性」上的劣势

于是，FP 的组件实现就出现了 —— React Hooks 和 Vue3 CompositionAPI

当组件数量增多，逻辑变复杂时，一种常见的解耦方式是 —— 将可复用的逻辑从组件中抽离出来，放到单独的 Model 层。UI 直接调用
Model 层的方法,对 Model 层的管理，也就是所谓的「状态管理」。

对状态的管理，是比组件中「状态与 UI 的耦合」更高一级的抽象。

## 状态管理

「状态管理」要考虑的最基本的问题是 —— 如何与框架实现原理尽可能契合?

🌰 例如我们要写一个 user 模型，支持 hash 密码

```ts
class User {
  public hashedPassword: string = ''
  public constructor(public username: string, public password: string, private readonly crypto: Crypto) {
    this.changePassword(password)
  }

  public changePassword(password: string) {
    this.hashedPassword = this.crypto.hash(password)
  }
}
```

只需要将这个 Model 的实例包装为响应式对象，就能很方便的接入 Vue3

```ts
import { reactive } from 'vue'

setup() {
  const user = reactive(new User('name', 'password', new Crypt()) as User
  return () => (
   <button onClick={() => user.changePassword('new password')}>
      {user.hashedPassword}
    </button>
  )
}
```

同样的 User Model 要接入 React 则比较困难，因为 React 原生支持的是「不可变数据」类型的状态。

要接入 React，我们有几个方向

- 可以将同样的 User Model 设计为不可变数据，采用 reducer 的形式书写
- 借用 mobx 提供的响应式能力
- 借用 immer 提供的不可变数据的可变写法

到目前为止，不管是「可变类型状态」还是「不可变类型状态」的 Model，都带来了「从组件中抽离逻辑」的能力

当业务进一步复杂，Model 本身需要更完善的架构，此时又是更高一级的抽象, 脱离前端框架的范畴，上升到纯状态的管理, 例如

- mobx-state-tree 为 mobx 带来结构化数据
- redux-toolkit 和 vuex/Pinia 是各自框架的解决方案，

此时框架实现原理对 Model 的影响已经在更高的抽象中被抹去了

对于常规的状态管理方案，根据用途不同，可以划分出更多细分领域，比如：

- 对于表单状态，收敛到表单状态管理库中
- 对于服务端缓存，收敛到服务端状态管理库中（React Query、SWR）
- 用完整的框架收敛前后端 Model，比如 Remix、Next.js

这是更高一级的抽象

## 回答：为什么项目中用 Redux 而不用 Mobx？

考虑当前抽象层级:

- 带来一套「类 Flux 的状态管理理念」，后者为 React 带来「响应式更新」能力，在设计 Model 时我的项目更适合哪种类型？
- 两种类型我都不在乎，那么要不要使用更高抽象的解决方案（比如 MST、Redux Toolkit）抹平这些差异

考虑低一级抽象层级:

项目用的 ClassComponent 还是 FunctionComponent？Redux、Mobx 与他们结合使用时哪个组合更能协调好 UI 与逻辑的松散耦合？

考虑再低一级抽象层级:

React 的实现原理决定了他原生与「不可变类型状态」更亲和。Redux 更契合「不可变数据」，Mobx 更契合「可变数据」。我的项目需
要考虑这些差异么？


参考：

- [Hooks 是否过誉了？前端应该跟着 React 走还是跟着 JS、TS 走？beeplin 的回答](https://www.zhihu.com/question/468249924/answer/1968728853)
- [魔术师卡颂-对于“前端状态”相关问题，如何思考比较全面](https://mp.weixin.qq.com/s/y7JzwBcbOobjWQdYEQ7KqA)

