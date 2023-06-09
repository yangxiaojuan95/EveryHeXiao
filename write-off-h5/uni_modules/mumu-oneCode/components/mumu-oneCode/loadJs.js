function loadJs() {
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src= '//h5plugin.mumudev.top/public/getOneCode/quagga.min.js';
    document.body.appendChild(script);
    script.onload = ()=>{
      resolve();
    }
    script.onerror = ()=>{
      reject();
    }
  })
}
 
export default loadJs