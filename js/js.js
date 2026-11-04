$(function () {
    let islog=false;
    const app={
        toast(message,type="success",delay=4000){
            const all=["danger","secondary","success","warning","primary"];
            const ait=all.includes(type)?type:"success";
            let $box=$(".app-t");
            if (!$box.length) {
                $box=$(`
                     <div class="app-t pf z-max bottom-0 start-0 ms-md-5 ms-2 p-3"></div>
                    `).appendTo("body");
            }
            const $t=$(`
                 <div class="toast text-bg-${ait} border-0 shadow my-1" style="width: 300px;">
        <div class="d-fxcc jcs">
            <div class="toast-body"></div>
            <button class="btn-close m-auto me-2" data-bs-dismiss="toast"></button>
        </div>
    </div>  
                `).appendTo($box);
                $t.find(".toast-body").html(message);
                const newtoast=new bootstrap.Toast($t[0],delay);
                $t.one("hidden.bs.toast",()=>$t.remove());
                newtoast.show();
        }
    };
    function rlog() {
        if (islog) {
            return true;
        }
        app.toast('請先登入會員。  <button class="btn t-c0 border rounded-pill toastlogin" data-bs-dismiss="toast">一鍵登入</button> ',"danger");
    }
    function setlog(loggedIn) {
        islog=loggedIn;
        $("#aimsg,#aibtnmsg").prop("disabled",!loggedIn);
        if (!loggedIn) {
            $("#aimsg").val("");
        }
        $("#aimsg").attr("placeholder",loggedIn?"請先登入會員":"請輸入訊息");
        const $logbtn=$(".logbtn");
        if (loggedIn) {
            $logbtn.removeClass("bg-c1").addClass("bg-success").html('<i class="fa-solid fa-user me-1"></i>登出');
            app.toast("登入成功，歡迎回來。","primary");
            $("#user").modal("show");
        } else {
            $logbtn.removeClass("bg-success").addClass("bg-c1").html('<i class="fa-solid fa-user me-1"></i>登入');
            app.toast("登出成功，期待下次再見。","secondary");            
        }
    }
    $(".logbtn").on("click",function () {
        if (islog) {
            setlog(false);
            return;
        }
        setlog(true);
    });
    $(document).on("click",".toastlogin",function () {
        setlog(true);        
    });
    $(window).on("scroll",function () {
        const $h=$(".header");
        const a=this.scrollY>10;
        const aa=this.scrollY>500;
        $h
        .toggleClass("a1",a)
        .toggleClass("a2",!a);
        if (aa) {
            $(".top").fadeIn(400);
        } else {
            $(".top").fadeOut(400);            
        }
    }).trigger("scroll");
    function num() {
        const $ns=$(".numbers");
        if (!$ns.length===0) {
            return;
        }
        const tot=$ns.offset().top;
        const wstwh =$(window).scrollTop()+$(window).height();
        if (tot<wstwh) {
         const $num=$ns.find(".num");
         $num.each(function () {
            const $n=$(this);
            const $nd=$n.data("num");
            $({number:0}).animate({number:$nd},{
                duration:3000,
                step:function () {
                  $n.text(Math.floor(this.number));  
                },
                complete:function () {
                    $n.text($nd);
                },
            });
         });   
         $(window).off("scroll load",num);
        }
    }
    $(window).on("scroll load",num);
    


    const md=[
        {
name:"狗狗",
text:"旺",
likes:410
        },
    ];
const $name=$("#name");
const $text=$("#text");
const $msgs=$(".msgs");
function esh(text) {
    return $("<div>").text(text).html();
}
function ct(data) {
    const hn=data.name.charAt(0);
    const left=Math.floor(Math.random()*80)+"%";
    const move=Math.floor(Math.random()*80)+"px";
    const time=Math.floor(Math.random()*20)+5+"s";
    const $msgbox=$(`
<div class="msg pa z-0 card px-3 py-2 bg-wt blur shadow rounded-4" style="
    --left:${left};
    --move:${move};
    --time:${time};
    ">
        <div class="d-fxcc jcs">
            <div class="bg-gra shadow rounded-pill d-fxcc t-c0" style="width: 40px;height: 40px;">
                ${esh(hn)}
            </div>
            <div class="px-2">
                <div class="fw-bolder">${esh(data.name)}</div>
                <div class="" style="transform: scale(0.8);">剛剛</div>
            </div>
        </div>
        <div class="t-bt">${esh(data.text)}</div>
        <div class="d-fxcc jce">
            <button class="btn border-0 like t-bt">
                <span>${esh(data.likes)}</span>
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>
    </div>        
        `);
        $msgs.append($msgbox);
        $msgbox.one("animationend",function () {
            $(this).remove();
        });
}
md.forEach(function (message,index) {
    setTimeout(() => {
        ct(message);
    }, index*700);
});
setInterval(() => {
    const ran=md[Math.floor(Math.random()*md.length)];
    ct({
name:ran.name,
text:ran.text,
likes:ran.likes,
    });
}, 1000);

    let ac=0;
    const $cards=$(".card3d");
    const cs=$cards.length;
    function card3d() {
        $cards.each(function () {
            const $card=$(this);
            const card=$card.data("in");
            let o=card-ac;
            if (o<-2) {
                o+=cs;
            }
            if (o>2) {
                o-=cs;
            }
            if (o===2) {
                $card.css({
                    "transform": " translate3d(100%,0,0) scale(0.5) rotateY(-55deg)",
                    "opacity": "0.3",
                    "z-index": "1"
                });                
            }
            else if (o===1) {
                $card.css({
                    "transform": " translate3d(50%,0,0) scale(0.7) rotateY(-35deg)",
                    "opacity": "0.6",
                    "z-index": "2"
                });                
                
            }
            else if (o===0) {
                $card.css({
                    "transform": " translate3d(0%,0,0) scale(1) rotateY(0deg)",
                    "opacity": "1",
                    "z-index": "5"
                });                
                
            }
            else if (o===-1) {
                $card.css({
                    "transform": " translate3d(-50%,0,0) scale(0.7) rotateY(35deg)",
                    "opacity": "0.6",
                    "z-index": "2"
                });                
                
            }
            else if (o===-2) {
                $card.css({
                    "transform": " translate3d(-100%,0,0) scale(0.5) rotateY(55deg)",
                    "opacity": "0.3",
                    "z-index": "1"
                });                
                
            }
            else {
                $card.css({
                    "transform": " translate3d(0%,0,0) scale(0) rotateY(0deg)",
                    "opacity": "0",
                    "z-index": "0"
                });                
                
            }
        });
    }
    card3d();
    $("#btn3dprev").on("click",function () {
        ac=(ac+1)%cs;
        card3d();
    });
    
    $("#btn3dnext").on("click",function () {
        ac=(ac-1)%cs;
        card3d();
    });
    
});