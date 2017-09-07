## vnmodal.js 类似知乎的模态窗口插件

1. 弹出模态窗口后。所有滚动条都隐藏（如果有的话），并且鼠标滑轮，无论怎么滚动，被半透明遮挡在下边的内容岿然不动。  

2. 弹出模态窗口后。窗口在水平和垂直方向是都是居中的。  

3. 关闭模态窗口后。滚动条功能恢复。

## 使用

1. 创建dom。最基本的dom如下。

```
<div class="vnmodal-wrapper" id="login">
	<div class="vnmodal-backdrop"></div>
	<div class="vnmodal-container" style="width:520px;">
	    <div style="position: relative;width:520px;background-color:#fff;border-radius:8px;padding:40px 50px 25px 40px;">
	        <div class="vnmodal-close">X</div>
	    </div>
	</div>
</div>
```
> vnmodal-wrapper：窗口的组外围的容器。这里定义id  
vnmodal-backdrop： 半透明背景色  
vnmodal-container： 实体的容器。这里一定要定义宽度，且为你所要表达窗口的宽度  
vnmodal-close：关闭按钮。样式名是这个，样式内容，你可以自定义。

2. 引入 **vnmodal.js**。引入后，已实例化。

3. 显示窗口。

```
vnmodal.show('login', closeHandler);

# login 为最外围容器的id名
# closeHandler 是关闭窗口的回调。当然你不需要的时候，可以不用。
```

4. 关闭窗口。

```
vnmodal.hide('login');
# login 为最外围容器的id名
```

## 1.0.0

1. 兼容性没仔细研究。 

2. 不依赖任何插件。 

3. 背景半透明色不支持自定义。

4. 动画时间不支持自定义。

5. 动画方向不支持自定义。打开窗口是从下向上，背景颜色从透明到0.64透明度。关闭窗口则变化相反。  


