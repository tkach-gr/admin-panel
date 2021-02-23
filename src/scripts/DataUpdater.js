import database from '@/scripts/database.js';

class DataUpdater {
  static handleImagesByFunc(local, storage, ref, imgIndexCallback, func) {
    blocks: for(let y = 0; y < storage.length; y++) {
      for(let i = 0; i < local.length; i++) {
        if(local[i].image === storage[y].name) continue blocks;
      }

      storage[y].delete();
    }

    blocks: for(let y = 0; y < local.length; y++) {
      if(local[y].image === undefined || local[y].image === null) continue blocks;
      else if(local[y].image === "") continue blocks;

      for(let i = 0; i < storage.length; i++) {
        if(local[y].image === storage[i].name) continue blocks;
      }

      let fullName = local[y].image;
      let name = imgIndexCallback();
      let end = fullName.substr(fullName.lastIndexOf('.'));
      let path = `${ref}/${name}${end}`;

      database.putImage(path, local[y].imageFile);
      func(local[y], `${name}${end}`);
    }
  }

  static handleImages(local, storage, ref, imgIndexCallback) {
    this.handleImagesByFunc(local, storage, ref, imgIndexCallback, (item, name) => {
      item.image = name;
    });
  }

  static handleImagesByCallback(local, storage, ref, imgIndexCallback) {
    this.handleImagesByFunc(local, storage, ref, imgIndexCallback, (item, name) => {
      item.changeImage(name);
    });
  }

  static updateBlocks(local, updated, checkerCallback) {
    let minLength = updated.length > local.length ? local.length : updated.length;

    for(let i = 0; i < minLength; i++) {
      if(checkerCallback(local[i], updated[i]) !== true) {
        local[i] = updated[i];
      }
    }

    if(updated.length > local.length) {
      for(let i = local.length; i < updated.length; i++) {
        local.push(updated[i]);
      }
    } else {
      while(local.length > updated.length) {
        local.pop();
      }
    }
  }
}

export default DataUpdater;