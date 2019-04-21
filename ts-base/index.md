# TypeScript Base

## Why TypeScript

- 基于 Javascript，Javascript 能做的 TypeScript 都能做
- 面向对象设计，支持泛型，接口，数据封装（public|private|protect）
- 良好的静态类型检查，避免很多低级错误
- 编辑器支持良好，例如 VS Code

## 基本类型

![Alt 基本类型](./type.png '基本类型')

类型断言的应用，比如比如`fetch`回来的数据，你肯定不敢再 fetch 配置里面把解析的数据定一个死类型，一般都定义成 any ，然后在具体的接口返回值可以不同。

看看下面这个例子  
![Alt 类型断言](../vue-with-ts/8.png '基本类型')  
这里报错的原因，是因为 this.\$refs[key]，返回的类型是`Vue | Element | Vue[] | Element[]`，这堆类型里面有 blur 方法才怪，但是`input`肯定有`blur`方法的，但是人家压根不知道那个是`Input`。

    // vue 源码里面
    readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    //改法，把这个类型强制断言成 HTMLInputElement，同样的，如果引用别的组件的话，也是这样处理
    test() {
      const inputBox: HTMLInputElement = this.$refs.inputBox as HTMLInputElement
      inputBox.blur()
    }

在看看非空断言(!)，可以可空断言(?)

    // str后面加了 ?，表明 str 可以为空，也就是说 str 的类型是 string | undefined
    // 这时候直接 str.length 是会报错的，undefined 还在没有length这属性
    // str!.length 不会报错，str!表示 str 不会是空的，你放心就好，然后就可以过静态检查
    // 当然，这个例子是很有问题的。。。
    function test(str?: string) {
      return str!.length;
    }

非空断言的用处，比如你在一个类里面定义了一些属性，但是那些属性没有在构造函数里面初始化，并且又默认不赋值，静态类型会报错，例子 `vue-property-decorator` 风格方式的传参数。

    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    class Test extends Vue {
      // @Prop 的属性是父组件传过来的，不需要初始化
      @Prop()
      public tmpl!: string
      @Prop()
      public data!: string

      public render() {}
    }

## 接口，类，泛型

![Alt 接口，类，泛型](./interface.png '基本类型')

[Advanced Type](https://www.tslang.cn/docs/handbook/advanced-types.html)

## 函数

TypeScript 支持重载，只要在需要的时候采用，如果传入返回类型相同，用参数默认值或者联合类型比较好

    function overload(arg1: boolean): number;
    function overload(arg1: string): string;
    function overload(arg1: string, arg2: string): object;
    // 重载列表有三个，调用的时候会按照你写的顺序去找
    function overload(arg1: any, arg2?: any): any {
      if (typeof arg1 === 'boolean') {
        if (arg1) {
          return 1;
        }
        return 0;
      }
      if (arg2) {
        return { [arg1]: arg2 };
      }
      return arg1;
    }

    // 不需要重载
    func(val: number): number
    func(val: string): number

    func(val: number | string): number

    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;

    diff(one: string, two?: string, three?: boolean)

## 模块

TS 默认解析模块，和`node`解析方式差不多

    文件 /root/src/moduleA.ts
    import { b } from "moduleB"
    /root/src/node_modules/moduleB.ts
    /root/src/node_modules/moduleB.tsx
    /root/src/node_modules/moduleB.d.ts
    /root/src/node_modules/moduleB/package.json (如果指定了"types|typings"属性)
    /root/src/node_modules/moduleB/index.ts
    /root/src/node_modules/moduleB/index.tsx
    /root/src/node_modules/moduleB/index.d.ts

    /root/node_modules/moduleB.ts
    /root/node_modules/moduleB.tsx
    /root/node_modules/moduleB.d.ts
    /root/node_modules/moduleB/package.json (如果指定了"types|typings"属性)
    /root/node_modules/moduleB/index.ts
    /root/node_modules/moduleB/index.tsx
    /root/node_modules/moduleB/index.d.ts

    /node_modules/moduleB.ts
    /node_modules/moduleB.tsx
    /node_modules/moduleB.d.ts
    /node_modules/moduleB/package.json (如果指定了"types|typings"属性)
    /node_modules/moduleB/index.ts
    /node_modules/moduleB/index.tsx
    /node_modules/moduleB/index.d.ts

如果找不到模块，TS 就会报错，TS2037，和 JS 不同，模块很严格，比如导入图片，报错的例子

    import png1 from './type.png';
    // TS2037: Can't not find module './type.png'

    // img.d.ts
    // 这样写表示 .png 结尾的模块，都是 any
    declare module '*.png';
    // 详细一点的话，导入图片都是导入相对 Src ， src 的话，就是string啦
    declare module '*.png' {
      const src: string;
      export default src;
    }
    // 这两种写法都可以，不过下面那种，编辑器能明确其实 png1 是string类型

还有一种是无法找到模块声明文件的报错，就是 TS 找的时候，能找到匹配的 JS 文件，但是没有找到对应的声明文件

    无法找到模块“lodash”的声明文件。“e:/study/react/ant-design-tsc/node_modules/lodash/lodash.js”隐式拥有 "any" 类型。
    Try `npm install @types/lodash` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash';`

解决方案，除了和上面的手写模块之外，首先要去找类库的 @types/libName ， 如果有就不用自己写了

// 阿里邮箱考试
// 外包 OA
