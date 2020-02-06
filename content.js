class Hider{
    constructor(img) {
        let W = img.width;
        let H = img.height;
        this.main_src = img.src;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);

        let n = 8;

        let wstep = Math.floor(W/n);
        let hstep = Math.floor(H/n);

        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                let imdata = this.ctx.getImageData(i*wstep, j*hstep, wstep, hstep);
                for(let k=0; k<imdata.data.length; k++){
                    imdata.data[k] = imdata.data[ k % 4];
                }
                this.ctx.putImageData(imdata, i*wstep, j*hstep);
            }
        }
        img.src = this.canvas.toDataURL();
    }
}

window.onload = function(){
  var imlist = document.getElementsByTagName('img');
  for(let i=0; i<imlist.length; i++){
    imlist[i].my_addon = new Hider(imlist[i]);
  }
}
