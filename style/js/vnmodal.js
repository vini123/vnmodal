/**
 * --------------------------------------------------
 *
 * 功能： 类似知乎的登录模态窗口。
 *
 * --------------------------------------------------
 *
 * 特点：
 *  1. 弹出模态窗口后。所有滚动条都隐藏（如果有的话），并且鼠标滑轮，无论怎么滚动，被半透明遮挡在下边的内容岿然不动。
 *  2. 弹出模态窗口后。窗口在水平和垂直方向是都是居中的。
 *  3. 关闭模态窗口后。滚动条功能恢复。
 *
 * --------------------------------------------------
 *
 *  方法：
 *  打开窗口：show(String modalid, Function callback);
 *  关闭窗口：hide(String modalid);
 *
 * --------------------------------------------------
 *
 * author: vini123
 *
 * web: https://mlxiu.com
 *
 * blog:https://blog.vini123.com
 *
 * --------------------------------------------------
 */

var vnmodal;
(function(){
  var hideYScrollCls = ".hideYScroll{overflow:hidden;margin-right:17px;}";

  var vnmodalWrapperCls = ".vnmodal-wrapper{\
  position: fixed;\
  top: 0;\
  right: 0;\
  bottom: 0;\
  left: 0;\
  z-index: 9999;\
  display: none;\
  -webkit-box-orient: vertical;\
  -webkit-box-direction: normal;\
  flex-direction: column;\
  -webkit-box-pack: center;\
  justify-content: center;\
  overflow-x: hidden;\
  overflow-y: auto;\
  }";
  
  var vnmodalBackdropCls = ".vnmodal-backdrop{\
  position: absolute;\
  top: 0;\
  right: 0;\
  bottom: 0;\
  left: 0;\
  z-index: 0;\
  background-color: rgba(0,0,0,0.0);\
  -webkit-transition: background-color 400ms ease-out;\
  -ms-transition: background-color 400ms ease-out;\
  transition: background-color 400ms ease-out;}";

  var vnmodalContainerCls = ".vnmodal-container{ \
  position: relative;\
  z-index: 1;\
  display: flex;\
  -webkit-box-orient: vertical;\
  -webkit-box-direction: normal;\
  flex-direction: column;\
  margin-right: auto;\
  margin-left: auto;\
  outline: 0;\
  display: inline-block;\
  box-shadow: 0 5px 20px 0 rgba(0,34,77,.5);\
  box-sizing: border-box;\
  top:50px;\
  opacity:0;\
  filter: alpha(opacity=0);\
  -webkit-transition: all .4s ease-out;\
  -moz-transition: all .4s ease-out;\
  -o-transition: all .4s ease-out;\
  transition: all .4s ease-out;}";

  var callBack;
  function VNModal()
  {
      this.createClass(hideYScrollCls, 'vnstyle');
      this.createClass(vnmodalWrapperCls, 'vnstyle');
      this.createClass(vnmodalBackdropCls, 'vnstyle');
      this.createClass(vnmodalContainerCls, 'vnstyle');
  }

  VNModal.prototype = {
      show:function(idname, callBackFun){
        callBack = callBackFun;

        var target = document.getElementById(idname);
        if(target)
        {
            target.style.display = "flex";
            var html = document.getElementsByTagName("html")[0];
            if(VNModal.hasYScroll() && !VNModal.hasClass(html, "hideYScroll"))
            {
              html.className += ' hideYScroll';
            }
        }

        //背景变色
        var backdrop = target.getElementsByClassName('vnmodal-backdrop');
        if(backdrop && backdrop.length > 0)
        {
           backdrop[0].style.backgroundColor = "rgba(0, 0, 0, 0.64)";
           backdrop[0].setAttribute('idname', idname);
           backdrop[0].onclick = this.close;
        }

        //运动
        var container = target.getElementsByClassName('vnmodal-container');
        if(container && container.length > 0)
        {
          container[0].style.top = "0";
          container[0].style.opacity = 1;
        }

       //关闭按钮
        var closeBtn = target.getElementsByClassName('vnmodal-close');
        if(closeBtn && closeBtn.length > 0)
        {
          closeBtn[0].setAttribute('idname', idname);
          closeBtn[0].onclick = this.close;
        }
      },
      close:function(e){
        var idname = this.getAttribute('idname');
        if(!idname)
          return;

        vnmodal.hide(idname);
      },
      hide:function(idname){
        if(!idname)
          return;

        var target = document.getElementById(idname);

        //背景色
        var backdrop = target.getElementsByClassName('vnmodal-backdrop');
        if(backdrop && backdrop.length > 0)
        {
          backdrop[0].style.backgroundColor = "rgba(0, 0, 0, 0.0)";
        }

        //运动
        var container = target.getElementsByClassName('vnmodal-container');
        if(container && container.length > 0)
        {
          container[0].style.top = "50px";
          container[0].style.opacity = 0;
        }

        var timeid = setTimeout(function(){
          target.style.display = "none";

          var html = document.getElementsByTagName("html")[0];
          if(VNModal.hasClass(html, "hideYScroll"))
          {
              html.className = "";
              if(callBack)
              {
                callBack();
                callBack = null;
              }
          }
          clearTimeout(timeid);
        }, 400)
      },
      createClass:function(cssText,  styleName)
      {
        var head = document.head || document.getElementsByTagName("head")[0];
        var style;
        if(styleName)
        {
          styles = document.getElementsByClassName(styleName);
          style = (styles && styles.length > 0) ? styles[0] : null;
        }

        if(!style)
        {
          style = document.createElement("style");
          style.type = "text/css";

          if(styleName)
            style.setAttribute("class", styleName);
        }

        if(style.styleSheet)
        {
          //  ie
          var func = function()
          {
            // 防止IE中styleSheet数量超过限制而发生错误
            try
            {
              style.styleSheet.cssText = cssText;
            }
            catch(e)
            {

            }
          }

          // 如果当前styleSheet还不能用，则放到异步中进行
          if(style.styleSheet.disabled)
          {
            setTimeout(func,10);
          }
          else
          {
            func();
          }
        }
        else
        {
          var cssNode = document.createTextNode(cssText);
          style.appendChild(cssNode);
        }
        head.appendChild(style);
      }
    }
    vnmodal = new VNModal();

    VNModal.hasYScroll = function()
    {
       if(document.documentElement.clientHeight < document.documentElement.offsetHeight)
       {
           return true;
       }
       return false;
    }

    VNModal.hasClass = function(tar, cls)
    {
       if( (tar.className + '').indexOf(cls) >= 0)
         return true;

       return false;
    }
})()