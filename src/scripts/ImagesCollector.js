class ImagesCollector {
  static pushInnerImages(source, containerKey, array, propName) {
    if(source === undefined) return;

    let iterator = (lang, item) => {
      if(item[lang][containerKey] === undefined) return;

      item[lang].gallery.map(subitem => array.push({
        image: subitem[propName],
        imageFile: subitem[propName + "File"],
        changeImage: name => subitem[propName] = name
      }));
    };

    source.map(item => iterator("rus", item));
    source.map(item => iterator("ukr", item));
  }

  static pushImages(source, array, propName) {
    if(source === undefined) return;

    let iterator = (lang, item) => array.push({ 
      image: item[lang][propName],
      imageFile: item[lang][propName + "File"],
      changeImage: name => item[lang][propName] = name
    });

    source.map(item => iterator("rus", item));
    source.map(item => iterator("ukr", item));
  }
}

export default ImagesCollector;