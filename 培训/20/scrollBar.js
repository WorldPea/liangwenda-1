/**
 * Created by Administrator on 2018/3/23.
 */
function scrollBar(obj,content) {
    /*创建滚动栏*/
    var barLine = document.createElement("div");
    barLine.style.cssText = "position: absolute; right:0; top: 0;width: 20px;height: 100%;box-shadow: 0 0 10px 0 #000;"
    var oBarLine = obj.appendChild(barLine);
    /*创建滚动条*/
    var bar = document.createElement("p");
    bar.style.cssText = "position: absolute; left: 2px; top: 0;width: 16px;height: 150px;background: #ccc;border-radius: 10px;box-shadow: 0 0 10px 0 #000; cursor: pointer;";
    var oBar = barLine.appendChild(bar);

    /*设置动态滚动条高度
     * 滚动条高度/滚动栏高度 = obj高度/滚动内容高度
     *
     * */
    var barHeight = (obj.clientHeight/content.scrollHeight)*obj.clientHeight;
    oBar.style.height = barHeight + "px";


    /**鼠标滚动的时候*/
    var top = 0; //初始滚动条的top值
    var barMin = 0;  //滚动条最小值
    var barMax = oBarLine.clientHeight - oBar.clientHeight;

    var lineMax = content.scrollHeight - obj.clientHeight;
    var lineMin = 0;

    /*滚轮滚动的时候*/
    mouseWheel(obj,function (e) {
        /*滚动条滚动*/
        e = e || window.event;
        var del = e.wheelDelta  || -e.detail;
        del > 0 ? top -= 10 : top +=10;  //滚轮向上滚动条top值自减步长，向下自加步长
        top = Math.min(top,barMax);  //最小值限定最大值
        top = Math.max(top,barMin); //最大值限定最小值
        oBar.style.top = top + "px";

        /*文本滚动
         *   滚动条现在的滚动差 / 滚动条总滚动的距离 = 内容现在的滚动差 / 内容总滚动的距离
         *   (top - barMin) / barMax = (content.style.top - lineMin) / lineMax
         *   top/barMax = content.style.top / lineMax
         *   content.style.top = (top/barMax)*lineMax
         * */

        content.style.top = -(top/barMax)*lineMax + "px";

    });

    /*鼠标按下滚动条移动*/
    oBar.onmousedown = function (e) {
        e = e || window.event;
        var startY = e.clientY;  //获取每次按下鼠标位置
        var startTop = oBar.offsetTop;
        document.onmousemove = function (e) {
            content.style.userSelect = "none";
            e = e || window.event;
            var moveY = e.clientY;  //获取移动是的鼠标位置
            var delta = moveY - startY;
            top = startTop + delta;

            top = Math.min(top,barMax);  //最小值限定最大值
            top = Math.max(top,barMin); //最大值限定最小值
            oBar.style.top = top + "px";
            content.style.top = -(top/barMax)*lineMax + "px";
        };
        document.onmouseup = function () {
            content.style.userSelect = "";
            document.onmousemove = null;
        }
    };


    function mouseWheel(obj,callBack) {
        obj.onmousewheel === null ? obj.onmousewheel = callBack : obj.addEventListener('DOMMouseScroll',callBack);
    }
}