## 1. change detection的两种策略 Default vs OnPush

Angular periodically checks to see if the dependency has changed and, if so, re-renders the component
Angular在定义一个组件时可以在装饰器中设置脏检查策略，对应的属性名称是changeDetection，该属性的枚举值只有两种OnPush和Default，设置为Default即会执行全局脏检查，设置为OnPush即可以控制执行局部脏检查。示例代码如下：

```typescript
@Component({
  template: `
    <h2>{{vData.name}}</h2>
    <span>{{vData.email}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class VCardCmp {
  @Input() vData;
}
```

当一个组件被设置成OnPush模式后，假定组件的输入vData是一个引用对象，如果我们直接在组件外部修改vData的某些属性而不改变其引用指向，那么组件及挂载的子组件将不会执行脏检查

## 2.手动控制脏检查 ChangeDetectorRef

通过向子组件传入ChangeDetectorRef实例，实现在子组件中手动脏检查

## 3. runOutsideAngular

This allows the developer to remove a part of thelogic from ngZone, so that additional change detection are not performed, especially if the execution logic is not related to UI rendering

## 4. What are the benefits of dependency injection

* when we need to use a services that is defined out side the module, we can injected it in this component directly, and don't need to new an instance, and if the services is changed ,we don't need to modify the code inside the component, that is reduced the coupling.
* allows us to easily test components
* Reduce the logical complexity of the code

## 5. What are the benefits of AOT(ahead of time) over JIT(just in time)

Compilation is performed during the development phase, not in the production browser

## 6. hooks

* ngOnChange
* ngOnInit
* ngAfterViewInit
* ngOnDestroy

## 7. most achieve

There are many business modules that are interdependent and confusing, which makes iteration very difficult. I split the business modules into individual modules and put them in a module pool for project reference. This way, if a new project needs to start quickly, you can just pick some modules from the module pool, download and install them. In this process, I developed module packaging using NodeJS and Golang, uploaded and downloaded scripts, and used lerNA to manage the version of the module.

## 8. what's the differences between observable and promise

promise is triggered on the once, which observable is just like a stream and can be triggered a lot of times, and observable will triggered when you call the subscribe, this is the main difference

## 9. how to share data with different component ?

* input & output
* services, which is defined on the outside of component, it means all of the components can use the services with injection, we can store a data inside a services and all components can use it.
* complex state management like NgRX,  which has a global signal store, and every component can use it.

## 10. what's the diff between Component and Directive?

Component is used to create some element and widgets, and Directive is used to add some new behaviour, like add a new showAuth Directive, and all element can use this Directive to control the dom's show or hide
according to the authorization.

# 11. what's the async pipe in angular?

pipe is a way to allow you to get value from the stream, The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. When the component was destroyed, the async pipe unsubscribes automatically.

# 12. what is angular IVY?

Ivy is the new Angular build engine that supports better Tree shaking and type checking, provide a faster compilations and smaller compiled packages

## 13. advantages and disadvantages?

* fully featured and you don't have to look for other library at all
* support typescript default and can build big application
* different to learn and proficient in

## 14. How many kind of directives does angular have?

* structural --- which is change the structural of the dom element ,such as ngIf, ngFor, ngSwitch
* attribute ---  Changes the appearance and behavior of an element, component, such as NgClass，NgStyle
* component as we know, component is inherit from directives, so component is also a kind of special directive which has template.

## verb

* Dependency injection 依赖注入
* Bidirectional data binding
* Executable file
* change detection 脏检查
* manual 手动的
* directive 指令
* brace 大括号
* decorator 装饰器
* variable 变量
* Reduce the logical complexity of your code 降低代码逻辑复杂度
* I don't have much experience developing in Angular, but I've been catching up a lot recently
* I've used React + MobX technology for development, and MOBX has features like response observation, dependency injection, and so on, which is very similar to Angular

## question

* Do I need to work cross different time zone?
* how many developers  are there on the team?
* What are the deadlines for the development and implementation?
* How much time do we have to complete this project?
* What technologies are used on the project?
* What are your expectations of the candidate?
* Is the team globally distributed?
