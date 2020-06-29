## hooks
### hooks原理
```js
function AudioPlayer() {
  const [volume, setVolume] = useState(80);
  const [position, setPosition] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
}
```
+ 第一次渲染：
    - React 创建组件时，它还没有调用函数。React 创建元数据对象和Hooks的空数组。假设这个对象有一个名为nextHook的属性，它被放到索引为0的位置上，运行的第一个hook将占用位置0。
    - React 调用你的组件（这意味着它知道存储hooks的元数据对象）。
    - 调用useState，React创建一个新的状态，将它放在hooks数组的第0位，并返回[volume，setVolume]对，并将volume 设置为其初始值80，它还将nextHook索引递增1。
    - 再次调用useState，React查看数组的第1位，看到它是空的，并创建一个新的状态。 然后它将nextHook索引递增为2，并返回[position，setPosition]。
    - 第三次调用useState。 React看到位置2为空，同样创建新状态，将nextHook递增到3，并返回[isPlaying，setPlaying]。
    - 现在，hooks 数组中有3个hook，渲染完成。 
+ 后续的渲染
    - React需要重新渲染组件, 由于 React 之前已经看过这个组件，它已经有了元数据关联。
    - React将nextHook索引重置为0，并调用组件。
    - 调用useState，React查看索引0处的hooks数组，并发现它已经在该槽中有一个hook。，所以无需重新创建一个，它将nextHook推进到索引1并返回[volume，setVolume]，其中volume仍设置为80。
    - 再次调用useState。 这次，nextHook为1，所以React检查数组的索引1。同样，hook 已经存在，所以它递增nextHook并返回[position，setPosition]。
    - 第三次调用useState，跟第二次过程相同。
