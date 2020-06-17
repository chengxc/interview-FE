# ES6+
### proxy和Object.defineProperty有什么区别
+ Object.defineProperty是ES5出现的，proxy是ES6出现的
+ Object.defineProperty是监听对象的属性，无法监听数组元素的变化，Proxy是监听对象，可以监听数组元素的变化
  + Vue 2.x版本用Object.defineProperty监听数据变化，所以重写了数组方法
  + Vue 3.x版本据说将会用Proxy重写
+ 由于Object.defineProperty监听的是属性，所以要是有嵌套对象，需要层层递归来进行监听

### 数组去重
+ Array.from(new Set([1,2,3,3,4,4,5]))
+ 遍历筛选

### 数组打平
+ 递归
+ 数组的flat方法
```js
    const array = [[1,2,3],[4,5,6],[[11,12,13,14,15]]].flat(Infinity);
    //array = [1,2,3,4,5,6,11,12,13,14,15]
```
