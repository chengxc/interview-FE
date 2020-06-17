# 浏览器
### 事件循环
+ 参考文章：https://juejin.im/post/5b73d7a6518825610072b42b#heading-0
+ JS是单线程的，执行任务是按照一个任务队列来执行，这个队列里面每一个任务都是一个宏任务
+ 每一个宏任务执行过程中，又可能会有微任务，一直到这个宏任务下面的所有微任务完成，才会认为这个宏任务完成
    ```js
    setTimeout(_ => console.log(4));
    new Promise(resolve => {
        resolve()
        console.log(1)
    }).then(_ => {
        console.log(3)
    });
    console.log(2);
    //1、程序开始执行，第一个宏任务（H1）
    //2、setTimeout注册了一个新的宏任务(H2)（并没有执行回调函数里面的代码）
    //3、执行new Promise是宏任务中的    ->打印1
    //4、.then注册了一个微任务：W1
    //5、                            ->打印2
    //6、执行微任务W1     ->打印3
    //7、执行宏任务H2     ->打印4
    ```
+ 宏任务：
    setTimeout
    setInterval
    requestAnimateFrame
+ 微任务：
    MutationObserver
    Promise.then、catch、finally
        -> async、await由于是基于Promise的封装，所以await执行的也是属于微任务
+ Event-Loop：事件循环
    Javascript在执行任务的时候，每执行完一个宏任务都会先检查当前宏任务中有没有其他微任务要处理，如果有的话就继续执行其他微任务，如果没有的话就结束本次宏任务的执行，检查有没有其他宏任务，如果有的话就执行其他宏任务
