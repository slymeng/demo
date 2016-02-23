    var WINDOW_WIDTH=1124;//全局变量
    var WINDOW_HEIGHT=500;
    var RADIUS=8;
    var MARGIN_TOP=60;
    var MARGIN_LEFT=30;
    var   endTime=new Date();
    endTime=endTime.getTime()+600000;//这里单位是毫秒；加载网页后开始倒计时10分钟
    var curShowTimeSeconds=0;

    var balls=[];
    var colors=["#33B5E5","#0099CC","#AA66CC","#99CC00","#669900","#FFBB33","#FFFF00","#FF4444","#CC0000","#9933CC"];
    window.onload=function(){
       

        var convas=document.getElementById("canvas");
        var context=canvas.getContext("2d");//得到幕布的上下文
        convas.width=WINDOW_WIDTH;
        convas.height=WINDOW_HEIGHT;

        curShowTimeSeconds=getCurrentShowTimeSeconds();

        setInterval(
                function(){
                    render(context);//绘制
                    update();
                } ,
                50
        );


    }
    function update(){
        var nextShowTimeSeconds=getCurrentShowTimeSeconds();

        var nextHours=parseInt(nextShowTimeSeconds/3600);
        var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
        var nextSeconds=nextShowTimeSeconds%60;

        var curHours=parseInt(curShowTimeSeconds/3600);
        var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
        var curSeconds=curShowTimeSeconds%60;

        if(nextSeconds!=curSeconds){
            if(nextHours!=curHours){
                addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
            }
            if(nextHours%10!=curHours%10){
                addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
            }

            if(nextMinutes!=curMinutes){
                addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
            }
            if(nextMinutes%10!=curMinutes%10){
                addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
            }

            if(nextSeconds!=curSeconds){
                addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
            }
            if(nextSeconds%10!=curSeconds%10){
                addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
            }

            curShowTimeSeconds=nextShowTimeSeconds;
        }
        updateBalls();
       
    }
    function updateBalls(){
        for(var i=0;i<balls.length;i++){
            balls[i].x+=balls[i].vx;
            balls[i].y+=balls[i].vy;
            balls[i].vy+=balls[i].g;
            if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
                balls[i].y=WINDOW_HEIGHT-RADIUS;
                balls[i].vy=-balls[i].vy*0.75;
            }
        }
        var cnt=0;
        for(var i=0;i<balls.length;i++){
            if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){
                balls[cnt++]=balls[i];
            }
        }

        while(balls.length>Math.min(400,cnt)){
            balls.pop();//删除数组末尾的值
        }
    }

    function addBalls(x,y,num){
        for(var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                    var aBall={
                        x:x+j*2*(RADIUS+1)+(RADIUS+1),
                        y:y+i*2*(RADIUS+1)+(RADIUS+1),
                        g:1.5+Math.random(),
                        vx:Math.pow(-1,Math.ceil((Math.random()*1000)))*4,
                        vy:-5,
                        color:colors[Math.floor(Math.random()*colors.length)]
                    }
                    balls.push(aBall);
                }
            }
        }
    }
    function getCurrentShowTimeSeconds(){
        var curTime=new Date();
        var ret=endTime-curTime.getTime();
        ret=Math.round(ret/1000);
        return ret>=0 ? ret : 0;
    }

    function render(txt){
        txt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//对矩形空间的动画进行一次刷新

        var hours=parseInt(curShowTimeSeconds/3600);//存放倒计时的具体数字
        var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
        var seconds=curShowTimeSeconds%60;

        renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),txt);
        renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),txt);
        renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,txt);

        renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),txt);
        renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),txt);
        renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,txt);

        renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),txt);
        renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),txt);

        for(var i=0;i<balls.length;i++){
            txt.beginPath();
            txt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
            txt.closePath();
            txt.fillStyle=balls[i].color;
            txt.fill();
        }

    }
    function renderDigit(x,y,num,txt){
        txt.fillStyle="rgb(153,204,0)";
        for(var i=0;i<digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j]==1){
                    txt.beginPath();
                    txt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                    txt.closePath();

                    txt.fill();
                }
            }
        }
    }

