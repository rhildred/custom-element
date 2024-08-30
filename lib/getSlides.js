async function getSlides(sPath){
    const aPath = sPath.split('/');
    let newPath = ['https:/', 'rhildred.github.io'].concat(aPath.slice(0,2)).concat(aPath.slice(2)).concat(['slides.html']);
    console.log(newPath);
    const sNewPath = newPath.join('/');
    const oResponse = await fetch(sNewPath);
    return await oResponse.text();
}

export {getSlides}