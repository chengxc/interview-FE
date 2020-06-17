# CSS常见面试题
### 实现居中的几种方式
+ 普通文字、图片居中
```css
    .img{
        text-align:center;
    }
```
+ 块级元素垂直-水平居中：方案1
```css
div{
    display:flex;
    align-items:center;        //垂直居中
    justify-content:center;    //水平居中
}

```

+ 块级元素垂直-水平居中：方案2
```css
div{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate3d(-50%,-50%,0);
}
```

+ 块级元素水平居中——方案3
```css
div{
    display:table;
    margin:0 auto;
}
```

### 盒子模型
+ 盒子模型有2种：怪异盒模型、标准盒模型
+ 怪异盒模型(老版本IE)：`元素的宽高 = content`
+ 标准盒子模型(Chrome、FF、IE9+)：`元素的宽高=content+border+padding`
+ css3中提供了box-sizing属性可以修改盒子模型
  - content-box(默认值)：元素的宽高就是内容的宽高
  - border-box：元素的宽高是内容的宽高+border+padding

### CSS优先级（https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity）

+ 计算规则：
  + a、通配符选择器、关系运算符( + > ~ ‘ ‘ || )、not伪类：0
  + b、标签选择器、伪元素（:before）：1
  + c、class选择器、属性选择器、伪类选择器（:hover）：10
  + d、id选择器：100
  + e、行内样式：1000
根据上述不同规则得分，将这些选择器合并计算，获得数值总和
     div span：1+1=2
     div.name：1+10=11
div.name span：1+10+1=12
如果一个元素有3条规则，那么最后一条（值为12）规则会应用在元素上
如果2个选择器计算出来的结果数值相等，那么最后的那个样式会应用在元素上

+ 例外：使用!important将覆盖其他任何声明，所以要尽可能减少使用!important，如果2个相互冲突的规则都具有!important，那么拥有更大优先级的会被采用

+ 关于!important的使用经验：
    1、优化考虑优先级规则，而不是!important
    2、只有在需要覆盖全站css的特定页面中，才用!important
    3、永远不要在插件中使用!important
    4、永远不要在全站范围的css中使用!important
    5、需要覆盖行内样式才需要使用!important
    6、覆盖优先级更高的选择器

### BFC：块格式化上下文
+ 如何触发BFC：
    float：不为none
    overflow：不为visible
    position：absolute/fixed
    display：inline-block、table-cell、table-caption、grid
+ BFC的渲染规则
  - a、BFC是页面上的一个独立容器，不受外界干扰或干扰外界
  - b、计算BFC的高度时，浮动子元素也参与计算（即内部有浮动元素时也不会发生高度塌陷）
  - c、BFC的区域不会与float的元素区域堆叠
  - d、BFC内部的元素会在垂直方向上放置  
  - e、BFC内部相邻2个元素的margin会发生堆叠
+ BFC的应用场景：
  - a、清除浮动
  - b、避免某元素被浮动元素覆盖
  - c、阻止外边距重叠
  - d、防止元素塌陷
  - e、防止文字环绕


### 定位方式(position有哪几个取值)
+ static(默认值): 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
+ relative：相对定位，此时的『相对』是相对于正常文档流的位置
+ absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
+ fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
+ sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

### 使用translate来改变位置比用定位来改变位置的好处是什么
+ translate()是transform的一个值。
+ 改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。
+ 而改变绝对定位会触发重新布局，进而触发重绘和复合。+ transform使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此translate()更高效，可以缩短平滑动画的绘制时间。
+ 而translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发生这种情况。

