/**
 * Created by Administrator on 2015/3/24.
 */
var image= function(){
    function ImageProcess() {
        var self=this;
        this.myimage=new MyImage();
        this.myimage.getimage();
        this.process=function(){
            var lbutton= document.getElementsByClassName("lbutton");
            for(var i=0;i<lbutton.length;i++) {
                lbutton[i].addEventListener("click", this.process2, true);

            }
        },
        this.process2=function(){
            if(this.id==="origin"){
                self.myimage.reset();
            }
            else if(this.id=="invert"){
                self.myimage.invertImg();
            }
            else if(this.id=="tanslucence"){
                self.myimage.translucence();
            }
            else if(this.id=="grey"){
                self.myimage.grey();
            }
        }
        this.process();


    };

    function MyImage() {
        this.image1=new Image();
        this.canvas=new Canvas("mycanvas",1024,768);
        this.imagedata;
    }
    MyImage.prototype={
        constructor:MyImage,
        getimage:function(){
            var self=this;
            this.image1.src="./c.jpg";
            this.image1.onload=function(){
                self.canvas.context.drawImage(self.image1,100,100);
                self.imagedata=self.canvas.context.getImageData(100,100,self.image1.width,self.image1.height);


            }
        },
        invertImg:function(){
            var data=this.imagedata.data;
            for(var i=0;i<data.length;i+=4){
                // red
                data[i] = 255 - data[i];
                // green
                data[i + 1] = 255 - data[i + 1];
                // blue
                data[i + 2] = 255 - data[i + 2];
            }
            this.canvas.context.putImageData(this.imagedata,100,100);
        },
        translucence:function(){
            var data=this.imagedata.data;
            for(var i=0;i<data.length;i+=4){
                data[i+3]=0.5*data[i+3];
            }
            this.canvas.context.putImageData(this.imagedata,100,100);

        },
        reset:function(){

                this.canvas.context.drawImage(this.image1,100,100);
                this.imagedata=this.canvas.context.getImageData(100,100,this.image1.width,this.image1.height);

        },
        grey:function(){
            var data=this.imagedata.data;
            for(var i = 0; i < data.length; i += 4) {
                var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                // red
                data[i] = brightness;
                // green
                data[i + 1] = brightness;
                // blue
                data[i + 2] = brightness;
            }
            this.canvas.context.putImageData(this.imagedata,100,100);

        }


    }

    function Canvas(id,w,h) {
        this.width=w || document.documentElement.clientWidth || window.innerWidth ;
        this.height=h || document.documentElement.clientHeight|| window.innerHeight ;
        this.canvasget=document.getElementById(id);
        this.context=this.canvasget.getContext('2d');
        this.setSize();
    }
    Canvas.prototype={
        consructor:Canvas,
        setSize:function(){
            this.canvasget.width=this.width;
            this.canvasget.height=this.height;
        }
    }

    return new ImageProcess();
}();