async function getSlides(sPath){
    const aPath = sPath.split('/');
    let newPath = `https://${aPath.slice(0,1)}.github.io/${aPath.slice(1,2)}/${aPath.slice(2).join('/')}/slides.html`;
    console.log(newPath);
    const oResponse = await fetch(newPath);
    const sRc = await oResponse.text()
    return sRc;
}

export {getSlides}