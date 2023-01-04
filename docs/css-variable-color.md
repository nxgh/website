---
title: css 变量、颜色
---
## CSS 变量

- 普通字符局限在`[0-9`，`[a-zA-Z`，`-`，`_`，可以是中文，日文或者韩文
- 不能包含`$`，`[`，`^`，`(`等字符
- 变量的定义和使用只能在声明块`{}`里面
```css
element {
  --紫色: purple;
  color: var(--紫色, purple);
}
```

### 完整语法

```toml
var( <custom-property-name> [, <declaration-value> ]? )
var( <自定义属性名> [, <默认值 ]? )
```

### 不合法时的缺省语法
CSS默认值的使用仅限于变量未定义的情况，并不包括变量不合法
> 对于CSS变量，只要语法是正确的，就算变量里面的值是个乱七八糟的东西，也是会作为正常的声明解析，如果发现变量值是不合法的则使用默认值代替

```css
body {
  --color: 20px;
  background-color: #369;
  background-color: var(--color, #cd0000); 
}
```

此时`<body>`的背景色是 `transparent`

### 空格尾随特性
```css
body {
  --size: 20;   
  font-size: var(--size)px;
}	
```
此处 `font-size: var(--size)px;` 等同于 `font-size: 20 px`, `20`后面有个空格，此时 `font-size`使用的是 `body`元素默认的大小
```css
body {
  --size: 20px;   
  font-size: var(--size);
}
// 或者
body {
  --size: 20;   
  font-size: calc(var(--size) * 1px);
}
```
### 相互传递
```css
body {
  --green: #4CAF50;   
  --backgroundColor: var(--green);
}
body {
  --columns: 4;
  --margins: calc(24px / var(--columns));
}
```
### 空白缺省值
```css
color: var(--color, );
```
如果 `--color` 未定义，则此变量当作没存在，未设置
```css
<p class="p1">Hello World!</p>
<p class="p2">Hi World!</p>
<style>
  .p1 {
    color: deeppink var(--color, );
  }
  .p2 {
    color: deeppink var(--color);
  }
</style>
```
`deeppink var(--color, )` 等同于 `deeppink`，因此颜色是深粉色，而 `deeppink var(--color)` 可以看成是 `deeppink undefined` ，语法无效，于是使用继承的黑色
空白缺省值在多值 css 属性中效果强大
CSS多值属性包括，

- 缩写属性（使用空格和斜杠分隔）
- 可无限值属性（使用逗号分隔）
```css
filter: invert(1) hue-rotate(.5turn) var(--filter,);
background: linear-gradient(deeppink, deepskyblue) var(--bgcolor,);
box-shadow: 2px 2px 4px #0003 var(--box-shadow,);
```
对了，对于逗号分隔的多数组值，在定义CSS变量的时候，前面记得把逗号写上
```css
--box-shadow: ,0 0 5px #0002;
```
### Js 交互
```javascript
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);

```

## CSS 单位
### 绝对长度单位

| 单位 | 名称 | 等价换算 |
| :--- | :---: | :--- |
| cm | 厘米 | 1cm = 96px/2.54 |
| mm | 毫米 | 1mm = 1/10th of 1cm |
| Q | 四分之一毫米 | 1Q = 1/40th of 1cm |
| in | 英寸 | 1in = 2.54cm = 96px |
| pc | 十二点活字 | 1pc = 1/16th of 1in |
| pt | 点 | 1pt = 1/72th of 1in |
| px | 像素 | 1px = 1/96th of 1in |

### 相对长度单位


| 单位 | 相对于 |
| --- | --- |
| em | 在 font-size 中使用是相对于父元素的字体大小

在其他属性中使用是相对于自身的字体大小, 如 width 

| 单位 | 相对于 |
| --- | --- |
| ex | 字符“x”的高度 |
| ch | 数字“0”的宽度 |
| rem | 根元素的字体大小 |
| lh | 元素的line-height |
| vw | 视窗宽度的1% |
| vh | 视窗高度的1% |
| vmin | 视窗较小尺寸的1% |
| vmax | 视图大尺寸的1% |

### vw/vh

- vw = view width
- vh = view height

vw/vh 称为 视口单位
视口：

- pc 端指浏览器的可视区域
- 移动端涉及 Layout Viewport, Visual Viewport, Ideal Viewport 

| 单位 | 解释 |
| --- | --- |
| vw | 1vw = 视口宽度的1% |
| vh | 1vh = 视口高度的1% |
| vmin | 选取vw和vh中最小的那个 |
| vmax | 选取vw和vh中最大的那个 |


vh/vw与%区别在于

- % 依赖于元素的祖先元素
- vh/vw 依赖于视口的尺寸

### em/rem

- 浏览器转换为像素值，具体取决于您的设计中的字体大小设置
- 它可以被浏览器翻译成 从16px到 160px 或其他任意值

rem 

- 转化后像素大小取决于页根元素(html)的字体大小

em

- 转化后像素值将是 em 值乘以使用em单位的元素的字体大小

## CSS 颜色
### RRGGBBAA
透明度的转换公式
```css
AA = (Alpha * 255).toString(16);
```
百分比透明度和十六进制值之间的数据表

| 透明度 | 十六进制值 | 透明度 | 十六进制值 |
| --- | --- | --- | --- |
| 0% | 00 | 5% | 0D |
| 10% | 1A | 15% | 26 |
| 20% | 33 | 25% | 40 |
| 30% | 4D | 35% | 59 |
| 40% | 66 | 45% | 73 |
| 50% | 80 | 55% | 8C |
| 60% | 99 | 65% | A6 |
| 70% | B3 | 75% | BF |
| 80% | CC | 85% | D9 |
| 90% | E6 | 95% | F2 |
| 100% | FF |   |   |


### HSLA & RGBA
`rgba()` 函数使用红(R)、绿(G)、蓝(B)、透明度(A)的叠加来生成各式各样的颜色。

HSLA 即色相、饱和度、亮度、透明度

- 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
- 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。
- 亮度（L），取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。
- 透明度（A）取值 0~1 之间， 代表透明度。

| 值 | 描述 |
| --- | --- |
| hue - 色相 | 定义色相 (0 到 360) - 0 (或 360) 为红色, 120 为绿色, 240 为蓝色 |
| saturation - 饱和度 | 定义饱和度; 0% 为灰色， 100% 全色 |
| lightness - 亮度 | 定义亮度 0% 为暗, 50% 为普通, 100% 为白 |
| alpha - 透明度 | 定义透明度 0（透完全明） ~ 1（完全不透明） |


- `rgb()`和`rgba()`语法互通
```css
rgb(0, 0, 0, 1)
rgba(0, 0, 0)
```

- `hsl()`和`hsla()`语法互通
```css
hsl(0, 0%, 0%, 1)
hsla(0, 0%, 0%)
```

- `rgb()`中的数值可以是小数
```css
rgb(99.999, 102.5, 0)
rgb(1e2, .5e1, .5e0, +.25e2%)
```

- 透明度可以使用百分比表示
```css
rgb(0, 0, 0, 100%)
hsla(0, 100%, 50%, 80%)
```

- `hsl()`中的色调可以使用任意角度单位
```css
hsl(270deg, 60%, 70%)
hsl(4.71239rad, 60%, 70%)
hsl(.75turn, 60%, 70%)
```

- `rgb()`和`hsl()`语法中的逗号可以忽略
```css
rgb(255 0 0)
hsl(270 60% 70%)
```

- 全新的空格加斜杠语法
```css
rgb(255 0 153 / 1)
rgb(255 0 153 / 100%)
rgba(51 170 51 / 0.4)
rgba(51 170 51 / 40%)
hsl(270 60% 50% / .15)
hsl(270 60% 50% / 15%)
```

 

参考
[The Power of Composition with CSS Variables](https://blog.maximeheckel.com/posts/the-power-of-composition-with-css-variables/)


 














