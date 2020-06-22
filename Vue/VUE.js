const Vue = (function(){
    function Vue({el,data}){
        this.data = {};
        this.observer = new Observer(this,data);

        Compiler(el,data);
        
    }

    /**
     * 订阅者管理器
     * 管理多个订阅者，添加订阅者Watcher
     * 通知Watcher数据发生变化
     */
    class Dep{
        constructor(){
            this.watchers = [];
        }
        add = (watcher) => {
            this.watchers.push(watcher)
        }
        publish = (propName,propValue) => {
            
            this.watchers.forEach(watcher=>{
                watcher.publish(propName,propValue);
            })
        };
    }

    //观察者：劫持属性，监听数据变化，如果变化就通知Dep
    const Observer = function(vue,data){

        Object.assign(_data,data);

        Object.keys(data).forEach(key=>{
            Object.defineProperty(vue.data,key,{
                get(){
                    return _data[key];
                },
                set(value){
                    _data[key] = value;

                    dep.publish(key,value);
                }
            })
        })
        
    }

    /**
     * 订阅者-对比数据是否发生变化，如果变化通知视图重新渲染
     */
    class Watcher{
        constructor(valueMap){
            this.valueMap = valueMap;
        }
        publish = (propName,propValue) => {
            Object.keys(this.valueMap).forEach(name=>{
                if(propName!==name) return;
                (this.valueMap[propName] || []).forEach(dom=>{
                    dom.innerText = propValue;
                })
            })
            
        }
    }

    /**
     * 指令解析：扫描和解析指令，并初始化Watcher
     * @param {*} parent 
     */
    const Compiler = (parent,data)=>{
        const doms = parent.querySelectorAll("*");

        const valueMap = {};
        const watcher = new Watcher(valueMap);
        
        doms.forEach(dom=>{
            const propName = dom.getAttribute("v-text");
            // console.log(propName,data[propName]);
            
            valueMap[propName] = [
                ...(valueMap[propName] || []),
                dom
            ]
        });
        Object.keys(data).map(key=>{
            console.log(key,data[key]);
            
            watcher.publish(key,data[key]);
        })
        dep.add(watcher);
    }

    const dep = new Dep();

    const _data = {};

    return Vue
})()