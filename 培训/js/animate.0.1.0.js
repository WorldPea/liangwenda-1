/**
 * Created by Administrator on 2018/3/11.
 */
function animate(obj,targetJSON,time,callBack){
    var startJSON = {};
    var stepJSON = {};
    var maxCount = time/20;
    var count = 0;
    for(var k in targetJSON){
        startJSON[k] = parseFloat(getStyle(obj,k));
        stepJSON[k] = (parseFloat(targetJSON[k]) - startJSON[k])/maxCount;
    }
    var timer = setInterval(function(){
        for(var k in targetJSON){
            startJSON[k] += stepJSON[k];
            if(k === "opacity"){
                obj.style[k] = startJSON[k];
                obj.style.filter = "alpha(opacity = "+startJSON[k]*100+")";
            }
            obj.style[k] = startJSON[k] + "px";

        }
        count++;
        if(count === maxCount){
            for(var k in targetJSON){
                if(k === "opacity"){
                    obj.style[k] = targetJSON[k];
                    obj.style.filter = "alpha(opacity = "+targetJSON[k]*100+")";
                }
                obj.style[k] = targetJSON[k] + "px";
            }
            callBack && callBack.call(obj);
            clearInterval(timer);
        }
    },20);
    function getStyle(obj,property) {
        return obj.currentStyle ? obj.currentStyle[property] : getComputedStyle(obj)[property];
    }
}