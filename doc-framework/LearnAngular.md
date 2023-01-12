---
title: Angular 概念
index: 0
date: 2023/01/06
---

## 组件组织形式

angular 组件主要由两部分构成

- `@Component` 装饰器
- 包含该组件代码  `class`  语句

基础的 `@Component`

```ts
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.css']
})
```

`templateUrl` 和 `styleUrls` 代表外部的 HTML 模板和 CSS 样式, 你也可以内联模板和样式

```ts
@Component({
  selector: 'app-component-overview',
  template: '<h1>Hello World</h1>',
  styles: ['h1 {color: red}']
})
```

`styles` 属性接受一个包含 CSS 规则的字符串数组

`selector` 是在视图中使用的名称，简单理解为组件名

```html
<div>
  <app-component-overview></app-component-overview>
</div>
```

## 使用组件之前: 模块-ngModule

- [`guide-NgModule`](https://v2.angular.cn/docs/ts/latest/guide/ngmodule.html)
- [ngModule Api](https://angular.cn/api/core/NgModule)

Angular v14 之前，组件的 “注册” 需要使用 Angular 的模块系统

模块系统是 Angular 用来组织内部模块的一种方式。以 `@NgModule()` 装饰器来描述。每个 Angular 应用都至少有一个 `NgModule`，通常被称为 `AppModule`
根模块通常会在 `main.ts` 中启用

```ts
platformBrowserDynamic().bootstrapModule(AppModule)
```

一个 `NgModule` 包含了一组组件、指令、管道、服务等，它们可以被其他模块引用，也可以被其他模块引用。

根模块在一些小型应用中可能是唯一的模块，大多数应用会有很多特性模块，每个模块都是一个内聚的代码块专注于某个应用领域、工作流或紧密相关的功能。

```ts app/app.module.ts
// app/app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- **`imports`** 用来声明当前模块依赖的其他模块
- **`declarations`** 用来声明属于该模块的一组组件、指令和管道

在使用 `ng generate component` 命令创建组件时，Angular 会自动将组件注册到 `app.module.ts` 中

## 独立组件 standalone

在 v14 及更高版本中，[独立组件](https://angular.cn/guide/standalone-components)提供了一种简化的方式来构建 Angular 应用程
序。

通过这种方式，可以编写独立组件，而无需创建 NgModule 来管理模板依赖项。

## 模板语法

### 文本插值

```html
<p>{{ msg }}</p>
```

### 表达式

```html
<p>{{ ok ? '^_^' : 'T_T' }}</p>
```

不允许使用以下 JavaScript 和模板表达式语法

- new
- 递增和递减运算符 `++` 和 `--`
- 赋值运算符，比如 `+=` 和 `-=`
- 按位运算符，比如 `|` 和 `&`
- 管道操作符

### raw HTML

```html
<div [innerHTML]="ok ? '<p>^_^</p>' : 'T_T'"></div>
```

### 输出 `{{}}`

使用 unicode

```html
{{ hi }} &#123;&#123; hi &#125;&#125;
```

- 使用 [DomSanitizer](https://angular.cn/api/platform-browser/DomSanitizer) 来处理不可信的内容

### 管道

管道是在模板表达式中使用的简单函数, 模板中的管道运算符为 `|`

```html
<p>The hero's birthday is {{ birthday | date }}</p>
```

- [管道 api](https://angular.cn/api?type=pipe)

### 模板引用

> 理解为 react/vue 中的模板引用 `ref`

在模板中，要使用井号 `#` 来声明一个模板变量

```html
<input #phone placeholder="phone number" /> <button type="button" (click)="callPhone(phone.value)">Call</button>
```

Angular 根据你所声明的变量的位置给模板变量赋值

| 位置            | 引用             |
| :-------------- | :--------------- |
| 组件            | 引用该组件实例   |
| HTML            | HTML 元素        |
| `<ng-template>` | TemplateRef 实例 |

- 指定名称的变量

如果该变量在右侧指定了一个名字，比如 #var="ngModel"，那么该变量就会引用所在元素上具有这个 exportAs 名字的指令或组件。

> 没看懂，没想到应用场景

```html
<form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)"></form>
```

- 作用域

同 js/ts，模板变量作用域为声明它们的模板，访问时注意上下文

这里 `ref2` 是在 `*ngIf` 创建的子范围中声明的，并且无法从父模板访问

```html
<!-- doesn't work -->
<input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
<span>Value: {{ ref2?.value }}</span>
```

### 模板输入变量

### 特殊标签

#### `<ng-container>`

- 逻辑容器，对节点进行分组，不会渲染到 DOM 中
- 可以理解为 react 的 `<Fragment />` 或者 vue 的 `<template>`

#### `<ng-template>`

- 结构型指令，用于定义模板渲染 HTML
- 可以理解为 vue 的 `<template>`

#### `<ng-content>`

- 可以理解为 vue 的 `<slot>` 或者 react 的 `props.children`
- 具有的 `select` 属性可以用来选择插槽的内容(vue 「具名插槽」、react `render props`)

### 结构型指令

- 结构型指令塑造或重塑 DOM 的结构，这通常是通过添加、移除和操纵它们所附加到的宿主元素来实现的
- 通常以星号 `*` 为前缀
- 内置结构型指令有 `*ngIf` 和 `*ngSwitch` 和 `*ngFor`

### 条件渲染

#### NgIf

- 内联模板

```html
<div *ngIf="boolValue">Content to render when value is true</div>
```

- 内联 then 子句

```html
<div *ngIf="show; else elseBlock">Text to show</div>
<ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
```

- 内部模板 `then` 和 `else`

```html
<div *ngIf="condition; then thenBlock else elseBlock "></div>
<ng-template #thenBlock>when condition is true.</ng-template>
<ng-template #elseBlock>when condition is false.</ng-template>
```

#### NgSwitch

```html
<div [ngSwitch]="type">
  <div *ngSwitchCase="'A'">A</div>
  <div *ngSwitchCase="'B'">B</div>
  <div *ngSwitchCase="'C'">C</div>
  <div *ngSwitchDefault>Not A/B/C</div>
</div>
```

### 列表渲染

- `ngForOf` 指令通常在 `*ngFor` 的简写形式内部使用

```html
<ng-container
  *ngFor="
    let item of items;
    let i = index;
    let f = first;
    let l = last;
    let e = even;
    let o = odd;
    trackBy: trackById
  ">
  <p>{{ item.name }} {{ i }} {{ f }} {{ l }} {{ e }} {{ o }}</p>
</ng-container>
```

内置变量，必须要在 `ngFor` 内显示声明

- `index(number)` 引索
- `first(boolean)` 是否第一行
- `last(boolean)` 是否第二行
- `even(boolean)` 引索是否是偶数，不是指是否偶数行
- `odd(boolean)` 引索是否是奇数，不是指是否奇数行

#### trackBy

- 类似 `key`，用于提升性能，提高元素的复用性，避免将所有列表单元重绘
- 需要指定一个 `function`

#### 长形式

```html
<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
```

扩展版本

```html
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</ng-template>
```

`*ngFor` 的内容并不是模板表达式，而是 Angular 中的微语法, 下面 2 个写法等价

```js
let item of list; index as i;first as f;last as l;even as e;odd as o;
let item of list; let i=index;let f=first;let l=last;let e=even;let o=odd;
```

### 数据绑定

数据绑定会根据应用的状态自动使页面保持最新状态

| 类型                                                           | 语法                                          | 分类                     |
| :------------------------------------------------------------- | :-------------------------------------------- | :----------------------- |
| 插值 <br /> Property<br /> Attribute <br /> class <br /> style | `{{expression}}`<br />`[target]="expression"` | 单向从数据源到视图       |
| 事件                                                           | `(target)="statement"`                        | 单向从视图到数据源       |
| 双向                                                           | `[(target)]="expression"`                     | 双向，从视图到源再到视图 |

### 属性绑定

> Property 和 Attribute
>
> - property: DOM 中的属性，是 JavaScript 里的对象
> - Attribute: HTML 标签上的特性，值只能为字符串

属性绑定使用 `[]` 语法

```html
<img [src]="heroImageUrl" />
```

当有些元素的 `attribute` 并没有对应 `property` 时, 可以使用 `attr.` 前缀

```html
<tr>
  <td [attr.colspan]="1 + 1">One-Two</td>
</tr>
```

### class 绑定

```html
<div [class.active]="isActive"></div>
<div class="static" [class]="{ active: isActive, 'text-danger': hasError }"></div>
<div [class]="classObject"></div>
<div [class]="[activeClass, errorClass]"></div>
<div [class]="errorClass" [class.active]="isActive"></div>
```

自 Angular9 开始不再推荐 ngClass 与 ngStyle

> [angular9.1 class-binding](https://github.com/angular/angular/blob/5d43497717c7585fa36d630163d2c231cc16affe/aio/content/guide/template-syntax.md?plain=1#L965)
>
> The NgClass directive can be used as an alternative to direct [class] bindings. However, using the above class binding syntax without NgClass is preferred because due to improvements in class binding in Angular, NgClass no longer provides significant value, and might eventually be removed in the future.

### style 绑定

```html
<div [style.width]="width"></div>
<div [style.width.px]="width"></div>
<div [style]="styleExpression"></div>
```

### 事件绑定

事件对象通过 `$event` 传递

```ts
@Component({
  template: `
    <input [value]="value" (input)="value = getValue($event)" />
    {{ value }}
  `,
})
export class HelloComponent {
  value = 'Hello World'
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value
  }
}
```

### 双向绑定

因为没有任何原生 HTML 元素遵循了 `x` 值和 `xChange` 事件的命名模式，所以与表单元素进行双向绑定需要使用 `NgModel`

使用 `NgModule` 需要导入 `FormsModule`

```ts
@Component({
  template: ` <input [(ngModel)]="value" />{{ value }} `,
  imports: [CommonModule, FormsModule],
})
export class HelloComponent {
  value = 'Hello World'
}
```

## 数据响应：变更检测

Angular 框架会通过「变更检测」机制将应用程序 「UI 的状态与数据的状态同步」

变化检测策略，只要 Angular 认为某些代码可能会导致变化检测，就会运行。即 DOM 事件、异步调用，如 `setTimeout`/`setInterval`/`Promises` 和输入变量的变化

```ts
@Component({
  selector: 'app-root',
  template: '<div (click)="handleClick()">{{title}}</div>',
})
export class AppComponent {
  title = 'foo'
  handleClick() {
    this.title = 'bar'
  }
}
```

变更检测器在运行时会检查数据模型的当前状态，并在下一轮迭代时将其和先前保存的状态进行比较

> 不同于 react, angular 没有 `setState`, 组件模板中的变化检测依赖于 Zone.js，而 RxJS 的 observables 通常被用来处理组件类中的状态变化

## Zone.js

Zone.js 是一种信号机制，Angular 用它来检测应用程序状态何时可能已更改。它捕获异步操作，比如 `setTimeout`、网络请求和事件侦听器。Angular 会根据来自 Zone.js 的信号安排变更检测

## 脏检查

```ts
@Component({
  selector: 'my-app',
  template: `
    <h3>
      Change detection is triggered at:
      <span [textContent]="time | date : 'hh:mm:ss:SSS'"></span>
    </h3>
    <button (click)="(0)">Trigger Change Detection</button>
  `,
})
export class AppComponent {
  get time() {
    return Date.now()
  }
}
```

这个例子将会报错

> `NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '1673420539178'. Current value: '1673420539180'.`

表达式生成的用于 textContent 绑定的值是不同的

在开发模式的条件下,每个变更检测周期之后, Angular 会同步运行另一个检查以确保表达式生成与上一次变更检测运行期间的值相同

为了避免在无限循环的变更检测运行中走向终点, Angular 强加了所谓的单向数据流的模式。在变更检测之后运行的同步检查,先前生成的 `ExpressionChangedAfterItHasBeenCheckedError` 错误是该强制机制的体现。一旦 Angular 处理了当前组件的绑定,你就不能再更新用于绑定表达式的组件的属性。

如何处理

- 使用`NgZone`在 Angular 的 zone 之外运行一些代码以避免触发变更检测机制

## 组件通信

Angular 提供了一种机制来实现组件间的通信，即 `@Input` 和 `@Output` 装饰器

### 父子通信

```ts
// app.component.ts
@Component({
  selector: 'app-root',
  template: ` <app-child title="Hello World"></app-child> `,
})
// child.component.ts
@Component({
  selector: 'app-child',
  template: `<h2>title: {{ title }}</h2>`,
})
export class ChildComponent {
  @Input() title: string = ''
}
```

**监听输入属性值**

```ts
export class ChildComponent {
  @Input()
  get title(): string {
    return this._title
  }
  set title(title: string) {
    this._title = title.toLocaleUpperCase()
  }
  private _title = ''
}
```

**监听多个**

使用 OnChanges 生命周期钩子接口的 ngOnChanges() 方法来监测输入属性值的变化并做出回应

```ts
export class ChildComponent {
  @Input() title = ''
  @Input() date = ''

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes['title'], changes['date'])
  }
}
```

### 子父通信

```ts
// app.component.ts
@Component({
  selector: 'app-hello',
  template: `
    <input [(ngModel)]="title" />
    <app-child [title]="title" (onChange)="change($event)"></app-child>
  `,
})
export class HelloComponent {
  title = 'foo'

  change(str: string) {
    this.title = str
  }
}

// child.component.ts
@Component({
  selector: 'app-child',
  template: `
    <h2>title: {{ title }}</h2>
    <button (click)="click('孤舟蓑笠翁，独钓寒江雪')">A</button>
    <button (click)="click('唯见月寒日暖，来煎人寿')">B</button>
  `,
})
export class ChildComponent {
  @Input() title = ''
  @Output() onChange = new EventEmitter<string>()
  click(str: string) {
    this.onChange.emit(str)
  }
}
```

### 子父通信-模板引用

```ts
// app.component.ts
@Component({
  template: `
    <button (click)="ref.click('孤舟蓑笠翁，独钓寒江雪')">A</button>
    <button (click)="ref.click('唯见月寒日暖，来煎人寿')">B</button>
    <app-child #ref></app-child>
  `,
})
// child.component.ts
@Component({
  selector: 'app-child',
  template: `<h2>title: {{ title }}</h2> `,
})
export class ChildComponent {
  title: string = ''
  click(str: string) {
    this.title = str
  }
}
```

### 子父通信： `@ViewChild()` 通信

### 通过服务通信

## 生命周期

|                           |                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `ngOnChanges()`           | 在有输入属性的情况下才会调用，该方法接受当前和上一属性值的 `SimpleChanges `对象。如果有输入属性，会在 `ngOnInit `之前调用                   |
| `ngOnInit()`              | 在组件初始化的时候调用，只调用一次，在第一次调用 `ngOnChanges `之后调用。                                                                   |
| `ngDoCheck()`             | 在组件定义的属性或方法变更时调用（用于脏值之检测，非常耗性能，因为会把所有的属性和方法都检测一遍），会在 `ngOnChanges()`和` ngOnInit()`之后 |
| `ngAfterContentInit()`    | 在组件内容初始化之后调用，在第一次 `ngDoCheck `之后调用，只调用一次。                                                                       |
| `ngAfterContentChecked()` | 在组件每次检查内容发生变更时调用。在 `ngAfterContentInit `和每次 `ngDoCheck `之后调用。                                                     |
| `ngAfterViewInit()`       | 在组件相应的视图初始化之后调用，第一次 `ngAfterContentChecked `之后调用，只调用一次。                                                       |
| `ngAfterViewChecked()`    | 在组件每次检查视图发生变更时调用。`ngAfterViewInit `和每次 `ngAfterContentChecked `之后调用。                                               |
| `ngOnDestroy()`           | 在组件销毁前调用，做一些清理工作，比如退订可观察对象和移除事件处理器，以免导致内存泄漏。                                                    |

## 插槽 ng-content

`<ng-content>`

## 依赖注入 (Dependency Injection, DI) & 服务 (Service)

[Angular 依赖注入](https://segmentfault.com/a/1190000040807826)

> **DI + Service 解决了「数据共享和逻辑复用」问题**

WHY: Angular.js 最初的开发者是 Java 开发者，他们带来了 Java 的依赖注入系统, Angular 继承并改善了这个系统。

WHAT:

- 依赖项注入（Dependency injection, DI）是一种设计模式，在这种设计模式中，类会从外部源请求依赖项而不是创建它们。
- Angular 依赖注入是连接服务的桥梁，在需要的地方（组件/指令/其他服务）通过构造函数注入依赖的服务

> 相似的有 react 中的 `useContext`, vue 中的 `provide`/`inject`, 但是只有数据共享，但是不好做到逻辑复用

```ts
// 构造函数注入
class Logger {
  log(message: string) {}
}
class HeroesService {
  constructor(logger: Logger) {}
}

const logger = new Logger()
const heroesService = new HeroesService(logger)
```

​ 如果我们的类成千上万，那么实例化类的工作变得相当繁琐，会有一大推样板代码，为了管理创建依赖工作，一般会使用 控制反转容器(IoC Container) 进行管理

`IocContainer` ​ 会通过 `HeroesService` 的构造函数寻找 `Logger` 的依赖并实例化

```ts
const heroesService = IocContainer.get(HeroesService)
```

IocContainer ​ 其实也叫注入器 Injector ​, 说的其实就是一回事，Angular 框架中叫 Injector ​

## 服务

WHY: Angular 为了解决数据共享和逻辑复用问题，引入了服务的概念

WHAT: 服务简单理解就是一个带有特性功能的类，Angular 提倡把与视图无关的逻辑抽取到服务中，这样可以让组件类更加精简、高效，组件的工作只管用户体验，把业务逻辑相关功能（比如：从服务器获取数据，验证用户输入或直接往控制台中写日志等）委托给各种服务，最后通过 Angular 的依赖注入，这些带有特定功能的服务类可以被任何组件注入并使用。

> 服务本质上与 React Hooks 没有区别，Api 表现形式不同而已

使用 cli 创建一个服务

```bash
ng generate service hello/hello
# 简写
ng g s hello/hello
```

```ts
// app/hello/hello.service.ts
import { Injectable } from '@angular/core'
// 通过 @Injectable() ​装饰器标记为可以被注入的服务
@Injectable({
  // 表示当前服务在 Root 注入器中提供
  // 简单理解就是这个服务在整个应用所有地方都可以注入，并全局唯一实例。
  providedIn: 'root',
})
export class HelloService {
  constructor() {}
}
```

添加完服务后，我们就可以在任何组件中通过构造函数注入 Service

```ts
constructor(private helloService: HelloService) {}
```

```ts
// app/hello/hello.service.ts
import { Injectable } from '@angular/core'
@Injectable({ providedIn: 'root' })
export class HelloService {
  constructor() {}
  getPoem() {
    return '墙角数枝梅，凌寒独自开'
  }
}
// app/hello/hello.component.ts
import { HelloService } from './hello.service'

@Component({
  template: `<p>{{ pome }}</p>`,
})
export class HelloComponent {
  constructor(private helloService: HelloService) {}
  pome = ''
  ngOnInit() {
    this.pome = this.helloService.getPoem()
  }
}
```

还可以在服务中注入其他服务

```ts
import { Logger } from '../logger.service'

@Injectable({ providedIn: 'root' })
export class HelloService {
  constructor(private logger: Logger) {}
  getPome() {
    this.logger.log('Getting heroes ...')
    return ''
  }
}
```

小结：

- 组件不应该直接获取或保存数据，它们应该聚焦于展示数据，理想情况下，如数据获取、网络连接、数据库管理等任务都不应该由组件执行。服务为组件执行所有的操作任务。
- 服务的主要目的是组织和分享业务逻辑、模型或数据等。
- 服务避免了代码的重写。一个服务可以写一次，并注入所有使用该服务的组件中。
- 服务是带有`@injectible` 装饰器的简单的 typescript 类
- 服务通常通过依赖性注入来实现。
- 一个服务可以是一个应用程序需要的函数、变量或功能

## 路由

Angular 为大型项目而生，

- 项目配置
- 指令
- 依赖注入 DI
- 生命周期
- 请求
- 状态管理
- services
- rxjs
- 表单库
